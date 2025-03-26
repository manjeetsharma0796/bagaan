"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Search,
  Cloud,
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  AlertTriangle,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { motion } from "framer-motion"
import Preloader from "@/components/preloader"

interface WeatherData {
  location: {
    name: string
    region: string
    country: string
    localtime: string
  }
  current: {
    temp_c: number
    temp_f: number
    condition: {
      text: string
      icon: string
    }
    wind_kph: number
    wind_mph: number
    wind_dir: string
    humidity: number
    precip_mm: number
    cloud: number
    feelslike_c: number
    uv: number
  }
}

// Mock alerts data
const mockAlerts = [
  {
    type: "Heavy Rain",
    severity: "Moderate",
    description: "Heavy rainfall expected on Wednesday. Consider delaying irrigation and protecting sensitive crops.",
    date: "Wednesday",
  },
  {
    type: "High Temperature",
    severity: "Low",
    description: "Temperatures reaching 31°C tomorrow. Ensure adequate hydration for heat-sensitive crops.",
    date: "Tomorrow",
  },
]

// Mock forecast data
const mockForecast = [
  { day: "Today", high: 29, low: 22, condition: "Partly Cloudy", rainfall: 0 },
  { day: "Tomorrow", high: 31, low: 23, condition: "Sunny", rainfall: 0 },
  { day: "Wednesday", high: 30, low: 24, condition: "Thunderstorms", rainfall: 25 },
  { day: "Thursday", high: 27, low: 22, condition: "Rain", rainfall: 15 },
  { day: "Friday", high: 26, low: 21, condition: "Cloudy", rainfall: 5 },
]

export default function ClimateAlertsPage() {
  const [location, setLocation] = useState("London")
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWeatherData = async (query: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=1fc79ef013dd45dca40155905252603&q=${query}&aqi=no`,
      )

      if (!response.ok) {
        throw new Error("Failed to fetch weather data")
      }

      const data = await response.json()
      setWeatherData(data)
    } catch (err) {
      console.error("Error fetching weather data:", err)
      // setError("Failed to fetch weather data. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchWeatherData(location)
  }, [])

  const handleSearch = () => {
    fetchWeatherData(location)
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "rain":
      case "light rain":
      case "moderate rain":
      case "heavy rain":
      case "patchy rain possible":
      case "thunderstorms":
        return <CloudRain className="h-8 w-8" />
      case "cloudy":
      case "partly cloudy":
      case "overcast":
        return <Cloud className="h-8 w-8" />
      default:
        return <Thermometer className="h-8 w-8" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      case "moderate":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
    }
  }

  return (
    <div className="container max-w-5xl py-12">
      <Preloader />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold text-center mb-8">Climate Alerts</h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Stay ahead of weather changes with personalized climate alerts for your farm location.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex gap-2 max-w-md mx-auto">
          <Input
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Search
              </>
            )}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4 max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </motion.div>

      {weatherData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>
                  Current Weather in {weatherData.location.name}, {weatherData.location.country}
                </span>
                {getWeatherIcon(weatherData.current.condition.text)}
              </CardTitle>
              <CardDescription>Updated as of {weatherData.location.localtime}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                  <Thermometer className="h-6 w-6 mb-2 text-primary" />
                  <span className="text-sm text-muted-foreground">Temperature</span>
                  <span className="text-2xl font-bold">{weatherData.current.temp_c}°C</span>
                  <span className="text-xs text-muted-foreground">Feels like: {weatherData.current.feelslike_c}°C</span>
                </div>

                <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                  <Droplets className="h-6 w-6 mb-2 text-primary" />
                  <span className="text-sm text-muted-foreground">Humidity</span>
                  <span className="text-2xl font-bold">{weatherData.current.humidity}%</span>
                </div>

                <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                  <Wind className="h-6 w-6 mb-2 text-primary" />
                  <span className="text-sm text-muted-foreground">Wind Speed</span>
                  <span className="text-2xl font-bold">{weatherData.current.wind_kph} km/h</span>
                  <span className="text-xs text-muted-foreground">Direction: {weatherData.current.wind_dir}</span>
                </div>

                <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                  <CloudRain className="h-6 w-6 mb-2 text-primary" />
                  <span className="text-sm text-muted-foreground">Rainfall</span>
                  <span className="text-2xl font-bold">{weatherData.current.precip_mm} mm</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>5-Day Forecast</CardTitle>
              <CardDescription>Weather prediction for the next 5 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockForecast.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      {getWeatherIcon(day.condition)}
                      <div>
                        <p className="font-medium">{day.day}</p>
                        <p className="text-sm text-muted-foreground">{day.condition}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {day.high}° / {day.low}°
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {day.rainfall > 0 ? `${day.rainfall}mm rain` : "No rain"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Weather Alerts
              </CardTitle>
              <CardDescription>Important alerts for your crops</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAlerts.length > 0 ? (
                  mockAlerts.map((alert, index) => (
                    <Alert key={index} className={getSeverityColor(alert.severity)}>
                      <div className="flex justify-between items-start">
                        <div>
                          <AlertTitle>
                            {alert.type} - {alert.date}
                          </AlertTitle>
                          <AlertDescription>{alert.description}</AlertDescription>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-background/50">
                          {alert.severity}
                        </span>
                      </div>
                    </Alert>
                  ))
                ) : (
                  <p className="text-center py-8 text-muted-foreground">No active alerts for your area</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

