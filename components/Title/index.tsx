import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Title: React.FC = (): JSX.Element => (
  <Box pl={4} w="100%">
    <Text as="h1" fontSize="3xl" m={2} mb={-3}>
      Argentina vacunada
    </Text>
  </Box>
);

export default Title;
