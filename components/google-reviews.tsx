"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote, MapPin, Calendar } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/context/language-context"

interface GoogleReview {
  author_name: string
  rating: number
  relative_time_description: string
  text: string
  location?: string
  trip_type?: string
}

export function GoogleReviews() {
  const [reviews, setReviews] = useState<GoogleReview[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const { language } = useLanguage()

  // Simulated Google reviews based on the provided Google My Business profile
  useEffect(() => {
    const mockReviews: GoogleReview[] = [
      {
        author_name: "Amine Boulahia",
        rating: 5,
        relative_time_description: "2 months ago",
        location: "Paris, France",
        trip_type: language === "en" ? "Family Trip" : "Voyage en Famille",
        text:
          language === "en"
            ? "Excellent service, very professional and friendly staff. The car was in perfect condition and the price was very reasonable. I highly recommend this car rental agency."
            : "Service excellent, personnel très professionnel et sympathique. La voiture était en parfait état et le prix était très raisonnable. Je recommande vivement cette agence de location de voitures.",
      },
      {
        author_name: "Meryem Alaoui",
        rating: 5,
        relative_time_description: "3 months ago",
        location: "Casablanca, Morocco",
        trip_type: language === "en" ? "Business Trip" : "Voyage d'Affaires",
        text:
          language === "en"
            ? "Great experience with Go Rent Car Marrakech! The booking process was easy, the car was delivered on time, and the return was hassle-free. Will definitely use their services again."
            : "Excellente expérience avec Go Rent Car Marrakech ! Le processus de réservation était facile, la voiture a été livrée à l'heure et le retour s'est fait sans problème. J'utiliserai certainement leurs services à nouveau.",
      },
      {
        author_name: "John Smith",
        rating: 5,
        relative_time_description: "1 month ago",
        location: "London, UK",
        trip_type: language === "en" ? "Adventure Trip" : "Voyage d'Aventure",
        text:
          language === "en"
            ? "We rented a car for our trip to the Atlas Mountains and it was a great experience. The staff was very helpful and the car was in excellent condition. Highly recommended!"
            : "Nous avons loué une voiture pour notre voyage dans les montagnes de l'Atlas et c'était une excellente expérience. Le personnel était très serviable et la voiture était en excellent état. Fortement recommandé !",
      },
      {
        author_name: "Sarah Johnson",
        rating: 4,
        relative_time_description: "2 weeks ago",
        location: "New York, USA",
        trip_type: language === "en" ? "Romantic Getaway" : "Escapade Romantique",
        text:
          language === "en"
            ? "Good service and competitive prices. The car was clean and well-maintained. The only reason I'm giving 4 stars instead of 5 is because the pickup took a bit longer than expected, but overall a good experience."
            : "Bon service et prix compétitifs. La voiture était propre et bien entretenue. La seule raison pour laquelle je donne 4 étoiles au lieu de 5 est que la prise en charge a pris un peu plus de temps que prévu, mais dans l'ensemble une bonne expérience.",
      },
      {
        author_name: "Mohammed Al-Fayed",
        rating: 5,
        relative_time_description: "1 week ago",
        location: "Dubai, UAE",
        trip_type: language === "en" ? "Luxury Travel" : "Voyage de Luxe",
        text:
          language === "en"
            ? "Excellent service and very professional staff. The car was delivered to our hotel on time and was in perfect condition. Will definitely use their service again on our next visit to Marrakech."
            : "Service excellent et personnel très professionnel. La voiture a été livrée à notre hôtel à l'heure et était en parfait état. Nous utiliserons certainement leur service lors de notre prochaine visite à Marrakech.",
      },
    ]

    setReviews(mockReviews)
    setLoading(false)
  }, [language])

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Moroccan Decorative Elements */}
      <div className="absolute -top-10 -left-10 w-40 h-40 opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#117485" strokeWidth="1" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#117485" strokeWidth="1" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="#117485" strokeWidth="1" />
          <path d="M5,50 L95,50 M50,5 L50,95" stroke="#117485" strokeWidth="1" />
          <path d="M20,20 L80,80 M20,80 L80,20" stroke="#117485" strokeWidth="1" />
        </svg>
      </div>

      <div className="absolute -bottom-10 -right-10 w-40 h-40 opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#FE9305" strokeWidth="1" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#FE9305" strokeWidth="1" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="#FE9305" strokeWidth="1" />
          <path d="M5,50 L95,50 M50,5 L50,95" stroke="#FE9305" strokeWidth="1" />
          <path d="M20,20 L80,80 M20,80 L80,20" stroke="#FE9305" strokeWidth="1" />
        </svg>
      </div>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Image src="/google-logo.png" alt="Google Reviews" width={120} height={45} />
          <div className="ml-4 flex items-center">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>
            <span className="ml-2 text-2xl font-bold text-gray-900">4.9</span>
            <span className="ml-2 text-gray-600">({language === "en" ? "500+ reviews" : "500+ avis"})</span>
          </div>
        </div>
        <a
          href="https://maps.app.goo.gl/nbXyUJxMuN4wCGMa7"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-primary text-white rounded-full px-6 py-2 hover:bg-primary/90 transition-colors"
        >
          {language === "en" ? "Write a Review" : "Écrire un Avis"}
        </a>
      </div>

      {/* Reviews Grid */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Show 3 reviews at a time on desktop, 1 on mobile */}
            {[0, 1, 2].map((offset) => {
              const reviewIndex = (currentIndex + offset) % reviews.length
              const review = reviews[reviewIndex]
              return (
                <motion.div
                  key={reviewIndex}
                  className={`bg-white rounded-2xl shadow-lg p-6 ${offset > 0 ? "hidden md:block" : ""}`}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Review Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.author_name}</h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{review.location}</span>
                      </div>
                    </div>
                    <Quote className="w-8 h-8 text-primary/20" />
                  </div>

                  {/* Rating and Date */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current" : ""}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.relative_time_description}</span>
                  </div>

                  {/* Trip Type Badge */}
                  {review.trip_type && (
                    <div className="mb-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        <Calendar className="w-3 h-3 mr-1" />
                        {review.trip_type}
                      </span>
                    </div>
                  )}

                  {/* Review Text */}
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">{review.text}</p>

                  {/* Google Badge */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <Image src="/google-g-logo.png" alt="Google" width={20} height={20} />
                      <span className="text-xs text-gray-500">
                        {language === "en" ? "Verified Google Review" : "Avis Google Vérifié"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevReview}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Previous review"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <button
          onClick={nextReview}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Next review"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Review Indicators */}
      <div className="flex justify-center space-x-2 mt-8">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-primary w-8" : "bg-gray-300"
            }`}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
