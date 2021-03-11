import React, { useState } from 'react';
import {
  Stack,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Text,
  Link,
  Tooltip,
} from '@chakra-ui/react';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import InfoModal from './InfoModal/index';

const Title: React.FC = (): JSX.Element => {
  const [infoIsOpen, setInfoIsOpen] = useState(false);

  const handleOpen = (): void => {
    setInfoIsOpen(() => true);
  };

  const handleClose = (): void => {
    setInfoIsOpen(() => false);
  };

  return (
    <>
      <Flex alignItems="center" justify="space-between" m="auto" w="90%">
        <Text as="h1" fontSize="3xl" fontWeight="bold" m={2}>
          Argentina vacunada
        </Text>
        <ButtonGroup isAttached>
          <Button>Vista simplificada</Button>
          <Button>Vista completa</Button>
        </ButtonGroup>
        <Stack alignItems="center" direction="row">
          <Link isExternal color="gray.500" href="https://github.com/nicopoore/argentina-vaccines">
            Creado por Nicolás Poore
          </Link>
          <Tooltip label="Ayuda">
            <IconButton aria-label="Help" icon={<QuestionOutlineIcon />} onClick={handleOpen} />
          </Tooltip>
        </Stack>
      </Flex>
      <InfoModal handleClose={handleClose} isOpen={infoIsOpen} />
    </>
  );
};

export default Title;
