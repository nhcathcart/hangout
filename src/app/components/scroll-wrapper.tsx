"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export interface Props {
  right?: boolean;
  top?: boolean;
  classNames?: string;
  children: ReactNode;
}

export default function ScrollWrapper({
  right,
  top,
  classNames,
  children,
}: Props) {
  const variants = {
    initial: {
      y: top ? "var(--y-from-top, 0px)" : "var(--y-from-bottom, 0px)",
      x: right ? "var(--x-from-right, 0)" : "var(--x-from-left, 0)",
      opacity: 0,
    },
    whileInView: {
      y: 0,
      x: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
      }}
      className={
        classNames +
        "max-lg:[--y-from-top:-20px] max-lg:[--y-from-bottom:20px] lg:[--x-from-right:20px] lg:[--x-from-left:-20px]"
      }
    >
      {children}
    </motion.div>
  );
}
