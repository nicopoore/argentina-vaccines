import React from "react";
import {
  Typography,
  Grid,
  CircularProgress,
  Paper,
  Card,
} from "@material-ui/core";
import useSWR from "swr";
import { SputnikDataItem } from "./types";

const fetcher = async (url: string): Promise<any> =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    cache: "default",
  }).then((res) => res.json());

const populationData = [
  {
    jurisdiccion_codigo_indec: 6,
    jurisdiccion_nombre: "Buenos Aires",
    poblacion_estimada_2021: 17709598,
  },
  {
    jurisdiccion_codigo_indec: 2,
    jurisdiccion_nombre: "CABA",
    poblacion_estimada_2021: 3078836,
  },
  {
    jurisdiccion_codigo_indec: 10,
    jurisdiccion_nombre: "Catamarca",
    poblacion_estimada_2021: 418991,
  },
  {
    jurisdiccion_codigo_indec: 22,
    jurisdiccion_nombre: "Chaco",
    poblacion_estimada_2021: 1216247,
  },
  {
    jurisdiccion_codigo_indec: 26,
    jurisdiccion_nombre: "Chubut",
    poblacion_estimada_2021: 629181,
  },
  {
    jurisdiccion_codigo_indec: 18,
    jurisdiccion_nombre: "Corrientes",
    poblacion_estimada_2021: 1130320,
  },
  {
    jurisdiccion_codigo_indec: 14,
    jurisdiccion_nombre: "Córdoba",
    poblacion_estimada_2021: 3798261,
  },
  {
    jurisdiccion_codigo_indec: 30,
    jurisdiccion_nombre: "Entre Ríos",
    poblacion_estimada_2021: 1398510,
  },
  {
    jurisdiccion_codigo_indec: 34,
    jurisdiccion_nombre: "Formosa",
    poblacion_estimada_2021: 610019,
  },
  {
    jurisdiccion_codigo_indec: 38,
    jurisdiccion_nombre: "Jujuy",
    poblacion_estimada_2021: 779212,
  },
  {
    jurisdiccion_codigo_indec: 42,
    jurisdiccion_nombre: "La Pampa",
    poblacion_estimada_2021: 361394,
  },
  {
    jurisdiccion_codigo_indec: 46,
    jurisdiccion_nombre: "La Rioja",
    poblacion_estimada_2021: 398648,
  },
  {
    jurisdiccion_codigo_indec: 50,
    jurisdiccion_nombre: "Mendoza",
    poblacion_estimada_2021: 2010363,
  },
  {
    jurisdiccion_codigo_indec: 54,
    jurisdiccion_nombre: "Misiones",
    poblacion_estimada_2021: 1274992,
  },
  {
    jurisdiccion_codigo_indec: 58,
    jurisdiccion_nombre: "Neuquén",
    poblacion_estimada_2021: 672461,
  },
  {
    jurisdiccion_codigo_indec: 62,
    jurisdiccion_nombre: "Río Negro",
    poblacion_estimada_2021: 757052,
  },
  {
    jurisdiccion_codigo_indec: 66,
    jurisdiccion_nombre: "Salta",
    poblacion_estimada_2021: 1441988,
  },
  {
    jurisdiccion_codigo_indec: 70,
    jurisdiccion_nombre: "San Juan",
    poblacion_estimada_2021: 789489,
  },
  {
    jurisdiccion_codigo_indec: 74,
    jurisdiccion_nombre: "San Luis",
    poblacion_estimada_2021: 514610,
  },
  {
    jurisdiccion_codigo_indec: 78,
    jurisdiccion_nombre: "Santa Cruz",
    poblacion_estimada_2021: 374756,
  },
  {
    jurisdiccion_codigo_indec: 82,
    jurisdiccion_nombre: "Santa Fe",
    poblacion_estimada_2021: 3563390,
  },
  {
    jurisdiccion_codigo_indec: 86,
    jurisdiccion_nombre: "Santiago del Estero",
    poblacion_estimada_2021: 988245,
  },
  {
    jurisdiccion_codigo_indec: 94,
    jurisdiccion_nombre: "Tierra del Fuego",
    poblacion_estimada_2021: 177697,
  },
  {
    jurisdiccion_codigo_indec: 90,
    jurisdiccion_nombre: "Tucumán",
    poblacion_estimada_2021: 1714487,
  },
];

const countryPopulation = 45808747;

const Data: React.FC<{ content: string }> = (props): JSX.Element => {
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
      <Grid item>
        <CircularProgress />
      </Grid>
    );

  const getProvinceVaccines = (): [number, number] => {
    const results = data.data.filter(
      (province) =>
        province["jurisdiccion_nombre"] === props.content ||
        (province["jurisdiccion_nombre"] === "CABA" &&
          props.content === "Ciudad de Buenos Aires")
    );
    const primeraDosis = results.reduce((acc, result) => {
      acc += result["primera_dosis_cantidad"];
      return acc;
    }, 0);
    const segundaDosis = results.reduce((acc, result) => {
      acc += result["segunda_dosis_cantidad"];
      return acc;
    }, 0);
    return [primeraDosis, segundaDosis];
  };

  const getCountryVaccines = (): [number, number] => {
    const result = data.data.reduce(
      (acc: [number, number], province: SputnikDataItem) => {
        if (province["jurisdiccion_codigo_indec"] === null) return acc;

        acc[0] += province["primera_dosis_cantidad"];
        acc[1] += province["segunda_dosis_cantidad"];

        return acc;
      },
      [0, 0]
    );
    return result;
  };

  const getProvincePopulation = (): number => {
    const result = populationData.filter(
      (province) =>
        province["jurisdiccion_nombre"] === props.content ||
        (province["jurisdiccion_nombre"] === "CABA" &&
          props.content === "Ciudad de Buenos Aires")
    );
    if (!result[0]) return 0;
    return result[0]["poblacion_estimada_2021"];
  };

  const formatNumbers = (num: number, type: string): string => {
    return type === "percentage"
      ? num.toLocaleString(undefined, {
          style: "percent",
          minimumFractionDigits: 2,
        })
      : num.toLocaleString("de-DE");
  };

  const renderNumbers = (
    type: "vaccine" | "population",
    place: "province" | "country",
    dose?: 1 | 2
  ): string => {
    if (place === "province") {
      const provincePopulation = getProvincePopulation();
      if (type === "vaccine") {
        const provinceVaccines = getProvinceVaccines()[dose - 1];
        return `${dose === 1 ? "1ra" : "2da"} dosis: ${formatNumbers(
          provinceVaccines,
          "number"
        )} (${formatNumbers(
          provinceVaccines / provincePopulation,
          "percentage"
        )})`;
      } else if (type === "population") {
        return `Población: ${formatNumbers(provincePopulation, "number")}`;
      }
    } else if (place === "country") {
      if (type === "vaccine") {
        const countryVaccines = getCountryVaccines()[dose - 1];
        return `${dose === 1 ? "1ra" : "2da"} dosis: ${formatNumbers(
          countryVaccines,
          "number"
        )} (${formatNumbers(
          countryVaccines / countryPopulation,
          "percentage"
        )})`;
      } else if (type === "population") {
        return `Población: ${formatNumbers(countryPopulation, "number")}`;
      }
    }
  };

  return (
    <>
      <Grid item xs={6} sm={12}>
        <Typography variant="h6">
          {props.content === "Ciudad de Buenos Aires" ? "CABA" : props.content}
        </Typography>
        <Typography>{renderNumbers("vaccine", "province", 1)}</Typography>
        <Typography>{renderNumbers("vaccine", "province", 2)}</Typography>
        <Typography>{renderNumbers("population", "province")}</Typography>
      </Grid>
      <Grid item xs={6} sm={12}>
        <Typography variant="h6">Argentina (total)</Typography>
        <Typography>{renderNumbers("vaccine", "country", 1)}</Typography>
        <Typography>{renderNumbers("vaccine", "country", 2)}</Typography>
        <Typography>{renderNumbers("population", "country")}</Typography>
      </Grid>
    </>
  );
};

export default Data;
