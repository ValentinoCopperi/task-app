import React, { useState } from 'react';
import clsx from 'clsx';
import * as api from '@/helpers/todos/todos';
import DateTimeDisplay from '../../timePostCreated/TimePost';
import { SuccessMessage } from '@/components/ui/successMessage/SuccessMessage';
import { useRouter } from 'next/navigation';
import { MessageCircleIcon, ThumbsUpIcon } from 'lucide-react';
import Modal from './Modal';
import { DecodedToken } from '@/types';

interface Props {
  post: {
    _id: string;
    likes: Array<{ _id: string; username: string }>;
    comments: Array<{ _id: string; username: string; content: string; createdAt: string }>;
  };
  profile?: DecodedToken | null;
}

export default function LikeCommentsVisibility({ post, profile }: Props) {
  const [isLikesModalOpen, setIsLikesModalOpen] = useState(false);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [msgResponse, setMsgResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga

  const router = useRouter();

  const handleDeleteComment = async (commentId: string, postId: string) => {
    setLoading(true);
    try {
      await api.deleteComment(postId, commentId);
      setMsgResponse('Comment deleted successfully!');
      router.refresh();
    } catch (error) {
      let errorMessage = 'Unknown error happened';

      if (error instanceof Error) {
        if (error.message === 'Failed to fetch') {
          errorMessage = 'Network error. Please try again later.';
        } else if (error.message === 'Unauthorized') {
          errorMessage = 'You are not authorized to delete this comment.';
        } else if (error.message === 'Task not found') {
          errorMessage = 'Post or comment not found.';
        } else {
          errorMessage = error.message;
        }
      }

      setMsgResponse(errorMessage);
    } finally {
      setLoading(false);
      setTimeout(() => setMsgResponse(null), 3000); // El mensaje se desaparece después de 3 segundos
    }
  };

  return (
    <div className="flex py-4 space-x-8">
      <button
        onClick={() => setIsLikesModalOpen(true)}
        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
      >
        <ThumbsUpIcon size={18} className="mr-1" />
        {post.likes.length} Likes
      </button>
      <button
        onClick={() => setIsCommentsModalOpen(true)}
        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
      >
        <MessageCircleIcon size={18} className="mr-1" />
        {post.comments.length} Comments
      </button>

      <Modal isOpen={isLikesModalOpen} onClose={() => setIsLikesModalOpen(false)} title="Likes">
        {post.likes.map(like => (
          <div key={like._id} className="text-gray-400 py-1">
            <span className="text-red-500">•</span> {like.username}
          </div>
        ))}
      </Modal>

      <Modal isOpen={isCommentsModalOpen} onClose={() => setIsCommentsModalOpen(false)} title="Comments">
        {post.comments.map(comment => (
          <div key={comment._id} className="text-gray-400 py-2 border-b border-gray-700">
            <p><span className="font-bold">{comment.username}:</span> {comment.content}</p>
            <div className="flex justify-between items-center mt-1">
              <DateTimeDisplay createdAt={comment.createdAt} />
              {comment.username === profile?.username && (
                <button
                  onClick={() => handleDeleteComment(comment._id, post._id)}
                  className={clsx(
                    'text-red-400 hover:text-red-600 transition-colors duration-300 text-sm',
                    { 'cursor-not-allowed opacity-50': loading } // Deshabilitar botón si está cargando
                  )}
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              )}
            </div>
          </div>
        ))}
      </Modal>

      {msgResponse && <SuccessMessage message={msgResponse} bg={msgResponse.includes('successfully') ? 'bg-green-400' : 'bg-red-400'} />}
    </div>
  );
}
