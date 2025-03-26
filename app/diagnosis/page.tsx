"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Preloader from "@/components/preloader"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



export default function DiagnosisPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<Object | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)

    if (selectedFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setPreview(null)
    }

    // Reset result when a new file is selected
    setResult(null)
  }

  // const handleAnalyze = async () => { //old
  //   setIsAnalyzing(true);
  //   if (!file) {
  //     console.error("No file selected");
  //     return;
  //   }
  
  
  //   try {
  //     // Convert the image file to Base64
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
      
  //     reader.onloadend = async () => {
  //       const base64Image = reader.result?.toString().split(",")[1]; // Remove "data:image/png;base64," part
  
  //       if (!base64Image) {
  //         console.error("Failed to convert image to Base64");
  //         setIsAnalyzing(false);
  //         return;
  //       }
  
  //       const response = await fetch("https://plant-doctor-ai.onrender.com/ai", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ image: base64Image }), // Send Base64 string
  //       });
  
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  
  //       let data = await response.json();
  
  //       // Clean up JSON response if necessary
  //       const cleanedText = JSON.parse(data.replace(/```json|```/g, "").trim());
  
  //       console.log(cleanedText);
  //       setResult(cleanedText);
  //     };
  //   } catch (error) {
  //     console.error("Error analyzing image:", error);
  //   } finally {
  //     setIsAnalyzing(false);
  //   }
  // };

  const handleAnalyze = async () => { //new
    setIsAnalyzing(true);
    if (!file) {
      console.error("No file selected");
      return;
    }
  
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onloadend = async () => {
        try {
          const base64Image = reader.result?.toString().split(",")[1]; // Remove "data:image/png;base64," part
  
          if (!base64Image) {
            console.error("Failed to convert image to Base64");
            setIsAnalyzing(false); // Ensure loading state resets if conversion fails
            return;
          }
  
          const response = await fetch("https://plant-doctor-ai.onrender.com/ai", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: base64Image }), // Send Base64 string
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          let data = await response.json();
  
          // Clean up JSON response if necessary
          const cleanedText = JSON.parse(data.replace(/```json|```/g, "").trim());
  
          console.log(cleanedText);
          setResult(cleanedText);
        } catch (error) {
          console.error("Error analyzing image:", error);
        } finally {
          setIsAnalyzing(false); // Ensure loading state resets after the analysis is done
        }
      };
    } catch (error) {
      console.error("Error initializing FileReader:", error);
      setIsAnalyzing(false); // Reset in case of FileReader failure
    }
  };
  
  
      const resetAnalysis = () => {
        setFile(null)
        setPreview(null)
        setResult(null)
      }

      return (
        <div className="container max-w-5xl py-12">
          <Preloader />

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-bold text-center mb-8">AI Crop Diagnosis</h1>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Upload an image of your crop to get an instant AI-powered diagnosis of potential diseases and treatment
              recommendations.
            </p>
          </motion.div>

          {!result ? (
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Crop Image</CardTitle>
                    <CardDescription>Select a clear image of the affected crop part (leaves, stem, fruit)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      {preview ? (
                        <div className="relative">
                          <img
                            src={preview || "/placeholder.svg"}
                            alt="Preview"
                            className="max-h-[300px] mx-auto rounded-md"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center space-y-4">
                          <Upload className="h-12 w-12 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Click to upload or drag and drop</p>
                            <p className="text-sm text-muted-foreground">JPG or PNG (max. 10MB)</p>
                          </div>
                        </div>
                      )}
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/jpeg,image/png"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gap-2" size="lg" onClick={handleAnalyze} disabled={!file || isAnalyzing}>
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Analyze Image
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                    <CardDescription>Our AI system analyzes your crop images to detect diseases</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <span className="font-bold text-primary">1</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Upload a clear image</h3>
                        <p className="text-sm text-muted-foreground">
                          Take a clear photo of the affected plant part in good lighting
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <span className="font-bold text-primary">2</span>
                      </div>
                      <div>
                        <h3 className="font-medium">AI Analysis</h3>
                        <p className="text-sm text-muted-foreground">
                          Our AI model analyzes the image to identify disease patterns
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <span className="font-bold text-primary">3</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Get Results</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive disease identification and treatment recommendations
                        </p>
                      </div>
                    </div>

                    <Alert className="mt-6">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Important</AlertTitle>
                      <AlertDescription>
                        For the most accurate results, ensure the affected area is clearly visible and well-lit in your
                        photo.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <Card className="md:w-1/3">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Uploaded Image</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    {preview && (
                      <img src={preview || "/placeholder.svg"} alt="Uploaded crop" className="max-h-[300px] rounded-md" />
                    )}
                  </CardContent>
                </Card>

                <Card className="md:w-2/3">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Diagnosis Result</CardTitle>
                      <Badge className="bg-green-600">{Math.round(result.diagnosis.confidence * 100)}% Confidence</Badge>
                    </div>
                    <CardDescription>Based on AI analysis of your crop image</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                        <span className="text-red-500">Disease:</span> {result.diagnosis.disease}
                      </h3>

                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Common Symptoms:</h4>
                        <ul className="space-y-2 pl-5 list-disc">
                          {result.diagnosis.symptoms.map((symptom, index) => (
                            <li key={index} className="text-muted-foreground">
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Observed in Your Image:</h4>
                        <ul className="space-y-2 pl-5">
                          {result.diagnosis.image_analysis.observed_symptoms.map((symptom, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>{symptom}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Treatment Recommendations</CardTitle>
                  <CardDescription>Based on the diagnosis, here are our recommended actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="preventive">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="preventive">Preventive Measures</TabsTrigger>
                      <TabsTrigger value="treatment">Treatment Options</TabsTrigger>
                    </TabsList>

                    <TabsContent value="preventive" className="mt-4">
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg">Prevention Steps:</h3>
                        <ul className="space-y-2 pl-5">
                          {result.recommendations.preventive_measures.map((measure, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span>{measure}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="treatment" className="mt-4">
                      <div className="space-y-6">
                        {result.recommendations.treatment.map((treatment, index) => (
                          <div key={index} className="space-y-3">
                            <h3 className="font-medium text-lg">{treatment.type}:</h3>

                            {treatment.active_ingredients && (
                              <div>
                                <h4 className="font-medium">Recommended Active Ingredients:</h4>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {treatment.active_ingredients.map((ingredient, i) => (
                                    <Badge key={i} variant="outline" className="bg-primary/10">
                                      {ingredient}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {treatment.application_instructions && (
                              <div>
                                <h4 className="font-medium">Application Instructions:</h4>
                                <p className="text-muted-foreground mt-1">{treatment.application_instructions}</p>
                              </div>
                            )}

                            {treatment.organic_options && (
                              <div>
                                <h4 className="font-medium">Organic Options:</h4>
                                <ul className="pl-5 mt-1">
                                  {treatment.organic_options.map((option, i) => (
                                    <li key={i} className="text-muted-foreground">
                                      {option}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {treatment.instructions && (
                              <div>
                                <h4 className="font-medium">Instructions:</h4>
                                <ul className="space-y-2 pl-5 mt-1">
                                  {treatment.instructions.map((instruction, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                      <span>{instruction}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {treatment.notes && (
                              <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Note</AlertTitle>
                                <AlertDescription>{treatment.notes}</AlertDescription>
                              </Alert>
                            )}
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <Button onClick={resetAnalysis} className="w-full">
                    Analyze Another Image
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </div>
      )
    }

