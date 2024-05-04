import { z } from "zod";
import { procedure, router } from "./trpc";
import prisma from "@/utils/connect";

export const appRouter = router({
  getdo: procedure.query(async () => {
    return [10,20,30];
  }),
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
    // getPokemon: procedure
    // .input(z.object({ name: z.string() }))
    // .query(async (opts) => {
    //   return await prisma.pokemon.findUnique({
    //     where: {
    //       name: opts.input.name,
    //     },
    //   });
    // }),
    getPokemon: procedure
    .input(z.string()) // Validate input as string
    .query(async ({ input: name }) => {
      return prisma.pokemon.findUnique({
        where: { name },
      });
    }),
  getPokemonArray: procedure
    .input(z.array(z.string())) // Validate input as string array
    .query(async ({ input: names }) => {
      return prisma.pokemon.findMany({
        where: { name: { in: names } },
      });
    }),
  getPokemonByType: procedure
    .input(z.string().optional()) // Optional type input
    .query(async ({ input: type }) => {
      return prisma.pokemon.findMany({
        where: type ? { types: { has: type } } : {},
      });
    }),
});

export type AppRouter = typeof appRouter;

