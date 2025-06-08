"use client"

import type React from "react"
import { useState, useRef, useEffect, useActionState } from "react"
import { CalendarIcon, Car, User, Phone, Mail, ChevronLeft, ChevronRight } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  isBefore,
} from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/context/language-context"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { submitBooking, type BookingFormState } from "@/app/actions/booking-actions"
import { toast } from "@/components/ui/use-toast"

const cars = [
  { id: 1, name: "Audi A3 Sportback", price: 85 },
  { id: 2, name: "Audi Q8 S Line", price: 180 },
  { id: 3, name: "BMW Series 2 Pack M", price: 95 },
  { id: 4, name: "Citroen C3", price: 35 },
  { id: 5, name: "Dacia Duster", price: 45 },
  { id: 6, name: "Dacia Lodgy", price: 55 },
  { id: 7, name: "Dacia Logan", price: 30 },
  { id: 8, name: "Dacia Sandero", price: 32 },
  { id: 9, name: "Fiat 500 Cabriolet", price: 65 },
  { id: 10, name: "Hyundai Accent", price: 38 },
  { id: 11, name: "Hyundai i10", price: 28 },
  { id: 12, name: "Hyundai Tucson", price: 75 },
  { id: 13, name: "Jeep Renegade", price: 68 },
  { id: 14, name: "Kia Picanto", price: 25 },
  { id: 15, name: "Mercedes Classe A 200 Pack AMG", price: 120 },
  { id: 16, name: "Mercedes Classe A", price: 95 },
  { id: 17, name: "Peugeot 208", price: 42 },
  { id: 18, name: "Porsche Macan GTS", price: 250 },
  { id: 19, name: "Range Rover Autobiography", price: 300 },
  { id: 20, name: "Range Rover Evoque R Dynamic", price: 150 },
  { id: 21, name: "Range Rover Sport", price: 200 },
  { id: 22, name: "Renault Clio 5", price: 40 },
  { id: 23, name: "Volkswagen Golf 8 R Line", price: 78 },
  { id: 24, name: "Volkswagen T-ROC", price: 85 },
  { id: 25, name: "Volkswagen Touareg", price: 140 },
]

interface BookingFormProps {
  isHero?: boolean
  selectedCarId?: number
}

interface CustomCalendarProps {
  selected?: Date
  onSelect: (date: Date) => void
  minDate?: Date
  onClose: () => void
  position: "top" | "bottom"
}

function CustomCalendar({ selected, onSelect, minDate = new Date(), onClose, position }: CustomCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(selected || new Date())
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const startDay = monthStart.getDay()
  const emptyCells = Array(startDay).fill(null)
  const handleDateSelect = (date: Date) => {
    onSelect(date)
    onClose()
  }
  const positionClasses = position === "top" ? "bottom-full mb-2" : "top-full mt-2"

  return (
    <div
      className={cn(
        "absolute left-0 p-4 bg-white rounded-lg shadow-xl border border-gray-200 z-[9999] min-w-[300px]",
        positionClasses,
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={goToPreviousMonth} className="h-8 w-8 hover:bg-primary/10">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-lg font-semibold text-gray-900">{format(currentMonth, "MMMM yyyy")}</h3>
        <Button variant="ghost" size="icon" onClick={goToNextMonth} className="h-8 w-8 hover:bg-primary/10">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {emptyCells.map((_, index) => (
          <div key={`empty-${index}`} className="h-10" />
        ))}
        {days.map((day) => {
          const isDisabled = isBefore(day, minDate) && !isSameDay(day, minDate)
          const isSelected = selected && isSameDay(day, selected)
          const isTodayDate = isToday(day)
          return (
            <button
              key={day.toISOString()}
              onClick={() => !isDisabled && handleDateSelect(day)}
              disabled={isDisabled}
              className={cn(
                "h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200",
                "hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20",
                {
                  "bg-primary text-white font-bold hover:bg-primary/90 ring-2 ring-primary/50": isSelected,
                  "bg-secondary/20 text-secondary font-bold": isTodayDate && !isSelected,
                  "text-gray-400 cursor-not-allowed": isDisabled,
                  "text-gray-900 hover:bg-gray-100": !isSelected && !isDisabled && !isTodayDate,
                },
              )}
            >
              {format(day, "d")}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function BookingForm({ isHero = false, selectedCarId }: BookingFormProps) {
  const [arrivalDate, setArrivalDate] = useState<Date>()
  const [departureDate, setDepartureDate] = useState<Date>()
  const [arrivalOpen, setArrivalOpen] = useState(false)
  const [departureOpen, setDepartureOpen] = useState(false)
  const [calendarPosition, setCalendarPosition] = useState<"top" | "bottom">("bottom")
  const { t, language } = useLanguage()

  const arrivalRef = useRef<HTMLDivElement>(null)
  const departureRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const [state, formAction, isPending] = useActionState<BookingFormState, FormData>(submitBooking, null)

  // Local state for displaying form messages
  const [formMessage, setFormMessage] = useState<string | null>(null)
  const [isSuccessMessage, setIsSuccessMessage] = useState<boolean>(false)

  useEffect(() => {
    if (!state) {
      setFormMessage(null) // Clear message if state is reset
      return
    }

    setFormMessage(state.message) // Set the message from the action state

    if (state.success) {
      setIsSuccessMessage(true)
      toast({
        title: "Booking Submitted!",
        description: state.message,
      })
      formRef.current?.reset()
      setArrivalDate(undefined)
      setDepartureDate(undefined)
      // After successful submission and reset, clear the success message from the form
      // to prevent it from showing if the user interacts with the form again.
      // Or, let it persist until the next submission attempt. For now, let it persist.
      // To clear after a delay:
      // setTimeout(() => setFormMessage(null), 5000);
    } else if (state.error) {
      setIsSuccessMessage(false)
      // Toast is still good for errors, especially if they are detailed
      toast({
        title: "Booking Failed",
        description: state.message, // Use the main message for the toast
        variant: "destructive",
      })
      if (state.errors) {
        // Field-specific errors are handled below inputs
        console.error("Field errors:", state.errors)
      }
    }
  }, [state])

  const calculatePosition = (buttonRef: React.RefObject<HTMLDivElement>) => {
    if (!buttonRef.current) return "bottom"
    const rect = buttonRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const spaceBelow = viewportHeight - rect.bottom
    const spaceAbove = rect.top
    const calendarHeight = 350
    if (spaceBelow < calendarHeight && spaceAbove > calendarHeight) {
      return "top"
    }
    return "bottom"
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (arrivalRef.current && !arrivalRef.current.contains(event.target as Node)) {
        setArrivalOpen(false)
      }
      if (departureRef.current && !departureRef.current.contains(event.target as Node)) {
        setDepartureOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleArrivalClick = () => {
    const position = calculatePosition(arrivalRef)
    setCalendarPosition(position)
    setArrivalOpen(!arrivalOpen)
    setDepartureOpen(false)
  }

  const handleDepartureClick = () => {
    const position = calculatePosition(departureRef)
    setCalendarPosition(position)
    setDepartureOpen(!departureOpen)
    setArrivalOpen(false)
  }

  const handleArrivalSelect = (date: Date) => {
    setArrivalDate(date)
    if (departureDate && isBefore(departureDate, date)) {
      setDepartureDate(undefined)
    }
    setFormMessage(null) // Clear message on new input
  }

  const handleDepartureSelect = (date: Date) => {
    setDepartureDate(date)
    setFormMessage(null) // Clear message on new input
  }

  const handleInputChange = () => {
    setFormMessage(null) // Clear message when user starts typing in any input
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-4 relative">
      <div className="absolute -top-3 -left-3 w-16 h-16 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="#FE9305" strokeWidth="2" />
          <path d="M20,20 L80,20 L80,80 L20,80 Z" fill="none" stroke="#FE9305" strokeWidth="2" />
          <path d="M40,40 L60,40 L60,60 L40,60 Z" fill="none" stroke="#FE9305" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute -bottom-3 -right-3 w-16 h-16 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="#FE9305" strokeWidth="2" />
          <path d="M20,20 L80,20 L80,80 L20,80 Z" fill="none" stroke="#FE9305" strokeWidth="2" />
          <path d="M40,40 L60,40 L60,60 L40,60 Z" fill="none" stroke="#FE9305" strokeWidth="2" />
        </svg>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-800">{language === "en" ? "Full Name" : "Nom Complet"}</div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              name="fullName"
              required
              className="bg-white/80 border-white/30 text-gray-800 hover:bg-white/90 transition-colors pl-10"
              placeholder={language === "en" ? "Your name" : "Votre nom"}
              onChange={handleInputChange}
            />
            {state?.errors?.fullName && <p className="text-xs text-red-500 mt-1">{state.errors.fullName.join(", ")}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-800">
            {language === "en" ? "Email Address" : "Adresse E-mail"}
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              name="email"
              type="email"
              required
              className="bg-white/80 border-white/30 text-gray-800 hover:bg-white/90 transition-colors pl-10"
              placeholder={language === "en" ? "your.email@example.com" : "votre.email@example.com"}
              onChange={handleInputChange}
            />
            {state?.errors?.email && <p className="text-xs text-red-500 mt-1">{state.errors.email.join(", ")}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-800">{language === "en" ? "Phone Number" : "Téléphone"}</div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              name="phone"
              type="tel"
              required
              className="bg-white/80 border-white/30 text-gray-800 hover:bg-white/90 transition-colors pl-10"
              placeholder="+212 6XX XXX XXX"
              onChange={handleInputChange}
            />
            {state?.errors?.phone && <p className="text-xs text-red-500 mt-1">{state.errors.phone.join(", ")}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-800">
            {language === "en" ? "Select Car" : "Choisir Voiture"}
          </div>
          <Select
            name="selectedCar"
            defaultValue={selectedCarId ? cars.find((c) => c.id === selectedCarId)?.name : undefined}
            required
            onValueChange={handleInputChange}
          >
            <SelectTrigger className="bg-white/80 border-white/30 text-gray-800 hover:bg-white/90 transition-colors">
              <SelectValue placeholder={language === "en" ? "Choose car" : "Choisir voiture"} />
            </SelectTrigger>
            <SelectContent>
              {cars.map((car) => (
                <SelectItem key={car.id} value={car.name}>
                  {car.name} - {car.price}€/{language === "en" ? "day" : "jour"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {state?.errors?.selectedCar && (
            <p className="text-xs text-red-500 mt-1">{state.errors.selectedCar.join(", ")}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-800">
            {language === "en" ? "Arrival Date" : "Date d'Arrivée"}
          </div>
          <div className="relative" ref={arrivalRef}>
            <input name="arrivalDate" type="hidden" value={arrivalDate ? format(arrivalDate, "yyyy-MM-dd") : ""} />
            <Button
              type="button"
              variant="outline"
              onClick={handleArrivalClick}
              className="w-full justify-start text-left font-normal bg-white/80 border-white/30 text-gray-800 hover:bg-white/90 hover:text-gray-900 transition-colors"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {arrivalDate ? (
                format(arrivalDate, "MMM dd, yyyy")
              ) : (
                <span className="text-gray-500 hover:text-gray-900">
                  {language === "en" ? "Select date" : "Choisir date"}
                </span>
              )}
            </Button>
            {arrivalOpen && (
              <CustomCalendar
                selected={arrivalDate}
                onSelect={handleArrivalSelect}
                minDate={new Date()}
                onClose={() => setArrivalOpen(false)}
                position={calendarPosition}
              />
            )}
            {state?.errors?.arrivalDate && (
              <p className="text-xs text-red-500 mt-1">{state.errors.arrivalDate.join(", ")}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-800">
            {language === "en" ? "Departure Date" : "Date de Départ"}
          </div>
          <div className="relative" ref={departureRef}>
            <input
              name="departureDate"
              type="hidden"
              value={departureDate ? format(departureDate, "yyyy-MM-dd") : ""}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleDepartureClick}
              className="w-full justify-start text-left font-normal bg-white/80 border-white/30 text-gray-800 hover:bg-white/90 hover:text-gray-900 transition-colors"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {departureDate ? (
                format(departureDate, "MMM dd, yyyy")
              ) : (
                <span className="text-gray-500 hover:text-gray-900">
                  {language === "en" ? "Select date" : "Choisir date"}
                </span>
              )}
            </Button>
            {departureOpen && (
              <CustomCalendar
                selected={departureDate}
                onSelect={handleDepartureSelect}
                minDate={arrivalDate || new Date()}
                onClose={() => setDepartureOpen(false)}
                position={calendarPosition}
              />
            )}
            {state?.errors?.departureDate && (
              <p className="text-xs text-red-500 mt-1">{state.errors.departureDate.join(", ")}</p>
            )}
          </div>
        </div>
      </div>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          disabled={isPending || !arrivalDate || !departureDate}
          className="w-full py-6 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70"
        >
          <Car className="mr-2 h-5 w-5" />
          {isPending
            ? language === "en"
              ? "Submitting..."
              : "Envoi en cours..."
            : language === "en"
              ? "Rent Now"
              : "Réserver Maintenant"}
        </Button>
      </motion.div>

      {/* Display form message here */}
      {formMessage && (
        <div
          className={cn(
            "mt-2 sm:mt-4 text-center p-2 sm:p-3 rounded-md text-xs sm:text-sm",
            isSuccessMessage
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300",
          )}
          role="alert"
        >
          {formMessage}
        </div>
      )}
    </form>
  )
}
