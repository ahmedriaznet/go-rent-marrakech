"use server"

import nodemailer from "nodemailer"
import { z } from "zod"

// --- Interfaces and Types ---
interface ContactDetails {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export type ContactFormState = {
  message: string
  success?: boolean
  error?: boolean
  errors?: Record<string, string[]> // For field-specific errors
} | null

// --- Email Templates ---
function createAdminContactNotificationHtml(details: ContactDetails): string {
  return `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
      <h1 style="font-size: 24px; color: #117485; text-align: center; margin-bottom: 20px;">New Contact Form Submission</h1>
      
      <h2 style="font-size: 20px; color: #333; border-bottom: 2px solid #117485; padding-bottom: 10px; margin-bottom: 20px;">Sender Details</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr><td style="padding: 10px; border: 1px solid #eee; font-weight: bold; background-color: #f0f0f0;">Name:</td><td style="padding: 10px; border: 1px solid #eee;">${details.name}</td></tr>
        <tr><td style="padding: 10px; border: 1px solid #eee; font-weight: bold; background-color: #f0f0f0;">Email:</td><td style="padding: 10px; border: 1px solid #eee;">${details.email}</td></tr>
        ${details.phone ? `<tr><td style="padding: 10px; border: 1px solid #eee; font-weight: bold; background-color: #f0f0f0;">Phone:</td><td style="padding: 10px; border: 1px solid #eee;">${details.phone}</td></tr>` : ""}
        <tr><td style="padding: 10px; border: 1px solid #eee; font-weight: bold; background-color: #f0f0f0;">Subject:</td><td style="padding: 10px; border: 1px solid #eee;">${details.subject}</td></tr>
      </table>

      <h2 style="font-size: 20px; color: #333; border-bottom: 2px solid #117485; padding-bottom: 10px; margin-bottom: 20px;">Message</h2>
      <div style="padding: 10px; border: 1px solid #eee; background-color: #fff; border-radius: 4px;">
        <p style="white-space: pre-wrap;">${details.message}</p>
      </div>
      
      <p style="font-size: 14px; color: #555; text-align: center; margin-top: 20px;">
        This email was sent from the contact form on Go Car Rent Marrakech.
      </p>
    </div>
  </div>
`
}

function createCustomerContactConfirmationHtml(details: ContactDetails): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gocarrentmarrakech.com" // Fallback for local dev if needed
  const logoUrl = `${siteUrl}/go-rent-logo.png`

  return `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="${logoUrl}" alt="Go Car Rent Marrakech Logo" width="150" style="max-width: 150px; height: auto;">
        <h1 style="font-size: 24px; color: #FE9305; margin-top: 10px;">Thank You For Reaching Out, ${details.name}!</h1>
      </div>
      
      <p style="font-size: 16px; margin-bottom: 20px;">
        We have received your message and appreciate you contacting Go Car Rent Marrakech. Our team will review your inquiry and get back to you as soon as possible.
      </p>
      
      <h2 style="font-size: 20px; color: #333; border-bottom: 2px solid #FE9305; padding-bottom: 10px; margin-bottom: 20px;">Your Message Summary</h2>
      <p style="font-size: 16px; margin-bottom: 5px;"><strong>Subject:</strong> ${details.subject}</p>
      <p style="font-size: 16px; margin-bottom: 20px; padding: 10px; border: 1px solid #eee; background-color: #f9f9f9; border-radius: 4px; white-space: pre-wrap;">${details.message.substring(0, 200)}${details.message.length > 200 ? "..." : ""}</p>
      
      <p style="font-size: 16px; margin-bottom: 20px;">
        If your matter is urgent, or if you prefer to speak with us directly, please call us at:
      </p>
      <p style="font-size: 16px; margin-bottom: 20px;"><strong>Phone:</strong> +212 664 342 254</p>
      
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      
      <p style="font-size: 14px; color: #777; text-align: center;">
        Thank you for choosing Go Car Rent Marrakech!
        <br>
        <a href="${siteUrl}" style="color: #FE9305; text-decoration: none;">Visit our website</a>
      </p>
    </div>
  </div>
`
}

// --- Nodemailer Setup ---
const transporter = nodemailer.createTransport({
  host: "mail.gorentmarrakech.com", // Your Outgoing Server
  port: 465, // Your SMTP Port
  secure: true, // true for port 465
  auth: {
    user: process.env.CPANEL_SMTP_USER, // Will be noreply@gorentmarrakech.com
    pass: process.env.CPANEL_SMTP_PASSWORD, // Will be the new password you set
  },
  tls: {
    rejectUnauthorized: true,
  },
})

// --- Zod Schema for Validation ---
const contactFormSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional().or(z.literal("")), // Optional, but if provided, validate
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
})

// --- Server Action ---
export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  if (!process.env.CPANEL_SMTP_USER || !process.env.CPANEL_SMTP_PASSWORD) {
    console.error("cPanel SMTP credentials are not set in environment variables.")
    return {
      message: "Server configuration error: Email service (cPanel SMTP) is not set up. Please contact support.",
      error: true,
    }
  }
  if (!process.env.ADMIN_EMAIL) {
    console.error("Admin email is not set in environment variables.")
    return {
      message: "Server configuration error: Admin recipient is not set up. Please contact support.",
      error: true,
    }
  }

  const rawFormData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: (formData.get("phone") as string) || undefined, // Ensure undefined if empty
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
  }

  const validationResult = contactFormSchema.safeParse(rawFormData)

  if (!validationResult.success) {
    const fieldErrors: Record<string, string[]> = {}
    validationResult.error.errors.forEach((err) => {
      const path = err.path[0] as string
      fieldErrors[path] = fieldErrors[path] || []
      fieldErrors[path].push(err.message)
    })
    return {
      message: "Please correct the errors below.",
      error: true,
      errors: fieldErrors,
    }
  }

  const contactDetails: ContactDetails = validationResult.data

  try {
    // Send Admin Notification Email
    const adminMailOptions = {
      from: `"Go Car Rent Contact Form" <${process.env.CPANEL_SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Message: ${contactDetails.subject}`,
      html: createAdminContactNotificationHtml(contactDetails),
    }
    await transporter.sendMail(adminMailOptions)
    console.log("Admin contact notification email sent successfully to:", process.env.ADMIN_EMAIL)

    // Send Customer Confirmation Email
    const customerMailOptions = {
      from: `"Go Car Rent Marrakech" <${process.env.CPANEL_SMTP_USER}>`,
      to: contactDetails.email,
      subject: "We've Received Your Message - Go Car Rent Marrakech",
      html: createCustomerContactConfirmationHtml(contactDetails),
    }
    await transporter.sendMail(customerMailOptions)
    console.log("Customer contact confirmation email sent successfully to:", contactDetails.email)

    return {
      message: "Your message has been sent successfully! We'll get back to you soon.",
      success: true,
    }
  } catch (error) {
    console.error("Failed to send contact email:", error)
    let errorMessage = "An unexpected error occurred while sending your message. Please try again later."
    if (error instanceof Error) {
      // @ts-ignore
      if (error.code === "EAUTH") {
        errorMessage =
          "Email server authentication failed. This is likely due to incorrect credentials (username or password) in your environment variables. Please double-check your CPANEL_SMTP_USER and CPANEL_SMTP_PASSWORD and ensure they are correct."
        // @ts-ignore
      } else if (error.code === "ECONNREFUSED") {
        errorMessage = "Could not connect to email server. Please check server configuration or network."
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
