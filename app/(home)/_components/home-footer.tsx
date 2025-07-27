import React from 'react'
import { Shirt } from 'lucide-react'

export default function HomeFooter() {
  return (
    <>
      <footer className="bg-gray-800  py-12">
        <div className=" mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Shirt className="h-6 w-6 " />
                </div>
                <span className="text-2xl font-bold">LaundryPro</span>
              </div>
              <p className="text-gray-300">Professional laundry service with free pickup and delivery.</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Wash & Fold</li>
                <li>Dry Cleaning</li>
                <li>Express Service</li>
                <li>Stain Removal</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Blog</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Help Center</li>
                <li>Track Order</li>
                <li>Returns</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 LaundryPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
