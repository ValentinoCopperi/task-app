import React, { useState } from 'react';
import clsx from 'clsx';
import * as api from '@/helpers/todos/todos'
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

  const router = useRouter();

  const handleDeleteComment = async (commentId: string, postId: string) => {
    try {
      await api.deleteComment(postId, commentId);
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        setMsgResponse(error.message);
      } else {
        setMsgResponse('Unknown error happened');
      }
      setTimeout(() => setMsgResponse(null), 3000);
    }
  };

  return (
    <div className="flex  py-4 space-x-8">
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
                  className="text-red-400 hover:text-red-600 transition-colors duration-300 text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </Modal>

      {msgResponse && <SuccessMessage message={msgResponse} bg="bg-red-400" />}
    </div>
  );
}