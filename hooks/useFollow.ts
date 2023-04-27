import { useMemo, useCallback } from "react";
import { toast } from "react-hot-toast";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useLoginModal from "@/hooks/useLoginModal";
import axios from "axios";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);
  const loginModal = useLoginModal();

  // Establish if we are already following a user

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [userId, currentUser?.followingIds]);

  const toggleFollow = useCallback(async () => {
     // Check if we are logged in or not
    if (!currentUser) return loginModal.onOpen();
    
    try {
      let request;  // differentiate follow or un-follow the user

      if (isFollowing) {
         request = () => axios.delete('/api/follow', { data: { userId } });
      } else {
         request = () => axios.post('/api/follow', { userId });
      }

      await request();
      mutateCurrentUser();
      mutateFetchedUser();

      toast.success('Success');
    } catch(error) {
      toast.error('Something went wrong');
    }
  }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser, loginModal]);

  return {
    isFollowing,
    toggleFollow
  }
};

export default useFollow;