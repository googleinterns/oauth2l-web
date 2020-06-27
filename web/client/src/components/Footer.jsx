import React from "react";
import { Link, Typography } from "@material-ui/core/";

export default function Footer() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="https://google.com/">
        Made by the 2020 SOPAA intern team!
      </Link>
    </Typography>
  );
}
