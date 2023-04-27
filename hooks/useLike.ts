import { useMemo, useCallback } from "react";
import { toast } from "react-hot-toast";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePost from "@/hooks/usePost";
import usePosts from "@/hooks/usePosts";
import useLoginModal from "@/hooks/useLoginModal";
import axios from "axios";

const useLike = ({ postId, userId }: { postId: string, userId?: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);
  const loginModal = useLoginModal();

  // Establish if we have already liked a post

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [currentUser, fetchedPost]);

  const toggleLike = useCallback(async () => {
     // Check if we are logged in or not
    if (!currentUser) return loginModal.onOpen();
  
    try {
      let request;  // differentiate liked or un-liked post

      if (hasLiked) {
         request = () => axios.delete('/api/like', { params: { postId } });
      } else {
         request = () => axios.post('/api/like', { postId });
      }

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success('Success');
    } catch(error) {
      toast.error('Something went wrong');
    }
  }, [currentUser, hasLiked, postId, mutateFetchedPost, mutateFetchedPosts, loginModal]);

  return {
    hasLiked,
    toggleLike
  }
};

export default useLike;