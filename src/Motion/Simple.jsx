// import React from "react";
// import { motion } from "framer-motion";

// export default function RebelNationStory() {
//   const message = "We are the bad boy of the nation.";
//   const wordArray = message.split("");

//   const shapeVariants = {
//     initial: { opacity: 0, y: "-100vh" },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { delay: 1, duration: 1, type: "spring" },
//     },
//   };

//   return (
//     <>
//       {/* Scene 1 - The Awakening */}
//       <motion.div
//         className="bg-red-500 border w-32 h-32 rounded-full mx-auto mt-10"
//         initial={{ opacity: 0, scale: 0.5 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1 }}
//       />

//       {/* Scene 2 - Transformation Begins */}
//       <motion.div
//         className="bg-blue-500 border w-32 h-32 m-4 mx-auto"
//         animate={{
//           borderRadius: ["20%", "20%", "50%", "50%", "20%"],
//           rotate: [0, 90, 180, 270, 0],
//           scale: [1, 1, 2, 1, 1],
//         }}
//         transition={{ duration: 1.8 }}
//       />

//       {/* Scene 3 - Call to Action */}
//       <motion.button
//         className="bg-black text-white p-2 border m-4 rounded-md block mx-auto"
//         whileTap={{ scale: 0.5 }}
//         whileHover={{ scale: 1.2, transition: { yoyo: Infinity } }}
//       >
//         Click Me
//       </motion.button>

//       {/* Scene 4 - The Message Spreads */}
//       <div className="text-2xl m-4 text-center font-semibold">
//         {wordArray.map((char, index) => (
//           <motion.span
//             key={index}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.4, delay: index * 0.05 }}
//           >
//             {char}
//           </motion.span>
//         ))}
//       </div>

//       {/* Scene 5 - The March Begins (3 styles) */}
//       <motion.div
//         className="m-4 p-4 bg-gray-200 rounded shadow w-1/2 mx-auto"
//         initial={{ opacity: 0, x: "-100vw" }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 2 }}
//       >
//         <h1 className="text-xl font-bold">March Begins</h1>
//         <p>The journey of change has started.</p>
//       </motion.div>

//       <motion.div
//         className="m-4 p-4 bg-gray-300 rounded shadow w-1/2 mx-auto"
//         initial={{ opacity: 0, x: "-100vw" }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ type: "spring", bounce: 0.6, duration: 2 }}
//       >
//         <h1 className="text-xl font-bold">The People Rise</h1>
//         <p>With every bounce, the power rises.</p>
//       </motion.div>

//       <motion.div
//         className="m-4 p-4 bg-gray-400 rounded shadow w-1/2 mx-auto"
//         initial={{ opacity: 0, x: "-100vw" }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ type: "spring", stiffness: 80, duration: 2.5 }}
//       >
//         <h1 className="text-xl font-bold">Together We Stand</h1>
//         <p>Unity leads to strength and change.</p>
//       </motion.div>

//       {/* Scene 6 - The Symbol Appears */}
//       <motion.div
//         variants={shapeVariants}
//         initial="initial"
//         animate="animate"
//         className="bg-green-800 w-32 h-32 rounded border m-4 mx-auto"
//       />

//       {/* Final Scene - Peace in Power */}
//       <motion.div
//         className="bg-red-500 w-16 h-16 rounded-full border m-10 mx-auto"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 5, duration: 1.5 }}
//       />
//     </>
//   );
// }
import React from "react";
import { motion } from "framer-motion";

export default function RebelNationStory() {
  // The core message of the rebel nation
  const message = "We are the bad boy of the nation.";
  // Split the message into individual characters for a typing effect
  const wordArray = message.split("");

  // --- Animation Variants ---
  // These are reusable animation definitions that can be applied to motion components.

  // Variant for the "Symbol Appears" scene
  const symbolVariants = {
    // Initial state: invisible and off-screen (top)
    hidden: { opacity: 0, y: "-100vh" },
    // Animation state: visible and slides into place
    visible: {
      opacity: 1,
      y: 0,
      // Spring transition for a bouncy feel
      transition: {
        delay: 1, // Start 1 second after the component mounts
        duration: 1,
        type: "spring",
        stiffness: 100, // How stiff the spring is (higher = faster, more rigid)
        damping: 10, // How much the spring oscillates (lower = more oscillation)
      },
    },
  };

  // Variant for the "Peace in Power" scene
  const finalSceneVariants = {
    // Initial state: small and invisible
    initial: { opacity: 0, scale: 0.2 },
    // Animation state: grows and becomes visible, then pulsates
    animate: {
      opacity: 1,
      scale: [0.2, 1, 0.9, 1.1, 1], // Keyframes for scale: small -> normal -> slightly smaller -> slightly larger -> normal
      transition: {
        delay: 5, // Starts much later to signify the end
        duration: 2,
        ease: "easeInOut", // Smooth start and end
        repeat: Infinity, // Keep pulsating forever
        repeatType: "mirror", // Play animation forward, then backward
      },
    },
  };

  return (
    // React Fragment to return multiple elements
    <>
      {/*
        Scene 1: The Awakening
        A red circle appears, symbolizing the initial spark or beginning.
      */}
      <motion.div
        className="bg-red-500 border w-32 h-32 rounded-full mx-auto mt-10 shadow-lg"
        initial={{ opacity: 0, scale: 0.5, rotate: 0 }} // Starts small and hidden, no rotation
        animate={{ opacity: 1, scale: 1, rotate: 360 }} // Grows to full size and rotates once
        transition={{
          duration: 1.5, // Slower transition for a more impactful awakening
          type: "spring",
          stiffness: 120,
          damping: 8,
        }}
      />

      {/*
        Scene 2: Transformation Begins
        A blue square transforms its shape, size, and rotation, representing change.
      */}
      <motion.div
        className="bg-blue-500 border w-32 h-32 m-4 mx-auto shadow-lg"
        animate={{
          borderRadius: ["20%", "20%", "50%", "50%", "20%"], // Shape morph: square -> circle -> square
          rotate: [0, 90, 180, 270, 360], // Full rotation
          scale: [1, 1.2, 0.8, 1.3, 1], // Scale changes: normal -> slightly larger -> smaller -> even larger -> normal
          opacity: [0.5, 1, 0.7, 1, 1], // Opacity pulses during transformation
        }}
        transition={{
          duration: 2.5, // Longer duration for complex transformation
          ease: "easeInOut",
          repeat: 1, // Plays once after initial render
          delay: 0.5, // Starts slightly after Scene 1
        }}
      />

      {/*
        Scene 3: Call to Action
        An interactive button that scales down on tap and pulsates on hover.
      */}
      <motion.button
        className="bg-black text-white p-3 border m-4 rounded-lg block mx-auto text-lg font-medium shadow-xl"
        whileTap={{ scale: 0.9, backgroundColor: "#4a4a4a" }} // Smaller scale and darker background on tap
        whileHover={{
          scale: 1.1, // Slightly larger on hover
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.4)", // Add a subtle shadow on hover
          transition: {
            yoyo: Infinity, // Repeats animation back and forth forever
            duration: 0.5,
          },
        }}
        initial={{ opacity: 0, y: 20 }} // Starts slightly below and hidden
        animate={{ opacity: 1, y: 0 }} // Slides up and becomes visible
        transition={{ delay: 2, duration: 0.8 }} // Appears after previous scenes
      >
        Ignite the Spark!
      </motion.button>

      {/*
        Scene 4: The Message Spreads
        The message "We are the bad boy of the nation." types out character by character.
      */}
      <div className="text-3xl m-6 text-center font-bold text-gray-800 tracking-wide">
        {wordArray.map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: -20 }} // Starts hidden and slightly above
            animate={{ opacity: 1, y: 0 }} // Becomes visible and moves to position
            transition={{
              duration: 0.3, // Duration for each character's animation
              delay: 2.8 + index * 0.08, // Staggered delay for typing effect
              ease: "easeOut",
            }}
            className="inline-block" // Ensures each span takes up space for animation
          >
            {char === " " ? "\u00A0" : char}{" "}
            {/* Render space character correctly */}
          </motion.span>
        ))}
      </div>

      {/*
        Scene 5: The March Begins (3 styles)
        Three distinct sections slide in from the left, each with a different animation style,
        representing different aspects of a movement.
      */}
      <motion.div
        className="m-4 p-5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-xl w-3/4 md:w-1/2 mx-auto border-l-4 border-purple-500"
        initial={{ opacity: 0, x: "-100vw" }} // Starts off-screen to the left
        animate={{ opacity: 1, x: 0 }} // Slides into view
        transition={{ duration: 1.5, delay: 4 }} // Smooth slide-in
      >
        <h2 className="text-2xl font-extrabold text-purple-700 mb-2">
          The March Begins
        </h2>
        <p className="text-gray-700">
          The journey of change has started, steady and resolute.
        </p>
      </motion.div>

      <motion.div
        className="m-4 p-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg shadow-xl w-3/4 md:w-1/2 mx-auto border-l-4 border-indigo-500"
        initial={{ opacity: 0, x: "-100vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          bounce: 0.7, // More bounce for a dynamic feel
          duration: 1.8,
          delay: 4.5, // Staggered appearance
        }}
      >
        <h2 className="text-2xl font-extrabold text-indigo-700 mb-2">
          The People Rise
        </h2>
        <p className="text-gray-700">
          With every step, the energy of the people pulsates, growing stronger.
        </p>
      </motion.div>

      <motion.div
        className="m-4 p-5 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg shadow-xl w-3/4 md:w-1/2 mx-auto border-l-4 border-teal-500"
        initial={{ opacity: 0, x: "-100vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 100, // Slightly stiffer spring
          damping: 12,
          duration: 2,
          delay: 5, // Staggered appearance
        }}
      >
        <h2 className="text-2xl font-extrabold text-teal-700 mb-2">
          Together We Stand
        </h2>
        <p className="text-gray-700">
          Unity leads to strength, and with strength, comes inevitable change.
        </p>
      </motion.div>

      {/*
        Scene 6: The Symbol Appears
        A green symbol drops from above, representing a new emblem or ideology.
        Uses the predefined `symbolVariants`.
      */}
      <motion.div
        variants={symbolVariants} // Applying the defined variants
        initial="hidden" // Start with the "hidden" state
        animate="visible" // Animate to the "visible" state
        className="bg-green-700 w-40 h-40 rounded-xl border-4 border-green-900 m-8 mx-auto shadow-2xl" // Larger and more prominent
      />

      {/*
        Final Scene: Peace in Power
        A small red circle appears and subtly pulsates, signifying calm strength
        and the lasting impact of the "rebel nation."
        Uses the predefined `finalSceneVariants`.
      */}
      <motion.div
        variants={finalSceneVariants} // Applying the defined variants
        initial="initial"
        animate="animate"
        className="bg-red-600 w-20 h-20 rounded-full border-4 border-red-800 m-12 mx-auto shadow-2xl" // Slightly larger, more pronounced
      />
    </>
  );
}
