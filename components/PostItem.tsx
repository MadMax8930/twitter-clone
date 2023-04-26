import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { formatDistanceToNowStrict } from "date-fns";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import Avatar from "@/components/Avatar";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";

interface PostItemProps {
   data: Record<string, any>,
   userId?: string
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
   const router = useRouter();
   const loginModal = useLoginModal();
   const { data: currentUser } = useCurrentUser();

   const goToUser = useCallback((event: any) => {
      event.stopPropagation();
      router.push(`/users/${data.user.id}`);
   }, [router, data.user.id]);

   const goToPost = useCallback(() => {
      router.push(`/posts/${data.id}`);
   }, [router, data.id]);

   const onLike = useCallback((event: any) => {
      event.stopPropagation();
      loginModal.onOpen();
   }, [loginModal]);

   const createdAt = useMemo(() => {
      if (!data?.createdAt) {
         return null;
      }
      return formatDistanceToNowStrict(new Date(data.createdAt));
   }, [data?.createdAt]);

  return (
    <div
      onClick={goToPost}
      className="
         border-neutral-800 border-b-[1px] 
         hover:bg-neutral-900 p-5 
         cursor-pointer transition"
    >
      <div className="flex flex-row items-start gap-3">

         <Avatar userId={data.user.id} />
         <div>
            <div className="flex flex-row items-center gap-2">
               <p onClick={goToUser}
                  className="text-white font-semibold hover:underline">
                      {data.user.name}</p>
               <span onClick={goToUser}
                     className="text-neutral-500 hidden md:block">
                     @{data.user.username}</span>
               <span onClick={goToUser}
                     className="text-neutral-500 text-sm">
                      {createdAt}</span>
            </div>
            <div className="text-white mt-1">
               {data.body}
            </div>
            <div className="flex flex-row items-center mt-3 gap-10">
               <div className="
                     text-neutral-500 flex flex-row items-center gap-2
                     hover:text-sky-500 cursor-pointer transition"
               >
                  <AiOutlineMessage size={20} />
                  <p>{data.comments?.length || 0}</p>
               </div>
               <div onClick={onLike}
                    className="
                     text-neutral-500 flex flex-row items-center gap-2
                     hover:text-red-500 cursor-pointer transition"
               >
                  <AiOutlineHeart size={20} />
                  <p>{data.comments?.length || 0}</p>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
};

export default PostItem;