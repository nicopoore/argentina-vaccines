import {
  Box,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React from 'react';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const TierraDelFuegoModal: React.FC<Props> = (props): JSX.Element => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Podés sacar turno para vacunarte</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={3}>
            <Text fontWeight="bold">En Ushuaia</Text>
            <Text>
              Llamá al{' '}
              <Link color="teal.400" href="tel:08003330358">
                {' '}
                0800-333-0358
              </Link>
            </Text>
            <Text>
              Enviá un WhatsApp al{' '}
              <Link
                isExternal
                color="teal.400"
                href="https://api.whatsapp.com/send?phone=5492901470756"
              >
                02901-470756
              </Link>
            </Text>
          </Box>
          <Box mb={3}>
            <Text fontWeight="bold">En Río Grande y Tolhuin</Text>
            <Text>
              Llamá al{' '}
              <Link color="teal.400" href="tel:542964579195">
                02964-579195
              </Link>
            </Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TierraDelFuegoModal;
