"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  Car,
  Users,
  Fuel,
  Wind,
  Shield,
  MapPin,
  Clock,
  Star,
  Check,
  X,
  Phone,
  Mail,
  MessageCircle,
  Zap,
  Settings,
  Award,
  ChevronRight,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/context/language-context"
import { BookingForm } from "@/components/booking-form"
import { MoroccanDivider } from "@/components/moroccan-divider"

// Extended car data with detailed information for ALL cars
const carsData = {
  1: {
    id: 1,
    name: "Audi A3 Sportback",
    brand: "Audi",
    image: "/Audi A3 Sportback.avif",
    price: 85,
    originalPrice: 95,
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
    rating: 4.5,
    reviews: 120,
    description: {
      en: "The Audi A3 Sportback is a stylish and efficient compact car, perfect for navigating city streets and enjoying comfortable long drives. With its premium interior and advanced technology, it offers a luxurious driving experience in a compact package.",
      fr: "L'Audi A3 Sportback est une voiture compacte élégante et efficace, parfaite pour naviguer dans les rues de la ville et profiter de longs trajets confortables. Avec son intérieur haut de gamme et sa technologie avancée, elle offre une expérience de conduite luxueuse dans un format compact.",
    },
    engine: "2.0 TDI",
    power: "150 hp",
    fuelConsumption: "4.5 L/100km",
    features: [
      "Navigation System",
      "Bluetooth Connectivity",
      "Parking Sensors",
      "Cruise Control",
      "Dual-Zone Climate Control",
      "LED Headlights",
      "Leather Seats",
      "Keyless Entry",
    ],
    safetyFeatures: [
      "ABS",
      "ESP",
      "Multiple Airbags",
      "Lane Assist",
      "Blind Spot Detection",
      "Emergency Brake Assist",
      "ISOFIX Child Seat Anchors",
    ],
    included: [
      "Unlimited Mileage",
      "Basic Insurance",
      "24/7 Roadside Assistance",
      "Airport Pickup",
      "Free Cancellation (48h notice)",
    ],
    notIncluded: [
      "GPS Navigation (optional)",
      "Child Seat (optional)",
      "Additional Driver Fee",
      "Fuel (return with same level)",
    ],
  },
  2: {
    id: 2,
    name: "Audi Q8 S Line",
    brand: "Audi",
    image: "/AUDI Q8 S LINE.webp",
    price: 180,
    originalPrice: 210,
    transmission: "Automatic",
    seats: 7,
    category: "Luxury SUV",
    fuel: "Diesel",
    ac: true,
    popular: true,
    bodyType: "suv",
    locations: ["Marrakech-Aéroport", "Rabat - Aéroport"],
    quickFilter: "luxury",
    year: 2024,
    rating: 4.8,
    reviews: 250,
    description: {
      en: "The Audi Q8 S Line offers a luxurious and spacious driving experience, perfect for families and long journeys. Enjoy advanced technology and premium comfort with this high-end SUV that combines performance with elegance. Ideal for exploring Morocco's diverse landscapes in style.",
      fr: "L'Audi Q8 S Line offre une expérience de conduite luxueuse et spacieuse, parfaite pour les familles et les longs voyages. Profitez d'une technologie avancée et d'un confort premium avec ce SUV haut de gamme qui allie performance et élégance. Idéal pour explorer les paysages variés du Maroc avec style.",
    },
    engine: "3.0 TDI",
    power: "286 hp",
    fuelConsumption: "6.8 L/100km",
    features: [
      "Leather Seats",
      "Panoramic Sunroof",
      "Premium Sound System",
      "Adaptive Cruise Control",
      "Heated & Ventilated Seats",
      "Wireless Charging",
      "360° Camera System",
      "Ambient Lighting",
    ],
    safetyFeatures: [
      "Adaptive Cruise Control",
      "Lane Departure Warning",
      "Blind Spot Monitoring",
      "Parking Assist",
      "Night Vision Assistant",
      "Pre-Sense Safety System",
      "Traffic Sign Recognition",
    ],
    included: [
      "Unlimited Mileage",
      "Comprehensive Insurance",
      "24/7 Support",
      "GPS Navigation",
      "Airport Pickup & Drop-off",
      "Free Cancellation (72h notice)",
    ],
    notIncluded: [
      "Child Seat (optional)",
      "Additional Driver Fee",
      "Fuel (return with same level)",
      "Border Crossing Fee",
    ],
  },
  3: {
    id: 3,
    name: "BMW Series 2 Pack M",
    brand: "BMW",
    image: "/BMW SERIES 2 PACK M.webp",
    price: 95,
    originalPrice: 110,
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
    rating: 4.7,
    reviews: 180,
    description: {
      en: "The BMW Series 2 with M Sport Package delivers an exhilarating driving experience with its sporty handling and powerful performance.",
      fr: "La BMW Série 2 avec Pack M offre une expérience de conduite exaltante grâce à sa maniabilité sportive et ses performances puissantes.",
    },
    engine: "2.0 TDI",
    power: "190 hp",
    fuelConsumption: "5.2 L/100km",
    features: ["M Sport Suspension", "Sport Seats", "BMW iDrive System", "Harman Kardon Sound System"],
    safetyFeatures: ["Dynamic Stability Control", "Multiple Airbags", "Active Protection System"],
    included: ["Unlimited Mileage", "Comprehensive Insurance", "24/7 Roadside Assistance"],
    notIncluded: ["GPS Navigation (optional)", "Child Seat (optional)", "Additional Driver Fee"],
  },
  4: {
    id: 4,
    name: "Citroen C3",
    brand: "Citroen",
    image: "/CITROEN C3.webp",
    price: 35,
    originalPrice: 40,
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
    rating: 4.3,
    reviews: 210,
    description: {
      en: "The Citroen C3 is a practical and economical choice for exploring Morocco. With its compact size, excellent fuel efficiency, and comfortable interior, this car is perfect for city driving and day trips. Enjoy modern features and reliability at an affordable price.",
      fr: "La Citroen C3 est un choix pratique et économique pour explorer le Maroc. Avec sa taille compacte, son excellente efficacité énergétique et son intérieur confortable, cette voiture est parfaite pour la conduite en ville et les excursions d'une journée. Profitez de fonctionnalités modernes et de fiabilité à un prix abordable.",
    },
    engine: "1.6 HDi",
    power: "92 hp",
    fuelConsumption: "3.9 L/100km",
    features: [
      "Touchscreen Infotainment",
      "Bluetooth Connectivity",
      "USB Ports",
      "Air Conditioning",
      "Electric Windows",
      "Height-Adjustable Driver's Seat",
      "Split-Folding Rear Seats",
    ],
    safetyFeatures: [
      "ABS",
      "ESP",
      "Multiple Airbags",
      "Lane Departure Warning",
      "Speed Limit Recognition",
      "Hill Start Assist",
      "ISOFIX Child Seat Anchors",
    ],
    included: [
      "Unlimited Mileage",
      "Basic Insurance",
      "24/7 Customer Support",
      "Airport Pickup",
      "Free Cancellation (24h notice)",
    ],
    notIncluded: [
      "GPS Navigation (optional)",
      "Child Seat (optional)",
      "Additional Driver Fee",
      "Fuel (return with same level)",
    ],
  },
  5: {
    id: 5,
    name: "Dacia Duster",
    brand: "Dacia",
    image: "/DACIA DUSTER.webp",
    price: 45,
    originalPrice: 55,
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
    rating: 4.5,
    reviews: 320,
    description: {
      en: "The Dacia Duster is a rugged and versatile SUV that offers excellent value for money. Perfect for both city driving and off-road adventures, this vehicle provides ample space, good ground clearance, and reliable performance. Ideal for exploring Morocco's diverse terrain from mountains to desert roads.",
      fr: "Le Dacia Duster est un SUV robuste et polyvalent qui offre un excellent rapport qualité-prix. Parfait pour la conduite en ville et les aventures hors route, ce véhicule offre un espace généreux, une bonne garde au sol et des performances fiables. Idéal pour explorer les terrains variés du Maroc, des montagnes aux pistes désertiques.",
    },
    engine: "1.5 dCi",
    power: "115 hp",
    fuelConsumption: "4.8 L/100km",
    features: [
      "Media Nav Evolution System",
      "Bluetooth Connectivity",
      "Rear Parking Sensors",
      "Air Conditioning",
      "Electric Windows",
      "Roof Rails",
      "Height-Adjustable Driver's Seat",
    ],
    safetyFeatures: [
      "ABS",
      "ESP",
      "Emergency Brake Assist",
      "Multiple Airbags",
      "Hill Start Assist",
      "ISOFIX Child Seat Anchors",
      "Tire Pressure Monitoring",
    ],
    included: [
      "Unlimited Mileage",
      "Basic Insurance",
      "24/7 Roadside Assistance",
      "Airport Pickup",
      "Free Cancellation (24h notice)",
    ],
    notIncluded: [
      "GPS Navigation (optional)",
      "Child Seat (optional)",
      "Additional Driver Fee",
      "Fuel (return with same level)",
    ],
  },
  6: {
    id: 6,
    name: "Dacia Lodgy",
    brand: "Dacia",
    image: "/DACIA LODGY.webp",
    price: 55,
    originalPrice: 65,
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
    rating: 4.2,
    reviews: 150,
    description: {
      en: "The Dacia Lodgy is a spacious and practical MPV that's perfect for family trips across Morocco. With seating for up to 7 passengers and generous luggage space, this vehicle offers comfort and versatility at an affordable price. Enjoy reliable performance and low running costs for your Moroccan adventure.",
      fr: "Le Dacia Lodgy est un monospace spacieux et pratique, parfait pour les voyages en famille à travers le Maroc. Avec des sièges pour jusqu'à 7 passagers et un espace de bagages généreux, ce véhicule offre confort et polyvalence à un prix abordable. Profitez de performances fiables et de faibles coûts d'utilisation pour votre aventure marocaine.",
    },
    engine: "1.5 dCi",
    power: "95 hp",
    fuelConsumption: "4.9 L/100km",
    features: [
      "Media Nav System",
      "Bluetooth Connectivity",
      "Air Conditioning",
      "Electric Windows",
      "Folding Tables",
      "Height-Adjustable Driver's Seat",
      "Split-Folding Rear Seats",
    ],
    safetyFeatures: [
      "ABS",
      "ESP",
      "Multiple Airbags",
      "Emergency Brake Assist",
      "Hill Start Assist",
      "ISOFIX Child Seat Anchors",
      "Rear Parking Sensors",
    ],
    included: [
      "Unlimited Mileage",
      "Basic Insurance",
      "24/7 Customer Support",
      "Airport Pickup",
      "Free Cancellation (24h notice)",
    ],
    notIncluded: [
      "GPS Navigation (optional)",
      "Child Seat (optional)",
      "Additional Driver Fee",
      "Fuel (return with same level)",
    ],
  },
  7: {
    id: 7,
    name: "Dacia Logan",
    brand: "Dacia",
    image: "/DACIA LOGAN.webp",
    price: 30,
    originalPrice: 35,
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
    rating: 4.1,
    reviews: 180,
    description: {
      en: "The Dacia Logan is a reliable and economical sedan that offers excellent value for money. With its spacious interior, comfortable ride, and efficient engine, this car is perfect for both city driving and longer journeys across Morocco. Enjoy practical features and low running costs.",
      fr: "La Dacia Logan est une berline fiable et économique qui offre un excellent rapport qualité-prix. Avec son intérieur spacieux, sa conduite confortable et son moteur efficace, cette voiture est parfaite pour la conduite en ville et les longs trajets à travers le Maroc. Profitez de fonctionnalités pratiques et de faibles coûts d'utilisation.",
    },
    engine: "1.5 dCi",
    power: "90 hp",
    fuelConsumption: "4.1 L/100km",
    features: [
      "Media Nav System",
      "Bluetooth Connectivity",
      "Air Conditioning",
      "Electric Windows",
      "Height-Adjustable Driver's Seat",
      "Split-Folding Rear Seats",
      "USB Port",
    ],
    safetyFeatures: [
      "ABS",
      "ESP",
      "Multiple Airbags",
      "Emergency Brake Assist",
      "Hill Start Assist",
      "ISOFIX Child Seat Anchors",
      "Tire Pressure Monitoring",
    ],
    included: [
      "Unlimited Mileage",
      "Basic Insurance",
      "24/7 Customer Support",
      "Airport Pickup",
      "Free Cancellation (24h notice)",
    ],
    notIncluded: [
      "GPS Navigation (optional)",
      "Child Seat (optional)",
      "Additional Driver Fee",
      "Fuel (return with same level)",
    ],
  },
  8: {
    id: 8,
    name: "Dacia Sandero",
    brand: "Dacia",
    image: "/DACIA SANDERO.webp",
    price: 32,
    originalPrice: 38,
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
    rating: 4.3,
    reviews: 220,
    description: {
      en: "The Dacia Sandero is a practical and affordable hatchback that's perfect for exploring Morocco on a budget. With its compact size, good fuel efficiency, and surprising interior space, this car offers excellent value for money. Enjoy modern features and reliability without breaking the bank.",
      fr: "La Dacia Sandero est une berline compacte pratique et abordable, parfaite pour explorer le Maroc avec un budget limité. Avec sa taille compacte, sa bonne efficacité énergétique et son espace intérieur surprenant, cette voiture offre un excellent rapport qualité-prix. Profitez de fonctionnalités modernes et de fiabilité sans vous ruiner.",
    },
    engine: "1.5 dCi",
    power: "90 hp",
    fuelConsumption: "4.0 L/100km",
    features: [
      "Media Nav System",
      "Bluetooth Connectivity",
      "Air Conditioning",
      "Electric Windows",
      "Height-Adjustable Driver's Seat",
      "Split-Folding Rear Seats",
      "USB Port",
    ],
    safetyFeatures: [
      "ABS",
      "ESP",
      "Multiple Airbags",
      "Emergency Brake Assist",
      "Hill Start Assist",
      "ISOFIX Child Seat Anchors",
      "Tire Pressure Monitoring",
    ],
    included: [
      "Unlimited Mileage",
      "Basic Insurance",
      "24/7 Customer Support",
      "Airport Pickup",
      "Free Cancellation (24h notice)",
    ],
    notIncluded: ["GPS Navigation (optional)", "Child Seat (optional)"],
  },
  9: {
    id: 9,
    name: "Fiat 500 Cabriolet",
    brand: "Fiat",
    image: "/FIAT 500 CABRIOLET AUTOMATIQUE.webp",
    price: 65,
    originalPrice: 75,
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
    rating: 4.6,
    reviews: 140,
    description: {
      en: "The Fiat 500 Cabriolet is a stylish and fun convertible that's perfect for enjoying Morocco's beautiful weather. With its iconic design, nimble handling, and retractable roof, this car offers a unique and enjoyable driving experience. Ideal for couples or solo travelers looking to add some excitement to their journey.",
      fr: "La Fiat 500 Cabriolet est un cabriolet élégant et amusant, parfait pour profiter du beau temps du Maroc. Avec son design iconique, sa maniabilité agile et son toit rétractable, cette voiture offre une expérience de conduite unique et agréable. Idéal pour les couples ou les voyageurs solitaires cherchant à ajouter de l'excitation à leur voyage.",
    },
    engine: "1.2 MultiJet",
    power: "95 hp",
    fuelConsumption: "4.3 L/100km",
    features: [
      "Retractable Soft Top",
      "Touchscreen Infotainment",
      "Bluetooth Connectivity",
      "Automatic Climate Control",
      "Leather Steering Wheel",
      "Alloy Wheels",
      "Rear Parking Sensors",
    ],
    safetyFeatures: [
      "ABS",
      "ESP",
      "Multiple Airbags",
      "City Brake Control",
      "Hill Start Assist",
      "Tire Pressure Monitoring",
      "ISOFIX Child Seat Anchors",
    ],
    included: [
      "Unlimited Mileage",
      "Comprehensive Insurance",
      "24/7 Roadside Assistance",
      "Airport Pickup",
      "Free Cancellation (48h notice)",
    ],
    notIncluded: [
      "GPS Navigation (optional)",
      "Child Seat (optional)",
      "Additional Driver Fee",
      "Fuel (return with same level)",
    ],
  },
  10: {
    id: 10,
    name: "Hyundai Accent",
    brand: "Hyundai",
    image: "/HYUNDAI ACCENT.webp",
    price: 38,
    originalPrice: 45,
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
    rating: 4.2,
    reviews: 190,
    description: {
      en: "The Hyundai Accent is a reliable and efficient compact car that offers good value for money. With its comfortable interior, smooth ride, and good fuel economy, this vehicle is perfect for exploring Morocco's cities and countryside. Enjoy modern features and dependable performance.",
      fr: "La Hyundai Accent est une voiture compacte fiable et efficace qui offre un bon rapport qualité-prix. Avec son intérieur confortable, sa conduite souple et sa bonne économie de carburant, ce véhicule est parfait pour explorer les villes et les campagnes du Maroc. Profitez de fonctionnalités modernes et de performances fiables.",
    },
    engine: "1.6 CRDi",
    power: "115 hp",
    fuelConsumption: "4.5 L/100km",
    features: [
      "Touchscreen Infotainment",
      "Bluetooth Connectivity",
      "Air Conditioning",
      "Electric Windows",
      "Height-Adjustable Driver's Seat",
      "Split-Folding Rear Seats",
      "USB Port",
    ],
    safetyFeatures: [
      "ABS",
      "ESP",
      "Multiple Airbags",
      "Vehicle Stability Management",
      "Hill Start Assist",
      "ISOFIX Child Seat Anchors",
      "Tire Pressure Monitoring",
    ],
    included: [
      "Unlimited Mileage",
      "Basic Insurance",
      "24/7 Customer Support",
      "Airport Pickup",
      "Free Cancellation (24h notice)",
    ],
    notIncluded: [
      "GPS Navigation (optional)",
      "Child Seat (optional)",
      "Additional Driver Fee",
      "Fuel (return with same level)",
    ],
  },
  11: {
    id: 11,
    name: "Hyundai i10",
    brand: "Hyundai",
    image: "/HYUNDAI I10 ESSANCE.avif",
    price: 28,
    originalPrice: 32,
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
    rating: 4.4,
    reviews: 230,
    description: {
      en: "The Hyundai i10 is a compact and agile city car that's perfect for navigating Morocco's busy urban areas. Despite its small size, it offers surprising interior space, good fuel efficiency, and modern features. Ideal for solo travelers or couples looking for an economical option.",
      fr: "La Hyundai i10 est une voiture de ville compacte et agile, parfaite pour naviguer dans les zones urbaines animées du Maroc. Malgré sa petite taille, elle offre un espace intérieur surprenant, une bonne efficacité énergétique et des fonctionnalités modernes. Idéal pour les voyageurs solitaires ou les couples à la recherche d'une option économique.",
    },
    engine: "1.0 MPI",
    power: "67 hp",
    fuelConsumption: "4.2 L/100km",
    features: [
      "Touchscreen Infotainment",
      "Bluetooth Connectivity",
      "Air Conditioning",
      "Electric Windows",
      "Height-Adjustable Driver's Seat",
      "Split-Folding Rear Seats",
      "USB Port",
    ],
    safetyFeatures: [
      "ABS",
      "ESP",
      "Multiple Airbags",
      "Vehicle Stability Management",
      "Hill Start Assist",
      "ISOFIX Child Seat Anchors",
      "Tire Pressure Monitoring",
    ],
    included: [
      "Unlimited Mileage",
      "Basic Insurance",
      "24/7 Customer Support",
      "Airport Pickup",
      "Free Cancellation (24h notice)",
    ],
    notIncluded: [
      "GPS Navigation (optional)",
      "Child Seat (optional)",
      "Additional Driver Fee",
      "Fuel (return with same level)",
    ],
  },
  12: {
    id: 12,
    name: "Hyundai Tucson",
    brand: "Hyundai",
    image: "/HYUNDAI TUCSON.webp",
    price: 75,
    originalPrice: 85,
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
    rating: 4.6,
    reviews: 210,
    description: {
      en: "The Hyundai Tucson is a stylish and capable SUV that offers comfort, space, and versatility. With its modern design, smooth ride, and advanced features, this vehicle is perfect for exploring Morocco's diverse landscapes. Enjoy ample cargo space and reliable performance for your adventure.",
      fr: "Le Hyundai Tucson est un SUV élégant et capable qui offre confort, espace et polyvalence. Avec son design moderne, sa conduite souple et ses fonctionnalités avancées, ce véhicule est parfait pour explorer les paysages variés du Maroc. Profitez d'un espace de chargement généreux et de performances fiables pour votre aventure.",
    },
    engine: "2.0 CRDi",
    power: "185 hp",
    fuelConsumption: "5.5 L/100km",
    features: [
      "Touchscreen Infotainment",
      "Bluetooth Connectivity",
      "Dual-Zone Climate Control",
      "Rear View Camera",
      "Heated Seats",
      "Roof Rails",
      "Keyless Entry",
    ],
    safetyFeatures: [
      "ABS",
      "ESP",
      "Multiple Airbags",
      "Lane Keeping Assist",
      "Forward Collision Warning",
      "Blind Spot Detection",
      "ISOFIX Child Seat Anchors",
    ],
    included: [
      "Unlimited Mileage",
      "Comprehensive Insurance",
      "24/7 Roadside Assistance",
      "Airport Pickup",
      "Free Cancellation (48h notice)",
    ],
    notIncluded: [
      "GPS Navigation (optional)",
      "Child Seat (optional)",
      "Additional Driver Fee",
      "Fuel (return with same level)",
    ],
  },
  13: {
    id: 13,
    name: "Jeep Renegade",
    brand: "Jeep",
    image: "/JEEP RENEGADE.webp",
    price: 68,
    originalPrice: 78,
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
    rating: 4.5,
    reviews: 170,
    description: {
      en: "The Jeep Renegade combines compact dimensions with genuine off-road capability, making it perfect for exploring Morocco's diverse terrain. With its distinctive styling, comfortable interior, and advanced technology, this SUV offers a unique blend of urban practicality and adventure readiness.",
      fr: "Le Jeep Renegade combine des dimensions compactes avec une véritable capacité tout-terrain, ce qui le rend parfait pour explorer les terrains variés du Maroc. Avec son style distinctif, son intérieur confortable et sa technologie avancée, ce SUV offre un mélange unique de praticité urbaine et de préparation à l'aventure.",
    },
    engine: "1.6 MultiJet",
    power: "120 hp",
    fuelConsumption: "4.8 L/100km",
    features: [
      "Uconnect Touchscreen",
      "Bluetooth Connectivity",
      "Dual-Zone Climate Control",
      "Rear View Camera",
      "Cruise Control",
      "Roof Rails",
      "Keyless Entry",
    ],
    safetyFeatures: [
      "ABS",
      "ESP",
      "Multiple Airbags",
      "Lane Departure Warning",
      "Forward Collision Warning",
      "Blind Spot Monitoring",
      "ISOFIX Child Seat Anchors",
    ],
    included: [
      "Unlimited Mileage",
      "Comprehensive Insurance",
      "24/7 Roadside Assistance",
      "Airport Pickup",
      "Free Cancellation (48h notice)",
    ],
    notIncluded: [
      "GPS Navigation (optional)",
      "Child Seat (optional)",
      "Additional Driver Fee",
      "Fuel (return with same level)",
    ],
  },
  14: {
    id: 14,
    name: "Kia Picanto",
    brand: "Kia",
    image: "/KIA PICANTO.webp",
    price: 25,
    originalPrice: 30,
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
    rating: 4.3,
    reviews: 250,
    description: {
      en: "The Kia Picanto is a compact and economical city car that's perfect for navigating Morocco's urban areas. With its nimble handling, excellent fuel efficiency, and surprising interior space, this car offers great value for money. Enjoy modern features and reliability in a small package.",
      fr: "La Kia Picanto est une voiture de ville compacte et économique, parfaite pour naviguer dans les zones urbaines du Maroc. Avec sa maniabilité agile, son excellente efficacité énergétique et son espace intérieur surprenant, cette voiture offre un excellent rapport qualité-prix. Profitez de fonctionnalités modernes et de fiabilité dans un petit format.",
    },
    engine: "1.0 MPI",
    power: "67 hp",
    fuelConsumption: "4.1 L/100km",
    features: [
      "Touchscreen Infotainment",
      "Bluetooth Connectivity",
      "Air Conditioning",
      "Electric Windows",
      "Height-Adjustable Driver's Seat",
      "Split-Folding Rear Seats",
      "USB Port",
    ],
    safetyFeatures: [
      "ABS",
      "ESP",
      "Multiple Airbags",
      "Vehicle Stability Management",
      "Hill Start Assist",
      "ISOFIX Child Seat Anchors",
      "Tire Pressure Monitoring",
    ],
    included: [
      "Unlimited Mileage",
      "Basic Insurance",
      "24/7 Customer Support",
      "Airport Pickup",
      "Free Cancellation (24h notice)",
    ],
    notIncluded: [
      "GPS Navigation (optional)",
      "Child Seat (optional)",
      "Additional Driver Fee",
      "Fuel (return with same level)",
    ],
  },
  15: {
    id: 15,
    name: "Mercedes Classe A 200 Pack AMG",
    brand: "Mercedes",
    image: "/MERCEDES CLASSE A 200 PACK AMG.webp",
    price: 120,
    originalPrice: 140,
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
    rating: 4.8,
    reviews: 190,
    description: {
      en: "The Mercedes A-Class with AMG Package offers a premium driving experience with sporty styling and advanced technology. This luxury compact car combines elegant design with powerful performance, making every journey through Morocco a pleasure. Enjoy the prestige and comfort of the Mercedes brand.",
      fr: "La Mercedes Classe A avec Pack AMG offre une expérience de conduite premium avec un style sportif et une technologie avancée. Cette voiture compacte de luxe allie design élégant et performances puissantes, rendant chaque voyage à travers le Maroc un plaisir. Profitez du prestige et du confort de la marque Mercedes.",
    },
    engine: "2.0 Turbo",
    power: "200 hp",
    fuelConsumption: "5.2 L/100km",
    features: [
      "MBUX Infotainment System",
      "AMG Sport Package",
      "Ambient Lighting",
      "Leather Sports Seats",
      "Panoramic Sunroof",
      "Harman Kardon Sound System",
      "Wireless Charging",
    ],
    safetyFeatures: [
      "Active Brake Assist",
      "Attention Assist",
      "Multiple Airbags",
      "Lane Keeping Assist",
      "Blind Spot Assist",
      "PRE-SAFE System",
      "Traffic Sign Assist",
    ],
    included: [
      "Unlimited Mileage",
      "Comprehensive Insurance",
      "24/7 Premium Support",
      "Airport Pickup & Drop-off",
      "Free Cancellation (72h notice)",
    ],
    notIncluded: [
      "Child Seat (optional)",
      "Additional Driver Fee",
      "Fuel (return with same level)",
      "Border Crossing Fee",
    ],
  },
  16: {
    id: 16,
    name: "Mercedes Classe A",
    brand: "Mercedes",
    image: "/MERCEDES CLASSE A.webp",
    price: 95,
    originalPrice: 110,
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
    rating: 4.7,
    reviews: 160,
    description: {
      en: "The Mercedes A-Class is a premium compact car that offers sophisticated design, advanced technology, and a refined driving experience. With its luxurious interior, smooth performance, and prestigious badge, this vehicle is perfect for those seeking comfort and style during their Moroccan journey.",
      fr: "La Mercedes Classe A est une voiture compacte premium qui offre un design sophistiqué, une technologie avancée et une expérience de conduite raffinée. Avec son intérieur luxueux, ses performances fluides et son badge prestigieux, ce véhicule est parfait pour ceux qui recherchent confort et style pendant leur voyage au Maroc.",
    },
    engine: "1.5 Turbo",
    power: "160 hp",
    fuelConsumption: "4.9 L/100km",
    features: [
      "MBUX Infotainment System",
      "Ambient Lighting",
      "Leather Seats",
      "Dual-Zone Climate Control",
      "Keyless Entry",
      "LED Headlights",
      "Wireless Charging",
    ],
    safetyFeatures: [
      "Active Brake Assist",
      "Attention Assist",
      "Multiple Airbags",
      "Lane Keeping Assist",
      "Blind Spot Assist",
      "PRE-SAFE System",
      "Traffic Sign Assist",
    ],
    included: [
      "Unlimited Mileage",
      "Comprehensive Insurance",
      "24/7 Premium Support",
      "Airport Pickup",
      "Free Cancellation (48h notice)",
    ],
    notIncluded: [
      "GPS Navigation (optional)",
      "Child Seat (optional)",
      "Additional Driver Fee",
      "Fuel (return with same level)",
    ],
  },
  17: {
    id: 17,
    name: "Peugeot 208",
    brand: "Peugeot",
    image: "/PEUGEOT 208.webp",
    price: 42,
    originalPrice: 48,
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
    rating: 4.4,
    reviews: 200,
    description: {
      en: "The Peugeot 208 is a stylish and modern compact car that combines French design flair with practical features. With its distinctive interior, efficient engine, and comfortable ride, this vehicle is perfect for exploring Morocco's cities and countryside. Enjoy good fuel economy and the latest technology.",
      fr: "La Peugeot 208 est une voiture compacte élégante et moderne qui allie le style du design français à des caractéristiques pratiques. Avec son intérieur distinctif, son moteur efficace et sa conduite confortable, ce véhicule est parfait pour explorer les villes et les campagnes du Maroc. Profitez d'une bonne économie de carburant et des dernières technologies.",
    },
    engine: "1.5 BlueHDi",
    power: "100 hp",
    fuelConsumption: "4.2 L/100km",
    features: [
      "i-Cockpit Digital Display",
      "Touchscreen Infotainment",
      "Bluetooth Connectivity",
      "Air Conditioning",
      "Electric Windows",
      "Height-Adjustable Driver's Seat",
      "Split-Folding Rear Seats",
    ],
    safetyFeatures: [
      "ABS",
      "ESP",
      "Multiple Airbags",
      "Lane Keeping Assist",
      "Speed Limit Recognition",
      "Driver Attention Alert",
      "ISOFIX Child Seat Anchors",
    ],
    included: [
      "Unlimited Mileage",
      "Basic Insurance",
      "24/7 Customer Support",
      "Airport Pickup",
      "Free Cancellation (24h notice)",
    ],
    notIncluded: [
      "GPS Navigation (optional)",
      "Child Seat (optional)",
      "Additional Driver Fee",
      "Fuel (return with same level)",
    ],
  },
  18: {
    id: 18,
    name: "Porsche Macan GTS",
    brand: "Porsche",
    image: "/PORSCHE MACAN GTS.webp",
    price: 250,
    originalPrice: 290,
    transmission: "Automatic",
    seats: 5,
    category: "Luxury SUV",
    fuel: "Diesel",
    ac: true,
    popular: false,
    bodyType: "luxury",
    locations: ["Marrakech-Aéroport", "Casablanca - Aéroport"],
    quickFilter: "luxury",
    year: 2024,
    rating: 4.9,
    reviews: 120,
    description: {
      en: "The Porsche Macan GTS is a high-performance luxury SUV that delivers an exhilarating driving experience. With its powerful engine, sport-tuned suspension, and premium interior, this vehicle offers the perfect blend of practicality and excitement. Experience Morocco's roads in unparalleled style and comfort.",
      fr: "Le Porsche Macan GTS est un SUV de luxe haute performance qui offre une expérience de conduite exaltante. Avec son moteur puissant, sa suspension sport et son intérieur premium, ce véhicule offre le mélange parfait de praticité et d'excitation. Découvrez les routes du Maroc avec un style et un confort inégalés.",
    },
    engine: "2.9 V6 Biturbo",
    power: "380 hp",
    fuelConsumption: "8.9 L/100km",
    features: [
      "Porsche Communication Management",
      "BOSE Surround Sound System",
      "Adaptive Sport Seats",
      "Panoramic Roof",
      "Sport Chrono Package",
      "LED Matrix Headlights",
      "Wireless Charging",
    ],
    safetyFeatures: [
      "Porsche Stability Management",
      "Lane Change Assist",
      "Adaptive Cruise Control",
      "Night Vision Assist",
      "Park Assist with Surround View",
      "ISOFIX Child Seat Anchors",
      "Tire Pressure Monitoring",
    ],
    included: [
      "Unlimited Mileage",
      "Premium Insurance",
      "24/7 Concierge Service",
      "Airport VIP Pickup & Drop-off",
      "Free Cancellation (72h notice)",
    ],
    notIncluded: [
      "Child Seat (optional)",
      "Additional Driver Fee",
      "Fuel (return with same level)",
      "Border Crossing Fee",
    ],
  },
  19: {
    id: 19,
    name: "Range Rover Autobiography",
    brand: "Range Rover",
    image: "/RANGE ROVER AUTOBIOGRAPHY.webp",
    price: 300,
    originalPrice: 350,
    transmission: "Automatic",
    seats: 7,
    category: "Luxury SUV",
    fuel: "Diesel",
    ac: true,
    popular: false,
    bodyType: "luxury",
    locations: ["Marrakech-Aéroport", "Casablanca - Aéroport"],
    quickFilter: "luxury",
    year: 2024,
    rating: 4.9,
    reviews: 110,
    description: {
      en: "The Range Rover Autobiography represents the pinnacle of luxury SUV motoring. With its opulent interior, commanding presence, and exceptional off-road capability, this vehicle offers an unmatched experience for exploring Morocco in ultimate comfort. Enjoy cutting-edge technology and refined British craftsmanship.",
      fr: "Le Range Rover Autobiography représente le summum du SUV de luxe. Avec son intérieur opulent, sa présence imposante et ses capacités exceptionnelles en tout-terrain, ce véhicule offre une expérience inégalée pour explorer le Maroc dans un confort ultime. Profitez d'une technologie de pointe et d'un savoir-faire britannique raffiné.",
    },
    engine: "3.0 SDV6",
    power: "350 hp",
    fuelConsumption: "9.2 L/100km",
    features: [
      "InControl Touch Pro Duo",
      "Meridian Signature Sound System",
      "Semi-Aniline Leather Seats",
      "Massage Function",
      "Four-Zone Climate Control",
      "Panoramic Roof",
      "Executive Class Rear Seating",
    ],
    safetyFeatures: [
      "Terrain Response 2",
      "Adaptive Dynamics",
      "All Terrain Progress Control",
      "360° Parking Aid",
      "Blind Spot Assist",
      "Driver Condition Monitor",
      "Wade Sensing",
    ],
    included: [
      "Unlimited Mileage",
      "Premium Insurance",
      "24/7 Concierge Service",
      "Airport VIP Pickup & Drop-off",
      "Free Cancellation (72h notice)",
    ],
    notIncluded: [
      "Child Seat (optional)",
      "Additional Driver Fee",
      "Fuel (return with same level)",
      "Border Crossing Fee",
    ],
  },
  20: {
    id: 20,
    name: "Range Rover Evoque R Dynamic",
    brand: "Range Rover",
    image: "/RANGE ROVER EVOQUE R DYNAMIC.webp",
    price: 150,
    originalPrice: 175,
    transmission: "Automatic",
    seats: 5,
    category: "Luxury SUV",
    fuel: "Diesel",
    ac: true,
    popular: true,
    bodyType: "luxury",
    locations: ["Marrakech-Aéroport", "Rabat - Aéroport"],
    quickFilter: "luxury",
    year: 2024,
    rating: 4.7,
    reviews: 160,
    description: {
      en: "The Range Rover Evoque R Dynamic combines distinctive design with premium features and impressive capability. This compact luxury SUV offers refined comfort, advanced technology, and genuine off-road ability, making it perfect for exploring Morocco's diverse landscapes in style.",
      fr: "Le Range Rover Evoque R Dynamic allie un design distinctif à des caractéristiques premium et des capacités impressionnantes. Ce SUV compact de luxe offre un confort raffiné, une technologie avancée et une véritable capacité tout-terrain, ce qui le rend parfait pour explorer les paysages variés du Maroc avec style.",
    },
    engine: "2.0 TD4",
    power: "240 hp",
    fuelConsumption: "6.3 L/100km",
    features: [
      "InControl Touch Pro",
      "Meridian Sound System",
      "Perforated Leather Seats",
      "Configurable Ambient Lighting",
      "Dual-Zone Climate Control",
      "Panoramic Roof",
      "R-Dynamic Styling",
    ],
    safetyFeatures: [
      "Terrain Response",
      "All Terrain Progress Control",
      "Lane Keep Assist",
      "Adaptive Cruise Control",
      "360° Parking Aid",
      "Blind Spot Assist",
      "Clear Exit Monitor",
    ],
    included: [
      "Unlimited Mileage",
      "Premium Insurance",
      "24/7 Premium Support",
      "Airport Pickup & Drop-off",
      "Free Cancellation (72h notice)",
    ],
    notIncluded: [
      "Child Seat (optional)",
      "Additional Driver Fee",
      "Fuel (return with same level)",
      "Border Crossing Fee",
    ],
  },
  21: {
    id: 21,
    name: "Range Rover Sport",
    brand: "Range Rover",
    image: "/RANGE ROVER SPORT.webp",
    price: 200,
    originalPrice: 230,
    transmission: "Automatic",
    seats: 7,
    category: "Luxury SUV",
    fuel: "Diesel",
    ac: true,
    popular: false,
    bodyType: "luxury",
    locations: ["Marrakech-Aéroport", "Casablanca - Aéroport"],
    quickFilter: "luxury",
    year: 2024,
    rating: 4.8,
    reviews: 140,
    description: {
      en: "The Range Rover Sport delivers a perfect balance of luxury, performance, and capability. With its dynamic handling, powerful engine, and premium interior, this SUV offers an engaging driving experience both on and off-road. Explore Morocco in comfort and style with this versatile luxury vehicle.",
      fr: "Le Range Rover Sport offre un équilibre parfait entre luxe, performance et capacité. Avec sa maniabilité dynamique, son moteur puissant et son intérieur premium, ce SUV offre une expérience de conduite engageante sur route comme en tout-terrain. Explorez le Maroc avec confort et style grâce à ce véhicule de luxe polyvalent.",
    },
    engine: "3.0 SDV6",
    power: "306 hp",
    fuelConsumption: "7.8 L/100km",
    features: [
      "InControl Touch Pro Duo",
      "Meridian Sound System",
      "Windsor Leather Seats",
      "Configurable Ambient Lighting",
      "Three-Zone Climate Control",
      "Panoramic Roof",
      "Adaptive Dynamics",
    ],
    safetyFeatures: [
      "Terrain Response 2",
      "Dynamic Response",
      "All Terrain Progress Control",
      "360° Parking Aid",
      "Blind Spot Assist",
      "Driver Condition Monitor",
      "Wade Sensing",
    ],
    included: [
      "Unlimited Mileage",
      "Premium Insurance",
      "24/7 Premium Support",
      "Airport Pickup & Drop-off",
      "Free Cancellation (72h notice)",
    ],
    notIncluded: [
      "Child Seat (optional)",
      "Additional Driver Fee",
      "Fuel (return with same level)",
      "Border Crossing Fee",
    ],
  },
  22: {
    id: 22,
    name: "Renault Clio 5",
    brand: "Renault",
    image: "/RENAULT CLIO 5.webp",
    price: 40,
    originalPrice: 45,
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
    rating: 4.5,
    reviews: 240,
    description: {
      en: "The Renault Clio 5 is a stylish and modern compact car that offers excellent value for money. With its attractive design, comfortable interior, and efficient engine, this vehicle is perfect for exploring Morocco's cities and countryside. Enjoy the latest technology and good fuel economy.",
      fr: "La Renault Clio 5 est une voiture compacte élégante et moderne qui offre un excellent rapport qualité-prix. Avec son design attrayant, son intérieur confortable et son moteur efficace, ce véhicule est parfait pour explorer les villes et les campagnes du Maroc. Profitez des dernières technologies et d'une bonne économie de carburant.",
    },
    engine: "1.5 dCi",
    power: "85 hp",
    fuelConsumption: "4.0 L/100km",
    features: [
      "EASY LINK Touchscreen",
      "Bluetooth Connectivity",
      "Air Conditioning",
      "Electric Windows",
      "Height-Adjustable Driver's Seat",
      "Split-Folding Rear Seats",
      "USB Port",
    ],
    safetyFeatures: [
      "ABS",
      "ESP",
      "Multiple Airbags",
      "Lane Departure Warning",
      "Traffic Sign Recognition",
      "Emergency Brake Assist",
      "ISOFIX Child Seat Anchors",
    ],
    included: [
      "Unlimited Mileage",
      "Basic Insurance",
      "24/7 Customer Support",
      "Airport Pickup",
      "Free Cancellation (24h notice)",
    ],
    notIncluded: [
      "GPS Navigation (optional)",
      "Child Seat (optional)",
      "Additional Driver Fee",
      "Fuel (return with same level)",
    ],
  },
  23: {
    id: 23,
    name: "Volkswagen Golf 8 R Line",
    brand: "Volkswagen",
    image: "/VOLKSWAGEN GOLF 8 R LINE.webp",
    price: 78,
    originalPrice: 90,
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
    rating: 4.7,
    reviews: 190,
    description: {
      en: "The Volkswagen Golf 8 R Line combines sporty styling with the renowned Golf quality and practicality. With its refined interior, advanced technology, and responsive handling, this premium hatchback offers an enjoyable driving experience for exploring Morocco. Enjoy German engineering and modern features.",
      fr: "La Volkswagen Golf 8 R Line allie un style sportif à la qualité et à la praticité renommées de la Golf. Avec son intérieur raffiné, sa technologie avancée et sa maniabilité réactive, cette berline compacte premium offre une expérience de conduite agréable pour explorer le Maroc. Profitez de l'ingénierie allemande et des fonctionnalités modernes.",
    },
    engine: "2.0 TDI",
    power: "150 hp",
    fuelConsumption: "4.5 L/100km",
    features: [
      "Discover Pro Navigation",
      "Digital Cockpit",
      "R Line Sport Seats",
      "Ambient Lighting",
      "Dual-Zone Climate Control",
      "Keyless Entry",
      "Wireless App Connect",
    ],
    safetyFeatures: [
      "Adaptive Cruise Control",
      "Lane Assist",
      "Front Assist",
      "Side Assist",
      "Park Assist",
      "Multiple Airbags",
      "ISOFIX Child Seat Anchors",
    ],
    included: [
      "Unlimited Mileage",
      "Comprehensive Insurance",
      "24/7 Roadside Assistance",
      "Airport Pickup",
      "Free Cancellation (48h notice)",
    ],
    notIncluded: [
      "GPS Navigation (optional)",
      "Child Seat (optional)",
      "Additional Driver Fee",
      "Fuel (return with same level)",
    ],
  },
  24: {
    id: 24,
    name: "Volkswagen T-ROC",
    brand: "Volkswagen",
    image: "/VOLKSWAGEN T-ROC.webp",
    price: 85,
    originalPrice: 95,
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
    rating: 4.6,
    reviews: 170,
    description: {
      en: "The Volkswagen T-ROC is a stylish and versatile crossover that combines SUV practicality with compact car agility. With its distinctive design, comfortable interior, and advanced technology, this vehicle is perfect for exploring Morocco's diverse landscapes. Enjoy German quality and modern features.",
      fr: "Le Volkswagen T-ROC est un crossover élégant et polyvalent qui allie la praticité d'un SUV à l'agilité d'une voiture compacte. Avec son design distinctif, son intérieur confortable et sa technologie avancée, ce véhicule est parfait pour explorer les paysages variés du Maroc. Profitez de la qualité allemande et des fonctionnalités modernes.",
    },
    engine: "2.0 TDI",
    power: "150 hp",
    fuelConsumption: "4.8 L/100km",
    features: [
      "Discover Media Navigation",
      "Digital Cockpit",
      "Dual-Zone Climate Control",
      "Rear View Camera",
      "Adaptive Cruise Control",
      "Keyless Entry",
      "LED Headlights",
    ],
    safetyFeatures: [
      "Front Assist",
      "Lane Assist",
      "Side Assist",
      "Park Assist",
      "Multiple Airbags",
      "ISOFIX Child Seat Anchors",
      "Tire Pressure Monitoring",
    ],
    included: [
      "Unlimited Mileage",
      "Comprehensive Insurance",
      "24/7 Roadside Assistance",
      "Airport Pickup",
      "Free Cancellation (48h notice)",
    ],
    notIncluded: [
      "GPS Navigation (optional)",
      "Child Seat (optional)",
      "Additional Driver Fee",
      "Fuel (return with same level)",
    ],
  },
  25: {
    id: 25,
    name: "Volkswagen Touareg",
    brand: "Volkswagen",
    image: "/VOLKSWAGEN TOUAREG.webp",
    price: 140,
    originalPrice: 160,
    transmission: "Automatic",
    seats: 7,
    category: "SUV",
    fuel: "Diesel",
    ac: true,
    popular: false,
    bodyType: "suv",
    locations: ["Marrakech-Aéroport", "Casablanca - Aéroport"],
    quickFilter: "suv",
    year: 2024,
    rating: 4.7,
    reviews: 150,
    description: {
      en: "The Volkswagen Touareg is a premium SUV that offers luxury, technology, and capability in equal measure. With its spacious interior, powerful engine, and advanced features, this vehicle provides a comfortable and confident driving experience for exploring Morocco's diverse landscapes.",
      fr: "Le Volkswagen Touareg est un SUV premium qui offre luxe, technologie et capacité à parts égales. Avec son intérieur spacieux, son moteur puissant et ses fonctionnalités avancées, ce vhicule offre une expérience de conduite confortable et confiante pour explorer les paysages variés du Maroc.",
    },
    engine: "3.0 V6 TDI",
    power: "286 hp",
    fuelConsumation: "6.8 L/100km",
    features: [
      "Discover Premium Navigation",
      "Digital Cockpit Pro",
      "Nappa Leather Seats",
      "Panoramic Sunroof",
      "Four-Zone Climate Control",
      "Dynaudio Sound System",
      "Air Suspension",
    ],
    safetyFeatures: [
      "Adaptive Cruise Control",
      "Lane Assist",
      "Front Assist",
      "Side Assist",
      "Park Assist Pro",
      "Night Vision",
      "Emergency Assist",
    ],
    included: [
      "Unlimited Mileage",
      "Premium Insurance",
      "24/7 Premium Support",
      "Airport Pickup & Drop-off",
      "Free Cancellation (72h notice)",
    ],
    notIncluded: [
      "Child Seat (optional)",
      "Additional Driver Fee",
      "Fuel (return with same level)",
      "Border Crossing Fee",
    ],
  },
}

export default function CarDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()

  const carId = Number.parseInt(params.id as string)
  const car = carsData[carId as keyof typeof carsData]

  useEffect(() => {
    // Disable browser scroll restoration and force scroll to top
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual"
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      window.scrollTo(0, 0)

      requestAnimationFrame(() => {
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      })
    }
  }, [])

  useEffect(() => {
    if (!car) {
      router.push("/cars")
    }
  }, [car, router])

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {language === "en" ? "Car not found" : "Voiture non trouvée"}
          </h1>
          <Link href="/cars">
            <Button className="bg-primary hover:bg-primary/90">
              {language === "en" ? "Back to Fleet" : "Retour à la Flotte"}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const scrollToBooking = () => {
    const bookingSection = document.getElementById("booking-section")
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <main className="flex min-h-screen flex-col overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-secondary via-secondary/90 to-secondary/80 overflow-hidden">
          {/* Navigation Background Overlay */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-secondary to-transparent z-10"></div>

          {/* Enhanced Moroccan Background Pattern */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Animated geometric patterns */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
                <defs>
                  <pattern id="moroccanPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                    <path
                      d="M60,10 L110,60 L60,110 L10,60 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-primary/30"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-primary/20"
                    />
                    <path
                      d="M40,40 L80,40 L80,80 L40,80 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-primary/15"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#moroccanPattern)" />
              </svg>
            </div>

            {/* Floating geometric shapes */}
            <div className="absolute top-20 left-10 w-32 h-32 opacity-20 animate-pulse">
              <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
                <polygon points="50,5 95,35 95,65 50,95 5,65 5,35" fill="none" stroke="currentColor" strokeWidth="2" />
                <polygon
                  points="50,20 80,35 80,65 50,80 20,65 20,35"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </div>

            <div className="absolute top-40 right-20 w-24 h-24 opacity-15 animate-pulse delay-1000">
              <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>

            <div className="absolute bottom-20 left-1/4 w-28 h-28 opacity-10 animate-pulse delay-2000">
              <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
                <path d="M50,10 L90,50 L50,90 L10,50 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M50,25 L75,50 L50,75 L25,50 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>

            {/* Top decorative border with gradient */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-primary via-orange-400 to-primary opacity-90"></div>

            {/* Corner decorations with enhanced styling */}
            <svg className="absolute top-4 left-4 w-32 h-32 text-white/15" viewBox="0 0 100 100" fill="none">
              <path d="M0,0 L40,0 C30,15 15,30 0,40 Z" fill="currentColor" />
              <path d="M0,0 L0,40 C15,30 30,15 40,0 Z" fill="currentColor" />
              <path d="M10,10 L30,10 C25,20 20,25 10,30 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>

            <svg className="absolute top-4 right-4 w-32 h-32 text-white/15" viewBox="0 0 100 100" fill="none">
              <path d="M100,0 L60,0 C70,15 85,30 100,40 Z" fill="currentColor" />
              <path d="M100,0 L100,40 C85,30 70,15 60,0 Z" fill="currentColor" />
              <path d="M90,10 L70,10 C75,20 80,25 90,30 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>

            <svg className="absolute bottom-4 left-4 w-32 h-32 text-white/10" viewBox="0 0 100 100" fill="none">
              <path d="M0,100 L40,100 C30,85 15,70 0,60 Z" fill="currentColor" />
              <path d="M0,100 L0,60 C15,70 30,85 40,100 Z" fill="currentColor" />
            </svg>

            <svg className="absolute bottom-4 right-4 w-32 h-32 text-white/10" viewBox="0 0 100 100" fill="none">
              <path d="M100,100 L60,100 C70,85 85,70 100,60 Z" fill="currentColor" />
              <path d="M100,100 L100,60 C85,70 70,85 60,100 Z" fill="currentColor" />
            </svg>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-4 pt-8">
            {/* Breadcrumb */}
            <div className="mb-6">
              <nav className="flex items-center text-sm text-white/80">
                <Link href="/" className="hover:text-white transition-colors">
                  {language === "en" ? "Home" : "Accueil"}
                </Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <Link href="/cars" className="hover:text-white transition-colors">
                  {language === "en" ? "Fleet" : "Flotte"}
                </Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-white font-medium">{car.name}</span>
              </nav>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Column - Car Info */}
              <div className="text-white">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-primary text-white border-0 shadow-lg">{car.category}</Badge>
                  {car.popular && (
                    <Badge className="bg-orange-500 text-white border-0 animate-pulse shadow-lg">
                      {language === "en" ? "POPULAR CHOICE" : "CHOIX POPULAIRE"}
                    </Badge>
                  )}
                  {car.originalPrice > car.price && (
                    <Badge className="bg-green-500 text-white border-0 shadow-lg">
                      {language === "en" ? "SPECIAL OFFER" : "OFFRE SPÉCIALE"}
                    </Badge>
                  )}
                </div>

                {/* Car Title */}
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">{car.name}</h1>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(car.rating) ? "fill-yellow-400 text-yellow-400" : "text-white/30"
                        }`}
                      />
                    ))}
                    <span className="ml-2 font-semibold">{car.rating}</span>
                  </div>
                  <span className="text-white/80">
                    ({car.reviews} {language === "en" ? "reviews" : "avis"})
                  </span>
                </div>

                {/* Quick Specs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white/15 backdrop-blur-sm rounded-lg p-3 text-center border border-white/30 shadow-lg">
                    <Users className="w-6 h-6 mx-auto mb-1 text-primary" />
                    <div className="text-sm font-medium">
                      {car.seats} {language === "en" ? "Seats" : "Sièges"}
                    </div>
                  </div>
                  <div className="bg-white/15 backdrop-blur-sm rounded-lg p-3 text-center border border-white/30 shadow-lg">
                    <Car className="w-6 h-6 mx-auto mb-1 text-primary" />
                    <div className="text-sm font-medium">{car.transmission}</div>
                  </div>
                  <div className="bg-white/15 backdrop-blur-sm rounded-lg p-3 text-center border border-white/30 shadow-lg">
                    <Fuel className="w-6 h-6 mx-auto mb-1 text-primary" />
                    <div className="text-sm font-medium">{car.fuel}</div>
                  </div>
                  <div className="bg-white/15 backdrop-blur-sm rounded-lg p-3 text-center border border-white/30 shadow-lg">
                    <Wind className="w-6 h-6 mx-auto mb-1 text-primary" />
                    <div className="text-sm font-medium">{language === "en" ? "A/C" : "Clim"}</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Price Card */}
              <div className="flex justify-center lg:justify-end">
                <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl max-w-sm w-full sm:w-auto">
                  <CardContent className="p-6">
                    {/* Price */}
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-4xl font-bold text-primary">{car.price}€</span>
                        <span className="text-gray-600 text-lg">/{language === "en" ? "day" : "jour"}</span>
                      </div>
                      {car.originalPrice > car.price && (
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-xl text-gray-400 line-through">{car.originalPrice}€</span>
                          <Badge className="bg-green-500 text-white">
                            {language === "en" ? "Save" : "Économisez"} {car.originalPrice - car.price}€
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Quick Contact */}
                    <div className="space-y-3">
                      <Button className="w-full bg-secondary hover:bg-secondary/90 text-white shadow-lg" asChild>
                        <a href="tel:+212123456789">
                          <Phone className="w-4 h-4 mr-2" />
                          {language === "en" ? "Call Now" : "Appeler"}
                        </a>
                      </Button>

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          className="w-full border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                          asChild
                        >
                          <a href="https://wa.me/212123456789">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            WhatsApp
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                          asChild
                        >
                          <a href="mailto:info@gocarrentmarrakech.com">
                            <Mail className="w-4 h-4 mr-1" />
                            Email
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Shield className="w-3 h-3 text-green-500" />
                          <span>{language === "en" ? "Insured" : "Assuré"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-blue-500" />
                          <span>{language === "en" ? "24/7 Support" : "Support 24/7"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Check className="w-3 h-3 text-green-500" />
                          <span>{language === "en" ? "Verified" : "Vérifié"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-3 h-3 text-primary" />
                          <span>{language === "en" ? "Premium" : "Premium"}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Moroccan-inspired divider */}
        <MoroccanDivider color="#FE9305" className="-mt-1 relative z-20" />

        {/* Main Content Section */}
        <section className="py-16 bg-gradient-to-br from-orange-50/50 via-white to-red-50/50 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Car Details */}
              <div className="lg:col-span-2">
                {/* Car Gallery */}
                <Card className="mb-8 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-64 md:h-80 lg:h-96">
                      <Image
                        src={car.image || "/placeholder.svg"}
                        alt={car.name}
                        fill
                        className="object-cover object-center"
                      />

                      {/* Overlay with car info */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <div className="text-white">
                          <h3 className="text-xl font-bold mb-2">{car.name}</h3>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Zap className="w-4 h-4" />
                              {car.engine}
                            </span>
                            <span className="flex items-center gap-1">
                              <Settings className="w-4 h-4" />
                              {car.power}
                            </span>
                            <span className="flex items-center gap-1">
                              <Fuel className="w-4 h-4" />
                              {car.fuelConsumption}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Information Tabs */}
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-4 mb-6">
                        <TabsTrigger value="overview" className="text-sm">
                          {language === "en" ? "Overview" : "Aperçu"}
                        </TabsTrigger>
                        <TabsTrigger value="features" className="text-sm">
                          {language === "en" ? "Features" : "Équipements"}
                        </TabsTrigger>
                        <TabsTrigger value="safety" className="text-sm">
                          {language === "en" ? "Safety" : "Sécurité"}
                        </TabsTrigger>
                        <TabsTrigger value="included" className="text-sm">
                          {language === "en" ? "Included" : "Inclus"}
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-6">
                        <div>
                          <h3 className="text-xl font-bold mb-4 text-gray-900">
                            {language === "en" ? "About this vehicle" : "À propos de ce véhicule"}
                          </h3>
                          <p className="text-gray-600 leading-relaxed text-lg">
                            {car.description[language as keyof typeof car.description]}
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-semibold mb-3 text-gray-900">
                              {language === "en" ? "Technical Specifications" : "Spécifications Techniques"}
                            </h4>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">{language === "en" ? "Engine" : "Moteur"}:</span>
                                <span className="font-medium text-gray-900">{car.engine}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">{language === "en" ? "Power" : "Puissance"}:</span>
                                <span className="font-medium text-gray-900">{car.power}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">
                                  {language === "en" ? "Consumption" : "Consommation"}:
                                </span>
                                <span className="font-medium text-gray-900">{car.fuelConsumption}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">{language === "en" ? "Year" : "Année"}:</span>
                                <span className="font-medium text-gray-900">{car.year}</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-primary/5 rounded-lg p-4">
                            <h4 className="font-semibold mb-3 text-gray-900">
                              {language === "en" ? "Available Locations" : "Lieux Disponibles"}
                            </h4>
                            <div className="space-y-2">
                              {car.locations.map((location, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-primary" />
                                  <span className="text-gray-700">{location}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="features" className="space-y-6">
                        <div>
                          <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
                            <Award className="w-6 h-6 text-primary mr-2" />
                            {language === "en" ? "Comfort & Convenience" : "Confort et Commodité"}
                          </h3>
                          <div className="grid md:grid-cols-2 gap-3">
                            {car.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="safety" className="space-y-6">
                        <div>
                          <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
                            <Shield className="w-6 h-6 text-blue-500 mr-2" />
                            {language === "en" ? "Safety Features" : "Caractéristiques de Sécurité"}
                          </h3>
                          <div className="grid md:grid-cols-2 gap-3">
                            {car.safetyFeatures.map((feature, index) => (
                              <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                <Shield className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="included" className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="bg-green-50 rounded-lg p-6">
                            <h3 className="text-lg font-bold mb-4 text-green-700 flex items-center">
                              <Check className="w-5 h-5 mr-2" />
                              {language === "en" ? "Included in Price" : "Inclus dans le Prix"}
                            </h3>
                            <div className="space-y-3">
                              {car.included.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <Check className="w-4 h-4 text-green-500" />
                                  <span className="text-gray-700">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-red-50 rounded-lg p-6">
                            <h3 className="text-lg font-bold mb-4 text-red-700 flex items-center">
                              <X className="w-5 h-5 mr-2" />
                              {language === "en" ? "Additional Costs" : "Coûts Supplémentaires"}
                            </h3>
                            <div className="space-y-3">
                              {car.notIncluded.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <X className="w-4 h-4 text-red-500" />
                                  <span className="text-gray-700">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Booking Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Price Summary Card */}
                  <Card className="shadow-lg border-2 border-primary/20">
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <span className="text-3xl font-bold text-primary">{car.price}€</span>
                          <span className="text-gray-600">/{language === "en" ? "day" : "jour"}</span>
                        </div>
                        {car.originalPrice > car.price && (
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-lg text-gray-400 line-through">{car.originalPrice}€</span>
                            <Badge className="bg-green-500 text-white">
                              -{Math.round(((car.originalPrice - car.price) / car.originalPrice) * 100)}%
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <Button
                          className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg font-semibold"
                          onClick={scrollToBooking}
                        >
                          <Calendar className="w-5 h-5 mr-2" />
                          {language === "en" ? "Book This Car" : "Réserver Cette Voiture"}
                        </Button>

                        <div className="text-center text-sm text-gray-600">
                          {language === "en" ? "Free cancellation up to 48 hours" : "Annulation gratuite jusqu'à 48h"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Info Card */}
                  <Card className="shadow-lg">
                    <CardContent className="p-6">
                      <h4 className="font-bold mb-4 text-gray-900">
                        {language === "en" ? "Quick Information" : "Informations Rapides"}
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">{language === "en" ? "Category" : "Catégorie"}:</span>
                          <Badge variant="outline">{car.category}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">{language === "en" ? "Transmission" : "Transmission"}:</span>
                          <span className="font-medium">{car.transmission}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">{language === "en" ? "Fuel Type" : "Carburant"}:</span>
                          <span className="font-medium">{car.fuel}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">{language === "en" ? "Passengers" : "Passagers"}:</span>
                          <span className="font-medium">{car.seats}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">{language === "en" ? "Rating" : "Note"}:</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{car.rating}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Card */}
                  <Card className="shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5">
                    <CardContent className="p-6">
                      <h4 className="font-bold mb-4 text-gray-900">
                        {language === "en" ? "Need Help?" : "Besoin d'Aide?"}
                      </h4>
                      <p className="text-gray-600 text-sm mb-4">
                        {language === "en"
                          ? "Our team is here to help you choose the perfect car for your trip."
                          : "Notre équipe est là pour vous aider à choisir la voiture parfaite pour votre voyage."}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="justify-start" asChild>
                          <a href="tel:+212123456789">
                            <Phone className="w-4 h-4 mr-2" />
                            +212 123 456 789
                          </a>
                        </Button>
                        <Button variant="outline" className="justify-start" asChild>
                          <a href="https://wa.me/212123456789">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            WhatsApp
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Booking Form Section */}
            <div id="booking-section" className="mt-16">
              <MoroccanDivider color="#117485" />

              <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 py-16 mt-8 rounded-2xl mb-16">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      {language === "en" ? "Reserve Your" : "Réservez Votre"} {car.name}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      {language === "en"
                        ? "Complete the form below to secure your booking. We'll confirm your reservation within 2 hours."
                        : "Complétez le formulaire ci-dessous pour sécuriser votre réservation. Nous confirmerons votre réservation dans les 2 heures."}
                    </p>
                  </div>

                  <Card className="max-w-6xl mx-auto shadow-2xl">
                    <CardContent className="p-8">
                      <BookingForm selectedCarId={car.id} />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
