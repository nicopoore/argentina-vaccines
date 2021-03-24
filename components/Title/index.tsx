// Dependencies
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
  useBreakpointValue,
} from '@chakra-ui/react';
import { QuestionOutlineIcon } from '@chakra-ui/icons';

// Components
import InfoModal from './InfoModal';

interface Props {
  isSimplified: boolean;
  setIsSimplified: (_: boolean) => void;
}

const Title: React.FC<Props> = (props): JSX.Element => {
  const [infoIsOpen, setInfoIsOpen] = useState(false);

  const handleOpen = (): void => {
    setInfoIsOpen(true);
  };

  const handleClose = (): void => {
    setInfoIsOpen(false);
  };

  const responsiveSize = useBreakpointValue({
    base: 'xs',
    md: 'sm',
    '2xl': 'md',
  });

  return (
    <>
      <Flex alignItems="center" justify="space-between" m="auto" w="90%" wrap="wrap">
        <Text as="h1" fontSize="3xl" fontWeight="bold" m={2}>
          Argentina vacunada
        </Text>
        <ButtonGroup isAttached size={responsiveSize}>
          <Button
            colorScheme={props.isSimplified ? 'blue' : undefined}
            onClick={() => props.setIsSimplified(true)}
          >
            Vista simplificada
          </Button>
          <Button
            colorScheme={props.isSimplified ? undefined : 'blue'}
            onClick={() => props.setIsSimplified(false)}
          >
            Vista completa
          </Button>
        </ButtonGroup>
        <Stack alignItems="center" direction="row" justify="flex-end">
          <Link
            isExternal
            color="gray.500"
            fontSize={responsiveSize}
            href="https://github.com/nicopoore/argentina-vaccines"
            textAlign="right"
          >
            Nicolás Poore
          </Link>
          <Tooltip label="Ayuda / Más información">
            <IconButton
              aria-label="Help"
              icon={<QuestionOutlineIcon />}
              size={responsiveSize}
              onClick={handleOpen}
            />
          </Tooltip>
        </Stack>
      </Flex>
      <InfoModal handleClose={handleClose} isOpen={infoIsOpen} />
    </>
  );
};

export default Title;
