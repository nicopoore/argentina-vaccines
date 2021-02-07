import Head from "next/head";
import { Box, Tooltip, Typography } from "@material-ui/core";
import { Map } from "../components";
import ReactTooltip from "react-tooltip";
import { useState } from "react";

const Home = (): JSX.Element => {
  const [content, setContent] = useState("");
  return (
    <>
      <Head>
        <title>Argentina Sputnik-V</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Map setTooltipContent={setContent} />
      <Box
        position="absolute"
        top="50%"
        style={{ transform: "translateY(-50%)" }}
        left={100}
      >
        <Typography variant="h5">
          Vacunas Sputnik-V aplicadas por provincia
        </Typography>
        <Typography>
          Pasá el mouse por cada provincia para ver los datos
        </Typography>
      </Box>
      <Box
        position="absolute"
        top="50%"
        style={{ transform: "translateY(-50%)" }}
        right={400}
      >
        <Typography variant="h5">{content}</Typography>
      </Box>
    </>
  );
};

export default Home;
