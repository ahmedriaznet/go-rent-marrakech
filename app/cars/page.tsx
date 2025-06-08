"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Filter,
  X,
  MapPin,
  CarIcon,
  Tag,
  SlidersHorizontal,
  Check,
  Phone,
  ArrowRight,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CarCard } from "@/components/car-card"
import { MoroccanPattern } from "@/components/moroccan-pattern"
import { MoroccanDivider } from "@/components/moroccan-divider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
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

export default function FleetPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300])
  const [sortOption, setSortOption] = useState("popular")
  const [filteredCars, setFilteredCars] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilterTab, setActiveFilterTab] = useState<string>("")
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

  const { t } = useLanguage()

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const carsPerPage = 10

  // Location options
  const locations = [
    "Agadir-Aéroport",
    "Casablanca - Aéroport",
    "Eljadida - Aéroport",
    "Fés - Aéroport",
    "Marrakech-Aéroport",
    "Rabat - Aéroport",
    "Tanger-Aéroport",
  ]

  // Brand options
  const brands = [
    "Audi",
    "BMW",
    "Citroën",
    "Dacia",
    "Fiat",
    "Hyundai",
    "Jeep",
    "Kia",
    "Mercedes",
    "Peugeot",
    "Porsche",
    "Range Rover",
    "Renault",
    "Volkswagen",
  ]

  // Body type options
  const bodyTypes = [
    { id: "crossover", name: t("fleetPage.filters.bodyTypes.crossover") },
    { id: "family-mpv", name: t("fleetPage.filters.bodyTypes.familyMpv") },
    { id: "pickup", name: t("fleetPage.filters.bodyTypes.pickup") },
    { id: "sedan", name: t("fleetPage.filters.bodyTypes.sedan") },
    { id: "sports-coupe", name: t("fleetPage.filters.bodyTypes.sportsCoupe") },
    { id: "compact", name: t("fleetPage.filters.bodyTypes.compact") },
    { id: "luxury", name: t("fleetPage.filters.bodyTypes.luxury") },
    { id: "economy", name: t("fleetPage.filters.bodyTypes.economy") },
    { id: "suv", name: t("fleetPage.filters.bodyTypes.suv") },
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

  // Pagination calculations
  const totalPages = Math.ceil(filteredCars.length / carsPerPage)
  const startIndex = (currentPage - 1) * carsPerPage
  const endIndex = startIndex + carsPerPage
  const currentCars = filteredCars.slice(startIndex, endIndex)

  // Close mobile filters when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowMobileFilters(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Filter cars based on selected filters
  useEffect(() => {
    setIsLoading(true)

    // Simulate loading delay
    setTimeout(() => {
      let filtered = [...cars]

      // Apply quick filter only if one is selected
      if (activeFilterTab) {
        filtered = filtered.filter((car) => car.quickFilter === activeFilterTab)
      }

      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(
          (car) =>
            car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.brand.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }

      // Filter by locations
      if (selectedLocations.length > 0) {
        filtered = filtered.filter((car) => car.locations.some((location) => selectedLocations.includes(location)))
      }

      // Filter by brands
      if (selectedBrands.length > 0) {
        filtered = filtered.filter((car) => selectedBrands.includes(car.brand))
      }

      // Filter by body types
      if (selectedBodyTypes.length > 0) {
        filtered = filtered.filter((car) => selectedBodyTypes.includes(car.bodyType))
      }

      // Filter by price range
      filtered = filtered.filter((car) => car.price >= priceRange[0] && car.price <= priceRange[1])

      // Sort cars
      switch (sortOption) {
        case "price-low":
          filtered.sort((a, b) => a.price - b.price)
          break
        case "price-high":
          filtered.sort((a, b) => b.price - a.price)
          break
        case "popular":
          filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))
          break
        default:
          break
      }

      setFilteredCars(filtered)
      setIsLoading(false)
    }, 500)
  }, [searchTerm, selectedLocations, selectedBrands, selectedBodyTypes, priceRange, sortOption, activeFilterTab])

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedLocations, selectedBrands, selectedBodyTypes, priceRange, sortOption, activeFilterTab])

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((loc) => loc !== location) : [...prev, location],
    )
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const toggleBodyType = (bodyType: string) => {
    setSelectedBodyTypes((prev) =>
      prev.includes(bodyType) ? prev.filter((bt) => bt !== bodyType) : [...prev, bodyType],
    )
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedLocations([])
    setSelectedBrands([])
    setSelectedBodyTypes([])
    setPriceRange([0, 300])
    setActiveFilterTab("")
  }

  const totalFiltersApplied =
    selectedLocations.length +
    selectedBrands.length +
    selectedBodyTypes.length +
    (priceRange[0] > 0 || priceRange[1] < 300 ? 1 : 0) +
    (activeFilterTab ? 1 : 0)

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden -mt-24">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/fleet-hero-new.png"
            alt="Premium car fleet lineup"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {/* Moroccan-inspired decorative elements */}
          <svg className="absolute top-0 left-0 w-32 h-32 text-white/20" viewBox="0 0 100 100" fill="none">
            <path d="M0,0 L40,0 C30,10 20,20 10,30 C20,20 30,10 40,0 L0,40 Z" fill="currentColor" />
            <path d="M50,0 L90,0 C80,10 70,20 60,30 C70,20 80,10 90,0 L50,40 Z" fill="currentColor" />
          </svg>

          <svg className="absolute top-0 right-0 w-32 h-32 text-white/20" viewBox="0 0 100 100" fill="none">
            <path d="M100,0 L60,0 C70,10 80,20 90,30 C80,20 70,10 60,0 L100,40 Z" fill="currentColor" />
            <path d="M50,0 L10,0 C20,10 30,20 40,30 C30,20 20,10 10,0 L50,40 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center pt-24">
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t("fleetPage.hero.title")}
            </motion.h1>
            <motion.p
              className="text-lg text-white/90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t("fleetPage.hero.subtitle")}
            </motion.p>

            {/* Search Bar */}
            <motion.div
              className="relative max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder={t("fleetPage.hero.searchPlaceholder")}
                  className="pl-12 py-6 bg-white/90 backdrop-blur-sm border-white/30 text-gray-800 hover:bg-white/95 transition-colors rounded-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <MoroccanDivider color="#117485" className="-mt-1" />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <Button
            onClick={() => setShowMobileFilters(true)}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
          >
            <Filter className="w-4 h-4" />
            {t("fleetPage.filters.advancedFilters")}
            {totalFiltersApplied > 0 && <Badge className="ml-2 bg-primary text-white">{totalFiltersApplied}</Badge>}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filters Drawer */}
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div
                className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  ref={filterRef}
                  className="absolute right-0 top-0 bottom-0 w-[85%] max-w-md bg-white shadow-xl overflow-auto"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25 }}
                >
                  <div className="sticky top-0 bg-white z-10 p-4 border-b flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      <Filter className="w-5 h-5 mr-2 text-primary" />
                      {t("fleetPage.filters.filters")}
                    </h2>
                    <div className="flex gap-2">
                      {totalFiltersApplied > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={clearAllFilters}
                          className="text-gray-500 hover:text-gray-700 border-gray-300"
                        >
                          {t("fleetPage.filters.clearAll")}
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowMobileFilters(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-4">
                    {/* Mobile Filter Content */}
                    <div className="space-y-6">
                      {/* Price Range Filter */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                          <Tag className="w-4 h-4 mr-2 text-primary" />
                          {t("fleetPage.filters.priceRange")}
                        </h3>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">{priceRange[0]}€</span>
                          <span className="text-sm font-medium text-gray-700">{priceRange[1]}€</span>
                        </div>
                        <div className="relative mb-4 h-2 bg-gray-200 rounded-full">
                          <div
                            className="absolute h-full bg-primary rounded-full"
                            style={{
                              left: `${(priceRange[0] / 300) * 100}%`,
                              right: `${100 - (priceRange[1] / 300) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div className="flex gap-4">
                          <input
                            type="range"
                            min="0"
                            max="300"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                            className="w-full accent-primary"
                          />
                          <input
                            type="range"
                            min="0"
                            max="300"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                            className="w-full accent-primary"
                          />
                        </div>
                      </div>

                      {/* Brand Filter */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                          <CarIcon className="w-4 h-4 mr-2 text-primary" />
                          {t("fleetPage.filters.brands")}
                          {selectedBrands.length > 0 && (
                            <Badge className="ml-2 bg-primary/10 text-primary">{selectedBrands.length}</Badge>
                          )}
                        </h3>
                        <div className="space-y-2">
                          {brands.map((brand) => (
                            <div key={brand} className="flex items-center">
                              <button
                                className="flex items-center gap-2 text-sm text-gray-700 hover:text-primary transition-colors"
                                onClick={() => toggleBrand(brand)}
                              >
                                <div
                                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                                    selectedBrands.includes(brand)
                                      ? "bg-primary border-primary"
                                      : "border border-gray-300"
                                  }`}
                                >
                                  {selectedBrands.includes(brand) && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span>{brand}</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Body Type Filter */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                          <CarIcon className="w-4 h-4 mr-2 text-primary" />
                          {t("fleetPage.filters.bodyType")}
                          {selectedBodyTypes.length > 0 && (
                            <Badge className="ml-2 bg-primary/10 text-primary">{selectedBodyTypes.length}</Badge>
                          )}
                        </h3>
                        <div className="space-y-2">
                          {bodyTypes.map((bodyType) => (
                            <div key={bodyType.id} className="flex items-center">
                              <button
                                className="flex items-center gap-2 text-sm text-gray-700 hover:text-primary transition-colors"
                                onClick={() => toggleBodyType(bodyType.id)}
                              >
                                <div
                                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                                    selectedBodyTypes.includes(bodyType.id)
                                      ? "bg-primary border-primary"
                                      : "border border-gray-300"
                                  }`}
                                >
                                  {selectedBodyTypes.includes(bodyType.id) && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span>{bodyType.name}</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Location Filter */}
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-primary" />
                          {t("fleetPage.filters.locations")}
                          {selectedLocations.length > 0 && (
                            <Badge className="ml-2 bg-primary/10 text-primary">{selectedLocations.length}</Badge>
                          )}
                        </h3>
                        <div className="space-y-2">
                          {locations.map((location) => (
                            <div key={location} className="flex items-center">
                              <button
                                className="flex items-center gap-2 text-sm text-gray-700 hover:text-primary transition-colors"
                                onClick={() => toggleLocation(location)}
                              >
                                <div
                                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                                    selectedLocations.includes(location)
                                      ? "bg-primary border-primary"
                                      : "border border-gray-300"
                                  }`}
                                >
                                  {selectedLocations.includes(location) && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span>{location}</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Apply Filters Button */}
                    <div className="sticky bottom-0 bg-white pt-4 pb-4 mt-6">
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-white py-6"
                        onClick={() => setShowMobileFilters(false)}
                      >
                        Apply Filters
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Filters Sidebar - Modernized */}
          <motion.div
            className="hidden lg:block lg:w-80 self-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg overflow-hidden flex flex-col border border-gray-100">
              {/* Filter Header */}
              <div className="p-6 bg-gradient-to-r from-secondary/90 to-secondary border-b border-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <MoroccanPattern color="#ffffff" opacity={0.15} />
                </div>
                <div className="flex items-center justify-between relative z-10">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <Filter className="w-5 h-5 mr-2" />
                    {t("fleetPage.filters.filters")}
                  </h2>
                  {totalFiltersApplied > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-white hover:text-white/90 hover:bg-white/10"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      {t("fleetPage.filters.clearAll")}
                    </Button>
                  )}
                </div>
                {totalFiltersApplied > 0 && (
                  <div className="mt-2 px-2 py-1 bg-white/20 rounded-md text-white text-sm inline-flex items-center">
                    <span className="font-medium mr-1">{totalFiltersApplied}</span>
                    <span>filters applied</span>
                  </div>
                )}
              </div>

              {/* Filter Content */}
              <div className="p-6">
                {/* Active Filters */}
                {totalFiltersApplied > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                      {t("fleetPage.filters.activeFilters")}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedLocations.map((location) => (
                        <Badge
                          key={`loc-${location}`}
                          className="bg-primary/10 text-primary hover:bg-primary/15 px-3 py-1.5 rounded-full"
                        >
                          {location.split("-")[0]}
                          <button
                            className="ml-2 text-primary/70 hover:text-primary"
                            onClick={() => toggleLocation(location)}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}

                      {selectedBrands.map((brand) => (
                        <Badge
                          key={`brand-${brand}`}
                          className="bg-primary/10 text-primary hover:bg-primary/15 px-3 py-1.5 rounded-full"
                        >
                          {brand}
                          <button
                            className="ml-2 text-primary/70 hover:text-primary"
                            onClick={() => toggleBrand(brand)}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}

                      {selectedBodyTypes.map((bodyTypeId) => {
                        const bodyType = bodyTypes.find((bt) => bt.id === bodyTypeId)
                        return (
                          <Badge
                            key={`body-${bodyTypeId}`}
                            className="bg-primary/10 text-primary hover:bg-primary/15 px-3 py-1.5 rounded-full"
                          >
                            {bodyType?.name}
                            <button
                              className="ml-2 text-primary/70 hover:text-primary"
                              onClick={() => toggleBodyType(bodyTypeId)}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        )
                      })}

                      {(priceRange[0] > 0 || priceRange[1] < 300) && (
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/15 px-3 py-1.5 rounded-full">
                          {priceRange[0]}€ - {priceRange[1]}€
                          <button
                            className="ml-2 text-primary/70 hover:text-primary"
                            onClick={() => setPriceRange([0, 300])}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Price Range Filter */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-900 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center text-white mr-3 shadow-md">
                        <Tag className="w-4 h-4" />
                      </div>
                      {t("fleetPage.filters.priceRange")}
                    </h3>
                    {(priceRange[0] > 0 || priceRange[1] < 300) && (
                      <button
                        onClick={() => setPriceRange([0, 300])}
                        className="text-xs text-gray-500 hover:text-primary transition-colors"
                      >
                        {t("fleetPage.filters.reset")}
                      </button>
                    )}
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="bg-white px-3 py-1.5 rounded-md shadow-sm border border-gray-100 text-sm font-medium text-gray-700">
                        {priceRange[0]}€
                      </div>
                      <div className="bg-white px-3 py-1.5 rounded-md shadow-sm border border-gray-100 text-sm font-medium text-gray-700">
                        {priceRange[1]}€
                      </div>
                    </div>

                    <div className="relative mb-4 h-2 bg-gray-200 rounded-full mt-6">
                      <div
                        className="absolute h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                        style={{
                          left: `${(priceRange[0] / 300) * 100}%`,
                          right: `${100 - (priceRange[1] / 300) * 100}%`,
                        }}
                      ></div>
                      <div
                        className="absolute w-5 h-5 bg-white rounded-full shadow-md border-2 border-primary -mt-1.5 -ml-2.5 cursor-pointer"
                        style={{ left: `${(priceRange[0] / 300) * 100}%` }}
                      ></div>
                      <div
                        className="absolute w-5 h-5 bg-white rounded-full shadow-md border-2 border-primary -mt-1.5 -ml-2.5 cursor-pointer"
                        style={{ left: `${(priceRange[1] / 300) * 100}%` }}
                      ></div>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <input
                        type="range"
                        min="0"
                        max="300"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                        className="w-full accent-primary"
                      />
                      <input
                        type="range"
                        min="0"
                        max="300"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                        className="w-full accent-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Brand Filter */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-900 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center text-white mr-3 shadow-md">
                        <CarIcon className="w-4 h-4" />
                      </div>
                      {t("fleetPage.filters.brands")}
                      {selectedBrands.length > 0 && (
                        <Badge className="ml-2 bg-primary/10 text-primary">{selectedBrands.length}</Badge>
                      )}
                    </h3>
                    {selectedBrands.length > 0 && (
                      <button
                        onClick={() => setSelectedBrands([])}
                        className="text-xs text-gray-500 hover:text-primary transition-colors"
                      >
                        {t("fleetPage.filters.reset")}
                      </button>
                    )}
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <div className="space-y-3">
                      {brands.map((brand) => (
                        <div key={brand} className="flex items-center group">
                          <button
                            className="flex items-center gap-3 text-sm text-gray-700 hover:text-primary transition-colors"
                            onClick={() => toggleBrand(brand)}
                          >
                            <div
                              className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                                selectedBrands.includes(brand)
                                  ? "bg-primary border-primary"
                                  : "border border-gray-300 group-hover:border-primary/50"
                              }`}
                            >
                              {selectedBrands.includes(brand) && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <span className="group-hover:translate-x-1 transition-transform">{brand}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Body Type Filter */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-900 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-secondary to-secondary/80 flex items-center justify-center text-white mr-3 shadow-md">
                        <CarIcon className="w-4 h-4" />
                      </div>
                      {t("fleetPage.filters.bodyType")}
                      {selectedBodyTypes.length > 0 && (
                        <Badge className="ml-2 bg-secondary/10 text-secondary">{selectedBodyTypes.length}</Badge>
                      )}
                    </h3>
                    {selectedBodyTypes.length > 0 && (
                      <button
                        onClick={() => setSelectedBodyTypes([])}
                        className="text-xs text-gray-500 hover:text-secondary transition-colors"
                      >
                        {t("fleetPage.filters.reset")}
                      </button>
                    )}
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <div className="space-y-3">
                      {bodyTypes.map((bodyType) => (
                        <div key={bodyType.id} className="flex items-center group">
                          <button
                            className="flex items-center gap-3 text-sm text-gray-700 hover:text-secondary transition-colors"
                            onClick={() => toggleBodyType(bodyType.id)}
                          >
                            <div
                              className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                                selectedBodyTypes.includes(bodyType.id)
                                  ? "bg-secondary border-secondary"
                                  : "border border-gray-300 group-hover:border-secondary/50"
                              }`}
                            >
                              {selectedBodyTypes.includes(bodyType.id) && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <span className="group-hover:translate-x-1 transition-transform">{bodyType.name}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Location Filter */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-900 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-secondary to-secondary/80 flex items-center justify-center text-white mr-3 shadow-md">
                        <MapPin className="w-4 h-4" />
                      </div>
                      {t("fleetPage.filters.locations")}
                      {selectedLocations.length > 0 && (
                        <Badge className="ml-2 bg-secondary/10 text-secondary">{selectedLocations.length}</Badge>
                      )}
                    </h3>
                    {selectedLocations.length > 0 && (
                      <button
                        onClick={() => setSelectedLocations([])}
                        className="text-xs text-gray-500 hover:text-secondary transition-colors"
                      >
                        {t("fleetPage.filters.reset")}
                      </button>
                    )}
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <div className="space-y-3">
                      {locations.map((location) => (
                        <div key={location} className="flex items-center group">
                          <button
                            className="flex items-center gap-3 w-full text-sm text-gray-700 hover:text-secondary transition-colors"
                            onClick={() => toggleLocation(location)}
                          >
                            <div
                              className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                                selectedLocations.includes(location)
                                  ? "bg-secondary border-secondary"
                                  : "border border-gray-300 group-hover:border-secondary/50"
                              }`}
                            >
                              {selectedLocations.includes(location) && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <span className="group-hover:translate-x-1 transition-transform">
                              {location.split("-")[0]}
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cars Grid */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="text-gray-700 bg-white px-4 py-2 rounded-lg shadow-sm">
                <span className="font-medium">{filteredCars.length}</span> {t("fleetPage.results.carsFound")}
                {filteredCars.length > 0 && (
                  <span className="text-gray-500 ml-2">
                    • {t("fleetPage.results.showing")} {startIndex + 1}-{Math.min(endIndex, filteredCars.length)}{" "}
                    {t("fleetPage.results.of")} {filteredCars.length}
                  </span>
                )}
                {totalFiltersApplied > 0 && (
                  <span className="text-gray-500 ml-2">
                    {t("fleetPage.results.withFilters")} {totalFiltersApplied} {t("fleetPage.results.filter")}
                    {totalFiltersApplied > 1 ? t("fleetPage.results.filters") : ""}
                  </span>
                )}
              </div>

              <div className="flex items-center">
                <SlidersHorizontal className="w-4 h-4 mr-2 text-gray-500" />
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-[180px] bg-white border-gray-200">
                    <SelectValue placeholder={t("fleetPage.results.sortBy")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">{t("fleetPage.results.sortOptions.popular")}</SelectItem>
                    <SelectItem value="price-low">{t("fleetPage.results.sortOptions.priceLow")}</SelectItem>
                    <SelectItem value="price-high">{t("fleetPage.results.sortOptions.priceHigh")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[...Array(10)].map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl overflow-hidden h-[450px] animate-pulse">
                    <div className="h-56 bg-gray-200"></div>
                    <div className="p-5">
                      <div className="h-6 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Cars Grid */}
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                  initial="initial"
                  animate="animate"
                  variants={staggerChildren}
                >
                  <AnimatePresence mode="wait">
                    {currentCars.map((car) => (
                      <motion.div
                        key={car.id}
                        variants={fadeInUp}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
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
                  </AnimatePresence>
                </motion.div>

                {/* No Results */}
                {filteredCars.length === 0 && (
                  <motion.div
                    className="text-center py-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 max-w-md mx-auto">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{t("fleetPage.noResults.title")}</h3>
                      <p className="text-gray-600 mb-6">{t("fleetPage.noResults.description")}</p>
                      <Button
                        onClick={clearAllFilters}
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl"
                      >
                        {t("fleetPage.noResults.clearFilters")}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                className="mt-12 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage > 1) {
                            setCurrentPage(currentPage - 1)
                            window.scrollTo({ top: 0, behavior: "smooth" })
                          }
                        }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>

                    {/* First page */}
                    {currentPage > 3 && (
                      <>
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              setCurrentPage(1)
                              window.scrollTo({ top: 0, behavior: "smooth" })
                            }}
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        {currentPage > 4 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                      </>
                    )}

                    {/* Page numbers around current page */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((page) => {
                        return (
                          page === currentPage ||
                          page === currentPage - 1 ||
                          page === currentPage + 1 ||
                          (currentPage <= 2 && page <= 3) ||
                          (currentPage >= totalPages - 1 && page >= totalPages - 2)
                        )
                      })
                      .map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              setCurrentPage(page)
                              window.scrollTo({ top: 0, behavior: "smooth" })
                            }}
                            isActive={currentPage === page}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                    {/* Last page */}
                    {currentPage < totalPages - 2 && (
                      <>
                        {currentPage < totalPages - 3 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              setCurrentPage(totalPages)
                              window.scrollTo({ top: 0, behavior: "smooth" })
                            }}
                          >
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      </>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage < totalPages) {
                            setCurrentPage(currentPage + 1)
                            window.scrollTo({ top: 0, behavior: "smooth" })
                          }
                        }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </motion.div>
            )}

            {/* Contact CTA */}
            {filteredCars.length > 0 && (
              <motion.div
                className="mt-16 bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-8 text-white text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-4">{t("fleetPage.cta.title")}</h3>
                <p className="text-lg mb-6 text-white/90">{t("fleetPage.cta.description")}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="bg-white text-orange-500 hover:bg-gray-50 hover:text-orange-600 px-6 py-3 rounded-xl font-semibold flex items-center justify-center"
                    asChild
                  >
                    <a href="tel:+212524123456" className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {t("fleetPage.cta.callUs")}
                    </a>
                  </Button>
                  <Button
                    className="bg-white text-orange-500 hover:bg-gray-50 hover:text-orange-600 px-6 py-3 rounded-xl font-semibold flex items-center justify-center"
                    asChild
                  >
                    <a href="/contact" className="flex items-center">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      {t("fleetPage.cta.contactUs")}
                    </a>
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
