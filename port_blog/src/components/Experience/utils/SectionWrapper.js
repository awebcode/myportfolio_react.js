import { motion } from "framer-motion";


import { staggerContainer } from "../utils/Motion";

const StarWrapper = (Component, idName) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer()}
       
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`max-w-7xl mx-auto relative z-0`}
        style={{ width: "100%",margin:"auto",position:"relative",zIndex:"0"}}
      >
        {/* <span className="hash-span" id={idName}>
          &nbsp;
        </span> */}

        <Component />
      </motion.section>
    );
  };

export default StarWrapper;
