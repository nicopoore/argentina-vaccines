import { forwardRef, Flex } from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';

const MotionFlex = motion.custom(
  forwardRef((props, ref) => {
    const chakraProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <Flex ref={ref} {...chakraProps} />;
  })
);

export default MotionFlex;
