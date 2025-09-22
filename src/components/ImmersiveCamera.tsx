import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import cameraImage from 'figma:asset/65fd68b10463053dc050a05d242881e45c884be8.png';
import { Eye, Wifi, Shield, Zap, AlertTriangle, Volume2, Camera, Scan } from 'lucide-react';

interface ImmersiveCameraProps {
  className?: string;
}

export function ImmersiveCamera({ className = '' }: ImmersiveCameraProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedObjects, setDetectedObjects] = useState<Array<{id: number, x: number, y: number, type: string}>>([]);
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    // Simular rotación continua
    const rotationInterval = setInterval(() => {
      setRotationAngle(prev => (prev + 1) % 360);
    }, 50);

    // Simular detección de objetos
    const detectionInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newObject = {
          id: Date.now(),
          x: Math.random() * 300 + 50,
          y: Math.random() * 300 + 50,
          type: ['person', 'vehicle', 'package'][Math.floor(Math.random() * 3)]
        };
        setDetectedObjects(prev => [...prev.slice(-2), newObject]);
        
        // Remover objeto después de 3 segundos
        setTimeout(() => {
          setDetectedObjects(prev => prev.filter(obj => obj.id !== newObject.id));
        }, 3000);
      }
    }, 2000);

    // Simular escaneo periódico
    const scanInterval = setInterval(() => {
      setIsScanning(true);
      setTimeout(() => setIsScanning(false), 1500);
    }, 5000);

    return () => {
      clearInterval(rotationInterval);
      clearInterval(detectionInterval);
      clearInterval(scanInterval);
    };
  }, []);

  return (
    <div className={`relative w-full max-w-lg mx-auto ${className}`}>
      {/* Container principal con efecto de profundidad */}
      <motion.div 
        className="relative perspective-1000"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Fondo con gradiente y resplandor */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-blue-500/10 to-transparent blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Ondas de señal verdes detrás de la imagen */}
        <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute border-2 border-green-400/30 rounded-full"
              style={{
                width: `${ring * 140}px`,
                height: `${ring * 140}px`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.1, 0.4],
                borderColor: ['rgba(74, 222, 128, 0.3)', 'rgba(34, 197, 94, 0.5)', 'rgba(74, 222, 128, 0.3)']
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: ring * 0.7,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Imagen principal de la cámara */}
        <motion.div 
          className="relative z-20"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img 
            src={cameraImage} 
            alt="TAPO Camera 360°" 
            className="w-full h-auto drop-shadow-2xl"
          />
          


          {/* Efectos de escaneo */}
          <AnimatePresence>
            {isScanning && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-25"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="w-96 h-96 border-2 border-green-400 rounded-full"
                  initial={{ scale: 0.5, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute w-80 h-80 border-2 border-green-400 rounded-full"
                  initial={{ scale: 0.5, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Indicadores de estado flotantes */}
        <motion.div 
          className="absolute top-8 right-8 glass-blue p-3 rounded-xl shadow-lg z-30"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="flex items-center space-x-2">
            <motion.div 
              className="w-3 h-3 bg-green-400 rounded-full"
              animate={{ 
                scale: [1, 1.3, 1],
                boxShadow: ['0 0 0 0 rgba(74, 222, 128, 0.7)', '0 0 0 10px rgba(74, 222, 128, 0)', '0 0 0 0 rgba(74, 222, 128, 0.7)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-green-700">En Vivo</span>
          </div>
        </motion.div>

        {/* Panel de control 360° */}
        <motion.div 
          className="absolute bottom-8 left-8 glass-blue p-4 rounded-xl shadow-lg z-30"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Scan className="w-6 h-6 text-primary" />
            </motion.div>
            <div>
              <p className="font-medium text-sm text-primary">360° Active</p>
              <p className="text-xs text-muted-foreground">Rotación Continua</p>
            </div>
          </div>
        </motion.div>

        {/* Indicadores de WiFi */}
        <motion.div 
          className="absolute top-1/2 -right-6 glass-blue p-3 rounded-xl shadow-lg z-30"
          animate={{ 
            x: [0, 15, 0],
            rotate: [0, 3, 0] 
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              color: ['rgb(43, 124, 233)', 'rgb(34, 197, 94)', 'rgb(43, 124, 233)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Wifi className="w-5 h-5" />
          </motion.div>
        </motion.div>

        {/* Detecciones de objetos */}
        <AnimatePresence>
          {detectedObjects.map((obj) => (
            <motion.div
              key={obj.id}
              className="absolute glass border-red-400 p-2 rounded-lg shadow-lg z-30"
              style={{ left: obj.x, top: obj.y }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex items-center space-x-2"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-xs font-medium capitalize text-red-700">
                  {obj.type}
                </span>
              </motion.div>
              
              {/* Círculo de detección */}
              <motion.div
                className="absolute -inset-2 border-2 border-red-400 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0.3, 0.7]
                }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Partículas de datos flotantes */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/60 rounded-full z-25"
            style={{
              left: `${20 + (i * 45)}px`,
              top: `${50 + (i % 2) * 200}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}



        {/* Información técnica flotante */}
        <motion.div 
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass-blue p-3 rounded-xl shadow-lg z-30"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3 text-blue-500" />
              <span className="text-muted-foreground">2K QHD</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="w-3 h-3 text-green-500" />
              <span className="text-muted-foreground">Seguro</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="w-3 h-3 text-yellow-500" />
              <span className="text-muted-foreground">IA Activa</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}