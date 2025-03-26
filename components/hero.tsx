"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20 dark:opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />

      <div className="container relative pt-20 pb-24 md:pt-32 md:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center space-y-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
            Empowering Farmers with AI-Powered Crop Health & Climate Insights
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl">
            Detect crop diseases early, receive climate alerts, and get AI-powered recommendations to maximize your
            yield and protect your farm.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/diagnosis">
              <Button size="lg" className="gap-2">
                Upload Crop Image for Diagnosis
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/climate-alerts">
              <Button size="lg" variant="outline" className="gap-2">
                Check Climate Alerts
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

