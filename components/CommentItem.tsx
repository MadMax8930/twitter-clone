import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { formatDistanceToNowStrict } from "date-fns";
import Avatar from "@/components/Avatar";

interface CommentItemProps {
   data: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
   const router = useRouter();

   const goToUser = useCallback((event: any) => {
      event.stopPropagation();
      router.push(`/users/${data.user.id}`);
   }, [router, data.user.id]);

   const createdAt = useMemo(() => {
      if (!data?.createdAt) {
         return null;
      }
      return formatDistanceToNowStrict(new Date(data.createdAt));
   }, [data?.createdAt]);

  return (
    <div className="border-neutral-800 hover:bg-neutral-900 
                      border-b-[1px] p-5 cursor-pointer transition">
      <div className="flex flex-row items-start gap-3">
         <Avatar userId={data.user.id} />
         <div onClick={goToUser}>
            <div className="flex flex-row items-center gap-2">
               <p className="text-white font-semibold hover:underline">{data.user.name}</p>
               <span className="text-neutral-500 hidden md:block">@{data.user.username}</span>
               <span className="text-neutral-500 text-sm">{createdAt}</span>
            </div>
            <div className="text-white mt-1">
               {data.body}
            </div>
         </div>
      </div>
    </div>
  );
};

export default CommentItem;