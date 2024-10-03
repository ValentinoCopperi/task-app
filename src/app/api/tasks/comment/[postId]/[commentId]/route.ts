import * as jwt from '@/libs/token/token-verify'
import { NextResponse } from "next/server";
import * as mongo from '@/mongodb/index';
import { ObjectId } from "mongodb";
import { Segment } from 'next/dist/server/app-render/types';



export async function DELETE(request: Request, segment: Segment) {
    try {
      // Obtener los parámetros
      const { params } = segment;
      const postId = new ObjectId(String(params.postId));
      const commentId = new ObjectId(String(params.commentId));
  
      // Verificar token de usuario
      const token_data = jwt.decoded_token();
  
      if (!token_data) {
        return NextResponse.json(
          {
            ok: false,
            message: 'Unauthorized',
          },
          { status: 401 }
        );
      }
  
      // Obtener el modelo de tareas
      const model = await mongo.getModel('tasks');
  
      // Buscar el post que contiene el comentario
      const post = await model.findOne({ _id: postId });
  
      if (!post) {
        return NextResponse.json(
          {
            ok: false,
            message: 'Post not found',
          },
          { status: 404 }
        );
      }
  
      // Filtrar el comentario a eliminar
      const updatedComments = post.comments.filter(
        (comment: { _id: ObjectId, username: string }) => !comment._id.equals(commentId)
      );
  
      // Verificar si el comentario existe y pertenece al usuario autenticado
      const commentToDelete = post.comments.find(
        (comment: { _id: ObjectId, username: string }) => comment._id.equals(commentId)
      );
  
      if (!commentToDelete) {
        return NextResponse.json(
          {
            ok: false,
            message: 'Comment not found',
          },
          { status: 404 }
        );
      }
  
      if (commentToDelete.username !== token_data.username) {
        return NextResponse.json(
          {
            ok: false,
            message: 'Unauthorized to delete this comment',
          },
          { status: 403 }
        );
      }
  
      // Actualizar el post con los comentarios filtrados
      const updatedPost = await model.updateOne(
        { _id: postId },
        { $set: { comments: updatedComments } }
      );
  
      if (!updatedPost) {
        return NextResponse.json(
          {
            ok: false,
            message: 'Failed to update comments',
          },
          { status: 500 }
        );
      }
  
      return NextResponse.json(
        { message: 'Comment deleted successfully', ok: true },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error deleting comment:', error);
      return NextResponse.json(
        {
          ok: false,
          message: 'Internal server error',
        },
        { status: 500 }
      );
    }
  }

// async deleteComment(
//     @Param('id') taskId: string,
//     @Param('commentId') commentId: string,
//     @Req() req: any
//   ) {

//     console.log(taskId , commentId)
    
//     const commentUser = await this.tasksService.getCommentById(commentId);
    
//     if(!commentUser){
//       throw new NotFoundException("Comment not Found");
//     }
    
//     if((await commentUser).username != req.user.username){
//       throw new UnauthorizedException("You are not allowed to delete this comment");
//     }
    
   
//     const updatedTask = this.tasksService.deleteComment(taskId , commentId , req.user);

//     if (!updatedTask) {
//       throw new NotFoundException("Task not found");
//     }

//     return updatedTask;

//   }

// const getCommentById  = async (id: string , model : any): Promise<Comment | null> => {
//     // Busca la tarea que contiene el comentario
//     const task = await model.findOne({ 'comments._id': id });

//     if (!task) {
//         return null;
//     }


//     const comment = task.comments.find(comment => comment._id.toString() === id);

//     if (!comment) {
//         return null; // Retorna null si no se encuentra el comentario
//     }

//     return comment; // 

// }

// public async deleteComment(taskId: string, commentId: string, user: any): Promise<Task> {



//     const task: Task = await this.taskModel.findOne({ 'comments._id': commentId }).exec();

//     if (!task) return null;

//     this.taskGateway.notifyNewTask();
//     return this.taskModel.findByIdAndUpdate(
//         taskId,
//         {
//             $pull: { comments: { _id:commentId } }
//         },
//         { new: true }
//     );


// }