import { motion } from "framer-motion";
import React from "react";

export default function ThreeDotsWave({
  dotColor,
  dotSize,
  dotContainerWidth,
  dotContainerHeight,
}) {
  const LoadingDot = {
    display: "block",
    width: dotSize ? dotSize : "2rem",
    height: dotSize ? dotSize : "2rem",
    backgroundColor: dotColor ? dotColor : "white",
    borderRadius: "50%",
  };

  const LoadingContainer = {
    width: dotContainerWidth ? dotContainerWidth : "10rem",
    height: dotContainerHeight ? dotContainerHeight : "5rem",
    display: "flex",
    justifyContent: "space-around",
  };

  const ContainerVariants = {
    initial: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const DotVariants = {
    initial: {
      y: "0%",
    },
    animate: {
      y: "100%",
    },
  };

  const DotTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeInOut",
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        style={LoadingContainer}
        variants={ContainerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
        />
        <motion.span
          style={LoadingDot}
          variants={DotVariants}
          transition={DotTransition}
        />
      </motion.div>
    </div>
  );
}
