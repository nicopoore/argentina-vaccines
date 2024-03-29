import { Icon } from '@chakra-ui/react';

const ZoomInIcon = (props: { [key: string]: string | number }): JSX.Element => (
  <Icon clipRule="evenodd" fillRule="evenodd" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5zm-4.5 8h4v-4h1v4h4v1h-4v4h-1v-4h-4v-1z"
      fill="currentColor"
    />
  </Icon>
);

export default ZoomInIcon;
