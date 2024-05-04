import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "10px 0",
        textAlign: "center",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body2">&copy; 2024 PokeHub. All rights reserved.</Typography>
    </Box>
  );
};

export default Footer;
