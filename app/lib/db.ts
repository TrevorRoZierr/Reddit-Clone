import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

interface CustomGlobal {
  prismaGlobal?: PrismaClient;
}

const customGlobalThis = globalThis as CustomGlobal;

const prisma = customGlobalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production" && !customGlobalThis.prismaGlobal) {
  customGlobalThis.prismaGlobal = prisma;
}

export default prisma;
