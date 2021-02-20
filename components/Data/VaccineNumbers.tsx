import { Grid, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import useSWR from "swr";
import {
  provincePopulation,
  countryPopulation,
} from "../../rawData/population.json";
import { SelectionContext } from "../SelectionContext";
import { VaccineDataItem } from "../types";
import { Skeleton } from "@material-ui/lab";

interface VaccineNumbersProps {
  place: "province" | "country";
  vaccine?: string;
  dose?: 1 | 2;
}

const fetcher = async (url: string): Promise<any> =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    cache: "default",
  }).then((res) => res.json());

const VaccineNumbers: React.FC<VaccineNumbersProps> = (props): JSX.Element => {
  const { data, error } = useSWR("/api/data", fetcher);
  if (error)
    return (
      <>
        <Grid item>Error al recolectar datos</Grid>
        <Grid item>Error: {error.name}</Grid>
        <Grid item>Message: {error.message}</Grid>
      </>
    );

  if (!data)
    return (
      <>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </>
    );
  const vaccineData = data.data;
  const selectedProvince = useContext(SelectionContext);

  const formatNumbers = (num: number, type: string): string => {
    return type === "percentage"
      ? num.toLocaleString(undefined, {
          style: "percent",
          minimumFractionDigits: 2,
        })
      : num.toLocaleString("de-DE");
  };

  const formatVaccineData = (data: VaccineDataItem[]): [number, number] => {
    return data.reduce(
      (acc: [number, number], province: VaccineDataItem) => {
        if (province["jurisdiccion_codigo_indec"] === null) return acc;
        acc[0] += province["primera_dosis_cantidad"];
        acc[1] += province["segunda_dosis_cantidad"];
        return acc;
      },
      [0, 0]
    );
  };

  const getProvincePopulation = (): number => {
    const result = provincePopulation.filter(
      (province) =>
        province["jurisdiccion_nombre"] === selectedProvince ||
        (province["jurisdiccion_nombre"] === "CABA" &&
          selectedProvince === "Ciudad de Buenos Aires")
    );
    if (!result[0]) return 0;
    return result[0]["poblacion_estimada_2021"];
  };

  let population = 0;
  let vaccines = [0, 0];
  if (props.place === "province") {
    population = getProvincePopulation();
    const filteredData = vaccineData.filter(
      (province: VaccineDataItem) =>
        province["jurisdiccion_nombre"] === selectedProvince ||
        (province["jurisdiccion_nombre"] === "CABA" &&
          selectedProvince === "Ciudad de Buenos Aires")
    );
    vaccines = formatVaccineData(filteredData);
  } else if (props.place === "country") {
    population = countryPopulation;
    vaccines = formatVaccineData(vaccineData);
  }

  return (
    <>
      <Typography>
        1ra dosis: {formatNumbers(vaccines[0], "number")} (
        {formatNumbers(vaccines[0] / population, "percentage")})
      </Typography>
      <Typography>
        2da dosis: {formatNumbers(vaccines[1], "number")} (
        {formatNumbers(vaccines[1] / population, "percentage")})
      </Typography>
    </>
  );
};

export default VaccineNumbers;
