import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";

// Protect the notifications route
export async function getServerSideProps(context: NextPageContext) {
   const session = await getSession(context);

   if (!session) {
      return {
         redirect: {
            destination: '/',
            permanent: false
         }
      }
   }

   return {
      props: {
         session
      }
   }
};

const Notifications = () => {
  return (
    <>
      <Header showBackArrow label="Notifications" />
      <NotificationsFeed />
    </>
  );
};

export default Notifications;