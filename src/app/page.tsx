'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Sparkles, Heart, Calendar, MapPin, Music, Gift, Star, Crown, Camera, Clock, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function InvitationPage() {
  const [loading, setLoading] = useState(true)
  const [rsvpData, setRsvpData] = useState({ name: '', guests: '1', message: '' })
  const [showRSVP, setShowRSVP] = useState(false)
  const [showYapeQR, setShowYapeQR] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Scroll effects
  const { scrollYProgress } = useScroll()
  
  // Efectos parallax
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const detailsY = useTransform(scrollYProgress, [0, 0.5], [0, -30])
  const giftsY = useTransform(scrollYProgress, [0.3, 0.8], [0, -40])
  const galleryY = useTransform(scrollYProgress, [0.5, 1], [0, -50])

  // Fecha del evento (15 de diciembre de 2026 a las 8:00 PM)
  const eventDate = new Date('2026-12-15T20:00:00')

  // Estado para manejar el window object
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Variantes de animación
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  }

  // Fotos de ejemplo para la galería
  const galleryImages = [
    { id: 1, title: "Mi Infancia", description: "Momentos preciosos que nunca olvidaré", image: "/XV-EXO/gallery/quince1.webp" },
    { id: 2, title: "Familia", description: "El amor que me fortalece cada día", image: "/XV-EXO/gallery/quince2.webp" },
    { id: 3, title: "Amigas", description: "Las compañeras de todas mis aventuras", image: "/XV-EXO/gallery/quince3.webp" },
    { id: 4, title: "Sueños", description: "Metas que estoy lista para alcanzar", image: "/XV-EXO/gallery/quince4.webp" },
    { id: 5, title: "Bailando", description: "Mi pasión y alegría de vivir", image: "/XV-EXO/gallery/quince5.webp" },
    { id: 6, title: "Celebrando", description: "La vida es para festejarla", image: "/XV-EXO/gallery/quince6.webp" }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 6500) // Reduced to 6.5 seconds after removing countdown
    return () => clearTimeout(timer)
  }, [])

  // Auto-iniciar música después de la carga
  useEffect(() => {
    if (!loading) {
      const musicTimer = setTimeout(() => {
        setIsMusicPlaying(true)
      }, 1000)
      return () => clearTimeout(musicTimer)
    }
  }, [loading])

  // Control de música (simulado para versión estática)
  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying)
    // En versión estática, solo cambiamos el estado visual
    if (!isMusicPlaying) {
      showCustomToast('🎵 Música activada (simulada en versión estática)')
    } else {
      showCustomToast('🔇 Música desactivada')
    }
  }

  // Función para mostrar toast
  const showCustomToast = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = eventDate.getTime() - new Date().getTime()
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    const timer = setInterval(calculateTimeLeft, 1000)
    calculateTimeLeft()
    return () => clearInterval(timer)
  }, [])

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-black overflow-hidden relative"
      >
        {/* Film grain effect overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent animate-pulse" />
        </div>
        
        {/* Animated film reels on sides */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.3 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-yellow-400/20 to-transparent"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-8 transform -translate-y-1/2"
          >
            <div className="w-16 h-16 border-4 border-yellow-400/50 rounded-full" />
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.3 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-purple-400/20 to-transparent"
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 right-8 transform -translate-y-1/2"
          >
            <div className="w-16 h-16 border-4 border-purple-400/50 rounded-full" />
          </motion.div>
        </motion.div>

        {/* Floating particles */}
        {isClient && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0,
              scale: 0,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [null, -Math.random() * 200 - 100],
              x: [null, (Math.random() - 0.5) * 100]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut"
            }}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full"
          />
        ))}

        {/* Main content container */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 2, 
              ease: "anticipate",
              type: "spring"
            }}
            className="text-center"
          >
            {/* Crown with cinematic entrance */}
            <motion.div
              initial={{ opacity: 0, y: -100, rotate: -45 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ 
                duration: 1.5, 
                delay: 0.5,
                type: "spring",
                stiffness: 100
              }}
              className="mb-8"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  scale: { duration: 2, repeat: Infinity }
                }}
                className="relative inline-block"
              >
                {/* Crown glow effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-yellow-400/30 rounded-full blur-xl"
                />
                <Crown className="w-32 h-32 text-yellow-400 mx-auto relative z-10" />
                
                {/* Sparkles around crown */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-60px)`
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    >
                      <Star className="w-4 h-4 text-yellow-300" />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Title with typewriter effect */}
            <motion.div className="mb-6">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 1.2 }}
                className="text-7xl md:text-8xl font-bold mb-4 relative"
              >
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
                  className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent relative overflow-hidden"
                >
                  XV Años
                  <motion.div
                    initial={{ x: -100 }}
                    animate={{ x: 100 }}
                    transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                </motion.span>
              </motion.h1>
            </motion.div>

            {/* Name with dramatic reveal */}
            <motion.h2 
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 1.2, 
                delay: 1.9,
                type: "spring",
                stiffness: 80
              }}
              className="text-4xl md:text-5xl text-yellow-200 mb-8 font-light tracking-wide"
            >
              Sofía Isabel
            </motion.h2>

            {/* Tagline with elegant entrance */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.5 }}
              className="flex items-center justify-center gap-4"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 15, -15, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-8 h-8 text-pink-400" />
              </motion.div>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.9 }}
                className="text-xl text-pink-200 font-light tracking-wide"
              >
                Una celebración mágica te espera
              </motion.span>
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, -15, 15, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <Heart className="w-8 h-8 text-pink-400" />
              </motion.div>
            </motion.div>

            {/* Loading progress bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3.2 }}
              className="mt-12 max-w-md mx-auto"
            >
              <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, delay: 3.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400"
                />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3.7 }}
                className="text-center text-yellow-200 mt-4 text-sm"
              >
                Preparando la experiencia mágica...
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        {/* Film countdown effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.5, delay: 6.2 }}
          className="absolute inset-0 bg-white flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 2 }}
            animate={{ scale: 0 }}
            transition={{ duration: 0.5 }}
            className="text-9xl font-bold text-black"
          >
            🎬
          </motion.div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 text-white"
    >
      {/* Hero Section */}
      <motion.section 
        style={{ y: headerY }}
        className="min-h-screen flex flex-col items-center justify-center px-4 relative"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/quinceanera-hero.jpg" 
            alt="Quinceañera Celebration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-pink-900/70 to-rose-900/70" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="text-center mb-8 relative z-10"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <Crown className="w-24 h-24 text-yellow-300 mx-auto" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent relative z-10"
          >
            XV Años
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="text-3xl md:text-5xl font-light mb-8 text-yellow-100 relative z-10"
          >
            Sofía Isabel
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="flex items-center justify-center gap-2 mb-8 relative z-10"
          >
            <Heart className="w-6 h-6 text-pink-300" />
            <span className="text-xl text-pink-100">15 de Diciembre, 2026</span>
            <Heart className="w-6 h-6 text-pink-300" />
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.7 }}
          className="grid grid-cols-4 gap-4 mb-12 relative z-10"
        >
          {Object.entries(timeLeft).map(([unit, value], index) => (
            <motion.div
              key={unit}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-yellow-300">
                {String(value).padStart(2, '0')}
              </div>
              <div className="text-sm text-pink-100 capitalize">
                {unit === 'days' ? 'Días' : unit === 'hours' ? 'Horas' : unit === 'minutes' ? 'Minutos' : 'Segundos'}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Sección de Detalles del Evento */}
      <motion.section 
        style={{ y: detailsY }}
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="max-w-6xl w-full"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-yellow-300"
          >
            Detalles del Evento
          </motion.h2>
          
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            <motion.div
              variants={fadeInLeft}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border-white/30 overflow-hidden rounded-xl"
            >
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div 
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center"
                  >
                    <Calendar className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-yellow-300">Fecha y Hora</h3>
                </div>
                <div className="space-y-4">
                  <motion.div 
                    variants={scaleIn}
                    className="bg-white/10 rounded-xl p-4"
                  >
                    <p className="text-lg font-semibold text-yellow-200 mb-1">Sábado, 15 de Diciembre</p>
                    <p className="text-3xl font-bold text-white">2026</p>
                  </motion.div>
                  <motion.div 
                    variants={scaleIn}
                    className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl p-4"
                  >
                    <p className="text-sm text-pink-200 mb-1">Hora de Inicio</p>
                    <p className="text-2xl font-bold text-yellow-300">8:00 PM</p>
                    <p className="text-sm text-pink-200 mt-2">Recepción hasta las 2:00 AM</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInRight}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border-white/30 overflow-hidden rounded-xl"
            >
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div 
                    animate={{ rotate: [0, -360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center"
                  >
                    <MapPin className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-yellow-300">Lugar</h3>
                </div>
                <div className="flex flex-col space-y-4">
                  <motion.div 
                    variants={scaleIn}
                    className="bg-white/10 rounded-xl p-4"
                  >
                    <p className="text-xl font-bold text-yellow-200 mb-2">Salón Real Eventos</p>
                    <p className="text-white mb-4">Av. Principal 1234, Lima, Perú</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-3 rounded-xl text-white font-semibold hover:shadow-pink-500/50 transition-all duration-300"
                    >
                      Ver en Google Maps 🗺️
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="text-center mt-12"
          >
            <motion.button
              variants={scaleIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowRSVP(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 text-lg font-semibold rounded-full hover:shadow-pink-500/50 transition-all duration-300"
            >
              Confirmar Asistencia
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Sección Especial de Regalos */}
      <motion.section 
        style={{ y: giftsY }}
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="max-w-4xl w-full"
        >
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <Gift className="w-16 h-16 text-yellow-300 mx-auto" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-4">
              Regalos
            </h2>
            <p className="text-xl text-pink-100">
              Tu presencia es mi mejor regalo, pero si deseas obsequiarme algo especial...
            </p>
          </motion.div>

          <motion.div 
            variants={scaleIn}
            className="max-w-md mx-auto w-full"
          >
            <motion.div
              variants={scaleIn}
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden rounded-xl"
            >
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div 
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center"
                  >
                    <span className="text-white font-bold text-xl">Y</span>
                  </motion.div>
                  <h3 className="text-2xl font-semibold">Yape</h3>
                </div>
                <div className="flex-1">
                  <p className="text-lg text-pink-100 mb-4">Regalo en efectivo</p>
                  <div className="bg-white/5 rounded-lg p-6 mb-4">
                    <p className="text-sm text-yellow-200 mb-2">Número de Yape:</p>
                    <p className="text-3xl font-bold text-yellow-300 mb-2">+51925475680</p>
                  </div>
                  <p className="text-sm text-pink-200 mb-6">
                    Puedes enviarme tu regalo directamente a través de Yape. ¡Es rápido, seguro y fácil!
                  </p>
                  <motion.button
                    variants={scaleIn}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowYapeQR(true)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-3 rounded-lg text-white font-semibold hover:shadow-purple-500/50 transition-all duration-300"
                  >
                    Enviar por Yape 💜
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="mt-12 text-center"
          >
            <motion.div
              variants={scaleIn}
              className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden rounded-xl"
            >
              <div className="p-8">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-block mb-4"
                >
                  <Heart className="w-12 h-12 text-pink-400 mx-auto" />
                </motion.div>
                <h3 className="text-2xl font-bold text-yellow-300 mb-4">
                  Sobre todo... ¡Tu Presencia!
                </h3>
                <p className="text-lg text-pink-100 mb-6 max-w-2xl mx-auto">
                  Lo que más valoro es compartir este momento tan especial con las personas que quiero. 
                  Tu compañía y buenos deseos son el regalo más preciado que podrías darme en mis XV años.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    variants={scaleIn}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowRSVP(true)}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 rounded-lg text-white font-semibold hover:shadow-pink-500/50 transition-all duration-300"
                  >
                    Confirmar Mi Asistencia ✨
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Galería de Fotos */}
      <motion.section 
        style={{ y: galleryY }}
        className="min-h-screen py-20 px-4"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="max-w-7xl mx-auto"
        >
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <Camera className="w-16 h-16 text-yellow-300 mx-auto" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-4">
              Mi Historia en Imágenes
            </h2>
            <p className="text-xl text-pink-100">
              Un viaje a través de los momentos que me han hecho ser quien soy
            </p>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedImage(image.id)}
                className="relative group cursor-pointer"
                style={{ perspective: "1000px" }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-600/20 to-purple-600/20 backdrop-blur-sm border border-white/20">
                  <div className="aspect-square relative">
                    <img 
                      src={image.image} 
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <motion.div
                      initial={{ y: 100 }}
                      whileHover={{ y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6"
                    >
                      <h3 className="text-xl font-bold text-yellow-300 mb-2">
                        {image.title}
                      </h3>
                      <p className="text-sm text-pink-100">
                        {image.description}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-white/10 flex items-center justify-center pointer-events-none"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Camera className="w-12 h-12 text-white" />
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Modal de Imagen Ampliada */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.5, rotateY: 180 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.5, rotateY: -180 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-yellow-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </motion.button>
              
              <div className="bg-gradient-to-br from-purple-800 to-pink-800 rounded-2xl p-8 border border-white/20">
                <div className="aspect-video bg-black/30 rounded-xl overflow-hidden mb-6">
                  <img 
                    src={galleryImages.find(img => img.id === selectedImage)?.image}
                    alt={galleryImages.find(img => img.id === selectedImage)?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-3xl font-bold text-yellow-300 mb-3">
                  {galleryImages.find(img => img.id === selectedImage)?.title}
                </h3>
                <p className="text-lg text-pink-100 mb-6">
                  {galleryImages.find(img => img.id === selectedImage)?.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      const currentIndex = galleryImages.findIndex(img => img.id === selectedImage)
                      const prevIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1
                      setSelectedImage(galleryImages[prevIndex].id)
                    }}
                    className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>
                  
                  <span className="text-pink-200">
                    {galleryImages.findIndex(img => img.id === selectedImage) + 1} / {galleryImages.length}
                  </span>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      const currentIndex = galleryImages.findIndex(img => img.id === selectedImage)
                      const nextIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0
                      setSelectedImage(galleryImages[nextIndex].id)
                    }}
                    className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de RSVP */}
      {showRSVP && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowRSVP(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-purple-800 to-pink-800 rounded-2xl p-8 max-w-md w-full border border-white/20"
          >
            <h3 className="text-2xl font-bold mb-6 text-yellow-300">Confirmar Asistencia</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-yellow-200">Nombre Completo</Label>
                <Input
                  id="name"
                  value={rsvpData.name}
                  onChange={(e) => setRsvpData({...rsvpData, name: e.target.value})}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                  placeholder="Tu nombre"
                />
              </div>
              
              <div>
                <Label htmlFor="guests" className="text-yellow-200">Número de Invitados</Label>
                <Select value={rsvpData.guests} onValueChange={(value) => setRsvpData({...rsvpData, guests: value})}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 persona</SelectItem>
                    <SelectItem value="2">2 personas</SelectItem>
                    <SelectItem value="3">3 personas</SelectItem>
                    <SelectItem value="4">4 personas</SelectItem>
                    <SelectItem value="5">5+ personas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="message" className="text-yellow-200">Mensaje (Opcional)</Label>
                <Textarea
                  id="message"
                  value={rsvpData.message}
                  onChange={(e) => setRsvpData({...rsvpData, message: e.target.value})}
                  className="bg-white/10 border-white/20 text-white placeholder-white/50"
                  placeholder="Déjame un mensaje especial..."
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <Button
                onClick={() => {
                  showCustomToast('¡Gracias por confirmar tu asistencia! Nos vemos en la fiesta 🎉')
                  setShowRSVP(false)
                  setRsvpData({ name: '', guests: '1', message: '' })
                }}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white"
              >
                Confirmar
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowRSVP(false)}
                className="flex-1 border-white/20 text-white hover:bg-white/10"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Yape QR */}
      {showYapeQR && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowYapeQR(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-purple-800 to-pink-800 rounded-2xl p-8 max-w-sm w-full border border-white/20"
          >
            <h3 className="text-2xl font-bold mb-6 text-yellow-300 text-center">Escanea el QR</h3>
            
            <div className="bg-white p-4 rounded-xl mb-6">
              <img 
                src="/yape-qr.png" 
                alt="Yape QR Code"
                className="w-full h-auto"
              />
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-yellow-200 font-semibold">+51925475680</p>
            </div>
            
            <Button
              onClick={() => setShowYapeQR(false)}
              className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white"
            >
              Cerrar
            </Button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full shadow-lg z-50">
          {toastMessage}
        </div>
      )}

      {/* Control de Música Flotante */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={toggleMusic}
          className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300"
        >
          <Music className="w-6 h-6 text-white" />
        </button>
        {isMusicPlaying && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full">
            <div className="w-4 h-4 bg-green-400 rounded-full animate-ping" />
          </div>
        )}
      </div>

      {/* Indicador de Música */}
      {isMusicPlaying && (
        <div className="fixed bottom-8 left-8 z-40 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-white">Música de fiesta 🎵</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}