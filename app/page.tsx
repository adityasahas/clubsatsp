"use client";
import { title, subtitle } from "@/components/primitives";
import { AiOutlineArrowDown } from "react-icons/ai";
import ClubCards from "@/components/clubs";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

function splitText(text: string) {
	return text.split("").map((char: string, index: number) => {
	  if (char === " ") {
		return <span key={index}>{char}</span>;
	  }
  
	  return (
		<motion.span key={index} variants={childVariants}>
		  {char}
		</motion.span>
	  );
	});
  }
  
  

export default function Home() {
  return (
    <div>
      <section className="h-screen flex flex-col justify-between items-center py-8 md:py-10">
        <motion.div
          className="inline-block max-w-lg text-center mt-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className={title()} variants={containerVariants}>
            {splitText("Sierra Pacific High School ")}
          </motion.h1>
          <motion.h1
            className={title({ color: "violet" })}
            variants={containerVariants}
          >
            {splitText("clubs")}
          </motion.h1>
          <motion.h2
            className={subtitle({ class: "mt-4" })}
            variants={containerVariants}
          >
            {splitText("check out the clubs at sierra pacific")}
          </motion.h2>
        </motion.div>
        <motion.div
          className="mb-10 flex flex-row justify-center items-center text-3xl"
          variants={childVariants}
          initial="hidden"
          animate="visible"
        >
          {splitText("scroll")}
          <AiOutlineArrowDown />
        </motion.div>
      </section>
      <ClubCards />
    </div>
  );
}
