// pages/index.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
  Switch,
  MenuItem,
} from "@mui/material";

import { trpc } from "./_trpc/client";
import PokemonRow from "@/components/PokemonRow";
import PokemonTable from "@/components/PokemonTable";
import { pokemonTypes } from "@/utils/pokemonTypes";


interface Pokemon {
  id: string;
  name: string;
  types: string[];
  sprite: string;
}


export default function Home() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonNames, setPokemonNames] = useState("");
  const [selectedType, setSelectedType] = useState<string | undefined>("");
  const [searchMode, setSearchMode] = useState<
    "single" | "multiple" | "filter"
  >("single");

  const {
    data: singlePokemon,
    isLoading: isSingleLoading,
    error: singleError,
  } = trpc.getPokemon.useQuery(pokemonName, {});

  const {
    data: pokemonArray,
    isLoading: isArrayLoading,
    error: arrayError,
  } = trpc.getPokemonArray.useQuery(pokemonNames.split(","));

  const {
    data: filteredPokemon,
    isLoading: isTypeLoading,
    error: typeError,
  } = trpc.getPokemonByType.useQuery(selectedType);

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value);
    setSearchMode("filter");
  };

  useEffect(() => {
    setPokemonName("Bulbasaur");
    setPokemonNames("Bulbasaur,Charmander,Squirtle");
  }, []);

  return (
    <Container sx={{ mt: 8 , minHeight: ""}}>
      <Typography variant="h3" paddingTop={2}>
        Pokemon Search
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding={1}
        borderBottom={1}
        borderColor="divider"
      >
        <Box display="flex" alignItems="center">
          <Switch
            checked={searchMode === "multiple"}
            onChange={() =>
              setSearchMode((prevMode) =>
                prevMode === "single" ? "multiple" : "single"
              )
            }
            inputProps={{ "aria-label": "search mode switch" }}
          />
          <Typography variant="h5" marginLeft={1}>
            {searchMode === "multiple"
              ? "Multiple Pokemon Search"
              : "Single Pokemon Search"}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Typography variant="h5" marginRight={2}>
            Filter by Type:
          </Typography>
          <Box>
            <TextField
              select
              label="Select Type"
              value={selectedType|| ''}
              onChange={handleTypeChange}
              variant="outlined"
              size="small"
              sx={{ minWidth: 150 }}
            >
              {pokemonTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
      </Box>

      {searchMode === "single" && (
        <>
          <Box padding={2} display="flex" alignItems="center">
            <TextField
              label="Pokemon Name"
              variant="outlined"
              value={pokemonName}
              onChange={(e) => setPokemonName(e.target.value)}
              fullWidth
              sx={{ marginRight: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              disabled={isSingleLoading}
            >
              {isSingleLoading ? <CircularProgress size={24} /> : "Search"}
            </Button>
          </Box>
          {singlePokemon && (
            <PokemonRow key={singlePokemon.id} pokemon={singlePokemon} />
          )}
          {!singlePokemon && (
            <Typography color="error" paddingLeft={2}>
              {singleError ? singleError.message : "No Pokemon found."}
            </Typography>
          )}
        </>
      )}
      {searchMode === "multiple" && (
        <>
          <Box padding={2} display="flex" alignItems="center">
            <TextField
              label="Comma-separated Pokemon Name"
              variant="outlined"
              value={pokemonNames}
              onChange={(e) => setPokemonNames(e.target.value)}
              fullWidth
              sx={{ marginRight: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              disabled={isArrayLoading}
            >
              {isSingleLoading ? <CircularProgress size={24} /> : "Search"}
            </Button>
          </Box>
          {pokemonArray && (
            <PokemonTable key="pokemonArray" pokemonArray={pokemonArray} />
          )}
          {pokemonArray?.length === 0 ? (
            <Typography color="error" paddingLeft={2}>
              {arrayError ? arrayError.message : "No Pokemon found."}
            </Typography>
          ) : null}
        </>
      )}
      {searchMode === "filter" && filteredPokemon && (
        <>
          <PokemonTable key="filteredPokemon" pokemonArray={filteredPokemon} />
          {filteredPokemon?.length === 0 ? (
            <Typography color="error" padding={2}>
              {typeError ? typeError.message : "No Pokemon found."}
            </Typography>
          ) : null}
        </>
      )}
    </Container>
  );
}
