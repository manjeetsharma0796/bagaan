"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Hero from "@/components/hero"
import About from "@/components/about"
import Problems from "@/components/problems"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import Preloader from "@/components/preloader"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Preloader />

      <Hero />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <About />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Problems />
      </motion.div>

      <motion.div
        className="flex justify-center gap-6 my-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
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
      </motion.div>

      <Footer />
    </main>
  )
}

