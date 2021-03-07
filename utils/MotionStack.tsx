import { forwardRef, Stack } from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';

const MotionStack = motion(
  forwardRef((props, ref) => {
    const chakraProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <Stack ref={ref} {...chakraProps} />;
  })
);

export default MotionStack;
