"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

export default function Problems() {
  const problems = [
    {
      title: "Early Disease Detection",
      description: "Identify crop diseases before they spread and cause significant damage",
    },
    {
      title: "Weather Preparedness",
      description: "Receive alerts about upcoming weather conditions that might affect your crops",
    },
    {
      title: "Treatment Recommendations",
      description: "Get AI-powered suggestions for treating diseases and optimizing crop health",
    },
    {
      title: "Yield Optimization",
      description: "Make data-driven decisions to maximize your harvest and reduce losses",
    },
    {
      title: "Resource Efficiency",
      description: "Use water, fertilizers, and pesticides more efficiently with targeted recommendations",
    },
    {
      title: "Time Savings",
      description: "Save time by quickly identifying issues without needing to consult multiple experts",
    },
  ]

  return (
    <div className="container py-16 bg-muted/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">Problems We Solve</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          FarmAI addresses key challenges faced by farmers with technology-driven solutions
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems.map((problem, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex items-start gap-3 p-4"
          >
            <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-lg">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

