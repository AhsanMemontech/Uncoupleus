'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, CheckCircle, Lock, ArrowRight } from 'lucide-react'

export default function PaymentPage() {
  const router = useRouter()
  const [isPaying, setIsPaying] = useState(false)
  const [paid, setPaid] = useState(false)

  const handlePay = () => {
    setIsPaying(true)
    setTimeout(() => {
      setPaid(true)
      setIsPaying(false)
      // Set payment status in localStorage
      localStorage.setItem('paymentCompleted', 'true')
      setTimeout(() => router.push('/form-generation'), 1200)
    }, 1800) // Simulate payment processing
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#1e2a3b' }}>
      <div className="max-w-lg w-full p-6 sm:p-8 rounded-lg border border-gray-600 backdrop-blur-sm" style={{ backgroundColor: 'hsla(0,0%,100%,0.05)' }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Payment</h1>
        <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">To generate your uncontested divorce forms, please complete payment below. This is a one-time fee for the full service.</p>

        <div className="mb-4 sm:mb-6 p-4 rounded-lg border border-gray-600 bg-gray-800/60">
          <div className="flex items-center mb-2">
            <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 mr-2" />
            <span className="text-base sm:text-lg font-semibold text-white">Uncontested Divorce Package</span>
          </div>
          <ul className="text-gray-300 text-xs sm:text-sm ml-6 sm:ml-7 list-disc mb-2 space-y-1">
            <li>Eligibility check</li>
            <li>Step-by-step process guidance</li>
            <li>Information collection</li>
            <li>All required NY divorce forms, pre-filled</li>
            <li>Filing & next steps instructions</li>
          </ul>
          <div className="flex items-center justify-between mt-3 sm:mt-4">
            <span className="text-gray-400 text-sm sm:text-base">Total</span>
            <span className="text-xl sm:text-2xl font-bold text-cyan-400">$299</span>
          </div>
        </div>

        {!paid ? (
          <button
            onClick={handlePay}
            disabled={isPaying}
            className={`w-full flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold transition-colors border border-cyan-600 bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm sm:text-base ${isPaying ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {isPaying ? (
              <>
                <Lock className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
                <span>Processing Payment...</span>
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Pay Now</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </>
            )}
          </button>
        ) : (
          <div className="flex flex-col items-center space-y-2 mt-4">
            <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
            <span className="text-green-400 font-semibold text-sm sm:text-base">Payment Successful!</span>
            <span className="text-gray-400 text-xs sm:text-sm">Redirecting to your forms...</span>
          </div>
        )}
      </div>
    </div>
  )
} 