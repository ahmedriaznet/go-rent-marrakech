"use client"

import React from "react"

import { motion } from "framer-motion"
import { Shield, Car, Users, Headphones, MapPin, CheckCircle, ArrowRight } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function WhyChooseUs() {
  const { t, language } = useLanguage()

  const features = [
    {
      icon: Shield,
      title: language === "en" ? "Best Price Guarantee" : "Garantie Meilleur Prix",
      description:
        language === "en"
          ? "We offer the most competitive rates in Marrakech with no hidden fees. Our transparent pricing ensures you get the best value for your money with all taxes and basic insurance included."
          : "Nous offrons les tarifs les plus compétitifs à Marrakech sans frais cachés. Notre tarification transparente vous garantit le meilleur rapport qualité-prix avec toutes les taxes et l'assurance de base incluses.",
      color: "from-blue-500 to-blue-600",
      bgPattern: "bg-gradient-to-br from-blue-50 to-blue-100",
      features: [
        language === "en" ? "No hidden fees" : "Pas de frais cachés",
        language === "en" ? "All taxes included" : "Toutes taxes comprises",
        language === "en" ? "Basic insurance included" : "Assurance de base incluse",
      ],
    },
    {
      icon: Car,
      title: language === "en" ? "Recent & Well-Maintained Fleet" : "Flotte Récente et Bien Entretenue",
      description:
        language === "en"
          ? "Our fleet consists of recent model vehicles that undergo regular maintenance checks. Each car is thoroughly cleaned and inspected before every rental to ensure your safety and comfort."
          : "Notre flotte se compose de véhicules de modèles récents qui font l'objet de contrôles d'entretien réguliers. Chaque voiture est soigneusement nettoyée et inspectée avant chaque location pour garantir votre sécurité et votre confort.",
      color: "from-green-500 to-green-600",
      bgPattern: "bg-gradient-to-br from-green-50 to-green-100",
      features: [
        language === "en" ? "Recent models only" : "Modèles récents uniquement",
        language === "en" ? "Regular maintenance" : "Entretien régulier",
        language === "en" ? "Deep cleaned daily" : "Nettoyage approfondi quotidien",
      ],
    },
    {
      icon: Users,
      title: language === "en" ? "Personalized Customer Service" : "Service Client Personnalisé",
      description:
        language === "en"
          ? "We take pride in offering personalized service tailored to your specific needs. Our multilingual team provides expert advice on routes, destinations, and local attractions."
          : "Nous sommes fiers d'offrir un service personnalisé adapté à vos besoins spécifiques. Notre équipe multilingue fournit des conseils d'experts sur les itinéraires, les destinations et les attractions locales.",
      color: "from-purple-500 to-purple-600",
      bgPattern: "bg-gradient-to-br from-purple-50 to-purple-100",
      features: [
        language === "en" ? "Multilingual support" : "Support multilingue",
        language === "en" ? "Local expertise" : "Expertise locale",
        language === "en" ? "Tailored recommendations" : "Recommandations personnalisées",
      ],
    },
    {
      icon: Headphones,
      title: language === "en" ? "24/7 Roadside Assistance" : "Assistance Routière 24/7",
      description:
        language === "en"
          ? "Travel with peace of mind knowing our dedicated support team is available round the clock. Whether you need directions, have a question, or face an emergency, we're just a phone call away."
          : "Voyagez l'esprit tranquille en sachant que notre équipe de support dédiée est disponible 24h/24. Que vous ayez besoin d'indications, d'une question ou d'une urgence, nous sommes à un appel téléphonique.",
      color: "from-red-500 to-red-600",
      bgPattern: "bg-gradient-to-br from-red-50 to-red-100",
      features: [
        language === "en" ? "24/7 availability" : "Disponibilité 24/7",
        language === "en" ? "Emergency support" : "Support d'urgence",
        language === "en" ? "Quick response time" : "Temps de réponse rapide",
      ],
    },
    {
      icon: MapPin,
      title: language === "en" ? "Free Airport & Hotel Delivery" : "Livraison Gratuite Aéroport & Hôtel",
      description:
        language === "en"
          ? "Enjoy the convenience of free delivery and pickup at Marrakech Menara Airport and all major hotels. Start your journey hassle-free with our punctual and professional delivery service."
          : "Profitez de la commodité de la livraison et de la récupération gratuites à l'aéroport Marrakech Menara et dans tous les grands hôtels. Commencez votre voyage sans tracas avec notre service de livraison ponctuel et professionnel.",
      color: "from-orange-500 to-orange-600",
      bgPattern: "bg-gradient-to-br from-orange-50 to-orange-100",
      features: [
        language === "en" ? "Free airport delivery" : "Livraison aéroport gratuite",
        language === "en" ? "Hotel pickup service" : "Service de prise en charge à l'hôtel",
        language === "en" ? "Flexible timing" : "Horaires flexibles",
      ],
    },
  ]

  return (
    <motion.section
      className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerChildren}
    >
      {/* Moroccan Pattern Decorations */}
      <div className="absolute top-0 left-0 w-full h-64 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern
            id="moroccanPattern"
            patternUnits="userSpaceOnUse"
            width="50"
            height="50"
            patternTransform="rotate(45)"
          >
            <path
              d="M10,0 L20,0 L25,5 L30,0 L40,0 L40,10 L35,15 L40,20 L40,30 L30,30 L25,25 L20,30 L10,30 L10,20 L15,15 L10,10 Z"
              fill="none"
              stroke="#117485"
              strokeWidth="0.5"
            />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#moroccanPattern)" />
        </svg>
      </div>

      {/* Decorative Arches */}
      <div className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none">
        <svg width="100%" height="120" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,120 C240,60 480,30 720,30 C960,30 1200,60 1440,120 L1440,120 L0,120 Z" fill="#FE9305" />
        </svg>
      </div>
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <Badge className="mb-4 bg-primary/10 text-primary px-4 py-1 text-sm hover:bg-primary/20 relative">
            <span className="relative z-10">{t("whyChooseUs.badge")}</span>
            <span className="absolute inset-0 bg-primary/5 rounded-full transform scale-150"></span>
            <span className="absolute -left-3 -right-3 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></span>
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{t("whyChooseUs.title")}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === "en"
              ? "With over 10 years of experience in car rental services in Marrakech, we've built our reputation on reliability, quality, and exceptional customer service."
              : "Avec plus de 10 ans d'expérience dans les services de location de voitures à Marrakech, nous avons bâti notre réputation sur la fiabilité, la qualité et un service client exceptionnel."}
          </p>
        </motion.div>

        {/* Modern Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          {/* First Row - 2 Large Cards */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-6"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`relative h-full ${features[0].bgPattern} rounded-3xl p-8 overflow-hidden group`}>
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-r ${features[0].color} rounded-2xl flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {React.createElement(features[0].icon, { className: "w-8 h-8 text-white" })}
                  </motion.div>
                  <Badge className="bg-white/80 text-gray-700">
                    {language === "en" ? "Most Popular" : "Plus Populaire"}
                  </Badge>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-gray-900">{features[0].title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{features[0].description}</p>

                <div className="space-y-2">
                  {features[0].features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="lg:col-span-6"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`relative h-full ${features[1].bgPattern} rounded-3xl p-8 overflow-hidden group`}>
              {/* Background decoration */}
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-r ${features[1].color} rounded-2xl flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {React.createElement(features[1].icon, { className: "w-8 h-8 text-white" })}
                  </motion.div>
                  <Badge className="bg-white/80 text-gray-700">
                    {language === "en" ? "Premium Fleet" : "Flotte Premium"}
                  </Badge>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-gray-900">{features[1].title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{features[1].description}</p>

                <div className="space-y-2">
                  {features[1].features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Second Row - 3 Medium Cards */}
          {features.slice(2, 5).map((feature, index) => (
            <motion.div
              key={index + 2}
              variants={fadeInUp}
              className="lg:col-span-4"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`relative h-full ${feature.bgPattern} rounded-3xl p-6 overflow-hidden group`}>
                {/* Animated background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

                <div className="relative z-10">
                  <motion.div
                    className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {React.createElement(feature.icon, { className: "w-7 h-7 text-white" })}
                  </motion.div>

                  <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">{feature.description}</p>

                  <div className="space-y-1">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center text-gray-700">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        <span className="text-xs font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl p-8 shadow-sm relative overflow-hidden"
          variants={fadeInUp}
        >
          {/* Moroccan Arch Decoration */}
          <div className="absolute top-0 left-0 w-full h-16 opacity-10">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0,0 C320,80 640,120 960,120 C1280,120 1600,80 1920,0 L1920,0 L0,0 Z" fill="#FE9305" />
            </svg>
          </div>
          <div className="absolute -right-12 -top-12 w-64 h-64 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#117485" strokeWidth="1" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="#117485" strokeWidth="1" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="#117485" strokeWidth="1" />
            </svg>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10+", label: language === "en" ? "Years Experience" : "Années d'Expérience" },
              { number: "50K+", label: language === "en" ? "Happy Customers" : "Clients Satisfaits" },
              { number: "4.9/5", label: language === "en" ? "Average Rating" : "Note Moyenne" },
              { number: "24/7", label: language === "en" ? "Support Available" : "Support Disponible" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold text-primary mb-2">{stat.number}</h3>
                <p className="text-gray-700">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div className="mt-16 text-center" variants={fadeInUp}>
          <h3 className="text-2xl font-bold mb-4">
            {language === "en"
              ? "Ready to Experience the Best Car Rental Service in Marrakech?"
              : "Prêt à Découvrir le Meilleur Service de Location de Voitures à Marrakech?"}
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            {language === "en"
              ? "Join thousands of satisfied customers who have chosen Go Rent Car for their Moroccan adventure."
              : "Rejoignez des milliers de clients satisfaits qui ont choisi Go Rent Car pour leur aventure marocaine."}
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg group"
              onClick={() => {
                document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {language === "en" ? "Book Your Car Now" : "Réservez Votre Voiture Maintenant"}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
