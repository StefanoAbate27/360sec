import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ABTestComponent, useABTest } from './ABTestProvider';
import { Camera3D, FloatingCameras } from './Camera3D';
import { ImmersiveCamera } from './ImmersiveCamera';
import { motion } from "framer-motion";
import { Instagram, Music2, Phone } from "lucide-react";
import { 
  Shield, Eye, Smartphone, Clock, Star, Check, Play, ArrowRight, Users, Award, Lock,
  Camera, Wifi, Cloud, Zap, Moon, RotateCcw, Menu, X, ChevronRight, Search, MapPin,
  Scan, Radio, Battery, Globe, MessageCircle
} from 'lucide-react';

export function LandingPage() {
  const { trackEvent } = useABTest();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [currentVideoTitle, setCurrentVideoTitle] = useState('');

  // Videos específicos para cada tipo de demo
const demoVideos = {
  general: {
    url: "public/videos/general.mp4",
    title: "Demo General - Sistema 360 Security TAPO"
  },
  navigation: {
    url: "public/videos/navigation.mp4",
    title: "Navegación y Control - Cámaras TAPO"
  },
  c210: {
    url: "videos/demo-c210.mp4",
    title: "TAPO C210 Pan/Tilt - Demo Completo"
  },
  c510: {
    url: "videos/demo-c510.mp4",
    title: "TAPO C510 Outdoor - Resistencia y Calidad"
  },
  c402: {
    url: "videos/demo-c402.mp4",
    title: "TAPO C402 Solar - Energía Sostenible"
  }
};


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('form_submit', { formData });
    
    // Crear mensaje de WhatsApp con la información del formulario
    const whatsappMessage = encodeURIComponent(
      `🏠 *SOLICITUD DE COTIZACIÓN - 360 SECURITY*\n\n` +
      `👤 *Nombre:* ${formData.name}\n` +
      `📧 *Email:* ${formData.email}\n` +
      `📱 *Teléfono:* ${formData.phone || 'No proporcionado'}\n` +
      `💬 *Mensaje:* ${formData.message || 'Solicitud de cotización general'}\n\n` +
      `🔒 *Interesado en:* Sistemas de seguridad TAPO 360°\n` +
      `⏰ *Fecha de solicitud:* ${new Date().toLocaleDateString('es-ES')}\n\n` +
      `¡Hola! Me gustaría recibir una cotización personalizada para proteger mi hogar con las cámaras TAPO de 360 Security.`
    );
    
    // Redirigir a WhatsApp
    window.open(`https://wa.me/584247582675?text=${whatsappMessage}`, '_blank');
    
    // Limpiar formulario
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleCTAClick = (location: string) => {
    trackEvent('cta_click', { location });
    
    if (location.includes('cotizar') || location.includes('cta')) {
      // Scroll suave al formulario de contacto
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  const handleDemoClick = (demoType: string = 'general') => {
    trackEvent('demo_click', { demo_type: demoType });
    
    const videoData = demoVideos[demoType as keyof typeof demoVideos] || demoVideos.general;
    setCurrentVideoUrl(videoData.url);
    setCurrentVideoTitle(videoData.title);
    setIsVideoModalOpen(true);
  };

  const handleProductInfoClick = (productName: string) => {
    trackEvent('product_info_click', { product: productName });
    
    const whatsappMessage = encodeURIComponent(
      `🎯 *INFORMACIÓN DE PRODUCTO - 360 SECURITY*\n\n` +
      `📹 *Producto de interés:* ${productName}\n` +
      `👤 *Consulta realizada:* ${new Date().toLocaleDateString('es-ES')}\n\n` +
      `¡Hola! Me gustaría recibir más información sobre el ${productName}. ¿Podrían enviarme detalles sobre:\n\n` +
      `• Especificaciones técnicas\n` +
      `• Precios y promociones\n` +
      `• Instalación profesional\n` +
      `• Garantía y soporte\n\n` +
      `¡Gracias!`
    );
    
    window.open(`https://wa.me/584247582675?text=${whatsappMessage}`, '_blank');
  };

  const handleNavClick = (sectionName: string) => {
    trackEvent('nav_click', { section: sectionName });
    
    // Mapear nombres de sección a IDs reales
    const sectionIds: { [key: string]: string } = {
      'Características': 'features',
      'Productos TAPO': 'products', 
      'Testimonios': 'testimonials',
      'Contacto': 'contact'
    };
    
    const targetId = sectionIds[sectionName];
    if (targetId) {
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
        
        // Cerrar menú móvil si está abierto
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900"></div>
      
      {/* Animated background blobs */}
      <motion.div 
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />
      
      {/* Floating Cameras */}
      <FloatingCameras />

       {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-blue backdrop-blur-xl border-b border-primary/20 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-30 h-12 flex items-center justify-center">

  <img
    src="src/assets/logo-empresa.png" 
    alt="Empresa 360"
    className="h-full object-contain"
  />
</div>
  </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {['Características', 'Productos TAPO', 'Testimonios', 'Contacto'].map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="text-muted-foreground hover:text-primary transition-all duration-300 relative group cursor-pointer bg-transparent border-none"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </motion.button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button 
                  variant="outline" 
                  className="hidden md:flex glass border-primary/30 hover:bg-primary/10 button-3d"
                  onClick={() => handleDemoClick('navigation')}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Demo
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button 
                  className="gradient-primary text-white shadow-lg button-3d"
                  onClick={() => handleCTAClick('nav_cta')}
                >
                  Cotizar Ahora
                </Button>
              </motion.div>

              <button
                className="lg:hidden p-2 rounded-lg glass"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div 
              className="lg:hidden mt-4 pb-4 space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {['Características', 'Productos TAPO', 'Testimonios', 'Contacto'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => handleNavClick(item)}
                  className="block py-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer bg-transparent border-none text-left w-full"
                >
                  {item}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ABTestComponent
                variantA={
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Badge variant="secondary" className="glass-blue border-0 shadow-md">
                        <Award className="w-4 h-4 mr-2" />
                        Líder en Seguridad Doméstica
                      </Badge>
                    </motion.div>
                    <motion.h1 
                      className="text-5xl lg:text-7xl font-bold leading-tight"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      Protección{' '}
                      <span className="bg-gradient-to-r from-primary via-blue-600 to-blue-800 bg-clip-text text-transparent">
                        360°
                      </span>{' '}
                      para tu hogar
                    </motion.h1>
                    <motion.p 
                      className="text-xl text-muted-foreground leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      Tecnología TAPO de última generación con visión panorámica completa. 
                      Monitoreo inteligente, alertas instantáneas y control total desde cualquier lugar del mundo.
                    </motion.p>
                  </div>
                }
                variantB={
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Badge variant="secondary" className="glass-blue border-0 shadow-md">
                        <Shield className="w-4 h-4 mr-2" />
                        Seguridad Garantizada
                      </Badge>
                    </motion.div>
                    <motion.h1 
                      className="text-5xl lg:text-7xl font-bold leading-tight"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      Tu familia merece{' '}
                      <span className="bg-gradient-to-r from-primary via-blue-600 to-blue-800 bg-clip-text text-transparent">
                        máxima protección
                      </span>
                    </motion.h1>
                    <motion.p 
                      className="text-xl text-muted-foreground leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      Cámaras TAPO con inteligencia artificial avanzada y cobertura 360°. 
                      Detecta, alerta y protege con precisión militar las 24 horas del día.
                    </motion.p>
                  </div>
                }
              />
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <ABTestComponent
                  variantA={
                    <Button 
                      size="lg" 
                      className="flex-1 gradient-primary border-0 text-white shadow-xl button-3d"
                      onClick={() => handleDemoClick('general')}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Ver Demo en Vivo
                    </Button>
                  }
                  variantB={
                    <Button 
                      size="lg" 
                      className="flex-1 gradient-primary border-0 text-white shadow-xl button-3d"
                      onClick={() => handleCTAClick('hero_primary_cotizar')}
                    >
                      <Shield className="w-5 h-5 mr-2" />
                      Proteger Mi Hogar
                    </Button>
                  }
                />
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex-1 glass border-primary/30 hover:bg-primary/10 shadow-lg button-3d"
                  onClick={() => handleNavClick('Productos TAPO')}
                >
                  <Search className="w-5 h-5 mr-2" />
                  Explorar Productos
                </Button>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-8 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1,2,3].map((i) => (
                      <motion.div 
                        key={i} 
                        className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-full border-2 border-white shadow-md"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">+100 hogares protegidos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-muted-foreground">4.9/5 estrellas</span>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Immersive Camera Section */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative perspective">
                {/* Immersive Camera Component */}
                <ImmersiveCamera className="w-full max-w-2xl mx-auto" />
                
                {/* Additional floating stats */}
                <motion.div 
                  className="absolute top-12 -left-8 glass-blue p-4 rounded-2xl shadow-lg"
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 2, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Check className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <p className="font-medium text-sm">Detección IA</p>
                      <p className="text-xs text-muted-foreground">99.7% Precisión</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="absolute bottom-16 -right-8 glass-blue p-4 rounded-2xl shadow-lg"
                  animate={{ 
                    y: [0, 12, 0],
                    rotate: [0, -2, 0]
                  }}
                  transition={{ duration: 7, repeat: Infinity, delay: 2 }}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <RotateCcw className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <p className="font-medium text-sm">Rotación Total</p>
                      <p className="text-xs text-muted-foreground">360° x 180°</p>
                    </div>
                  </div>
                </motion.div>

                {/* Signal strength indicator */}
                <motion.div 
                  className="absolute top-1/2 left-0 glass-blue p-3 rounded-xl shadow-lg"
                  animate={{ 
                    x: [-20, 10, -20],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 8, repeat: Infinity, delay: 3 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4].map((bar) => (
                        <motion.div
                          key={bar}
                          className="w-1 bg-primary rounded-full"
                          style={{ height: `${bar * 3 + 4}px` }}
                          animate={{ 
                            opacity: [0.3, 1, 0.3],
                            scaleY: [0.8, 1.2, 0.8]
                          }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            delay: bar * 0.1 
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-primary">WiFi 6</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 px-6" style={{ scrollMarginTop: '100px' }}>
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="glass-blue border-0 mb-4 shadow-md">
              <Zap className="w-4 h-4 mr-2" />
              Tecnología Avanzada
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Características que marcan la{' '}
              <span className="bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
                diferencia
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Descubre por qué las cámaras TAPO son la elección de millones de familias en todo el mundo
            </p>
          </motion.div>

          <div className="bento-grid">
            {[
              {
                icon: <RotateCcw className="w-8 h-8 text-primary" />,
                title: "Rotación 360° Inteligente",
                description: "Cobertura completa sin puntos ciegos. Seguimiento automático de movimiento con precisión milimétrica.",
                gradient: "from-primary/20 to-blue-500/20"
              },
              {
                icon: <Moon className="w-8 h-8 text-blue-600" />,
                title: "Visión Nocturna 4K",
                description: "Claridad excepcional incluso en completa oscuridad con tecnología infrarroja de próxima generación.",
                gradient: "from-blue-600/20 to-indigo-500/20"
              },
              {
                icon: <Smartphone className="w-8 h-8 text-green-500" />,
                title: "Control Inteligente",
                description: "App móvil intuitiva con notificaciones push instantáneas y control por voz compatible con Alexa y Google.",
                gradient: "from-green-500/20 to-emerald-500/20"
              },
              {
                icon: <Cloud className="w-8 h-8 text-orange-500" />,
                title: "Almacenamiento Seguro",
                description: "Grabación automática en la nube con encriptación AES-256 y acceso a grabaciones de hasta 90 días.",
                gradient: "from-orange-500/20 to-red-500/20"
              },
              {
                icon: <Eye className="w-8 h-8 text-purple-500" />,
                title: "IA de Reconocimiento",
                description: "Distingue entre personas, mascotas, vehículos y paquetes para alertas más precisas y menos falsas alarmas.",
                gradient: "from-purple-500/20 to-pink-500/20"
              },
              {
                icon: <Wifi className="w-8 h-8 text-teal-500" />,
                title: "Conexión Ultra Estable",
                description: "WiFi 6 de doble banda con reconexión automática y modo offline para grabación local continua.",
                gradient: "from-teal-500/20 to-cyan-500/20"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass border-primary/20 interactive-hover shadow-xl overflow-hidden group h-full">
                  <CardHeader className="pb-4">
                    <motion.div 
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="relative py-20 px-6 bg-gradient-to-br from-blue-50/50 to-primary/5 dark:from-slate-900 dark:to-blue-900" style={{ scrollMarginTop: '100px' }}>
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="glass-blue border-0 mb-4 shadow-md">
              <Camera className="w-4 h-4 mr-2" />
              Productos TAPO
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Encuentra la cámara{' '}
              <span className="bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
                perfecta
              </span>{' '}
              para ti
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Soluciones TAPO adaptadas para cada espacio y necesidad de seguridad
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "TAPO C210 Pan/Tilt",
                price: "$29.99",
                originalPrice: "$59.99",
                image: "https://i.pcmag.com/imagery/reviews/00bj4paX7qjwgIEJnnj3VSB-7.fit_lim.size_1050x591.v1661444096.png",
                features: ["360° de rotación completa", "Visión nocturna HD", "Audio bidireccional crystal clear", "Detección de movimiento IA", "Compatible con Alexa & Google"],
                badge: "Más Popular",
                badgeColor: "bg-orange-500",
                icon: <RotateCcw className="w-5 h-5" />,
                demoType: "c210"
              },
              {
                name: "TAPO C510 Outdoor",
                price: "$59.99",
                originalPrice: "$79.99",
                image: "https://static1.anpoimages.com/wordpress/wp-content/uploads/wm/2024/06/tp-link-tapo-c510w-outdoor-installation.jpg?q=70&fit=crop&w=750&h=422&dpr=1",
                features: ["Resistente al clima IP66", "3MP Ultra HD 2K", "Sirena integrada 110dB", "Zona de actividad personalizable", "Grabación continua 24/7"],
                badge: "Exterior",
                badgeColor: "bg-green-500",
                icon: <Shield className="w-5 h-5" />,
                demoType: "c510"
              },
              {
                name: "TAPO C420S Solar",
                price: "$69.99",
                originalPrice: "$89.99",
                image: "https://www.redeszone.net/app/uploads-redeszone.net/2024/06/TP-Link_Tapo_C410_Kit_destacada.jpg?x=500&y=295&quality=80",
                features: ["Panel solar de alta eficiencia", "Batería recargable 6 meses", "100% inalámbrica", "IA de reconocimiento facial", "Instalación sin cables"],
                badge: "Eco-Friendly",
                badgeColor: "bg-primary",
                icon: <Battery className="w-5 h-5" />,
                demoType: "c402"
              }
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="glass border-primary/20 interactive-hover shadow-xl overflow-hidden group h-full">
                  <div className="relative aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {product.badge && (
                      <Badge className={`absolute top-4 left-4 ${product.badgeColor} text-white border-0 shadow-lg`}>
                        {product.icon}
                        <span className="ml-1">{product.badge}</span>
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {product.name}
                      </CardTitle>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-primary">{product.price}</span>
                          <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">30% OFF</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {product.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex} 
                          className="flex items-start space-x-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                        >
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <div className="space-y-3">
                      <Button 
                        className="w-full gradient-primary border-0 text-white shadow-lg button-3d" 
                        onClick={() => handleProductInfoClick(product.name)}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Solicitar Información
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full glass border-primary/30 hover:bg-primary/10"
                        onClick={() => handleDemoClick(product.demoType)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Ver Demo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative py-20 px-6" style={{ scrollMarginTop: '100px' }}>
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="glass-blue border-0 mb-4 shadow-md">
              <Users className="w-4 h-4 mr-2" />
              Testimonios Reales
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Historias de{' '}
              <span className="bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
                protección exitosa
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                role: "Madre de 3 hijos",
                content: "Las cámaras TAPO de 360 Security me han dado una tranquilidad increíble. Puedo revisar mi casa mientras estoy en el trabajo y las alertas son inmediatas. La calidad de imagen es impresionante.",
                rating: 5,
                image: "https://media.istockphoto.com/id/1589605653/es/foto/sonr%C3%ADe-selfie-y-madre-con-hijo-en-una-cama-abraza-amor-y-uni%C3%B3n-en-su-hogar-juntos-retrato.jpg?s=612x612&w=0&k=20&c=2yJPNdwmjwga0qeoWpBFDQz6vWJ79U38_GM8ftdjTtA="
              },
              {
                name: "Carlos Rodríguez",
                role: "Propietario de negocio",
                content: "Instalé el sistema TAPO en mi negocio y mi casa. La integración es perfecta y el soporte técnico de 360 Security es excepcional. Vale cada peso invertido.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              },
              {
                name: "Ana Martínez",
                role: "Jubilada",
                content: "Pensé que sería complicado para alguien de mi edad, pero la app es muy intuitiva. Mis hijos pueden ayudarme a configurarla desde lejos. Me siento mucho más segura.",
                rating: 5,
                image: "https://media.istockphoto.com/id/1341442217/es/foto/retrato-de-cabeza-de-una-hermosa-mujer-mayor.jpg?s=612x612&w=0&k=20&c=-0oKfaACx7vpcw_I247aIfzsmfX36qrteu4F1CzF_f0="
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="glass border-primary/20 interactive-hover shadow-xl h-full">
                  <CardContent className="p-8">
                    <motion.div 
                      className="flex mb-6"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </motion.div>
                    <p className="mb-6 italic leading-relaxed text-muted-foreground">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center space-x-4">
                      <ImageWithFallback
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover shadow-md"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-blue-50/50 to-primary/5 dark:from-slate-900 dark:to-blue-900">
        <div className="container mx-auto max-w-3xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="glass-blue border-0 mb-4 shadow-md">
              <Search className="w-4 h-4 mr-2" />
              Preguntas Frecuentes
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Resuelve tus{' '}
              <span className="bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
                dudas
              </span>
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                question: "¿Qué incluye la instalación profesional?",
                answer: "Incluimos instalación profesional completamente gratuita realizada por técnicos certificados, configuración completa de la app móvil, tutorial personalizado presencial, y soporte técnico prioritario por 60 días. También incluimos garantía de funcionamiento por 30 días."
              },
              {
                question: "¿Las cámaras TAPO funcionan sin internet?",
                answer: "Sí, las cámaras TAPO pueden grabar localmente en tarjeta SD de hasta 512GB sin necesidad de internet. Sin embargo, para monitoreo remoto, alertas en tiempo real, y acceso desde tu smartphone, necesitas conexión a internet estable."
              },
              {
                question: "¿Cuánto cuesta el almacenamiento en la nube?",
                answer: "Ofrecemos los primeros 30 días de almacenamiento en la nube completamente gratis. Después, nuestros planes comienzan desde $4.99/mes por cámara con almacenamiento ilimitado, grabación continua 24/7 y acceso desde cualquier dispositivo."
              },
              {
                question: "¿Son compatibles con Alexa y Google Assistant?",
                answer: "Absolutamente. Todas nuestras cámaras TAPO son totalmente compatibles con Alexa, Google Assistant, Apple HomeKit y la mayoría de sistemas de domótica inteligente. Puedes controlarlas por voz y integrarlas con tus rutinas automatizadas."
              },
              {
                question: "¿Qué garantía ofrecen las cámaras TAPO?",
                answer: "Ofrecemos 3 años de garantía completa que cubre defectos de fabricación, mal funcionamiento y problemas de conectividad. Además, incluimos soporte técnico especializado las 24/7 y reemplazo inmediato en caso de fallas."
              },
              {
                question: "¿Es segura la privacidad de mis datos?",
                answer: "La privacidad es nuestra prioridad máxima. Utilizamos encriptación AES-256 de grado militar, autenticación de dos factores, y servidores seguros certificados ISO 27001. Tus datos nunca son compartidos con terceros y tienes control total sobre tu información."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem value={`item-${index}`} className="glass border-primary/20 rounded-2xl px-6 shadow-lg">
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="font-semibold">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="relative py-20 px-6" style={{ scrollMarginTop: '100px' }}>
        <div className="container mx-auto max-w-2xl">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <ABTestComponent
              variantA={
                <div>
                  <Badge variant="secondary" className="glass-blue border-0 mb-4 shadow-md">
                    <MapPin className="w-4 h-4 mr-2" />
                    Cotización Gratuita
                  </Badge>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                    Solicita tu cotización{' '}
                    <span className="bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
                      personalizada
                    </span>
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Nuestros expertos en seguridad diseñarán la solución perfecta para tu hogar o negocio
                  </p>
                </div>
              }
              variantB={
                <div>
                  <Badge variant="secondary" className="glass-blue border-0 mb-4 shadow-md">
                    <Shield className="w-4 h-4 mr-2" />
                    Protección Inmediata
                  </Badge>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                    Protege tu hogar{' '}
                    <span className="bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
                      hoy mismo
                    </span>
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Obtén una evaluación gratuita y personalizada de seguridad en menos de 24 horas
                  </p>
                </div>
              }
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="glass border-primary/20 shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block mb-3 font-medium">Nombre completo</label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Tu nombre completo"
                        className="glass border-primary/30 focus:border-primary/50 shadow-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-3 font-medium">Email</label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="tu@email.com"
                        className="glass border-primary/30 focus:border-primary/50 shadow-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-3 font-medium">Teléfono</label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Tu número de teléfono"
                      className="glass border-primary/30 focus:border-primary/50 shadow-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-3 font-medium">¿Qué necesitas proteger?</label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Cuéntanos sobre tu hogar, oficina o negocio. ¿Cuántas habitaciones? ¿Área exterior? ¿Necesidades específicas?"
                      className="glass border-primary/30 focus:border-primary/50 shadow-sm"
                    />
                  </div>
                  
                  <ABTestComponent
                    variantA={
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full gradient-primary border-0 text-white shadow-xl button-3d"
                      >
                        <Shield className="w-5 h-5 mr-2" />
                        Solicitar Cotización Gratuita
                      </Button>
                    }
                    variantB={
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full gradient-primary border-0 text-white shadow-xl button-3d"
                      >
                        <ChevronRight className="w-5 h-5 mr-2" />
                        Comenzar Mi Evaluación
                      </Button>
                    }
                  />
                  
                  <p className="text-sm text-muted-foreground text-center">
                    ✨ Respuesta en menos de 2 horas • 🚀 Instalación en 48h • 🛡️ Garantía de 3 años
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black border-0">
          <DialogHeader className="sr-only">
            <DialogTitle>{currentVideoTitle}</DialogTitle>
            <DialogDescription>
              Video demostración específica de productos y funcionalidades TAPO 360 Security
            </DialogDescription>
          </DialogHeader>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            {currentVideoUrl && (
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={`${currentVideoUrl}?autoplay=1&rel=0&showinfo=0&modestbranding=1&controls=1`}
                title={currentVideoTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </div>
          
          {/* Video Info Overlay */}
          <motion.div 
            className="absolute bottom-4 left-4 right-4 glass-blue p-3 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">{currentVideoTitle}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-white/80">
                <Play className="w-3 h-3" />
                <span>Demo Oficial TAPO</span>
              </div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="relative py-16 px-6 gradient-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-blue-800/90"></div>
        <div className="relative z-10 container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
               <div className="flex items-center space-x-3 mb-6">
    <div className="relative w-30 h-12">
      {/* Logo de la empresa */}
      <img
        src= "src/assets/logo blanco.png"
        alt="Logo 360 Security"
        className="w-full h-full object-contain"
      />
    </div>
  </div>
              <p className="text-white/80 leading-relaxed mb-6">
                Protegiendo hogares y negocios con tecnología TAPO de vanguardia desde 2024. 
                Tu seguridad es nuestra misión.
              </p>
        <div className="flex space-x-4">
          <motion.a
          href="https://www.instagram.com/360sec.sc"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer shadow-md"
          whileHover={{ scale: 1.1, y: -2 }}
          transition={{ duration: 0.2 }}
        >
        <Instagram className="w-6 h-6 text-white" />
      </motion.a>
      <motion.a
          href="https://www.tiktok.com/@360sec.sc"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer shadow-md"
          whileHover={{ scale: 1.1, y: -2 }}
          transition={{ duration: 0.2 }}
          >
          {/* TikTok SVG */}
          <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          className="w-6 h-6"
          >
          <path d="M12.5 2c.6 0 1.1 0 1.7.1 0 1.1.4 2.1 1.1 3 .7.9 1.7 1.5 2.8 1.7v2.6c-1.1-.1-2.1-.4-3-1v6.6c0 3.2-2.6 5.8-5.8 5.8S3.5 18.2 3.5 15c0-3.2 2.6-5.8 5.8-5.8.4 0 .7 0 1 .1v2.7c-.3-.1-.6-.2-1-.2-1.7 0-3.1 1.4-3.1 3.1S7.6 18 9.3 18c1.7 0 3.1-1.4 3.1-3.1V2z" />
          </svg>
          </motion.a>

          <motion.a
          href="tel:+584247582675"
          className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer shadow-md"
          whileHover={{ scale: 1.1, y: -2 }}
          transition={{ duration: 0.2 }}
          >
          <Phone className="w-6 h-6 text-white" />
          </motion.a>
            </div>
            </motion.div> 
            {[
              {
                title: "Productos TAPO",
                items: ["Cámaras de Interior", "Cámaras de Exterior", "Sistemas Solares", "Accesorios y Soportes", "Paquetes Completos"]
              },
              {
                title: "Soporte",
                items: ["Centro de Ayuda", "Instalación Profesional", "Garantía Extendida", "Soporte Técnico 24/7", "Tutoriales y Guías"]
              },
              {
                title: "Contacto",
                items: ["📞 0424-7582675", "📧 info@360security.com", "🕒 24/7 Disponible", "📍 Servicio Nacional"]
              }
            ].map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="font-semibold mb-6 text-lg">{section.title}</h4>
                <ul className="space-y-3 text-white/80">
                  {section.items.map((item) => (
                    <li key={item} className="hover:text-white transition-colors cursor-pointer">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-white/60 mb-4 md:mb-0">
              &copy; 2024 360 Security. Todos los derechos reservados. TAPO es marca registrada.
            </p>
            <div className="flex space-x-6 text-sm text-white/60">
              {['Privacidad', 'Términos', 'Cookies'].map((item) => (
                <span key={item} className="hover:text-white transition-colors cursor-pointer">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}