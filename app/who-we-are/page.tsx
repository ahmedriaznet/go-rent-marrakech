"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoroccanPattern } from "@/components/moroccan-pattern"
import { MoroccanDivider } from "@/components/moroccan-divider"
import { Car, Clock, MapPin, Calendar, MousePointer, ThumbsUp, ArrowRight, Phone } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/context/language-context"

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

export default function WhoWeArePage() {
  const { scrollY } = useScroll()
  const heroRef = useRef(null)
  const { t } = useLanguage()

  // Parallax effect for hero section
  const y = useTransform(scrollY, [0, 300], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 1.1])

  // Features data
  const features = [
    {
      icon: Clock,
      title: t("whoWeArePage.features.items.service247.title"),
      description: t("whoWeArePage.features.items.service247.description"),
      color: "bg-primary",
    },
    {
      icon: Car,
      title: t("whoWeArePage.features.items.qualityVehicles.title"),
      description: t("whoWeArePage.features.items.qualityVehicles.description"),
      color: "bg-secondary",
    },
    {
      icon: MapPin,
      title: t("whoWeArePage.features.items.convenientLocations.title"),
      description: t("whoWeArePage.features.items.convenientLocations.description"),
      color: "bg-primary",
    },
    {
      icon: Calendar,
      title: t("whoWeArePage.features.items.easyBooking.title"),
      description: t("whoWeArePage.features.items.easyBooking.description"),
      color: "bg-secondary",
    },
  ]

  // How it works steps
  const steps = [
    {
      number: "01",
      icon: MapPin,
      title: t("whoWeArePage.process.steps.chooseDestination.title"),
      description: t("whoWeArePage.process.steps.chooseDestination.description"),
      color: "from-primary to-primary/80",
    },
    {
      number: "02",
      icon: MousePointer,
      title: t("whoWeArePage.process.steps.selectLocation.title"),
      description: t("whoWeArePage.process.steps.selectLocation.description"),
      color: "from-secondary to-secondary/80",
    },
    {
      number: "03",
      icon: Car,
      title: t("whoWeArePage.process.steps.bookCar.title"),
      description: t("whoWeArePage.process.steps.bookCar.description"),
      color: "from-primary to-primary/80",
    },
  ]

  // Why choose us reasons
  const reasons = [
    {
      icon: Calendar,
      title: t("whoWeArePage.whyChoose.reasons.easyBooking.title"),
      description: t("whoWeArePage.whyChoose.reasons.easyBooking.description"),
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: MapPin,
      title: t("whoWeArePage.whyChoose.reasons.multipleLocations.title"),
      description: t("whoWeArePage.whyChoose.reasons.multipleLocations.description"),
      color: "bg-secondary/10",
      iconColor: "text-secondary",
    },
    {
      icon: ThumbsUp,
      title: t("whoWeArePage.whyChoose.reasons.satisfaction.title"),
      description: t("whoWeArePage.whyChoose.reasons.satisfaction.description"),
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
  ]

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative h-[500px] md:h-[600px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div className="absolute inset-0" style={{ y, scale }}>
          <Image
            src="/diverse-businessman.png"
            alt="Go Rent Car professional team member"
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />

        {/* Moroccan Decorative Frame */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Left Corner */}
          <svg className="absolute top-0 left-0 w-32 h-32 text-white/20" viewBox="0 0 100 100" fill="none">
            <path d="M0,0 L40,0 C30,10 20,20 10,30 C20,20 30,10 40,0 L0,40 Z" fill="currentColor" />
            <path d="M50,0 L90,0 C80,10 70,20 60,30 C70,20 80,10 90,0 L50,40 Z" fill="currentColor" />
          </svg>

          {/* Top Right Corner */}
          <svg className="absolute top-0 right-0 w-32 h-32 text-white/20" viewBox="0 0 100 100" fill="none">
            <path d="M100,0 L60,0 C70,10 80,20 90,30 C80,20 70,10 60,0 L100,40 Z" fill="currentColor" />
            <path d="M50,0 L10,0 C20,10 30,20 40,30 C30,20 20,10 10,0 L50,40 Z" fill="currentColor" />
          </svg>
        </div>

        <motion.div
          className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white"
          style={{ opacity }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("whoWeArePage.hero.title")}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t("whoWeArePage.hero.subtitle")}
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Moroccan-inspired divider */}
      <MoroccanDivider color="#FE9305" className="-mt-1 relative z-20" />

      {/* About Go Rent Section */}
      <motion.section
        className="py-20 bg-white relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <MoroccanPattern color="#117485" opacity={0.03} />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4 bg-primary/10 text-primary px-4 py-1 text-sm hover:bg-primary/20">
                {t("whoWeArePage.about.badge")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("whoWeArePage.about.title")}</h2>
              <div className="space-y-4 text-gray-700">
                <p>{t("whoWeArePage.about.description1")}</p>
                <p>{t("whoWeArePage.about.description2")}</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative rounded-2xl overflow-hidden h-[400px] shadow-xl">
              <Image
                src="/diverse-group.png"
                alt="Go Rent Car diverse team representing our mission"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t("whoWeArePage.about.mission.title")}</h3>
                  <p className="text-gray-700">{t("whoWeArePage.about.mission.description")}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 bg-gray-50 relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <MoroccanPattern color="#FE9305" opacity={0.03} />
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <Badge className="mb-4 bg-primary/10 text-primary px-4 py-1 text-sm hover:bg-primary/20">
              {t("whoWeArePage.features.badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("whoWeArePage.features.title")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("whoWeArePage.features.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex items-start gap-5 hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`${feature.color} rounded-full p-4 text-white flex-shrink-0`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How it works Section */}
      <motion.section
        className="py-20 bg-white relative overflow-hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <MoroccanPattern color="#117485" opacity={0.03} />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <Badge className="mb-4 bg-secondary/10 text-secondary px-4 py-1 text-sm hover:bg-secondary/20">
              {t("whoWeArePage.process.badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("whoWeArePage.process.title")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("whoWeArePage.process.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div key={index} variants={fadeInUp} className="relative">
                {/* Connecting line between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[calc(50%+40px)] right-0 h-0.5 bg-gray-200 z-0"></div>
                )}

                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative z-10 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`bg-gradient-to-r ${step.color} rounded-full p-4 text-white`}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <span className="text-4xl font-bold text-gray-200">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 flex-grow">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section
        className="py-20 bg-gradient-to-b from-gray-50 to-white relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <MoroccanPattern color="#FE9305" opacity={0.03} />
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <Badge className="mb-4 bg-primary/10 text-primary px-4 py-1 text-sm hover:bg-primary/20">
              {t("whoWeArePage.whyChoose.badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("whoWeArePage.whyChoose.title")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("whoWeArePage.whyChoose.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 h-full"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`${reason.color} rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6`}>
                  <reason.icon className={`w-8 h-8 ${reason.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Team Image */}
          <motion.div variants={fadeInUp} className="relative rounded-2xl overflow-hidden h-[400px] shadow-xl">
            <Image src="/diverse-woman-portrait.png" alt="Go Rent Car team member" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="p-8 md:p-12 md:max-w-md">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{t("whoWeArePage.cta.title")}</h3>
                <p className="text-white/90 mb-6">{t("whoWeArePage.cta.subtitle")}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact">
                    <Button className="bg-white text-secondary hover:bg-white/90 font-bold px-6 py-6 rounded-xl shadow-lg">
                      <Phone className="mr-2 h-5 w-5" />
                      {t("whoWeArePage.cta.contactUs")}
                    </Button>
                  </Link>
                  <Link href="/cars">
                    <Button className="bg-primary text-white hover:bg-primary/90 font-bold px-6 py-6 rounded-xl shadow-lg">
                      {t("whoWeArePage.cta.bookCar")}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  )
}
