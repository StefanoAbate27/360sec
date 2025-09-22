import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface Camera3DProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export function Camera3D({ className = '', size = 'md', animated = true }: Camera3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64'
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !animated) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      
      const rotateX = deltaY * 10;
      const rotateY = deltaX * 10;
      
      container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [animated]);

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <div 
        ref={containerRef}
        className="relative w-full h-full transform-3d transition-transform duration-300 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Base de la cámara */}
        <motion.div 
          className="absolute inset-0 rounded-full gradient-primary shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ 
            transform: 'translateZ(0px)',
            background: 'linear-gradient(135deg, #2B7CE9 0%, #1E40AF 50%, #1E3A8A 100%)'
          }}
        />
        
        {/* Cuerpo principal de la cámara */}
        <motion.div 
          className="absolute top-4 left-4 right-4 bottom-4 bg-white rounded-full shadow-inner"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ transform: 'translateZ(20px)' }}
        >
          {/* Lente principal */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8 bg-gray-900 rounded-full shadow-xl"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            style={{ transform: 'translateZ(30px)' }}
          >
            {/* Cristal del lente */}
            <motion.div 
              className="absolute top-2 left-2 right-2 bottom-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"
              animate={animated ? { 
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 20px rgba(43, 124, 233, 0.3)',
                  '0 0 40px rgba(43, 124, 233, 0.6)',
                  '0 0 20px rgba(43, 124, 233, 0.3)'
                ]
              } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: 'translateZ(40px)' }}
            >
              {/* Reflejo del lente */}
              <div className="absolute top-1 left-1 w-3 h-3 bg-white/60 rounded-full blur-sm" />
            </motion.div>
            
            {/* Indicador LED */}
            <motion.div 
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
              animate={animated ? { 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1]
              } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ transform: 'translateZ(50px)' }}
            />
          </motion.div>
          
          {/* Detalles adicionales */}
          <motion.div 
            className="absolute top-3 right-3 w-2 h-2 bg-gray-400 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ transform: 'translateZ(25px)' }}
          />
          
          <motion.div 
            className="absolute bottom-3 left-3 w-1 h-4 bg-gray-300 rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{ transform: 'translateZ(25px)' }}
          />
        </motion.div>
        
        {/* Efectos de brillo y sombra */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ transform: 'translateZ(60px)' }}
        />
        
        {/* Partículas flotantes de datos */}
        {animated && Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              top: `${20 + (i * 15)}%`,
              left: `${80 + (i % 2) * 10}%`,
              transform: 'translateZ(70px)'
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Sombra proyectada */}
      <motion.div 
        className="absolute -bottom-4 left-1/2 w-24 h-8 bg-black/20 rounded-full blur-md -translate-x-1/2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </div>
  );
}

export function FloatingCameras() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Cámara flotante 1 */}
      <motion.div
        className="absolute top-20 right-20"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Camera3D size="sm" className="opacity-20" />
      </motion.div>
      
      {/* Cámara flotante 2 */}
      <motion.div
        className="absolute bottom-32 left-16"
        animate={{
          y: [0, -20, 0],
          rotate: [0, -3, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <Camera3D size="sm" className="opacity-15" />
      </motion.div>
      
      {/* Cámara flotante 3 */}
      <motion.div
        className="absolute top-1/2 right-8"
        animate={{
          y: [0, -25, 0],
          rotate: [0, 8, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      >
        <Camera3D size="sm" className="opacity-10" />
      </motion.div>
    </div>
  );
}