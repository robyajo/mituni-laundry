import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shirt, Clock, Shield, Star, Phone, Mail, MapPin, Zap, Droplets } from "lucide-react"
import Image from "next/image"
import HomeHeader from "./_components/home-header"
import HomeFooter from "./_components/home-footer"
import HomeHero from "./_components/home-hero"

export default function HomePage() {
  return (
    <div className="min-h-screen ">
      {/* Header */}
      <HomeHeader />

      {/* Hero Section */}
      <HomeHero />

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 lg:py-20">
        <div className=" mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold  mb-4">Our Services</h2>
            <p className="text-base sm:text-lg lg:text-xl  max-w-2xl mx-auto">
              Complete laundry solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader className="text-center">
                <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Droplets className="h-8 w-8 " />
                </div>
                <CardTitle>Wash & Fold</CardTitle>
                <CardDescription>Professional washing and folding service</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm ">
                  <li>• Premium detergents</li>
                  <li>• Fabric softener included</li>
                  <li>• Neatly folded & packaged</li>
                  <li>• 24-48 hour turnaround</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader className="text-center">
                <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shirt className="h-8 w-8 " />
                </div>
                <CardTitle>Dry Cleaning</CardTitle>
                <CardDescription>Expert care for delicate garments</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm ">
                  <li>• Suits & formal wear</li>
                  <li>• Delicate fabrics</li>
                  <li>• Stain removal</li>
                  <li>• Professional pressing</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader className="text-center">
                <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 " />
                </div>
                <CardTitle>Express Service</CardTitle>
                <CardDescription>Same-day cleaning when you need it fast</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm ">
                  <li>• 4-hour express option</li>
                  <li>• Same-day delivery</li>
                  <li>• Priority processing</li>
                  <li>• Perfect for emergencies</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 sm:py-16 lg:py-20">
        <div className=" mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold  mb-4">Simple Pricing</h2>
            <p className="text-base sm:text-lg lg:text-xl ">Transparent pricing with no hidden fees</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary">Basic</CardTitle>
                <div className="text-4xl font-bold text-primary mt-4">$2.50</div>
                <CardDescription>per pound</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>Wash & Fold
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>48h Turnaround
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>Free Pickup & Delivery
                  </li>
                </ul>
                <Button className="w-full">Choose Basic</Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary hover:shadow-lg transition-shadow relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">Most Popular</Badge>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary">Premium</CardTitle>
                <div className="text-4xl font-bold text-primary mt-4">$3.50</div>
                <CardDescription>per pound</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>Everything in Basic
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>24h Turnaround
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>Stain Treatment
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>Eco-friendly Options
                  </li>
                </ul>
                <Button className="w-full bg-primary">Choose Premium</Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary">Express</CardTitle>
                <div className="text-4xl font-bold text-primary mt-4">$5.00</div>
                <CardDescription>per pound</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>Everything in Premium
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>4h Express Service
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>Same-day Delivery
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>Priority Support
                  </li>
                </ul>
                <Button className="w-full">Choose Express</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className=" mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold  mb-6">Why Choose LaundryPro?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary p-2 rounded-lg">
                    <Clock className="h-6 w-6 " />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Fast Turnaround</h3>
                    <p className="">
                      Get your clothes back in 24-48 hours, or choose our express 4-hour service.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary p-2 rounded-lg">
                    <Shield className="h-6 w-6 " />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
                    <p className="">We use biodegradable detergents and energy-efficient machines.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
                    <p className="">100% satisfaction guaranteed or we'll redo your order for free.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Modern laundry facility"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 ">
        <div className=" mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-300">Ready to experience premium laundry service?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-300">(555) 123-4567</p>
            </div>

            <div>
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-300">hello@laundrypro.com</p>
            </div>

            <div>
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-300">123 Clean Street, City</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-primary">
              Schedule Your First Pickup
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <HomeFooter />
    </div>
  )
}
