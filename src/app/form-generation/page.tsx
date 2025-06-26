'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, Download, CheckCircle, AlertCircle, Clock, User, Calendar, MapPin, Building, ArrowRight, ArrowLeft, Eye, EyeOff } from 'lucide-react'

interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  dateOfBirth: string
  socialSecurityNumber: string
  email: string
  phone: string
  
  // Address Information
  streetAddress: string
  city: string
  state: string
  zipCode: string
  
  // Spouse Information
  spouseFirstName: string
  spouseLastName: string
  spouseDateOfBirth: string
  spouseSocialSecurityNumber: string
  spouseEmail: string
  spousePhone: string
  spouseStreetAddress: string
  spouseCity: string
  spouseState: string
  spouseZipCode: string
  
  // Marriage Information
  marriageDate: string
  marriageLocation: string
  separationDate: string
  
  // Children Information
  hasChildren: boolean
  childrenDetails: Array<{
    name: string
    dateOfBirth: string
    relationship: string
  }>
}

interface GeneratedForm {
  id: string
  name: string
  description: string
  status: 'generating' | 'completed' | 'error'
  downloadUrl?: string
  preview?: string
}

export default function FormGenerationPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData | null>(null)
  const [generatedForms, setGeneratedForms] = useState<GeneratedForm[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStep, setCurrentStep] = useState<'review' | 'generating' | 'completed'>('review')
  const [showSSN, setShowSSN] = useState(false)

  // Required forms for uncontested divorce in NY
  const requiredForms = [
    {
      id: 'summons',
      name: 'Summons with Notice',
      description: 'Official notice to your spouse about the divorce proceedings',
      formNumber: 'UD-1'
    },
    {
      id: 'verified-complaint',
      name: 'Verified Complaint for Divorce',
      description: 'The main divorce petition explaining the grounds for divorce',
      formNumber: 'UD-2'
    },
    {
      id: 'affidavit',
      name: 'Affidavit of Service',
      description: 'Proof that your spouse was properly served with the divorce papers',
      formNumber: 'UD-3'
    },
    {
      id: 'financial-disclosure',
      name: 'Statement of Net Worth',
      description: 'Financial disclosure form showing assets and liabilities',
      formNumber: 'UD-4'
    },
    {
      id: 'settlement-agreement',
      name: 'Settlement Agreement',
      description: 'Agreement between spouses on property division and other matters',
      formNumber: 'UD-5'
    },
    {
      id: 'judgment',
      name: 'Judgment of Divorce',
      description: 'Final court order granting the divorce',
      formNumber: 'UD-6'
    }
  ]

  useEffect(() => {
    // Load form data from localStorage
    const savedData = localStorage.getItem('divorceFormData')
    const paymentStatus = localStorage.getItem('paymentCompleted')
    
    if (savedData) {
      setFormData(JSON.parse(savedData))
    } else {
      // Redirect to information collection if no data
      router.push('/information-collection')
      return
    }
    
    // Check if payment was completed
    if (!paymentStatus) {
      // Redirect to payment if not paid
      router.push('/payment')
    }
  }, [router])

  const generateForms = async () => {
    setIsGenerating(true)
    setCurrentStep('generating')

    // Simulate form generation process
    const forms: GeneratedForm[] = requiredForms.map(form => ({
      id: form.id,
      name: form.name,
      description: form.description,
      status: 'generating' as const
    }))

    setGeneratedForms(forms)

    // Simulate processing each form
    for (let i = 0; i < forms.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate processing time
      
      setGeneratedForms(prev => prev.map((form, index) => 
        index === i 
          ? { 
              ...form, 
              status: 'completed' as const,
              downloadUrl: `/api/download/${form.id}`,
              preview: generateFormPreview(form.id, formData!)
            }
          : form
      ))
    }

    setIsGenerating(false)
    setCurrentStep('completed')
  }

  const generateFormPreview = (formId: string, data: FormData): string => {
    const previews: { [key: string]: string } = {
      summons: `SUMMONS WITH NOTICE\n\nTO: ${data.spouseFirstName} ${data.spouseLastName}\n\nYou are hereby summoned to answer the complaint in this action and to serve a copy of your answer, or, if the complaint is not served with this summons, to serve a notice of appearance, on the plaintiff's attorney within 20 days after the service of this summons...`,
      'verified-complaint': `VERIFIED COMPLAINT FOR DIVORCE\n\nPlaintiff: ${data.firstName} ${data.lastName}\nDefendant: ${data.spouseFirstName} ${data.spouseLastName}\n\n1. Plaintiff resides at ${data.streetAddress}, ${data.city}, ${data.state} ${data.zipCode}.\n2. Defendant resides at ${data.spouseStreetAddress || data.streetAddress}, ${data.spouseCity || data.city}, ${data.spouseState || data.state} ${data.spouseZipCode || data.zipCode}...`,
      affidavit: `AFFIDAVIT OF SERVICE\n\nI, ${data.firstName} ${data.lastName}, being duly sworn, depose and say:\n\n1. I am the plaintiff in this action.\n2. On [DATE], I served the Summons with Notice and Verified Complaint for Divorce upon ${data.spouseFirstName} ${data.spouseLastName}...`,
      'financial-disclosure': `STATEMENT OF NET WORTH\n\nName: ${data.firstName} ${data.lastName}\nAddress: ${data.streetAddress}, ${data.city}, ${data.state} ${data.zipCode}\n\nASSETS:\n- Checking Accounts: $[AMOUNT]\n- Savings Accounts: $[AMOUNT]\n- Real Estate: $[AMOUNT]\n- Vehicles: $[AMOUNT]\n- Other Assets: $[AMOUNT]\n\nLIABILITIES:\n- Credit Cards: $[AMOUNT]\n- Mortgages: $[AMOUNT]\n- Other Debts: $[AMOUNT]...`,
      'settlement-agreement': `SETTLEMENT AGREEMENT\n\nThis agreement is made between ${data.firstName} ${data.lastName} ("Plaintiff") and ${data.spouseFirstName} ${data.spouseLastName} ("Defendant") on [DATE].\n\n1. PROPERTY DIVISION:\n   - Real Estate: [DETAILS]\n   - Personal Property: [DETAILS]\n   - Financial Accounts: [DETAILS]\n\n2. CHILD CUSTODY: ${data.hasChildren ? `\n   - Custody arrangements for ${data.childrenDetails.length} child(ren)` : '\n   - No children involved'}\n\n3. SUPPORT: [DETAILS]...`,
      judgment: `JUDGMENT OF DIVORCE\n\nIT IS ORDERED AND ADJUDGED that:\n\n1. The marriage between ${data.firstName} ${data.lastName} and ${data.spouseFirstName} ${data.spouseLastName} is hereby dissolved.\n\n2. The parties were married on ${data.marriageDate} in ${data.marriageLocation}.\n\n3. The grounds for divorce are [GROUNDS].\n\n4. All other relief requested is granted as set forth in the Settlement Agreement...`
    }

    return previews[formId] || 'Form preview not available'
  }

  const downloadForm = (formId: string) => {
    // Simulate download
    console.log(`Downloading ${formId}`)
    // In a real app, this would trigger an actual file download
  }

  const downloadAllForms = () => {
    generatedForms.forEach(form => {
      if (form.status === 'completed') {
        downloadForm(form.id)
      }
    })
  }

  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#1e2a3b' }}>
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1e2a3b' }}>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Form Generation</h1>
          <p className="text-gray-400">Review your information and generate the required divorce forms</p>
        </div>

        {currentStep === 'review' && (
          <div className="space-y-8">
            {/* Information Review */}
            <div className="rounded-lg border border-gray-600 p-6 backdrop-blur-sm" style={{ backgroundColor: 'hsla(0, 0%, 100%, 0.05)' }}>
              <h2 className="text-xl font-semibold text-white mb-4">Review Your Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-cyan-400 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Personal Information
                  </h3>
                  <div className="space-y-2 text-gray-300">
                    <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
                    <p><span className="font-medium">Date of Birth:</span> {formData.dateOfBirth}</p>
                    <p><span className="font-medium">Email:</span> {formData.email}</p>
                    <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">SSN:</span>
                      <span className="font-mono">
                        {showSSN ? formData.socialSecurityNumber : '***-**-' + formData.socialSecurityNumber.slice(-4)}
                      </span>
                      <button
                        onClick={() => setShowSSN(!showSSN)}
                        className="text-cyan-400 hover:text-cyan-300"
                      >
                        {showSSN ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-cyan-400 flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Address
                  </h3>
                  <div className="space-y-2 text-gray-300">
                    <p>{formData.streetAddress}</p>
                    <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                  </div>
                </div>

                {/* Spouse Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-cyan-400 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Spouse Information
                  </h3>
                  <div className="space-y-2 text-gray-300">
                    <p><span className="font-medium">Name:</span> {formData.spouseFirstName} {formData.spouseLastName}</p>
                    <p><span className="font-medium">Date of Birth:</span> {formData.spouseDateOfBirth}</p>
                    <p><span className="font-medium">Email:</span> {formData.spouseEmail || 'Not provided'}</p>
                    <p><span className="font-medium">Phone:</span> {formData.spousePhone || 'Not provided'}</p>
                  </div>
                </div>

                {/* Marriage Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-cyan-400 flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Marriage Details
                  </h3>
                  <div className="space-y-2 text-gray-300">
                    <p><span className="font-medium">Marriage Date:</span> {formData.marriageDate}</p>
                    <p><span className="font-medium">Location:</span> {formData.marriageLocation}</p>
                    {formData.separationDate && (
                      <p><span className="font-medium">Separation Date:</span> {formData.separationDate}</p>
                    )}
                    <p><span className="font-medium">Children:</span> {formData.hasChildren ? `${formData.childrenDetails.length} child(ren)` : 'None'}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-600">
                <button
                  onClick={() => router.push('/information-collection')}
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  Edit Information
                </button>
              </div>
            </div>

            {/* Required Forms */}
            <div className="rounded-lg border border-gray-600 p-6 backdrop-blur-sm" style={{ backgroundColor: 'hsla(0, 0%, 100%, 0.05)' }}>
              <h2 className="text-xl font-semibold text-white mb-4">Required Forms</h2>
              <p className="text-gray-400 mb-6">The following forms will be generated with your information:</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {requiredForms.map((form) => (
                  <div key={form.id} className="flex items-start space-x-3 p-4 rounded-lg border border-gray-600">
                    <FileText className="h-5 w-5 text-cyan-400 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white">{form.name}</h3>
                      <p className="text-sm text-gray-400">{form.description}</p>
                      <p className="text-xs text-gray-500 mt-1">Form {form.formNumber}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-center">
              <button
                onClick={generateForms}
                className="bg-cyan-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-cyan-700 transition-colors flex items-center space-x-2 text-sm sm:text-base"
              >
                <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Generate All Forms</span>
              </button>
            </div>
          </div>
        )}

        {currentStep === 'generating' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Generating Your Forms</h2>
              <p className="text-gray-400 text-sm sm:text-base">Please wait while we fill in your information...</p>
            </div>

            <div className="space-y-4">
              {generatedForms.map((form) => (
                <div key={form.id} className="rounded-lg border border-gray-600 p-4 sm:p-6 backdrop-blur-sm" style={{ backgroundColor: 'hsla(0, 0%, 100%, 0.05)' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {form.status === 'generating' && (
                        <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-cyan-500"></div>
                      )}
                      {form.status === 'completed' && (
                        <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                      )}
                      <div>
                        <h3 className="font-medium text-white text-sm sm:text-base">{form.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-400">{form.description}</p>
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">
                      {form.status === 'generating' && 'Processing...'}
                      {form.status === 'completed' && 'Completed'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'completed' && (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">Forms Generated Successfully!</h2>
              <p className="text-gray-400 text-sm sm:text-base">All required forms have been filled with your information</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {generatedForms.map((form) => (
                <div key={form.id} className="rounded-lg border border-gray-600 p-4 sm:p-6 backdrop-blur-sm" style={{ backgroundColor: 'hsla(0, 0%, 100%, 0.05)' }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
                      <div>
                        <h3 className="font-medium text-white text-sm sm:text-base">{form.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-400">{form.description}</p>
                      </div>
                    </div>
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => downloadForm(form.id)}
                      className="w-full bg-cyan-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
                    >
                      <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Download PDF</span>
                    </button>
                    
                    <details className="group">
                      <summary className="cursor-pointer text-xs sm:text-sm text-cyan-400 hover:text-cyan-300">
                        Preview Form
                      </summary>
                      <div className="mt-3 p-3 sm:p-4 bg-gray-800 rounded-lg text-xs sm:text-sm text-gray-300 font-mono whitespace-pre-wrap">
                        {form.preview}
                      </div>
                    </details>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => {
                  // Open Calendly for lawyer scheduling
                  // TODO: Replace with your actual Calendly link
                  window.open('https://calendly.com/uncouple-divorce/consultation', '_blank')
                }}
                className="bg-green-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Schedule with a Lawyer</span>
              </button>

              <button
                onClick={downloadAllForms}
                className="bg-cyan-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Download All Forms</span>
              </button>
              
              <button
                onClick={() => router.push('/next-steps')}
                className="bg-gray-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <span>Next Steps</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 