// Dependencies
import React from 'react';
import {
  Modal,
  Text,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Link,
  chakra,
  Flex,
} from '@chakra-ui/react';

// Utils
import { outsideLinks, instructions } from 'utils/staticData.json';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const InfoModal: React.FC<Props> = (props): JSX.Element => {
  return (
    <Modal isOpen={props.isOpen} size="2xl" onClose={props.handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Argentina Vacunada</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={6}>
            <Text fontWeight="bold">Instrucciones</Text>
            {instructions.map(instructionsItem => (
              <Text key={instructions.indexOf(instructionsItem)} mt={2}>
                {instructionsItem[0]}
                <chakra.span color="cyan.400" fontWeight="bold">
                  {instructionsItem[1]}
                </chakra.span>{' '}
                {instructionsItem[2]}
              </Text>
            ))}
          </Box>
          <Flex wrap="wrap">
            {outsideLinks.map(outsideLinksObject => (
              <Box key={outsideLinksObject.name} mb={3} w="50%">
                <Text fontWeight="bold">{outsideLinksObject.name}</Text>
                {outsideLinksObject.links.map(outsideLink => (
                  <Text key={outsideLink.name}>
                    <Link isExternal color="teal.400" href={outsideLink.href}>
                      {outsideLink.name}
                    </Link>
                  </Text>
                ))}
              </Box>
            ))}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InfoModal;
