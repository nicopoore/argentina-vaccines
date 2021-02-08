import React from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import useSWR from "swr";

const fetcher = async (url: string): Promise<any> =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    cache: "default",
  }).then((res) => res.json());

const Data: React.FC<{ content: string }> = (props): JSX.Element => {
  const { data, error } = useSWR("/api/data", fetcher);

  if (error)
    return (
      <Grid
        container
        alignItems="center"
        direction="column"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>Error al recolectar datos</Grid>
        <Grid item>Error: {error.name}</Grid>
        <Grid item>Message: {error.message}</Grid>
      </Grid>
    );

  if (!data) return <p>Loading...</p>;

  const getProvinceData = (rawData): [string, string] => {
    const result = rawData.data.filter(
      (province) =>
        province["jurisdiccion_nombre"] === props.content ||
        (province["jurisdiccion_nombre"] === "CABA" &&
          props.content === "Ciudad de Buenos Aires")
    );
    if (!result[0]) return ["", ""];
    return [
      result[0]["primera_dosis_cantidad"],
      result[0]["segunda_dosis_cantidad"],
    ];
  };
  return (
    <Box
      position="absolute"
      top="50%"
      style={{ transform: "translateY(-50%)" }}
      right={400}
    >
      <Typography variant="h5">
        {props.content === "Ciudad de Buenos Aires" ? "CABA" : props.content}
      </Typography>
      <Typography>Primera dosis: {getProvinceData(data)[0]}</Typography>
      <Typography>Segunda dosis: {getProvinceData(data)[1]}</Typography>
    </Box>
  );
};

export default Data;
