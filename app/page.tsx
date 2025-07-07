"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { BookingForm } from "@/components/booking-form" // Correct import path
import { Newsletter } from "@/components/newsletter"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChevronRight,
  MapPin,
  Shield,
  Clock,
  CheckCircle2,
  HelpCircle,
  FileText,
  CreditCard,
  Plane,
  Map,
  AlertTriangle,
  CalendarClock,
  Fuel,
  Baby,
  CreditCardIcon,
  ShieldCheck,
  Calendar,
} from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollProgress } from "@/components/scroll-progress"
import { GoogleReviews } from "@/components/google-reviews"
import { WhyChooseUs } from "@/components/why-choose-us"
import { cn } from "@/lib/utils"
import { MoroccanDivider } from "@/components/moroccan-divider"
import { MoroccanPattern } from "@/components/moroccan-pattern"
import { CarCard } from "@/components/car-card"
import { useRouter } from "next/navigation"
import { InfinityIcon } from "lucide-react" // Renaming Infinity to InfinityIcon if there's a name clash, or just use Infinity

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

export default function Home() {
  const { scrollY } = useScroll()
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef)
  const { t, language, setLanguage } = useLanguage()
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [homeKey, setHomeKey] = useState(0) // Use a different name to avoid conflict if 'key' is used elsewhere

  const router = useRouter()

  useEffect(() => {
    setHomeKey((prevKey) => prevKey + 1)
  }, [language])

  useEffect(() => {
    // Disable browser scroll restoration
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual"

      // Force immediate scroll to top - multiple methods for reliability
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      window.scrollTo(0, 0)

      // Disable smooth scrolling temporarily
      document.documentElement.style.scrollBehavior = "auto"
      document.body.style.scrollBehavior = "auto"

      // Additional positioning
      requestAnimationFrame(() => {
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      })

      // Re-enable smooth scrolling after positioning is complete
      const timer = setTimeout(() => {
        document.documentElement.style.scrollBehavior = "smooth"
        document.body.style.scrollBehavior = "smooth"
      }, 100)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Limit the parallax effect to avoid breaking the layout - make it more subtle
  const y = useTransform(scrollY, [0, 500], [0, 50])
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3])
  const scale = useTransform(scrollY, [0, 500], [1, 1.05])

  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
    { code: "ar", name: "العربية" },
  ]

  // Complete car data with all 25 vehicles
  const cars = [
    {
      id: 1,
      name: "Audi A3 Sportback",
      brand: "Audi",
      imageUrl: "/Audi A3 Sportback.avif",
      price: 85,
      transmission: "Manual",
      seats: 5,
      category: "Compact",
      fuel: "Diesel",
      ac: true,
      popular: false,
      bodyType: "compact",
      locations: ["Marrakech-Aéroport", "Casablanca - Aéroport"],
      quickFilter: "luxury",
      year: 2024,
    },
    {
      id: 2,
      name: "Audi Q8 S Line",
      brand: "Audi",
      imageUrl: "/AUDI Q8 S LINE.webp",
      price: 180,
      transmission: "Manual",
      seats: 7,
      category: "Luxury SUV",
      fuel: "Diesel",
      ac: true,
      popular: true,
      bodyType: "suv",
      locations: ["Marrakech-Aéroport", "Rabat - Aéroport"],
      quickFilter: "luxury",
      year: 2024,
    },
    {
      id: 3,
      name: "BMW Series 2 Pack M",
      brand: "BMW",
      imageUrl: "/BMW SERIES 2 PACK M.webp",
      price: 95,
      transmission: "Manual",
      seats: 5,
      category: "Sports Coupe",
      fuel: "Diesel",
      ac: true,
      popular: false,
      bodyType: "sports-coupe",
      locations: ["Marrakech-Aéroport", "Casablanca - Aéroport"],
      quickFilter: "luxury",
      year: 2024,
    },
    {
      id: 4,
      name: "Citroen C3",
      brand: "Citroen",
      imageUrl: "/CITROEN C3.webp",
      price: 35,
      transmission: "Manual",
      seats: 5,
      category: "Economy",
      fuel: "Diesel",
      ac: true,
      popular: true,
      bodyType: "economy",
      locations: ["Marrakech-Aéroport", "Fés - Aéroport", "Agadir-Aéroport"],
      quickFilter: "economy",
      year: 2024,
    },
    {
      id: 5,
      name: "Dacia Duster",
      brand: "Dacia",
      imageUrl: "/DACIA DUSTER.webp",
      price: 45,
      transmission: "Manual",
      seats: 5,
      category: "SUV",
      fuel: "Diesel",
      ac: true,
      popular: true,
      bodyType: "suv",
      locations: ["Marrakech-Aéroport", "Agadir-Aéroport", "Tanger-Aéroport"],
      quickFilter: "suv",
      year: 2024,
    },
    {
      id: 6,
      name: "Dacia Lodgy",
      brand: "Dacia",
      imageUrl: "/DACIA LODGY.webp",
      price: 55,
      transmission: "Manual",
      seats: 7,
      category: "Family MPV",
      fuel: "Diesel",
      ac: true,
      popular: false,
      bodyType: "family-mpv",
      locations: ["Marrakech-Aéroport", "Casablanca - Aéroport"],
      quickFilter: "family",
      year: 2024,
    },
    {
      id: 7,
      name: "Dacia Logan",
      brand: "Dacia",
      imageUrl: "/DACIA LOGAN.webp",
      price: 30,
      transmission: "Manual",
      seats: 5,
      category: "Sedan",
      fuel: "Diesel",
      ac: true,
      popular: false,
      bodyType: "sedan",
      locations: ["Marrakech-Aéroport", "Fés - Aéroport", "Rabat - Aéroport"],
      quickFilter: "economy",
      year: 2024,
    },
    {
      id: 8,
      name: "Dacia Sandero",
      brand: "Dacia",
      imageUrl: "/DACIA SANDERO.webp",
      price: 32,
      transmission: "Manual",
      seats: 5,
      category: "Economy",
      fuel: "Diesel",
      ac: true,
      popular: true,
      bodyType: "economy",
      locations: ["Marrakech-Aéroport", "Agadir-Aéroport", "Tanger-Aéroport"],
      quickFilter: "economy",
      year: 2024,
    },
    {
      id: 9,
      name: "Fiat 500 Cabriolet",
      brand: "Fiat",
      imageUrl: "/FIAT 500 CABRIOLET AUTOMATIQUE.webp",
      price: 65,
      transmission: "Automatic",
      seats: 4,
      category: "Convertible",
      fuel: "Diesel",
      ac: true,
      popular: false,
      bodyType: "sports-coupe",
      locations: ["Marrakech-Aéroport", "Casablanca - Aéroport"],
      quickFilter: "luxury",
      year: 2024,
    },
    {
      id: 10,
      name: "Hyundai Accent",
      brand: "Hyundai",
      imageUrl: "/HYUNDAI ACCENT.webp",
      price: 38,
      transmission: "Manual",
      seats: 5,
      category: "Compact",
      fuel: "Diesel",
      ac: true,
      popular: false,
      bodyType: "compact",
      locations: ["Marrakech-Aéroport", "Fés - Aéroport"],
      quickFilter: "economy",
      year: 2024,
    },
    {
      id: 11,
      name: "Hyundai i10",
      brand: "Hyundai",
      imageUrl: "/HYUNDAI I10 ESSANCE.avif",
      price: 28,
      transmission: "Manual",
      seats: 4,
      category: "Economy",
      fuel: "Petrol",
      ac: true,
      popular: true,
      bodyType: "economy",
      locations: ["Marrakech-Aéroport", "Agadir-Aéroport", "Casablanca - Aéroport"],
      quickFilter: "economy",
      year: 2024,
    },
    {
      id: 12,
      name: "Hyundai Tucson",
      brand: "Hyundai",
      imageUrl: "/HYUNDAI TUCSON.webp",
      price: 75,
      transmission: "Manual",
      seats: 5,
      category: "SUV",
      fuel: "Diesel",
      ac: true,
      popular: false,
      bodyType: "suv",
      locations: ["Marrakech-Aéroport", "Rabat - Aéroport"],
      quickFilter: "suv",
      year: 2024,
    },
    {
      id: 13,
      name: "Jeep Renegade",
      brand: "Jeep",
      imageUrl: "/JEEP RENEGADE.webp",
      price: 68,
      transmission: "Manual",
      seats: 5,
      category: "SUV",
      fuel: "Diesel",
      ac: true,
      popular: false,
      bodyType: "suv",
      locations: ["Marrakech-Aéroport", "Agadir-Aéroport"],
      quickFilter: "suv",
      year: 2024,
    },
    {
      id: 14,
      name: "Kia Picanto",
      brand: "Kia",
      imageUrl: "/KIA PICANTO.webp",
      price: 25,
      transmission: "Manual",
      seats: 4,
      category: "Economy",
      fuel: "Diesel",
      ac: true,
      popular: true,
      bodyType: "economy",
      locations: ["Marrakech-Aéroport", "Fés - Aéroport", "Tanger-Aéroport"],
      quickFilter: "economy",
      year: 2024,
    },
    {
      id: 15,
      name: "Mercedes Classe A 200 Pack AMG",
      brand: "Mercedes",
      imageUrl: "/MERCEDES CLASSE A 200 PACK AMG.webp",
      price: 120,
      transmission: "Manual",
      seats: 5,
      category: "Luxury",
      fuel: "Diesel",
      ac: true,
      popular: true,
      bodyType: "luxury",
      locations: ["Marrakech-Aéroport", "Casablanca - Aéroport"],
      quickFilter: "luxury",
      year: 2024,
    },
    {
      id: 16,
      name: "Mercedes Classe A",
      brand: "Mercedes",
      imageUrl: "/MERCEDES CLASSE A.webp",
      price: 95,
      transmission: "Manual",
      seats: 5,
      category: "Luxury",
      fuel: "Diesel",
      ac: true,
      popular: false,
      bodyType: "luxury",
      locations: ["Marrakech-Aéroport", "Rabat - Aéroport"],
      quickFilter: "luxury",
      year: 2024,
    },
    {
      id: 17,
      name: "Peugeot 208",
      brand: "Peugeot",
      imageUrl: "/PEUGEOT 208.webp",
      price: 42,
      transmission: "Manual",
      seats: 5,
      category: "Compact",
      fuel: "Diesel",
      ac: true,
      popular: false,
      bodyType: "compact",
      locations: ["Marrakech-Aéroport", "Fés - Aéroport", "Agadir-Aéroport"],
      quickFilter: "economy",
      year: 2024,
    },
    {
      id: 18,
      name: "Porsche Macan GTS",
      brand: "Porsche",
      imageUrl: "/PORSCHE MACAN GTS.webp",
      price: 250,
      transmission: "Manual",
      seats: 5,
      category: "Luxury SUV",
      fuel: "Diesel",
      ac: true,
      popular: false,
      bodyType: "luxury",
      locations: ["Marrakech-Aéroport", "Casablanca - Aéroport"],
      quickFilter: "luxury",
      year: 2024,
    },
    {
      id: 19,
      name: "Range Rover Autobiography",
      brand: "Range Rover",
      imageUrl: "/RANGE ROVER AUTOBIOGRAPHY.webp",
      price: 300,
      transmission: "Manual",
      seats: 7,
      category: "Luxury SUV",
      fuel: "Diesel",
      ac: true,
      popular: false,
      bodyType: "luxury",
      locations: ["Marrakech-Aéroport", "Casablanca - Aéroport"],
      quickFilter: "luxury",
      year: 2024,
    },
    {
      id: 20,
      name: "Range Rover Evoque R Dynamic",
      brand: "Range Rover",
      imageUrl: "/RANGE ROVER EVOQUE R DYNAMIC.webp",
      price: 150,
      transmission: "Manual",
      seats: 5,
      category: "Luxury SUV",
      fuel: "Diesel",
      ac: true,
      popular: true,
      bodyType: "luxury",
      locations: ["Marrakech-Aéroport", "Rabat - Aéroport"],
      quickFilter: "luxury",
      year: 2024,
    },
    {
      id: 21,
      name: "Range Rover Sport",
      brand: "Range Rover",
      imageUrl: "/RANGE ROVER SPORT.webp",
      price: 200,
      transmission: "Manual",
      seats: 7,
      category: "Luxury SUV",
      fuel: "Diesel",
      ac: true,
      popular: false,
      bodyType: "luxury",
      locations: ["Marrakech-Aéroport", "Casablanca - Aéroport"],
      quickFilter: "luxury",
      year: 2024,
    },
    {
      id: 22,
      name: "Renault Clio 5",
      brand: "Renault",
      imageUrl: "/RENAULT CLIO 5.webp",
      price: 40,
      transmission: "Manual",
      seats: 5,
      category: "Compact",
      fuel: "Diesel",
      ac: true,
      popular: true,
      bodyType: "compact",
      locations: ["Marrakech-Aéroport", "Fés - Aéroport", "Tanger-Aéroport"],
      quickFilter: "economy",
      year: 2024,
    },
    {
      id: 23,
      name: "Volkswagen Golf 8 R Line",
      brand: "Volkswagen",
      imageUrl: "/VOLKSWAGEN GOLF 8 R LINE.webp",
      price: 78,
      transmission: "Manual",
      seats: 5,
      category: "Compact",
      fuel: "Diesel",
      ac: true,
      popular: false,
      bodyType: "compact",
      locations: ["Marrakech-Aéroport", "Casablanca - Aéroport"],
      quickFilter: "compact",
      year: 2024,
    },
    {
      id: 24,
      name: "Volkswagen T-ROC",
      brand: "Volkswagen",
      imageUrl: "/VOLKSWAGEN T-ROC.webp",
      price: 85,
      transmission: "Manual",
      seats: 5,
      category: "Crossover",
      fuel: "Diesel",
      ac: true,
      popular: false,
      bodyType: "crossover",
      locations: ["Marrakech-Aéroport", "Rabat - Aéroport"],
      quickFilter: "suv",
      year: 2024,
    },
    {
      id: 25,
      name: "Volkswagen Touareg",
      brand: "Volkswagen",
      imageUrl: "/VOLKSWAGEN TOUAREG.webp",
      price: 140,
      transmission: "Manual",
      seats: 7,
      category: "SUV",
      fuel: "Diesel",
      ac: true,
      popular: false,
      bodyType: "suv",
      locations: ["Marrakech-Aéroport", "Casablanca - Aéroport"],
      quickFilter: "suv",
      year: 2024,
    },
  ]

  // Define keys for the 12 home page FAQs
  const homeFaqKeys = [
    "q_bookCar",
    "q_documents",
    "q_deposit",
    "q_delivery",
    "q_travelMorocco",
    "q_accidentBreakdown",
    "q_mileageLimit",
    "q_extendRental",
    "q_fuelPolicy",
    "q_childSeatsGps",
    "q_paymentMethods",
    "q_insuranceCover",
  ]

  // Define icons in the same order as keys
  const homeFaqIcons = [
    <FileText key="filetext1" className="w-5 h-5 text-primary" />,
    <FileText key="filetext2" className="w-5 h-5 text-primary" />,
    <CreditCard key="creditcard" className="w-5 h-5 text-primary" />,
    <Plane key="plane" className="w-5 h-5 text-primary" />,
    <Map key="map" className="w-5 h-5 text-primary" />,
    <AlertTriangle key="alerttriangle" className="w-5 h-5 text-primary" />,
    <InfinityIcon key="infinityicon" className="w-5 h-5 text-primary" />,
    <CalendarClock key="calendarclock" className="w-5 h-5 text-primary" />,
    <Fuel key="fuel" className="w-5 h-5 text-primary" />,
    <Baby key="baby" className="w-5 h-5 text-primary" />,
    <CreditCardIcon key="creditcardicon" className="w-5 h-5 text-primary" />,
    <ShieldCheck key="shieldcheck" className="w-5 h-5 text-primary" />,
  ]

  // Generate the faqs data with translated content
  const faqsData = homeFaqKeys.map((key, index) => ({
    id: key, // Use key as id
    question: t(`faq.homePageFaqs.${key}.question`),
    answer: t(`faq.homePageFaqs.${key}.answer`),
    icon: homeFaqIcons[index],
  }))

  return (
    <>
      <main className="flex min-h-screen flex-col overflow-x-hidden">
        <ScrollProgress />

        {/* Hero Section */}
        <motion.section
          id="hero"
          ref={heroRef}
          className="relative h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div className="absolute inset-0" style={{ y, scale }} initial={{ scale: 1 }} animate={{ scale: 1 }}>
            <Image
              src="/jemaa-el-fnaa-sunset.webp"
              alt="Jemaa el-Fnaa square in Marrakech at sunset with Koutoubia Mosque"
              fill
              priority
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
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

            {/* Bottom Left Corner */}
            <svg className="absolute bottom-0 left-0 w-32 h-32 text-white/20" viewBox="0 0 100 100" fill="none">
              <path d="M0,100 L40,100 C30,90 20,80 10,70 C20,80 30,90 40,100 L0,60 Z" fill="currentColor" />
              <path d="M50,100 L90,100 C80,90 70,80 60,70 C70,80 80,90 90,100 L50,60 Z" fill="currentColor" />
            </svg>

            {/* Bottom Right Corner */}
            <svg className="absolute bottom-0 right-0 w-32 h-32 text-white/20" viewBox="0 0 100 100" fill="none">
              <path d="M100,100 L60,100 C70,90 80,80 90,70 C80,80 70,90 60,100 L100,60 Z" fill="currentColor" />
              <path d="M50,100 L10,100 C20,90 30,80 40,70 C30,80 20,90 10,100 L50,60 Z" fill="currentColor" />
            </svg>
          </div>

          <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white pt-44 md:pt-40 lg:pt-28 pb-32 md:pb-28 lg:pb-20">
            <motion.div style={{ opacity }} className="w-full flex flex-col items-center">
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 max-w-4xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {language === "en" ? "Premium Car Rental in Marrakech" : "Location de Voitures Premium à Marrakech"}
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl mb-8 max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {language === "en"
                  ? "Explore Morocco in comfort and style with our premium fleet of rental cars"
                  : "Explorez le Maroc avec confort et style grâce à notre flotte premium de voitures de location"}
              </motion.p>
            </motion.div>

            {/* Increased width for the booking form container */}
            <motion.div
              className="w-full max-w-6xl bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <BookingForm isHero={true} />
            </motion.div>
          </div>

          {/* Clean divider between hero and next section */}
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <div className="h-1 bg-primary/30"></div>
          </div>
        </motion.section>

        {/* Moroccan-inspired divider */}
        <MoroccanDivider color="#FE9305" className="-mt-16 relative z-20" />

        {/* Quick Info Bar */}
        <motion.section
          className={cn(
            "bg-gradient-to-r from-white to-gray-50 py-6 border-b border-gray-100 sticky shadow-md transition-all duration-300 z-30",
            isScrolled ? "top-[76px]" : "top-[90px]",
          )}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-stretch md:flex-row md:justify-between md:items-center gap-4 md:gap-0">
              <div className="flex flex-col items-start gap-4 md:flex-row md:flex-wrap md:items-center md:gap-8">
                <div className="flex items-center">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mr-3 shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium">{t("quickInfo.freeCancel")}</p>
                    <p className="text-xs text-gray-500">{t("quickInfo.freeCancel24h")}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mr-3 shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Clock className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium">{t("quickInfo.support247")}</p>
                    <p className="text-xs text-gray-500">{t("quickInfo.permanentAssist")}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {" "}
                  {/* This was previously hidden on mobile, now always flex */}
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mr-3 shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Shield className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium">Insurance Included</p>
                    <p className="text-xs text-gray-500">Full coverage for peace of mind</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center w-full md:w-auto">
                <motion.div className="w-full md:w-auto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/cars" className="block w-full md:w-auto">
                    <Button className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-base w-full md:w-auto">
                      {t("cta.button")}
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Car Fleet Section */}
        <motion.section
          className="py-20 bg-gradient-to-b from-white to-gray-50 relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <MoroccanPattern color="#117485" opacity={0.03} />
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-12" variants={fadeInUp}>
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 px-4 py-1 text-sm">
                {t("fleet.badge")}
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{t("fleet.title")}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("fleet.subtitle")}</p>
            </motion.div>

            {/* Car Cards - Display first 9 cars */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="initial"
              animate="animate"
              variants={staggerChildren}
            >
              {cars.slice(0, 9).map((car) => (
                <motion.div key={car.id} variants={fadeInUp}>
                  <CarCard
                    id={car.id}
                    name={car.name}
                    image={car.imageUrl}
                    price={car.price}
                    transmission={car.transmission}
                    seats={car.seats}
                    category={car.category}
                    fuel={car.fuel}
                    ac={car.ac}
                    popular={car.popular}
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="text-center mt-12" variants={fadeInUp}>
              <Link href="/cars">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-white transition-colors group rounded-xl px-8 py-6 font-bold"
                >
                  {t("fleet.viewAll")}
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* News Section */}
        <motion.section
          className="py-20 bg-gray-50"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
          key={homeKey} // ADDED LINE
        >
          <MoroccanDivider color="#FE9305" flip={true} className="absolute top-0 left-0 right-0 -mt-16" />
          <MoroccanPattern color="#117485" opacity={0.03} />
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-12" variants={fadeInUp}>
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 px-4 py-1 text-sm">
                Latest News
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Stay informed about the latest news
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our latest articles, tips and offers for your car rental in Marrakech
              </p>
            </motion.div>

            <div className="space-y-8">
              {/* Featured Article - Full Width */}
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -10 }}
              >
                <Link href="/blog/professional-reliable-car-rental">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-64 lg:h-full overflow-hidden">
                      <Image
                        src="/Professional and reliable car rental in Marrakech.jpg"
                        alt="Professional and reliable car rental in Marrakech"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-white">Featured</Badge>
                      </div>
                    </div>

                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {t("blog.posts.professional-reliable-car-rental.title")}
                      </h3>
                      <p className="text-gray-600 mb-6">{t("blog.posts.professional-reliable-car-rental.excerpt")}</p>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>May 15, 2023</span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>5 min read</span>
                        </div>
                      </div>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white group">
                          Read Full Article
                          <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* First Row of 2 Articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: t("blog.posts.automatic-car-rental.title"), // You'll need to add this key to your translation files
                    excerpt: t("blog.posts.automatic-car-rental.excerpt"), // You'll need to add this key
                    image: "/Automatic car rental in Marrakech.jpg",
                    slug: "automatic-car-rental",
                    category: t("blog.categories.Vehicles"),
                    date: "April 22, 2023",
                    readTime: "3 min read",
                  },
                  {
                    title: t("blog.posts.manual-car-rental.title"),
                    excerpt: t("blog.posts.manual-car-rental.excerpt"),
                    image: "/Manual car rental in Marrakech.jpg",
                    slug: "manual-car-rental",
                    category: t("blog.categories.Vehicles"),
                    date: "April 10, 2023",
                    readTime: "4 min read",
                  },
                ].map((post, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -10 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-secondary/80 text-white">{post.category}</Badge>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center text-gray-500 text-sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="outline"
                            className="w-full border-primary text-primary hover:bg-primary/5 group"
                          >
                            Read More
                            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </motion.div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Second Row of 2 Articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: t("blog.posts.cheap-car-rental.title"),
                    excerpt: t("blog.posts.cheap-car-rental.excerpt"),
                    image: "/Cheap car rental in Marrakech.jpg",
                    slug: "cheap-car-rental",
                    category: t("blog.categories.Offers"),
                    date: "March 18, 2023",
                    readTime: "3 min read",
                  },
                  {
                    title: t("blog.posts.car-rental-go-rent.title"),
                    excerpt: t("blog.posts.car-rental-go-rent.excerpt"),
                    image: "/marrakech-medina-markets-new.png",
                    slug: "car-rental-go-rent",
                    category: t("blog.categories.Services"),
                    date: "March 5, 2023",
                    readTime: "5 min read",
                  },
                ].map((post, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -10 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-secondary/80 text-white">{post.category}</Badge>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center text-gray-500 text-sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="outline"
                            className="w-full border-primary text-primary hover:bg-primary/5 group"
                          >
                            Read More
                            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </motion.div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div className="text-center mt-10" variants={fadeInUp}>
              <Link href="/blog">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-white transition-colors group rounded-xl px-6 py-6 font-bold hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  View All News
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Moroccan-inspired divider */}
        <MoroccanDivider color="#117485" flip={true} className="relative z-10" />

        {/* Destinations */}
        <motion.section
          className="py-20 bg-gradient-to-r from-secondary to-secondary/90 text-white"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          {/* Palm Tree Silhouette */}
          <div className="absolute right-0 bottom-0 h-64 w-64 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M50,100 L55,100 L55,60 C65,55 75,45 80,30 C70,35 65,35 55,30 C65,25 75,15 78,5 C68,15 62,15 55,15 L55,10 C65,0 70,-5 75,-10 C60,0 55,0 50,0 C45,0 40,0 25,-10 C30,-5 35,0 45,10 L45,15 C38,15 32,15 22,5 C25,15 35,25 45,30 C35,35 30,35 20,30 C25,45 35,55 45,60 L45,100 L50,100 Z"
                fill="#000"
              />
            </svg>
          </div>
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-12" variants={fadeInUp}>
              <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 px-4 py-1 text-sm">
                {t("destinations.badge")}
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{t("destinations.title")}</h2>
              <p className="text-lg max-w-2xl mx-auto">{t("destinations.subtitle")}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: t("destinations.items.medina"),
                  image: "/marrakech-medina-markets-new.png",
                  distance: t("destinations.distance.cityCenter"),
                },
                {
                  name: t("destinations.items.atlas"),
                  image: "/atlas-mountains-snow-new.png",
                  distance: t("destinations.distance.oneHalfHour"),
                },
                {
                  name: t("destinations.items.essaouira"),
                  image: "/essaouira-blue-boats.png",
                  distance: t("destinations.distance.twoHalfHours"),
                },
                {
                  name: t("destinations.items.sahara"),
                  image: "/Sahara Desert.jpg",
                  distance: t("destinations.distance.eightHours"),
                },
              ].map((dest, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="relative rounded-2xl overflow-hidden group h-64"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={dest.image || "/placeholder.svg"}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold mb-2">{dest.name}</h3>
                    <p className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-1" /> {dest.distance}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Google Reviews */}
        <motion.section
          className="py-20 bg-gray-50"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-12" variants={fadeInUp}>
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 px-4 py-1 text-sm">
                {t("testimonials.badge")}
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {t("testimonials.title")}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("testimonials.subtitle")}</p>
            </motion.div>

            <motion.div className="max-w-6xl mx-auto" variants={fadeInUp}>
              <GoogleReviews />
            </motion.div>
          </div>
        </motion.section>

        {/* Moroccan-inspired divider */}
        <MoroccanDivider color="#FE9305" className="relative z-10" />

        {/* FAQ Section - Redesigned with 2 columns */}
        <motion.section
          className="py-20 bg-gray-50 overflow-hidden relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <MoroccanPattern color="#117485" opacity={0.03} />
          {/* Moroccan Tile Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23117485' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "60px 60px",
              }}
            ></div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div className="text-center mb-12" variants={fadeInUp}>
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 px-4 py-1 text-sm">
                {t("faq.badge")}
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{t("faq.title")}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("faq.subtitle")}</p>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* FAQ Icon */}
              <motion.div
                className="hidden lg:flex w-full max-w-xs mx-auto lg:mx-0"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full">
                  <div className="bg-primary/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <HelpCircle className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4">{t("faq.needMoreHelp.title")}</h3>
                  <p className="text-gray-600 text-center mb-6">{t("faq.needMoreHelp.description")}</p>
                  <Link href="/contact">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      {t("faq.contactSupport")}
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* FAQ Columns */}
              <motion.div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6" variants={fadeInUp}>
                {/* Left Column */}
                <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
                  <Accordion type="single" collapsible className="w-full">
                    {faqsData.slice(0, 6).map((faqItem, index) => (
                      <AccordionItem
                        key={faqItem.id}
                        value={`item-left-${index}`}
                        className="border-b border-gray-100 py-2"
                      >
                        <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-primary transition-colors">
                          <div className="flex items-center">
                            <span className="mr-3">{faqItem.icon}</span>
                            <span>{faqItem.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 pl-10">{faqItem.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                {/* Right Column */}
                <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
                  <Accordion type="single" collapsible className="w-full">
                    {faqsData.slice(6).map((faqItem, index) => (
                      <AccordionItem
                        key={faqItem.id}
                        value={`item-right-${index}`}
                        className="border-b border-gray-100 py-2"
                      >
                        <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-primary transition-colors">
                          <div className="flex items-center">
                            <span className="mr-3">{faqItem.icon}</span>
                            <span>{faqItem.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 pl-10">{faqItem.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </motion.div>
            </div>

            {/* Mobile CTA - visible only on smaller screens */}
            <motion.div className="mt-10 lg:hidden" variants={fadeInUp}>
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <h3 className="text-xl font-bold mb-4">Still Have Questions?</h3>
                <p className="text-gray-600 mb-6">
                  Our customer support team is here to help you with any questions you may have.
                </p>
                <Link href="/contact">
                  <Button className="bg-primary hover:bg-primary/90 text-white">Contact Us</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          className="py-20 bg-white"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <MoroccanPattern color="#117485" opacity={0.03} />
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: "50,000+", label: t("stats.clients") },
                { number: "80+", label: t("stats.vehicles") },
                { number: "100+", label: t("stats.destinations") },
                { number: "4.9", label: t("stats.rating") },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 flex flex-col items-center text-center"
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <motion.h3
                    className="text-4xl md:text-5xl font-bold text-primary mb-2"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    viewport={{ once: true }}
                  >
                    {stat.number}
                  </motion.h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Newsletter */}
        <motion.section
          className="py-20 bg-gray-50"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
        >
          <MoroccanPattern color="#FE9305" opacity={0.03} />
          <div className="container mx-auto px-4">
            <motion.div className="max-w-3xl mx-auto text-center" variants={fadeInUp}>
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 px-4 py-1 text-sm">
                {t("newsletter.badge")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("newsletter.title")}</h2>
              <p className="text-lg text-gray-600 mb-8">{t("newsletter.subtitle")}</p>
              <Newsletter />
            </motion.div>
          </div>
        </motion.section>
      </main>
    </>
  )
}
