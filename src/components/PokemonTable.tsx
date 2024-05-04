import PokemonRow from "./PokemonRow";
import { Paper, Typography, Grid } from "@mui/material";

const PokemonTable = ({ pokemonArray }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
      <Typography variant="h5" gutterBottom>
        Pokemon List
      </Typography>
      <Grid container spacing={1}>
        {pokemonArray?.map((pokemon) => (
          <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
            <PokemonRow pokemon={pokemon} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default PokemonTable;
