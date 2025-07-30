"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Zap, Brain, CheckCircle, Mail } from "lucide-react"

export default function AIStartPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("https://formspree.io/f/meozzeyk", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.ok) {
        setIsSubmitted(true);
        setEmail("");
      } else {
        setError("Submission failed. Please try again.");
      }
    } catch {
      setError("Submission failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AI <span className="gradient-text">Start Analyzer</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Revolutionary AI technology that analyzes your swimming starts, providing instant feedback and personalized
            recommendations to shave precious milliseconds off your race times.
          </p>

          {!isSubmitted ? (
            <Card className="max-w-md mx-auto border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">Join the Waitlist</CardTitle>
                <CardDescription>Be the first to access the AI Start Analyzer</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                  />
                  <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Mail className="mr-2 h-5 w-5" />
                    Join Waitlist
                  </Button>
                  {error && (
                    <p className="text-red-600 text-sm mt-2">{error}</p>
                  )}
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="max-w-md mx-auto border-0 shadow-xl bg-green-50">
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">You're on the list!</h3>
                <p className="text-gray-600">
                  Thanks for joining! We'll notify you as soon as the AI Start Analyzer is ready.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Demo Placeholder */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Interactive Demo</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the power of AI-driven start analysis with our interactive demo.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto border-0 shadow-2xl">
            <CardContent className="p-16 text-center">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-12 rounded-2xl text-white mb-8">
                <Brain className="h-24 w-24 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">Demo Coming Soon</h3>
                <p className="text-lg opacity-90">
                  We're putting the finishing touches on our interactive demo. Join the waitlist to be the first to try
                  it!
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="flex items-start space-x-3">
                  <Zap className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Real-time Analysis</h4>
                    <p className="text-sm text-gray-600">Instant feedback on your start technique</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Brain className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">AI-Powered Insights</h4>
                    <p className="text-sm text-gray-600">Advanced computer vision technology</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Personalized Tips</h4>
                    <p className="text-sm text-gray-600">Custom recommendations for improvement</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
