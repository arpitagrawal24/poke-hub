import { Container, Typography } from "@mui/material";

export default function Contact() {
  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h3">Contact</Typography>
      <Typography variant="body1">
        You can contact us at{" "}
        <span>
          <a href="mailto:arpitagrawal2402@gmail.com">arpitagrawal2402@gmail.com</a>
        </span>
      </Typography>
    </Container>
  );
}
