import { prisma } from '@/lib/db';
import NextAuth from 'next-auth';
import {PrismaAdapter} from '@auth/prisma-adapter';
export const {auth, handlers} = NextAuth({
    adapter : PrismaAdapter(prisma),
    providers : [],
})