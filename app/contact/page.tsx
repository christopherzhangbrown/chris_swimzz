"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, Send, Instagram, Youtube, Facebook } from "lucide-react"
import { FaTiktok } from "react-icons/fa"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("https://formspree.io/f/mjkorqbn", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setError("Submission failed. Please try again.");
      }
    } catch {
      setError("Submission failed. Please try again.");
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const socialLinks = [
    {
      name: "Instagram",
      handle: "@chris_swimzz",
      icon: Instagram,
      color: "text-pink-600",
      bgColor: "bg-pink-50 hover:bg-pink-100",
      link: "https://www.instagram.com/chris_swimzz/",
    },
    {
      name: "TikTok",
      handle: "@chris_swimzz",
      icon: FaTiktok,
      color: "text-black",
      bgColor: "bg-gray-50 hover:bg-gray-100",
      link: "https://www.tiktok.com/@chris_swimzz",
    },
    {
      name: "YouTube",
      handle: "@chris_swimzz",
      icon: Youtube,
      color: "text-red-600",
      bgColor: "bg-red-50 hover:bg-red-100",
      link: "https://www.youtube.com/@chris_swimzz",
    },
    {
      name: "Facebook",
      handle: "@chris_swimzz",
      icon: Facebook,
      color: "text-blue-600",
      bgColor: "bg-blue-50 hover:bg-blue-100",
      link: "https://www.facebook.com/profile.php?id=61560790375196",
    },
  ]

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a question, collaboration idea, or just want to say hi? I'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <MessageSquare className="mr-3 h-6 w-6 text-blue-600" />
                  Send a Message
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Fill out the form below and I'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                  className="w-full placeholder:text-gray-400"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                  className="w-full placeholder:text-gray-400"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                  className="w-full min-h-[120px] placeholder:text-gray-400"
                      placeholder="Tell me about your inquiry, collaboration idea, or just say hello!"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                  {success && (
                    <p className="text-green-600 text-sm mt-2">Message sent! I'll get back to you soon.</p>
                  )}
                  {error && (
                    <p className="text-red-600 text-sm mt-2">{error}</p>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Business Inquiries & Social Media */}
            <div className="space-y-8">
              {/* Business Inquiries */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Mail className="h-6 w-6 text-blue-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">Business Inquiries</h3>
                  </div>
                  <p className="text-gray-600 mb-4">For sponsorships, partnerships, and business collaborations:</p>
                  <Button variant="outline" className="border-blue-200 hover:bg-blue-50 bg-transparent">
                    <a href="mailto:chrisswimzzinquires@gmail.com" className="text-blue-600 hover:underline">chrisswimzzinquires@gmail.com</a>
                  </Button>
                </CardContent>
              </Card>

              {/* Social Media Links */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Follow My Journey</h3>
                  <div className="space-y-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.link}
                        className={`flex items-center p-4 rounded-lg transition-colors ${social.bgColor} group`}
                      >
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm mr-4">
                          <social.icon className={`h-6 w-6 ${social.color}`} />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-semibold text-gray-900 group-hover:text-gray-700">{social.name}</h4>
                          <p className="text-sm text-gray-600">{social.handle}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}