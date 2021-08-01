import { chakra } from "@chakra-ui/react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { BoxProps } from "@chakra-ui/react";

const MotionBox = chakra(motion.div);

const MotionDiv = ({
  motion,
  duration,
  children,
  innerRef,
  ...componentProps
}) => {
  const defaultSetting = {
    duration: 0.3,
  };
  const animations = {
    fadeIn: {
      enter: {
        opacity: 1,
        transition: { duration: duration || defaultSetting.duration },
      },
      exit: {
        opacity: 0,
        transition: { duration: duration || defaultSetting.duration },
      },
    },
    fadeOut: {
      enter: {
        opacity: 0,
        transition: { duration: duration || defaultSetting.duration },
      },
      exit: {
        opacity: 1,
        transition: { duration: duration || defaultSetting.duration },
      },
    },
    slideLeftIn: {
      enter: {
        x: 0,
        opacity: 1,
        transition: { duration: duration || defaultSetting.duration },
      },
      exit: {
        x: -150,
        opacity: 0,
        transition: { duration: duration || defaultSetting.duration },
      },
    },
    slideRightIn: {
      enter: {
        x: 0,
        opacity: 1,
        transition: { duration: duration || defaultSetting.duration },
      },
      exit: {
        x: 150,
        opacity: 0,
        transition: { duration: duration || defaultSetting.duration },
      },
    },
    slideDownIn: {
      enter: {
        y: 0,
        opacity: 1,
        transition: { duration: duration || defaultSetting.duration },
      },
      exit: {
        y: -150,
        opacity: 0,
        transition: { duration: duration || defaultSetting.duration },
      },
    },
    slideUpIn: {
      enter: {
        y: 0,
        opacity: 1,
        transition: { duration: duration || defaultSetting.duration },
      },
      exit: {
        y: 150,
        opacity: 0,
        transition: { duration: duration || defaultSetting.duration },
      },
    },
  };

  return (
    <MotionBox
      initial="exit"
      animate="enter"
      exit="exit"
      variants={animations[motion]}
      ref={innerRef}
      {...componentProps}
    >
      {children}
    </MotionBox>
  );
};

const MotionName = [
  "fadeIn",
  "fadeOut",
  "slideLeftIn",
  "slideRightIn",
  "slideDownIn",
  "slideUpIn",
];

MotionDiv.propTypes = {
  motion: PropTypes.oneOf(MotionName),
  visible: PropTypes.bool,
  scollPos: PropTypes.number,
  duration: PropTypes.number,
};

export default MotionDiv;
