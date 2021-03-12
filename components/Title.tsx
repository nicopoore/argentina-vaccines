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

interface Props {
  isSimplified: boolean;
  setIsSimplified: (_) => void;
}

const Title: React.FC<Props> = (props): JSX.Element => {
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
          <Button
            colorScheme={props.isSimplified ? 'blue' : undefined}
            onClick={() => props.setIsSimplified(() => true)}
          >
            Vista simplificada
          </Button>
          <Button
            colorScheme={props.isSimplified ? undefined : 'blue'}
            onClick={() => props.setIsSimplified(() => false)}
          >
            Vista completa
          </Button>
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
