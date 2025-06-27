"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MoroccanPattern } from "@/components/moroccan-pattern"
import { MoroccanDivider } from "@/components/moroccan-divider"
import { toast } from "@/components/ui/use-toast"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Facebook,
  Instagram,
  Twitter,
  MessageSquare,
  Calendar,
  Car,
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/context/language-context"
import { useActionState } from "react"
import { submitContactForm, type ContactFormState } from "@/app/actions/contact-actions"

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

export default function ContactPage() {
  const { scrollY } = useScroll()
  const heroRef = useRef(null)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const { t, language } = useLanguage()

  const initialState: ContactFormState = null
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)

  // Parallax effect for hero section
  const y = useTransform(scrollY, [0, 300], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 1.1])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (state?.success) {
      toast({
        title: t("contactPage.form.success.title"),
        description: state.message,
      })
      // Reset form fields
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } else if (state?.error) {
      toast({
        title: t("contactPage.form.error.title") || "Error", // Add a default error title to translations if needed
        description: state.message,
        variant: "destructive",
      })
    }
  }, [state, t])

  // Contact information with hardcoded details to avoid translation issues
  const contactInfo = [
    {
      icon: MapPin,
      title: t("contactPage.contactInfo.address.title"),
      details:
        language === "fr"
          ? ["123 Rue de Marrakech", "Guéliz, Marrakech", "Maroc"]
          : ["123 Marrakech Street", "Gueliz, Marrakech", "Morocco"],
      color: "bg-primary",
    },
    {
      icon: Phone,
      title: t("contactPage.contactInfo.phone.title"),
      details: ["+212 664 342 254", "+212 524 123 456"],
      color: "bg-secondary",
    },
    {
      icon: Mail,
      title: t("contactPage.contactInfo.email.title"),
      details: ["Réservation@gorentcarmarrakech.com", "support@gorentcarmarrakech.com"],
      color: "bg-primary",
    },
    {
      icon: Clock,
      title: t("contactPage.contactInfo.hours.title"),
      details:
        language === "fr"
          ? ["Lundi - Vendredi: 8h00 - 20h00", "Samedi - Dimanche: 9h00 - 18h00"]
          : ["Monday - Friday: 8:00 AM - 8:00 PM", "Saturday - Sunday: 9:00 AM - 6:00 PM"],
      color: "bg-secondary",
    },
  ]

  // FAQ items
  const faqItems = [
    {
      question: t("contactPage.faq.items.howToBook.question"),
      answer: t("contactPage.faq.items.howToBook.answer"),
    },
    {
      question: t("contactPage.faq.items.documents.question"),
      answer: t("contactPage.faq.items.documents.answer"),
    },
    {
      question: t("contactPage.faq.items.delivery.question"),
      answer: t("contactPage.faq.items.delivery.answer"),
    },
    {
      question: t("contactPage.faq.items.cancellation.question"),
      answer: t("contactPage.faq.items.cancellation.answer"),
    },
  ]

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative h-[400px] md:h-[500px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div className="absolute inset-0" style={{ y, scale }}>
            <Image
              src="/contact-hero-traveler.png"
              alt="Traveler with suitcase and rental car - Go Rent Car Marrakech contact"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
          </motion.div>
        </div>

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
            {t("contactPage.hero.title")}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t("contactPage.hero.subtitle")}
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Moroccan-inspired divider */}
      <MoroccanDivider color="#FE9305" className="-mt-1 relative z-20" />

      {/* Contact Information Section */}
      <motion.section
        className="py-20 bg-white relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <MoroccanPattern color="#117485" opacity={0.03} />
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <Badge className="mb-4 bg-primary/10 text-primary px-4 py-1 text-sm hover:bg-primary/20">
              {t("contactPage.getInTouch.badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("contactPage.getInTouch.title")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("contactPage.getInTouch.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 h-full"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`${info.color} rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6`}>
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social Media Links */}
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6 mb-16">
            <motion.a
              href="#"
              className="bg-white p-4 rounded-full shadow-lg border border-gray-100 text-primary hover:bg-primary hover:text-white transition-colors duration-300"
              whileHover={{ y: -5, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Facebook className="w-6 h-6" />
              <span className="sr-only">Facebook</span>
            </motion.a>
            <motion.a
              href="#"
              className="bg-white p-4 rounded-full shadow-lg border border-gray-100 text-primary hover:bg-primary hover:text-white transition-colors duration-300"
              whileHover={{ y: -5, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Instagram className="w-6 h-6" />
              <span className="sr-only">Instagram</span>
            </motion.a>
            <motion.a
              href="#"
              className="bg-white p-4 rounded-full shadow-lg border border-gray-100 text-primary hover:bg-primary hover:text-white transition-colors duration-300"
              whileHover={{ y: -5, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Twitter className="w-6 h-6" />
              <span className="sr-only">Twitter</span>
            </motion.a>
          </motion.div>

          {/* Map and Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Map */}
            <motion.div variants={fadeInUp} className="h-full">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-full">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <MapPin className="w-5 h-5 text-primary mr-2" />
                    {t("contactPage.map.title")}
                  </h3>
                </div>
                <div className="relative h-[400px] w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54341.40217724851!2d-8.0383518!3d31.6294723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d96179e51%3A0x5950b6534f87adb8!2sMarrakesh%2C%20Morocco!5e0!3m2!1sen!2sus!4v1653677104352!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  ></iframe>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={fadeInUp} className="h-full">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-full">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <MessageSquare className="w-5 h-5 text-primary mr-2" />
                    {t("contactPage.form.title")}
                  </h3>
                </div>
                <div className="p-6">
                  {state?.success ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 text-green-700 p-6 rounded-xl text-center"
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h4 className="text-xl font-bold mb-2">{t("contactPage.form.success.title")}</h4>
                      <p className="mb-4">{state.message}</p>
                      {/* The form will be reset by useEffect, so a "send another" button might not be needed,
                        or you'd need a separate state to toggle back to the form view if you want to keep this exact UI.
                        For simplicity with useActionState, the form usually just shows and resets.
                        If you want to keep the "Send Another Message" button, you'd need to manually reset the `state` from useActionState,
                        e.g., by calling a dummy action or managing an additional local state variable.
                        Let's remove the button for now to simplify, as the form fields will clear.
                        If the user wants to send another, they just fill the (now empty) form again.
                    */}
                    </motion.div>
                  ) : (
                    <form action={formAction} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium text-gray-700">
                            {t("contactPage.form.fields.fullName")}
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleInputChange}
                            placeholder={t("contactPage.form.placeholders.name")}
                            required
                            className="border-gray-200 focus:border-primary focus:ring-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            {t("contactPage.form.fields.email")}
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formState.email}
                            onChange={handleInputChange}
                            placeholder={t("contactPage.form.placeholders.email")}
                            required
                            className="border-gray-200 focus:border-primary focus:ring-primary"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                            {t("contactPage.form.fields.phone")}
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formState.phone}
                            onChange={handleInputChange}
                            placeholder={t("contactPage.form.placeholders.phone")}
                            className="border-gray-200 focus:border-primary focus:ring-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                            {t("contactPage.form.fields.subject")}
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formState.subject}
                            onChange={handleInputChange}
                            placeholder={t("contactPage.form.placeholders.subject")}
                            required
                            className="border-gray-200 focus:border-primary focus:ring-primary"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-gray-700">
                          {t("contactPage.form.fields.message")}
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleInputChange}
                          placeholder={t("contactPage.form.placeholders.message")}
                          required
                          rows={5}
                          className="border-gray-200 focus:border-primary focus:ring-primary"
                        />
                      </div>
                      {/* Display field-specific errors if any */}
                      {state?.errors && (
                        <div className="space-y-2">
                          {Object.entries(state.errors).map(([field, errors]) =>
                            errors.map((error, index) => (
                              <p key={`${field}-${index}`} className="text-sm text-red-600">
                                {/* You might want to map field names to translated labels here */}
                                <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong> {error}
                              </p>
                            )),
                          )}
                        </div>
                      )}
                      {/* General error message if not field-specific and not success */}
                      {state?.error && !state.errors && (
                        <p className="text-sm text-red-600 text-center">{state.message}</p>
                      )}
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="submit"
                          className="w-full bg-primary hover:bg-primary/90 text-white py-6 font-bold text-lg"
                          disabled={isPending}
                          aria-disabled={isPending}
                        >
                          {isPending ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              {t("contactPage.form.buttons.sending")}
                            </>
                          ) : (
                            <>
                              {t("contactPage.form.buttons.send")} <Send className="ml-2 h-5 w-5" />
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
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
              {t("contactPage.faq.badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("contactPage.faq.title")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("contactPage.faq.subtitle")}</p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                    <span className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    {item.question}
                  </h3>
                  <p className="text-gray-600 ml-11">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Quick Contact Options */}
      <motion.section
        className="py-16 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t("contactPage.quickContact.title")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("contactPage.quickContact.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Phone,
                title: t("contactPage.quickContact.options.call.title"),
                description: t("contactPage.quickContact.options.call.description"),
                action: t("contactPage.quickContact.options.call.action"),
                color: "bg-primary",
                href: "tel:+212664342254",
                type: "tel",
              },
              {
                icon: Calendar,
                title: t("contactPage.quickContact.options.book.title"),
                description: t("contactPage.quickContact.options.book.description"),
                action: t("contactPage.quickContact.options.book.action"),
                color: "bg-secondary",
                href: "/cars",
                type: "link",
              },
              {
                icon: Car,
                title: t("contactPage.quickContact.options.visit.title"),
                description: t("contactPage.quickContact.options.visit.description"),
                action: t("contactPage.quickContact.options.visit.action"),
                color: "bg-primary",
                href: "https://maps.google.com/?q=Marrakech,+Morocco",
                type: "external",
              },
            ].map((option, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`${option.color} rounded-full p-5 w-20 h-20 flex items-center justify-center mx-auto mb-6`}
                >
                  <option.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{option.title}</h3>
                <p className="text-gray-600 mb-6">{option.description}</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {option.type === "tel" ? (
                    <a href={option.href}>
                      <Button
                        className={`${
                          option.color === "bg-primary"
                            ? "bg-primary hover:bg-primary/90"
                            : "bg-secondary hover:bg-secondary/90"
                        } text-white font-bold px-6 py-3 rounded-xl shadow-lg`}
                      >
                        {option.action}
                      </Button>
                    </a>
                  ) : option.type === "link" ? (
                    <Link href={option.href}>
                      <Button
                        className={`${
                          option.color === "bg-primary"
                            ? "bg-primary hover:bg-primary/90"
                            : "bg-secondary hover:bg-secondary/90"
                        } text-white font-bold px-6 py-3 rounded-xl shadow-lg`}
                      >
                        {option.action}
                      </Button>
                    </Link>
                  ) : (
                    <a href={option.href} target="_blank" rel="noopener noreferrer">
                      <Button
                        className={`${
                          option.color === "bg-primary"
                            ? "bg-primary hover:bg-primary/90"
                            : "bg-secondary hover:bg-secondary/90"
                        } text-white font-bold px-6 py-3 rounded-xl shadow-lg`}
                      >
                        {option.action}
                      </Button>
                    </a>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </main>
  )
}
