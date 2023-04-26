import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method !== 'GET' && req.method !== 'POST') {
      return res.status(405).end();
   }

   try {

      // POST
      if (req.method === 'POST') {
         const { currentUser } = await serverAuth(req, res);
         const { body } = req.body;

         const newPost = await prisma.post.create({
            data: {
               body,
               userId: currentUser.id
            }
         });

         return res.status(201).json(newPost);
      }

      // GET
      if (req.method === 'GET') {
         const { userId } = req.query;

         let getPosts;

         if (userId && typeof userId === 'string') {
            getPosts = await prisma.post.findMany({
               where: {
                  userId   // -> find posts only for that userId (display profile User)
               },
               include: {
                  user: true,  // -> populate the user aka the owner and load newest posts desc
                  comments: true 
               },
               orderBy: {
                  createdAt: 'desc'
               }
            });
         } else {
            getPosts = await prisma.post.findMany({
               include: {
                  user: true,
                  comments: true
               },
               orderBy: {
                  createdAt: 'desc'
               }
            });
         }

         return res.status(200).json(getPosts);
      }
      
   } catch (error) {
     console.log(error);
     return res.status(400).end();
   }
};