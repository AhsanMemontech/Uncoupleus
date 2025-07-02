'use client'

import { useState } from 'react'
import { ChevronRight, ChevronLeft, Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react'

interface FormData {
  // Section A - Basic Info
  plaintiffName: string
  plaintiffAddress: string
  plaintiffEmail: string
  plaintiffPhone: string
  defendantName: string
  defendantAddress: string
  
  // Section B - Marriage Details
  marriageDate: string
  marriageCity: string
  marriageState: string
  ceremonyType: 'civil' | 'religious'
  nameChange: boolean
  whoChangedName: string
  formerName: string
  
  // Section C - Residency & Grounds
  nyResident2Years: boolean
  alternativeRoute: string
  breakdownDate: string
  noFaultDivorce: boolean
  
  // Section D - Property & Support
  settlementAgreement: boolean
  settlementFile: File | null
  sharedBankAccounts: boolean
  bankAccountDetails: string
  sharedProperty: boolean
  propertyDetails: string
  spousalSupport: boolean
  supportAmount: string
  supportDuration: string
  
  // Section E - Name Change
  revertName: boolean
  formerNamePlaintiff: string
  spouseRevertName: boolean
  formerNameSpouse: string
  
  // Section F - Filing & Support
  canPayFees: boolean
  hasPrinter: boolean
  legalReviewCall: boolean
}

interface FormSection {
  id: string
  title: string
  description: string
  fields: FormField[]
}

interface FormField {
  id: keyof FormData
  label: string
  type: 'text' | 'email' | 'tel' | 'date' | 'select' | 'radio' | 'checkbox' | 'file' | 'textarea'
  required: boolean
  options?: string[]
  conditional?: {
    field: keyof FormData
    value: any
  }
  placeholder?: string
}

const formSections: FormSection[] = [
  {
    id: 'basic-info',
    title: 'Basic Information',
    description: 'Please provide your basic contact information and your spouse\'s details.',
    fields: [
      { id: 'plaintiffName', label: 'Your full legal name', type: 'text', required: true, placeholder: 'Enter your full legal name' },
      { id: 'plaintiffAddress', label: 'Your address', type: 'textarea', required: true, placeholder: 'Enter your complete address' },
      { id: 'plaintiffEmail', label: 'Your email', type: 'email', required: true, placeholder: 'Enter your email address' },
      { id: 'plaintiffPhone', label: 'Your phone number', type: 'tel', required: true, placeholder: 'Enter your phone number' },
      { id: 'defendantName', label: 'Spouse\'s full legal name', type: 'text', required: true, placeholder: 'Enter your spouse\'s full legal name' },
      { id: 'defendantAddress', label: 'Spouse\'s last known address', type: 'textarea', required: true, placeholder: 'Enter your spouse\'s last known address' }
    ]
  },
  {
    id: 'marriage-details',
    title: 'Marriage Details',
    description: 'Information about your marriage ceremony and any name changes.',
    fields: [
      { id: 'marriageDate', label: 'Date of marriage', type: 'date', required: true },
      { id: 'marriageCity', label: 'City of marriage', type: 'text', required: true, placeholder: 'Enter city' },
      { id: 'marriageState', label: 'State of marriage', type: 'text', required: true, placeholder: 'Enter state' },
      { id: 'ceremonyType', label: 'Type of ceremony', type: 'radio', required: true, options: ['Civil', 'Religious'] },
      { id: 'nameChange', label: 'Did either spouse change names?', type: 'checkbox', required: false },
      { id: 'whoChangedName', label: 'Who changed their name?', type: 'select', required: false, options: ['You', 'Your spouse', 'Both'], conditional: { field: 'nameChange', value: true } },
      { id: 'formerName', label: 'Former name', type: 'text', required: false, placeholder: 'Enter former name', conditional: { field: 'nameChange', value: true } }
    ]
  },
  {
    id: 'residency-grounds',
    title: 'Residency & Grounds for Divorce',
    description: 'Residency requirements and grounds for filing divorce in New York.',
    fields: [
      { id: 'nyResident2Years', label: 'Have you lived in NY for 2+ years?', type: 'radio', required: true, options: ['Yes', 'No'] },
      { id: 'alternativeRoute', label: 'If No, which alternative route applies?', type: 'select', required: false, options: ['Marriage occurred in NY', 'Grounds occurred in NY', 'Both parties consent to NY jurisdiction'], conditional: { field: 'nyResident2Years', value: false } },
      { id: 'breakdownDate', label: 'Approximate date of marriage breakdown', type: 'date', required: true },
      { id: 'noFaultDivorce', label: 'Are you filing for no-fault divorce?', type: 'radio', required: true, options: ['Yes', 'No'] }
    ]
  },
  {
    id: 'property-support',
    title: 'Property & Support',
    description: 'Details about shared assets, property, and support arrangements.',
    fields: [
      { id: 'settlementAgreement', label: 'Do you have a signed settlement agreement?', type: 'radio', required: true, options: ['Yes', 'No'] },
      { id: 'settlementFile', label: 'Upload settlement agreement (PDF)', type: 'file', required: false, conditional: { field: 'settlementAgreement', value: true } },
      { id: 'sharedBankAccounts', label: 'Do you have shared bank accounts?', type: 'radio', required: true, options: ['Yes', 'No'] },
      { id: 'bankAccountDetails', label: 'Bank account details and who keeps which', type: 'textarea', required: false, placeholder: 'Describe shared accounts and distribution', conditional: { field: 'sharedBankAccounts', value: true } },
      { id: 'sharedProperty', label: 'Do you have shared property/vehicles?', type: 'radio', required: true, options: ['Yes', 'No'] },
      { id: 'propertyDetails', label: 'Property/vehicle details and assignment', type: 'textarea', required: false, placeholder: 'Describe shared property and how it will be divided', conditional: { field: 'sharedProperty', value: true } },
      { id: 'spousalSupport', label: 'Will you include spousal support?', type: 'radio', required: true, options: ['Yes', 'No'] },
      { id: 'supportAmount', label: 'Monthly support amount', type: 'text', required: false, placeholder: 'Enter monthly amount', conditional: { field: 'spousalSupport', value: true } },
      { id: 'supportDuration', label: 'Support duration', type: 'text', required: false, placeholder: 'e.g., 2 years, until remarriage', conditional: { field: 'spousalSupport', value: true } }
    ]
  },
  {
    id: 'name-change',
    title: 'Name Change',
    description: 'Information about reverting to former names.',
    fields: [
      { id: 'revertName', label: 'Do you want to revert to a former name?', type: 'radio', required: true, options: ['Yes', 'No'] },
      { id: 'formerNamePlaintiff', label: 'Your former name', type: 'text', required: false, placeholder: 'Enter your former name', conditional: { field: 'revertName', value: true } },
      { id: 'spouseRevertName', label: 'Does your spouse want to revert to a former name?', type: 'radio', required: true, options: ['Yes', 'No'] },
      { id: 'formerNameSpouse', label: 'Spouse\'s former name', type: 'text', required: false, placeholder: 'Enter spouse\'s former name', conditional: { field: 'spouseRevertName', value: true } }
    ]
  },
  {
    id: 'filing-support',
    title: 'Filing & Support',
    description: 'Final questions about filing fees and support options.',
    fields: [
      { id: 'canPayFees', label: 'Can you pay the ~$335 filing fees?', type: 'radio', required: true, options: ['Yes', 'No'] },
      { id: 'hasPrinter', label: 'Do you have access to a printer/scanner?', type: 'radio', required: true, options: ['Yes', 'No'] },
      { id: 'legalReviewCall', label: 'Would you like an optional legal review call?', type: 'radio', required: true, options: ['Yes', 'No'] }
    ]
  }
]

interface DivorceFormProps {
  onComplete: (formData: FormData) => void
}

export default function DivorceForm({ onComplete }: DivorceFormProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    plaintiffName: 'Mark Wood',
    plaintiffAddress: 'Address',
    plaintiffEmail: 'Mark@thebeacons.com',
    plaintiffPhone: '987654',
    defendantName: 'Wood',
    defendantAddress: 'Address2',
    marriageDate: '01/01/1900',
    marriageCity: 'NY',
    marriageState: 'NY',
    ceremonyType: 'civil',
    nameChange: false,
    whoChangedName: '-',
    formerName: 'xyz',
    nyResident2Years: true,
    alternativeRoute: '',
    breakdownDate: '01/01/1900',
    noFaultDivorce: true,
    settlementAgreement: false,
    settlementFile: null,
    sharedBankAccounts: false,
    bankAccountDetails: '',
    sharedProperty: false,
    propertyDetails: '',
    spousalSupport: false,
    supportAmount: '',
    supportDuration: '',
    revertName: false,
    formerNamePlaintiff: '',
    spouseRevertName: false,
    formerNameSpouse: '',
    canPayFees: true,
    hasPrinter: true,
    legalReviewCall: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentFormSection = formSections[currentSection]

  const handleFieldChange = (fieldId: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }))
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: '' }))
    }
  }

  const validateSection = (): boolean => {
    const sectionErrors: Record<string, string> = {}
    
    currentFormSection.fields.forEach(field => {
      // Check if field should be shown based on conditional logic
      if (field.conditional) {
        const { field: conditionalField, value } = field.conditional
        if (formData[conditionalField] !== value) {
          return // Skip validation for hidden fields
        }
      }
      
      // Validate required fields
      if (field.required) {
        const value = formData[field.id]
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          sectionErrors[field.id] = 'This field is required'
        }
      }
      
      // Validate email format
      if (field.type === 'email' && formData[field.id]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData[field.id] as string)) {
          sectionErrors[field.id] = 'Please enter a valid email address'
        }
      }
    })
    
    setErrors(sectionErrors)
    return Object.keys(sectionErrors).length === 0
  }

  const nextSection = () => {
    if (validateSection()) {
      if (currentSection < formSections.length - 1) {
        setCurrentSection(prev => prev + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const previousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    onComplete(formData)
    setIsSubmitting(false)
  }

  const renderField = (field: FormField) => {
    // Check conditional logic
    if (field.conditional) {
      const { field: conditionalField, value } = field.conditional
      if (formData[conditionalField] !== value) {
        return null
      }
    }

    const value = formData[field.id]
    const error = errors[field.id]

    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type}
              value={value as string}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={`w-full p-4 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors text-lg shadow-sm bg-white text-gray-900 placeholder-gray-500 ${
                error ? 'border-red-500' : 'border-gray-300 focus:border-cyan-500'
              }`}
              placeholder={field.placeholder}
            />
            {error && <p className="text-red-500 text-sm flex items-center gap-1"><AlertCircle className="h-4 w-4" />{error}</p>}
          </div>
        )

      case 'date':
        return (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="date"
              value={value as string}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={`w-full p-4 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors text-lg shadow-sm bg-white text-gray-900 ${
                error ? 'border-red-500' : 'border-gray-300 focus:border-cyan-500'
              }`}
            />
            {error && <p className="text-red-500 text-sm flex items-center gap-1"><AlertCircle className="h-4 w-4" />{error}</p>}
          </div>
        )

      case 'textarea':
        return (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              value={value as string}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              rows={4}
              className={`w-full p-4 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors text-lg shadow-sm bg-white text-gray-900 placeholder-gray-500 resize-none ${
                error ? 'border-red-500' : 'border-gray-300 focus:border-cyan-500'
              }`}
              placeholder={field.placeholder}
            />
            {error && <p className="text-red-500 text-sm flex items-center gap-1"><AlertCircle className="h-4 w-4" />{error}</p>}
          </div>
        )

      case 'radio':
        return (
          <div key={field.id} className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <div className="space-y-3">
              {field.options?.map((option) => (
                <label key={option} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name={field.id}
                    value={option.toLowerCase()}
                    checked={value === option.toLowerCase()}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    className="w-5 h-5 text-cyan-600 border-gray-300 focus:ring-cyan-500"
                  />
                  <span className="text-lg text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            {error && <p className="text-red-500 text-sm flex items-center gap-1"><AlertCircle className="h-4 w-4" />{error}</p>}
          </div>
        )

      case 'select':
        return (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <select
              value={value as string}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={`w-full p-4 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors text-lg shadow-sm bg-white text-gray-900 ${
                error ? 'border-red-500' : 'border-gray-300 focus:border-cyan-500'
              }`}
            >
              <option value="">Select an option</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm flex items-center gap-1"><AlertCircle className="h-4 w-4" />{error}</p>}
          </div>
        )

      case 'checkbox':
        return (
          <div key={field.id} className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={value as boolean}
                onChange={(e) => handleFieldChange(field.id, e.target.checked)}
                className="w-5 h-5 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
              />
              <span className="text-lg text-gray-700">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </span>
            </label>
            {error && <p className="text-red-500 text-sm flex items-center gap-1"><AlertCircle className="h-4 w-4" />{error}</p>}
          </div>
        )

      case 'file':
        return (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-cyan-400 transition-colors">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Upload a file
                  </span>
                  <span className="mt-1 block text-xs text-gray-500">
                    PDF, DOC, or DOCX up to 10MB
                  </span>
                </label>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFieldChange(field.id, e.target.files?.[0] || null)}
                  className="sr-only"
                />
              </div>
              {value && (
                <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <FileText className="h-4 w-4" />
                  <span>{(value as File).name}</span>
                </div>
              )}
            </div>
            {error && <p className="text-red-500 text-sm flex items-center gap-1"><AlertCircle className="h-4 w-4" />{error}</p>}
          </div>
        )

      default:
        return null
    }
  }

  const progress = ((currentSection + 1) / formSections.length) * 100

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-xl mx-4 sm:mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white p-6 sm:p-10">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Divorce Information Form</h1>
          <p className="text-cyan-100 text-sm sm:text-base">
            Section {currentSection + 1} of {formSections.length}: {currentFormSection.title}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-6 sm:p-10">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-500">Progress</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
          </div>
          <div className="bg-gray-200 rounded-full h-3">
            <div 
              className="bg-cyan-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Section Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{currentFormSection.title}</h2>
          <p className="text-gray-600">{currentFormSection.description}</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {currentFormSection.fields.map(renderField)}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-200">
          <button
            onClick={previousSection}
            disabled={currentSection === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all ${
              currentSection === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Previous</span>
          </button>

          <button
            onClick={nextSection}
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-2xl font-semibold hover:from-cyan-700 hover:to-cyan-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : currentSection === formSections.length - 1 ? (
              <>
                <span>Submit Form</span>
                <CheckCircle className="h-5 w-5" />
              </>
            ) : (
              <>
                <span>Next</span>
                <ChevronRight className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
} 