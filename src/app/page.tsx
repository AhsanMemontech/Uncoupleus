'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, CheckCircle, Shield, Clock, FileText, Users } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Eligibility Check",
      description: "Answer a few questions to confirm you qualify for uncontested divorce",
      icon: CheckCircle
    },
    {
      title: "Process Overview", 
      description: "Learn about the divorce process, timelines, and what to expect",
      icon: Clock
    },
    {
      title: "Information Collection",
      description: "Provide your personal and marriage details securely",
      icon: Users
    },
    {
      title: "Form Generation",
      description: "Get all the required forms filled out with your information",
      icon: FileText
    },
    {
      title: "Next Steps",
      description: "Learn exactly what to do with your completed forms",
      icon: ArrowRight
    }
  ]

  const handleStartDivorce = () => {
    router.push('/questionnaire')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1e2a3b' }}>
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
            Uncontested Divorce
            <span className="text-cyan-400"> Made Simple</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            Streamline your uncontested divorce process in New York State. 
            Our AI-powered tool guides you through every step, generates the right forms, 
            and saves you time and money.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <button 
              onClick={handleStartDivorce}
              className="bg-cyan-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-cyan-700 transition-colors flex items-center justify-center"
            >
              Start Your Divorce
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button className="border border-gray-400 text-gray-300 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-700 hover:border-gray-300 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="p-6 rounded-lg border border-gray-600 backdrop-blur-sm" style={{ backgroundColor: 'hsla(0, 0%, 100%, 0.05)' }}>
            <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-cyan-600 mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">Secure & Private</h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Your information is protected with bank-level security. We never share your data.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-gray-600 backdrop-blur-sm" style={{ backgroundColor: 'hsla(0, 0%, 100%, 0.08)' }}>
            <Clock className="h-10 w-10 sm:h-12 sm:w-12 text-cyan-600 mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">Save Time</h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Complete your divorce forms in minutes, not hours. No more confusing legal jargon.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-gray-600 backdrop-blur-sm" style={{ backgroundColor: 'hsla(0, 0%, 100%, 0.06)' }}>
            <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-cyan-600 mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">NY State Approved</h3>
            <p className="text-gray-300 text-sm sm:text-base">
              All forms are specifically designed for New York State uncontested divorce requirements.
            </p>
          </div>
        </div>

        {/* Process Steps */}
        <div className="rounded-lg border border-gray-600 p-6 sm:p-8 backdrop-blur-sm" style={{ backgroundColor: 'hsla(0, 0%, 100%, 0.05)' }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-white">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-cyan-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <step.icon className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-600" />
                </div>
                <h3 className="font-semibold mb-2 text-white text-sm sm:text-base">{step.title}</h3>
                <p className="text-xs sm:text-sm text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Uncouple</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Making uncontested divorce simple, affordable, and accessible for New York residents.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li>Uncontested Divorce</li>
                <li>Form Generation</li>
                <li>Process Guidance</li>
                <li>Legal Consultation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>FAQ</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4">Legal</h4>
              <p className="text-gray-400 text-xs sm:text-sm">
                This service is not a substitute for legal advice. 
                We recommend consulting with an attorney for complex legal matters.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-sm sm:text-base">
            <p>@2024 Uncouple. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 