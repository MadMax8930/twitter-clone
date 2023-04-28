import { useEffect } from "react";
import { BsTwitter } from "react-icons/bs";
import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";

const NotificationsFeed = () => {
   const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
   const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

   useEffect(() => {
      mutateCurrentUser(); // Refetch to remove alert
   }, [mutateCurrentUser]);

   if (fetchedNotifications.length === 0) {
      return (
         <div className="text-neutral-600 text-center text-xl p-6">
            No notifications
         </div>
      );
   }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
         <div className="border-neutral-800 border-b-[1px] flex flex-row items-center p-6 gap-4"
              key={notification.id}>
            <BsTwitter color="white" size={32} />
            <p className="text-white">{notification.body}</p>
         </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;