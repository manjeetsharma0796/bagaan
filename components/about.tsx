"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Microscope, CloudLightning, Lightbulb } from "lucide-react"

export default function About() {
  return (
    <div className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">How Bagaan Helps You</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our AI-powered platform provides farmers with tools to detect diseases early, prepare for weather changes, and
          make data-driven decisions.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <Microscope className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Early Disease Detection</CardTitle>
              <CardDescription>Identify crop diseases before they spread</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our AI model can identify over 50 common crop diseases with 95% accuracy by analyzing images of your
                plants. Early detection helps prevent crop losses and reduces the need for extensive treatments.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CloudLightning className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Climate Alerts</CardTitle>
              <CardDescription>Stay ahead of weather changes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Receive timely alerts about upcoming weather conditions that might affect your crops. Our system
                analyzes weather patterns and provides location-specific recommendations to help you prepare.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <Lightbulb className="h-10 w-10 text-primary mb-2" />
              <CardTitle>AI-Powered Suggestions</CardTitle>
              <CardDescription>Get data-driven solutions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Based on disease detection and climate data, our AI provides tailored recommendations for treatment,
                irrigation, and crop management. These insights help you make informed decisions to maximize yield.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

