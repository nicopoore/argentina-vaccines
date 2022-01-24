import { forwardRef, Box } from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';

const MotionBox = motion(
  forwardRef((props, ref) => {
    const chakraProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <Box ref={ref} {...chakraProps} />;
  })
);

export default MotionBox;
