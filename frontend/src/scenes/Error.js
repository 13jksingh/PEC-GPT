import React from "react";
import { Typography, Grid } from "@mui/material";

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "16px",
    textAlign: "center",
  },
  logo: {
    marginBottom: "24px",
    width: "200px",
  },
  title: {
    marginBottom: "16px",
  },
  subtitle: {
    marginBottom: "24px",
  },
};

const ErrorPage = () => {
  return (
    <Grid container style={styles.root}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
      <Typography variant="h1" style={styles.title}>
          AEROCONNECT
        </Typography>
        <Typography variant="h3" style={styles.title}>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1" style={styles.subtitle}>
          We're sorry, but it looks like the page you are looking for does not exist.
        </Typography>
        {/* <Button variant="contained" color="primary" href="/dashboard">
          Return to Dashboard
        </Button> */}
      </Grid>
    </Grid>
  );
};

export default ErrorPage;