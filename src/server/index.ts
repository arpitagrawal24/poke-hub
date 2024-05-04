import { z } from "zod";
import { procedure, router } from "./trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
    getPokemon: procedure
    .input(z.string()) 
    .query(async ({ input: name }) => {
      return await prisma.pokemon.findUnique({
        where: { name },
      });
    }),
  getPokemonArray: procedure
    .input(z.array(z.string())) 
    .query(async ({ input: names }) => {
      return await prisma.pokemon.findMany({
        where: { name: { in: names } },
      });
    }),
  getPokemonByType: procedure
    .input(z.string().optional()) 
    .query(async ({ input: type }) => {
      return await prisma.pokemon.findMany({
        where: type ? { types: { has: type } } : {},
      });
    }),
});

export type AppRouter = typeof appRouter;

