// Dependencies
import React from 'react';
import { Box, Icon, IconButton, Tooltip } from '@chakra-ui/react';

interface Props {
  YAxisIsScaled: boolean;
  handleClick: () => void;
}

const ZoomInIcon = (props: { [key: string]: string | number }): JSX.Element => (
  <Icon clipRule="evenodd" fillRule="evenodd" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5zm-4.5 8h4v-4h1v4h4v1h-4v4h-1v-4h-4v-1z"
      fill="currentColor"
    />
  </Icon>
);

const ZoomOutIcon = (props: { [key: string]: string | number }): JSX.Element => (
  <Icon clipRule="evenodd" fillRule="evenodd" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5zm-4.5 8h9v1h-9v-1z"
      fill="currentColor"
    />
  </Icon>
);

const ScaleButton: React.FC<Props> = (props): JSX.Element => {
  return (
    <Box position="absolute" right={2} top={2}>
      <Tooltip label={props.YAxisIsScaled ? 'Normalizar eje Y' : 'Ajustar eje Y'} placement="top">
        <IconButton
          aria-label={props.YAxisIsScaled ? 'Normalizar eje Y' : 'Ajustar eje Y'}
          icon={props.YAxisIsScaled ? <ZoomOutIcon /> : <ZoomInIcon />}
          size="sm"
          onClick={props.handleClick}
        />
      </Tooltip>
    </Box>
  );
};

export default ScaleButton;
