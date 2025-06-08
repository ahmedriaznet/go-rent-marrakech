"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/context/language-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function FAQ() {
  const { language } = useLanguage()

  // Debug: Log the current language
  console.log("FAQ Component - Current language:", language)

  const faqContent = {
    en: {
      badge: "FAQ",
      title: "Frequently Asked Questions",
      subtitle: "Find answers to the most frequently asked questions about our car rental service in Marrakech",
      contactSupport: "Contact Support",
      items: [
        {
          question: "How can I book a car rental in Marrakech?",
          answer:
            "You can easily book a car online through our booking form on this website, call us directly at +212 612 345 678, or send us an email. Our booking process is simple and secure. We will confirm your reservation within 24 hours and send you all the necessary details.",
        },
        {
          question: "What documents do I need to rent a car in Morocco?",
          answer:
            "To rent a vehicle in Morocco, you need: (1) A valid driver's license held for at least one year, (2) A passport or national ID card, (3) A credit card in the driver's name for the security deposit. International visitors may need an International Driving Permit depending on their country of origin.",
        },
        {
          question: "How much is the security deposit for car rental?",
          answer:
            "A security deposit is required for all rentals. The amount varies by vehicle type: Economy cars (2000-3000 MAD), SUVs (4000-6000 MAD), Luxury vehicles (8000-15000 MAD). The deposit is held on your credit card and released within 7-14 days after returning the vehicle in good condition.",
        },
        {
          question: "Can I modify or cancel my car rental reservation?",
          answer:
            "Yes, you can modify or cancel your reservation up to 48 hours before pickup without any fees. For changes within 48 hours, a small modification fee may apply. Cancellations within 24 hours may incur a cancellation fee. Contact us by phone or email to make changes.",
        },
        {
          question: "Do you offer car delivery to Marrakech airport or hotels?",
          answer:
            "Yes, we provide free delivery and pickup services at Marrakech Menara Airport and most hotels in the city center and Gueliz area. For locations outside the city center, a small delivery fee may apply. We can also arrange meet and greet services at the airport.",
        },
        {
          question: "Can I drive the rental car outside of Marrakech?",
          answer:
            "You can travel anywhere within Morocco with our rental vehicles. Popular destinations include Essaouira, Casablanca, Fez, the Atlas Mountains, and even the Sahara Desert. We just ask that you inform us of your travel plans for insurance and safety purposes.",
        },
      ],
    },
    fr: {
      badge: "FAQ",
      title: "Questions Fréquemment Posées",
      subtitle:
        "Trouvez des réponses aux questions les plus fréquemment posées sur notre service de location de voitures à Marrakech",
      contactSupport: "Contacter le Support",
      items: [
        {
          question: "Comment puis-je réserver une location de voiture à Marrakech?",
          answer:
            "Vous pouvez facilement réserver une voiture en ligne via notre formulaire de réservation sur ce site web, nous appeler directement au +212 612 345 678, ou nous envoyer un email. Notre processus de réservation est simple et sécurisé. Nous confirmerons votre réservation dans les 24 heures et vous enverrons tous les détails nécessaires.",
        },
        {
          question: "Quels documents ai-je besoin pour louer une voiture au Maroc?",
          answer:
            "Pour louer un véhicule au Maroc, vous avez besoin de: (1) Un permis de conduire valide détenu depuis au moins un an, (2) Un passeport ou une carte d'identité nationale, (3) Une carte de crédit au nom du conducteur pour la caution. Les visiteurs internationaux peuvent avoir besoin d'un Permis de Conduire International selon leur pays d'origine.",
        },
        {
          question: "Quel est le montant de la caution pour la location de voiture?",
          answer:
            "Une caution est requise pour toutes les locations. Le montant varie selon le type de véhicule: Voitures économiques (2000-3000 MAD), SUV (4000-6000 MAD), Véhicules de luxe (8000-15000 MAD). La caution est bloquée sur votre carte de crédit et libérée dans les 7-14 jours après le retour du véhicule en bon état.",
        },
        {
          question: "Puis-je modifier ou annuler ma réservation de location de voiture?",
          answer:
            "Oui, vous pouvez modifier ou annuler votre réservation jusqu'à 48 heures avant la prise en charge sans frais. Pour les changements dans les 48 heures, des frais de modification peuvent s'appliquer. Les annulations dans les 24 heures peuvent entraîner des frais d'annulation. Contactez-nous par téléphone ou email pour effectuer des changements.",
        },
        {
          question: "Proposez-vous la livraison de voiture à l'aéroport de Marrakech ou aux hôtels?",
          answer:
            "Oui, nous proposons des services de livraison et de récupération gratuits à l'aéroport Marrakech Ménara et dans la plupart des hôtels du centre-ville et du quartier Guéliz. Pour les emplacements en dehors du centre-ville, des frais de livraison peuvent s'appliquer. Nous pouvons également organiser des services d'accueil à l'aéroport.",
        },
        {
          question: "Puis-je conduire la voiture de location en dehors de Marrakech?",
          answer:
            "Absolument! Vous pouvez voyager partout au Maroc avec nos véhicules de location. Les destinations populaires incluent Essaouira, Casablanca, Fès, les montagnes de l'Atlas, et même le désert du Sahara. Nous demandons simplement que vous nous informiez de vos plans de voyage pour des raisons d'assurance et de sécurité.",
        },
      ],
    },
    es: {
      badge: "FAQ",
      title: "Preguntas Frecuentes",
      subtitle:
        "Encuentra respuestas a las preguntas más frecuentes sobre nuestro servicio de alquiler de coches en Marrakech",
      contactSupport: "Contactar Soporte",
      items: [
        {
          question: "¿Cómo puedo reservar un alquiler de coche en Marrakech?",
          answer:
            "Puedes reservar fácilmente un coche online a través de nuestro formulario de reserva en este sitio web, llamarnos directamente al +212 612 345 678, o enviarnos un email. Nuestro proceso de reserva es simple y seguro. Confirmaremos tu reserva en 24 horas y te enviaremos todos los detalles necesarios.",
        },
        {
          question: "¿Qué documentos necesito para alquilar un coche en Marruecos?",
          answer:
            "Para alquilar un vehículo en Marruecos, necesitas: (1) Un permiso de conducir válido por al menos un año, (2) Un pasaporte o documento de identidad nacional, (3) Una tarjeta de crédito a nombre del conductor para el depósito de seguridad. Los visitantes internacionales pueden necesitar un Permiso de Conducir Internacional según su país de origen.",
        },
        {
          question: "¿Cuánto es el depósito de seguridad para el alquiler de coches?",
          answer:
            "Se requiere un depósito de seguridad para todos los alquileres. El monto varía según el tipo de vehículo: Coches económicos (2000-3000 MAD), SUVs (4000-6000 MAD), Vehículos de lujo (8000-15000 MAD). El depósito se retiene en tu tarjeta de crédito y se libera en 7-14 días después de devolver el vehículo en buenas condiciones.",
        },
        {
          question: "¿Puedo modificar o cancelar mi reserva de alquiler de coche?",
          answer:
            "Sí, puedes modificar o cancelar tu reserva hasta 48 horas antes de la recogida sin cargos. Para cambios dentro de las 48 horas, puede aplicarse una pequeña tarifa de modificación. Las cancelaciones dentro de las 24 horas pueden incurrir en una tarifa de cancelación. Contáctanos por teléfono o email para hacer cambios.",
        },
        {
          question: "¿Ofrecen entrega de coches al aeropuerto de Marrakech o hoteles?",
          answer:
            "Sí, proporcionamos servicios gratuitos de entrega y recogida en el Aeropuerto Marrakech Menara y en la mayoría de hoteles del centro de la ciudad y área de Gueliz. Para ubicaciones fuera del centro de la ciudad, puede aplicarse una pequeña tarifa de entrega. También podemos organizar servicios de recibimiento en el aeropuerto.",
        },
        {
          question: "¿Puedo conducir el coche de alquiler fuera de Marrakech?",
          answer:
            "¡Absolutamente! Puedes viajar a cualquier lugar dentro de Marruecos con nuestros vehículos de alquiler. Los destinos populares incluyen Essaouira, Casablanca, Fez, las Montañas del Atlas, e incluso el Desierto del Sahara. Solo pedimos que nos informes de tus planes de viaje por razones de seguro y seguridad.",
        },
      ],
    },
    ar: {
      badge: "الأسئلة الشائعة",
      title: "الأسئلة المتكررة",
      subtitle: "اعثر على إجابات للأسئلة الأكثر شيوعاً حول خدمة تأجير السيارات في مراكش",
      contactSupport: "اتصل بالدعم",
      items: [
        {
          question: "كيف يمكنني حجز تأجير سيارة في مراكش؟",
          answer:
            "يمكنك بسهولة حجز سيارة عبر الإنترنت من خلال نموذج الحجز على هذا الموقع، أو الاتصال بنا مباشرة على +212 612 345 678، أو إرسال بريد إلكتروني. عملية الحجز لدينا بسيطة وآمنة. سنؤكد حجزك خلال 24 ساعة ونرسل لك جميع التفاصيل اللازمة.",
        },
        {
          question: "ما هي الوثائق التي أحتاجها لاستئجار سيارة في المغرب؟",
          answer:
            "لاستئجار مركبة في المغرب، تحتاج إلى: (1) رخصة قيادة صالحة لمدة عام واحد على الأقل، (2) جواز سفر أو بطاقة هوية وطنية، (3) بطاقة ائتمان باسم السائق للتأمين. قد يحتاج الزوار الدوليون إلى رخصة قيادة دولية حسب بلد المنشأ.",
        },
        {
          question: "كم مبلغ التأمين لتأجير السيارة؟",
          answer:
            "مطلوب تأمين لجميع عمليات التأجير. يختلف المبلغ حسب نوع المركبة: السيارات الاقتصادية (2000-3000 درهم)، سيارات الدفع الرباعي (4000-6000 درهم)، المركبات الفاخرة (8000-15000 درهم). يتم حجز التأمين على بطاقتك الائتمانية ويتم تحريره خلال 7-14 يوماً بعد إرجاع المركبة بحالة جيدة.",
        },
        {
          question: "هل يمكنني تعديل أو إلغاء حجز تأجير السيارة؟",
          answer:
            "نعم، يمكنك تعديل أو إلغاء حجزك حتى 48 ساعة قبل الاستلام بدون رسوم. للتغييرات خلال 48 ساعة، قد تطبق رسوم تعديل صغيرة. الإلغاءات خلال 24 ساعة قد تتكبد رسوم إلغاء. اتصل بنا عبر الهاتف أو البريد الإلكتروني لإجراء التغييرات.",
        },
        {
          question: "هل تقدمون توصيل السيارات لمطار مراكش أو الفنادق؟",
          answer:
            "نعم، نقدم خدمات توصيل واستلام مجانية في مطار مراكش المنارة ومعظم الفنادق في وسط المدينة ومنطقة جيليز. للمواقع خارج وسط المدينة، قد تطبق رسوم توصيل صغيرة. يمكننا أيضاً ترتيب خدمات الاستقبال في المطار.",
        },
        {
          question: "هل يمكنني قيادة السيارة المستأجرة خارج مراكش؟",
          answer:
            "بالطبع! يمكنك السفر في أي مكان داخل المغرب مع مركباتنا المستأجرة. الوجهات الشعبية تشمل الصويرة، الدار البيضاء، فاس، جبال الأطلس، وحتى صحراء الساهرة. نطلب فقط أن تعلمنا بخطط سفرك لأسباب التأمين والسلامة.",
        },
      ],
    },
  }

  const currentContent = faqContent[language] || faqContent.en

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary px-4 py-1 text-sm hover:bg-primary/20">
            {currentContent.badge}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentContent.title}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{currentContent.subtitle}</p>
          {/* Debug info - remove this after testing */}
          <p className="text-sm text-red-500 mt-2">Debug: Current language is "{language}"</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-5xl mx-auto">
          {currentContent.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Accordion type="single" collapsible className="bg-white rounded-xl shadow-sm">
                <AccordionItem value={`item-${index}`} className="border-none">
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">{item.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">{currentContent.subtitle}</p>
          <Link href="/contact">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
              {currentContent.contactSupport}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
