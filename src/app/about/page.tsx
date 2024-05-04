import { Container, Typography } from "@mui/material";

export default function About() {
  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h3">About</Typography>
      <Typography variant="body1">
        This is a simple project to demonstrate how to use tRPC with Next.js
      </Typography>
    </Container>
  );
}
