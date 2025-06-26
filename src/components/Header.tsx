'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleStartDivorce = () => {
    router.push('/questionnaire')
    setIsMenuOpen(false)
  }

  const handleHome = () => {
    router.push('/')
    setIsMenuOpen(false)
  }

  return (
    <header className="shadow-sm border-b border-gray-600" style={{ backgroundColor: '#0a0f14' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 sm:py-6">
          <div className="flex items-center">
            <button 
              onClick={handleHome}
              className="text-xl sm:text-2xl font-bold text-white hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Uncouple
            </button>
            <span className="ml-2 text-xs sm:text-sm text-gray-400 hidden sm:block">AI-Powered Divorce</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white transition-colors text-sm">About</button>
            <button className="text-gray-300 hover:text-white transition-colors text-sm">Contact</button>
            <button 
              onClick={handleStartDivorce}
              className="bg-cyan-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors text-sm"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white transition-colors p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="sm:hidden border-t border-gray-600 py-4">
            <div className="flex flex-col space-y-3">
              <button className="text-gray-300 hover:text-white transition-colors text-sm text-left py-2">
                About
              </button>
              <button className="text-gray-300 hover:text-white transition-colors text-sm text-left py-2">
                Contact
              </button>
              <button 
                onClick={handleStartDivorce}
                className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors text-sm text-left"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 