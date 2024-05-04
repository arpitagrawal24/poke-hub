// components/PokemonRow.tsx

import { Card, CardContent, Typography, Box } from "@mui/material";
import Image from "next/image";

interface PokemonRowProps {
  pokemon: {
    name: string;
    types: string[];
    sprite: string;
  };
}

const PokemonRow: React.FC<PokemonRowProps> = ({ pokemon }) => {
  return (
    <Card variant="outlined" sx={{ display: "flex", margin: 2 }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          {pokemon.name}
        </Typography>
        <Typography gutterBottom>Types: {pokemon.types.join(", ")}</Typography>
      </CardContent>
      <Box sx={{ width: 100, height: 100, flexShrink: 0 }}>
        <Image
          src={pokemon.sprite}
          alt={pokemon.name}
          layout="responsive"
          width={100}
          height={100}
        />
      </Box>
    </Card>
  );
};

export default PokemonRow;
