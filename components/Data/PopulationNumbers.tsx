import { Typography } from "@material-ui/core";
import React, { useContext } from "react";
import {
  provincePopulation,
  countryPopulation,
} from "../../rawData/population.json";
import { SelectionContext } from "../SelectionContext";

const PopulationNumbers: React.FC<{
  place: "province" | "country";
}> = (props): JSX.Element => {
  const selectedProvince = useContext(SelectionContext);

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

  const population =
    props.place === "province"
      ? getProvincePopulation().toLocaleString("de-DE")
      : countryPopulation.toLocaleString("de-DE");

  return <Typography>Población: {population}</Typography>;
};

export default PopulationNumbers;
