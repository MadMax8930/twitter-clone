import { PrismaClient } from "@prisma/client";

// global variable (not affected by hot-reloading)

declare global {
   var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
