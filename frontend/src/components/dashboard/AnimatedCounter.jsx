import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const AnimatedCounter = ({ end = 100, duration = 1000, prefix = '', suffix = '', fontSize = '2.5rem' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const startValue = 0;
    const endValue = end;

    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOut = (t) => 1 - Math.pow(1 - t, 3);
      const currentCount = Math.floor(easeOut(progress) * (endValue - startValue) + startValue);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return (
    <Box
      component="span"
      sx={{
        fontSize,
        fontWeight: 700,
        background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        transition: 'all 0.3s ease',
        display: 'inline',
      }}
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </Box>
  );
};

export default AnimatedCounter;
