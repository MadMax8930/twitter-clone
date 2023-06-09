import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'POST' && req.method !== 'DELETE') {
     return res.status(405).end();
   }

   try {
     const { userId } = req.method === 'POST' ? req.body : req.method === 'DELETE' ? req.query : null;
     const { currentUser } = await serverAuth(req, res);

     if (!userId || typeof userId !== 'string') throw new Error('Invalid ID');

     const user = await prisma.user.findUnique({
        where: {
           id: userId
        }
     });

     if (!user) throw new Error('Invalid ID');
     
     let arr = [...(currentUser.followingIds || [])];  // Following User IDs Array

     if (req.method === 'POST') {
       arr = arr.filter(followingId => followingId !== currentUser.id);
       arr.push(userId);

       // NOTIFICATION TRIGGER
       try {
  
           await prisma.notification.create({
              data: {
                 body: 'Someone followed you!',
                 userId
              }
           });
            
           await prisma.user.update({
              where: {
                 id: userId
              },
              data: {
                 hasNotification: true
              }
           });
            
       } catch (error) {
         console.log(error);
       }
       // NOTIFICATION TRIGGER
     }

     if (req.method === 'DELETE') {
       arr = arr.filter(followingId => followingId !== userId);
     }

     const updatedUser = await prisma.user.update({
        where: {
           id: currentUser.id
        },
        data: {
           followingIds: arr
        }
     });

     return res.status(200).json(updatedUser);
   } catch (error) {
     console.log(error)
     return res.status(400).end(); 
   }
};