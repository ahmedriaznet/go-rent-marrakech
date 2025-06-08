"use server"

import nodemailer from "nodemailer"
import { z } from "zod"

// --- Type Definition ---
export type BookingFormState = {
  message: string
  success?: boolean
  error?: boolean
  errors?: Record<string, string[]>
} | null

// --- Email Templates ---
interface BookingDetails {
  fullName: string
  email: string
  phone: string
  selectedCar: string
  arrivalDate: string
  departureDate: string
}

function createAdminBookingNotificationHtml(details: BookingDetails): string {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
        <h1 style="font-size: 24px; color: #FE9305; text-align: center; margin-bottom: 20px;">New Car Booking Notification</h1>
        <h2 style="font-size: 20px; color: #333; border-bottom: 2px solid #FE9305; padding-bottom: 10px; margin-bottom: 20px;">Booking Details</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; background-color: #f0f0f0;">Full Name:</td>
            <td style="padding: 10px; border: 1px solid #eee;">${details.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; background-color: #f0f0f0;">Email:</td>
            <td style="padding: 10px; border: 1px solid #eee;">${details.email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; background-color: #f0f0f0;">Phone:</td>
            <td style="padding: 10px; border: 1px solid #eee;">${details.phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; background-color: #f0f0f0;">Selected Car:</td>
            <td style="padding: 10px; border: 1px solid #eee;">${details.selectedCar}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; background-color: #f0f0f0;">Arrival Date:</td>
            <td style="padding: 10px; border: 1px solid #eee;">${details.arrivalDate}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; background-color: #f0f0f0;">Departure Date:</td>
            <td style="padding: 10px; border: 1px solid #eee;">${details.departureDate}</td>
          </tr>
        </table>
        <p style="font-size: 14px; color: #555; text-align: center;">
          This email was sent automatically from the Go Car Rent Marrakech booking system.
        </p>
      </div>
    </div>
  `
}

function createCustomerBookingConfirmationHtml(details: BookingDetails): string {
  // NEXT_PUBLIC_SITE_URL should still ideally come from env for flexibility
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gocarrentmarrakech.com"
  const logoUrl = `${siteUrl}/go-rent-logo.png`

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="${logoUrl}" alt="Go Car Rent Marrakech Logo" width="150" style="max-width: 150px; height: auto;" />
          <h1 style="font-size: 24px; color: #FE9305; margin-top: 10px;">Thank You for Your Booking, ${details.fullName}!</h1>
        </div>
        <p style="font-size: 16px; margin-bottom: 20px;">
          Thank you for submitting your car rental request with Go Car Rent Marrakech! We’ve received your details and will be in touch with you shortly.
        </p>
        <h2 style="font-size: 20px; color: #333; border-bottom: 2px solid #FE9305; padding-bottom: 10px; margin-bottom: 20px;">Your Booking Summary</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; background-color: #f9f9f9;">Selected Car:</td>
            <td style="padding: 10px; border: 1px solid #eee;">${details.selectedCar}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; background-color: #f9f9f9;">Arrival Date:</td>
            <td style="padding: 10px; border: 1px solid #eee;">${details.arrivalDate}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #eee; font-weight: bold; background-color: #f9f9f9;">Departure Date:</td>
            <td style="padding: 10px; border: 1px solid #eee;">${details.departureDate}</td>
          </tr>
        </table>
        <h3 style="font-size: 18px; color: #333; margin-top: 30px; margin-bottom: 10px;">What's Next?</h3>
        <ul style="list-style-type: disc; padding-left: 20px; margin-bottom: 20px;">
          <li>Please keep this email for your records.</li>
          <li>We will contact you if we have any questions regarding your booking.</li>
          <li>Prepare for an amazing trip in Marrakech!</li>
        </ul>
        <p style="font-size: 16px; margin-bottom: 20px;">
          If you have any questions or need to make changes to your booking, please don't hesitate to contact us at:
        </p>
        <p style="font-size: 16px; margin-bottom: 5px;"><strong>Email:</strong> <a href="mailto:contact@gocarrentmarrakech.com" style="color: #FE9305; text-decoration: none;">contact@gocarrentmarrakech.com</a></p>
        <p style="font-size: 16px; margin-bottom: 20px;"><strong>Phone:</strong> +212 612 345 678 </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
        <p style="font-size: 14px; color: #777; text-align: center;">
          Thank you for choosing Go Car Rent Marrakech!<br />
          <a href="${siteUrl}" style="color: #FE9305; text-decoration: none;">Visit our website</a>
        </p>
      </div>
    </div>
  `
}

// --- HARDCODED CREDENTIALS & EMAILS - FOR PRODUCTION (NOT RECOMMENDED) ---
const HARDCODED_SMTP_USER = "noreply@gorentmarrakech.com"
const HARDCODED_SMTP_PASSWORD = "Amy6986177#@"
const HARDCODED_ADMIN_EMAIL = "reservation@gorentmarrakech.com"
// --- END OF HARDCODED VALUES ---

// --- Nodemailer Setup ---
const transporter = nodemailer.createTransport({
  host: "mail.gorentmarrakech.com",
  port: 465,
  secure: true,
  auth: {
    user: HARDCODED_SMTP_USER,
    pass: HARDCODED_SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true,
  },
})

// --- Zod Schema for Validation ---
const bookingSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number seems too short"),
  selectedCar: z.string().min(1, "Please select a car"),
  arrivalDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid arrival date format"),
  departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid departure date format"),
})

export async function submitBooking(prevState: BookingFormState, formData: FormData): Promise<BookingFormState> {
  const rawFormData = {
    fullName: formData.get("fullName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    selectedCar: formData.get("selectedCar") as string,
    arrivalDate: formData.get("arrivalDate") as string,
    departureDate: formData.get("departureDate") as string,
  }

  const validationResult = bookingSchema.safeParse(rawFormData)

  if (!validationResult.success) {
    const fieldErrors: Record<string, string[]> = {}
    validationResult.error.errors.forEach((err) => {
      const path = err.path[0] as string
      fieldErrors[path] = fieldErrors[path] || []
      fieldErrors[path].push(err.message)
    })
    console.log("Validation errors:", fieldErrors)
    return {
      message: "Please correct the errors below.",
      error: true,
      errors: fieldErrors,
    }
  }

  const bookingDetails: BookingDetails = validationResult.data

  try {
    // Send Admin Notification Email
    const adminMailOptions = {
      from: `"Go Car Rent Marrakech Booking" <${HARDCODED_SMTP_USER}>`,
      to: HARDCODED_ADMIN_EMAIL,
      subject: `New Car Booking: ${bookingDetails.selectedCar} for ${bookingDetails.fullName}`,
      html: createAdminBookingNotificationHtml(bookingDetails),
    }
    await transporter.sendMail(adminMailOptions)
    console.log("Admin notification email sent successfully to:", HARDCODED_ADMIN_EMAIL)

    // Send Customer Confirmation Email
    const customerMailOptions = {
      from: `"Go Car Rent Marrakech" <${HARDCODED_SMTP_USER}>`,
      to: bookingDetails.email,
      subject: "Your Go Car Rent Marrakech Booking Confirmation",
      html: createCustomerBookingConfirmationHtml(bookingDetails),
    }
    await transporter.sendMail(customerMailOptions)
    console.log("Customer confirmation email sent successfully to:", bookingDetails.email)

    return {
      message: "Booking submitted successfully! You'll receive a confirmation email shortly.",
      success: true,
    }
  } catch (error) {
    console.error("Failed to send email:", error)
    let errorMessage = "An unexpected error occurred while sending your booking. Please try again later."
    if (error instanceof Error) {
      // @ts-ignore
      if (error.code === "EAUTH") {
        errorMessage =
          "Email server authentication failed. This is likely due to incorrect credentials (username or password) being used."
      } else {
        errorMessage = `Failed to send email: ${error.message}. Please try again.`
      }
    }
    return {
      message: errorMessage,
      error: true,
    }
  }
}
