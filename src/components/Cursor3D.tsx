import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const Cursor3D = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Faster, more responsive spring
  const springConfig = { damping: 18, stiffness: 500, mass: 0.3 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.onclick !== null
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter, true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter, true);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.7 : isHovering ? 1.8 : 1,
            rotate: [0, 360],
          }}
          transition={{
            scale: { type: 'spring', stiffness: 500, damping: 25 },
            rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
          }}
          className="relative w-10 h-10"
        >
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-cyan-400"
            style={{
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.8), inset 0 0 10px rgba(34, 211, 238, 0.4)',
            }}
          />

          {/* Middle pulse ring */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 0.3, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 rounded-full border border-blue-400/50"
          />

          {/* Center dot */}
          <motion.div
            animate={{
              scale: isClicking ? 0.3 : isHovering ? 0 : 1,
              opacity: isHovering ? 0 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 25,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400"
            style={{
              boxShadow: '0 0 10px rgba(34, 211, 238, 1)',
            }}
          />

          {/* Orbiting particles */}
          {[0, 90, 180, 270].map((rotation, i) => (
            <motion.div
              key={i}
              animate={{
                rotate: [rotation, rotation + 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.2,
              }}
              className="absolute inset-0"
            >
              <div
                className="absolute top-0 left-1/2 w-1 h-1 rounded-full bg-cyan-400 -translate-x-1/2"
                style={{
                  boxShadow: '0 0 6px rgba(34, 211, 238, 1)',
                }}
              />
            </motion.div>
          ))}

          {/* Hover expanding ring */}
          {isHovering && (
            <>
              <motion.div
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-cyan-400/60"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0.6 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                className="absolute inset-0 rounded-full border border-blue-400/60"
              />
            </>
          )}

          {/* Click pulse effect */}
          {isClicking && (
            <>
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 rounded-full bg-cyan-400/30"
              />
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 rounded-full border-2 border-cyan-400"
              />
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Glow trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 2 : isHovering ? 2.5 : 1.5,
            opacity: isHovering ? 0.3 : 0.15,
          }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 20,
          }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/40 to-blue-500/40 blur-2xl"
        />
      </motion.div>

      {/* Smooth follow dot - faster response */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10001]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 1.5 : 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 600,
            damping: 25,
          }}
          className="w-1 h-1 rounded-full bg-white"
          style={{
            boxShadow: '0 0 8px rgba(255, 255, 255, 1)',
          }}
        />
      </motion.div>
    </>
  );
};

export default Cursor3D;
