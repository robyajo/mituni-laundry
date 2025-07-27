"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Shirt, Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import LoginForm from "../_components/form/form-login"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm sm:max-w-md">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6 sm:mb-8 transition-colors text-sm sm:text-base"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 px-4 sm:px-6">
            <div className="mx-auto bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl w-fit">
              <Shirt className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2 text-sm sm:text-base">
                Sign in to your LaundryPro account
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 px-4 sm:px-6">
            {/* Social Login */}
            <LoginForm />
          </CardContent>

          <CardFooter className="px-4 sm:px-6">
            <p className="text-center text-sm text-gray-600 w-full">
              {"Don't have an account? "}
              <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up here
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Security Features */}
        <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-4 text-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="text-xs text-gray-500">
                  <div className="bg-green-100 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                  </div>
                  <span className="text-xs sm:text-sm">Secure Login</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>256-bit SSL encryption</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="text-xs text-gray-500">
                  <div className="bg-blue-100 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 text-xs sm:text-sm">⚡</span>
                  </div>
                  <span className="text-xs sm:text-sm">Fast Access</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Quick authentication</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="text-xs text-gray-500">
                  <div className="bg-purple-100 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-purple-600 text-xs sm:text-sm">🔒</span>
                  </div>
                  <span className="text-xs sm:text-sm">Protected</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Data protection guaranteed</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}
