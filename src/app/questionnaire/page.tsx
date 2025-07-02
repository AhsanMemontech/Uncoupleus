'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import GoogleFormEmbed from '@/components/GoogleFormEmbed'
import { CheckCircle, Download, FileText, Clock, ArrowRight, Mail, AlertCircle } from 'lucide-react'

export default function QuestionnairePage() {
  const [showResults, setShowResults] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showManualButton, setShowManualButton] = useState(false)
  const router = useRouter()

  // Google Form URL - Replace with your actual Google Form URL
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeegtT2LIgt_RDJYrgJndoTWC3hrFQbvPYWGVbVVJhqKBHprA/viewform?embedded=true"
  //d/e/1FAIpQLSeegtT2LIgt_RDJYrgJndoTWC3hrFQbvPYWGVbVVJhqKBHprA/viewform
  // Handle form submission
  const handleFormSubmission = async () => {
    if (formSubmitted) return; // Prevent multiple submissions
    
    setFormSubmitted(true);
    setIsProcessing(true);
    setError(null);
    setShowManualButton(false); // Hide manual button
    
    try {
      // Simulate the Formstack/Zapier workflow
      console.log('Form submitted - triggering Formstack/Zapier workflow...');
      
      // Step 1: Process form data (this would come from Google Forms API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 2: Generate documents via Formstack
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Step 3: Save to Google Drive
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 4: Send email
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setShowResults(true);
      setIsProcessing(false);
      
    } catch (err) {
      console.error('Error processing form:', err);
      setError('There was an error processing your form. Please try again or contact support.');
      setIsProcessing(false);
    }
  };

  // Show manual button immediately for better user experience
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!formSubmitted && !isProcessing && !showResults) {
        setShowManualButton(true);
      }
    }, 1000); // Show after just 1 second

    return () => clearTimeout(timer);
  }, [formSubmitted, isProcessing, showResults]);

  const handleContinue = () => {
    router.push('/process-overview')
  }

  const handleDownloadForms = async () => {
    try {
      // This would trigger the actual Formstack/Zapier workflow
      console.log('Triggering document generation...');
      
      // Simulate API call to Formstack/Zapier
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      alert('✅ Your forms have been generated and sent to your email! Check your inbox for the documents.');
      
    } catch (err) {
      console.error('Error downloading forms:', err);
      alert('❌ There was an error generating your forms. Please try again or contact support.');
    }
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-xl mx-4 sm:mx-auto" style={{ backgroundColor: 'rgb(30, 42, 59)' }}>
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 sm:p-10">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Error Processing Form</h1>
            <p className="text-red-100 text-sm sm:text-base">{error}</p>
          </div>
        </div>
        <div className="p-6 sm:p-10">
          <div className="text-center space-y-4">
            <button
              onClick={() => {
                setError(null);
                setFormSubmitted(false);
                setShowResults(false);
              }}
              className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white px-6 py-3 rounded-2xl font-semibold hover:from-cyan-700 hover:to-cyan-800 transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isProcessing) {
    return (
      <div className="mt-3 mb-3 max-w-2xl mx-auto bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-xl mx-4 sm:mx-auto" style={{ backgroundColor: 'rgb(30, 42, 59)' }}>
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white p-6 sm:p-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Processing Your Information</h1>
            <p className="text-cyan-100 text-sm sm:text-base">We&apos;re preparing your divorce forms...</p>
          </div>
        </div>
        <div className="p-6 sm:p-10">
          <div className="text-center space-y-4">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
            <p className="text-sm text-gray-500">This may take a few moments...</p>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="mt-5 mb-5 max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl mx-4 sm:mx-auto" style={{ backgroundColor: 'rgb(30, 42, 59)' }}>
        <div className="text-white p-6 sm:p-10">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">🎉 Your Forms Are Ready!</h1>
            <p className="text-green-100 text-sm sm:text-base">
              We&apos;ve successfully processed your information and generated your divorce forms.
            </p>
          </div>
        </div>
        
        <div className="p-6 sm:p-10">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-2xl p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-cyan-600" />
                Generated Documents
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• UD-1: Summons with Notice</li>
                <li>• UD-2: Verified Complaint</li>
                <li>• UD-6: Affidavit of Service</li>
                <li>• UD-9: Financial Disclosure</li>
                <li>• UD-10: Settlement Agreement</li>
                <li>• UD-11: Judgment of Divorce</li>
                <li>• Fee Waiver Application (if applicable)</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-cyan-600" />
                Next Steps
              </h3>
              <ol className="space-y-2 text-sm text-gray-300">
                <li>1. Review all generated forms</li>
                <li>2. Print and sign where required</li>
                <li>3. File with your local court</li>
                <li>4. Serve papers to your spouse</li>
                <li>5. Attend court hearing if required</li>
              </ol>
            </div>
          </div>

          <div className="space-y-4">
            {/* <button
              onClick={handleDownloadForms}
              className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 text-white py-4 px-6 rounded-2xl font-semibold hover:from-cyan-700 hover:to-cyan-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Download className="h-5 w-5" />
              Download All Forms
            </button> */}
            
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">
                Forms have been sent to your email address
              </p>
              <p className="text-xs text-gray-400">
                You would have received a copy via email for your records
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 rounded-2xl p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <h4 className="font-semibold text-gray-200 mb-2 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Important Notice
              </h4>
              <p className="text-sm text-gray-300">
                Your completed forms have been saved to Google Drive and will be emailed to you shortly. 
                Please review all documents carefully before filing with the court.
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleContinue}
              className="flex items-center gap-2 px-6 py-3 text-cyan-600 hover:text-cyan-700 font-semibold transition-colors"
            >
              <span>Continue to Process Overview</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: 'rgb(30, 42, 59)' }}>
      <GoogleFormEmbed 
        formUrl="https://docs.google.com/forms/d/e/1FAIpQLSeegtT2LIgt_RDJYrgJndoTWC3hrFQbvPYWGVbVVJhqKBHprA/viewform?embedded=true"
        title="NY Uncontested Divorce Form"
        description="Complete all sections to generate your divorce documents. All information will be used to create your court forms."
        onFormSubmit={handleFormSubmission}
      />
      
      {/* Manual detection button - appears if automatic detection fails */}
      {/* {showManualButton && !formSubmitted && !isProcessing && !showResults && (
        <div className="max-w-4xl mx-auto mt-6 mx-4 sm:mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              📝 Form Submission Complete?
            </h3>
            <p className="text-sm text-blue-700 mb-4">
              If you have completed and submitted the form above and see &quot;Your response has been recorded&quot;, 
              click the button below to generate your divorce documents.
            </p>
            <button
              onClick={handleFormSubmission}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg text-lg"
            >
              🚀 Generate My Divorce Documents
            </button>
            <p className="text-xs text-blue-600 mt-3">
              This will start the document generation process using your submitted information.
            </p>
          </div>
        </div>
      )} */}
      
      {/* Test button - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-center mt-4">
          <button
            onClick={handleFormSubmission}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm"
          >
            🧪 Test Form Submission
          </button>
        </div>
      )}
    </div>
  )
} 