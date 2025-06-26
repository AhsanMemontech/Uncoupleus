'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Calendar, CreditCard, MapPin, Phone, Mail, ArrowRight, ArrowLeft, Save, Eye, EyeOff } from 'lucide-react'

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

export default function InformationCollectionPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [showSSN, setShowSSN] = useState(false)
  const [showSpouseSSN, setShowSpouseSSN] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: 'Mark',
    lastName: 'Wood',
    dateOfBirth: '01/01/1991',
    socialSecurityNumber: '987654',
    email: 'mark@thebeacons.com',
    phone: '123456789',
    streetAddress: 'Block C, NY',
    city: 'City',
    state: 'State',
    zipCode: '98711',
    spouseFirstName: 'Spouse',
    spouseLastName: 'Name',
    spouseDateOfBirth: '01/01/1991',
    spouseSocialSecurityNumber: '98455',
    spouseEmail: 'spouse@thebeacons.com',
    spousePhone: '987654',
    spouseStreetAddress: 'Block D, NY',
    spouseCity: 'City',
    spouseState: 'State',
    spouseZipCode: '98765',
    marriageDate: '01/01/1900',
    marriageLocation: 'New York',
    separationDate: '01/01/1955',
    hasChildren: false,
    childrenDetails: []
  })

  const steps = [
    { id: 1, title: 'Personal Information', icon: User },
    { id: 2, title: 'Address Information', icon: MapPin },
    { id: 3, title: 'Spouse Information', icon: User },
    { id: 4, title: 'Marriage Details', icon: Calendar },
    { id: 5, title: 'Children Information', icon: User }
  ]

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleChildChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      childrenDetails: prev.childrenDetails.map((child, i) => 
        i === index ? { ...child, [field]: value } : child
      )
    }))
  }

  const addChild = () => {
    setFormData(prev => ({
      ...prev,
      childrenDetails: [...prev.childrenDetails, { name: '', dateOfBirth: '', relationship: '' }]
    }))
  }

  const removeChild = (index: number) => {
    setFormData(prev => ({
      ...prev,
      childrenDetails: prev.childrenDetails.filter((_, i) => i !== index)
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Save data to localStorage or send to backend
    localStorage.setItem('divorceFormData', JSON.stringify(formData))
    console.log('Form data saved:', formData)
    router.push('/payment')
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-6">Personal Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full p-4 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white placeholder-gray-400"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full p-4 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white placeholder-gray-400"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Date of Birth *</label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full p-4 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Social Security Number *</label>
              <div className="relative">
                <input
                  type={showSSN ? "text" : "password"}
                  value={formData.socialSecurityNumber}
                  onChange={(e) => handleInputChange('socialSecurityNumber', e.target.value)}
                  className="w-full p-4 pr-12 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white placeholder-gray-400"
                  placeholder="XXX-XX-XXXX"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowSSN(!showSSN)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showSSN ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full p-4 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white placeholder-gray-400"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full p-4 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white placeholder-gray-400"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-6">Address Information</h3>
            
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Street Address *</label>
              <input
                type="text"
                value={formData.streetAddress}
                onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                className="w-full p-4 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white placeholder-gray-400"
                placeholder="123 Main Street"
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">City *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full p-4 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white placeholder-gray-400"
                  placeholder="New York"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">State *</label>
                <select
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full p-4 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white"
                  required
                >
                  <option value="">Select State</option>
                  <option value="NY">New York</option>
                  <option value="CA">California</option>
                  <option value="TX">Texas</option>
                  <option value="FL">Florida</option>
                  <option value="IL">Illinois</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">ZIP Code *</label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className="w-full p-4 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white placeholder-gray-400"
                  placeholder="10001"
                  required
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-6">Spouse Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Spouse First Name *</label>
                <input
                  type="text"
                  value={formData.spouseFirstName}
                  onChange={(e) => handleInputChange('spouseFirstName', e.target.value)}
                  className="w-full p-4 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white placeholder-gray-400"
                  placeholder="Enter spouse's first name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Spouse Last Name *</label>
                <input
                  type="text"
                  value={formData.spouseLastName}
                  onChange={(e) => handleInputChange('spouseLastName', e.target.value)}
                  className="w-full p-4 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white placeholder-gray-400"
                  placeholder="Enter spouse's last name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Spouse Date of Birth *</label>
              <input
                type="date"
                value={formData.spouseDateOfBirth}
                onChange={(e) => handleInputChange('spouseDateOfBirth', e.target.value)}
                className="w-full p-4 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Spouse Social Security Number *</label>
              <div className="relative">
                <input
                  type={showSpouseSSN ? "text" : "password"}
                  value={formData.spouseSocialSecurityNumber}
                  onChange={(e) => handleInputChange('spouseSocialSecurityNumber', e.target.value)}
                  className="w-full p-4 pr-12 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white placeholder-gray-400"
                  placeholder="XXX-XX-XXXX"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowSpouseSSN(!showSpouseSSN)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showSpouseSSN ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Spouse Email</label>
                <input
                  type="email"
                  value={formData.spouseEmail}
                  onChange={(e) => handleInputChange('spouseEmail', e.target.value)}
                  className="w-full p-4 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white placeholder-gray-400"
                  placeholder="spouse.email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Spouse Phone</label>
                <input
                  type="tel"
                  value={formData.spousePhone}
                  onChange={(e) => handleInputChange('spousePhone', e.target.value)}
                  className="w-full p-4 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white placeholder-gray-400"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Spouse Address (if different)</label>
              <input
                type="text"
                value={formData.spouseStreetAddress}
                onChange={(e) => handleInputChange('spouseStreetAddress', e.target.value)}
                className="w-full p-4 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white placeholder-gray-400"
                placeholder="Leave blank if same as your address"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Spouse City</label>
                <input
                  type="text"
                  value={formData.spouseCity}
                  onChange={(e) => handleInputChange('spouseCity', e.target.value)}
                  className="w-full p-4 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white placeholder-gray-400"
                  placeholder="City"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Spouse State</label>
                <select
                  value={formData.spouseState}
                  onChange={(e) => handleInputChange('spouseState', e.target.value)}
                  className="w-full p-4 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white"
                >
                  <option value="">Select State</option>
                  <option value="NY">New York</option>
                  <option value="CA">California</option>
                  <option value="TX">Texas</option>
                  <option value="FL">Florida</option>
                  <option value="IL">Illinois</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Spouse ZIP Code</label>
                <input
                  type="text"
                  value={formData.spouseZipCode}
                  onChange={(e) => handleInputChange('spouseZipCode', e.target.value)}
                  className="w-full p-4 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white placeholder-gray-400"
                  placeholder="ZIP Code"
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-6">Marriage Details</h3>
            
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Date of Marriage *</label>
              <input
                type="date"
                value={formData.marriageDate}
                onChange={(e) => handleInputChange('marriageDate', e.target.value)}
                className="w-full p-4 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Place of Marriage *</label>
              <input
                type="text"
                value={formData.marriageLocation}
                onChange={(e) => handleInputChange('marriageLocation', e.target.value)}
                className="w-full p-4 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white placeholder-gray-400"
                placeholder="City, State where you were married"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Date of Separation (if applicable)</label>
              <input
                type="date"
                value={formData.separationDate}
                onChange={(e) => handleInputChange('separationDate', e.target.value)}
                className="w-full p-4 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white"
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-6">Children Information</h3>
            
            <div className="flex items-center space-x-4 mb-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.hasChildren}
                  onChange={(e) => handleInputChange('hasChildren', e.target.checked)}
                  className="w-4 h-4 text-cyan-600 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500 focus:ring-2"
                />
                <span className="text-gray-300">Do you have children from this marriage?</span>
              </label>
            </div>

            {formData.hasChildren && (
              <div className="space-y-6">
                {formData.childrenDetails.map((child, index) => (
                  <div key={index} className="p-6 rounded-lg border border-gray-600" style={{ backgroundColor: 'hsla(0, 0%, 100%, 0.05)' }}>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-semibold text-white">Child {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeChild(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
                        <input
                          type="text"
                          value={child.name}
                          onChange={(e) => handleChildChange(index, 'name', e.target.value)}
                          className="w-full p-3 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white placeholder-gray-400"
                          placeholder="Child's full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Date of Birth</label>
                        <input
                          type="date"
                          value={child.dateOfBirth}
                          onChange={(e) => handleChildChange(index, 'dateOfBirth', e.target.value)}
                          className="w-full p-3 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">Relationship</label>
                        <select
                          value={child.relationship}
                          onChange={(e) => handleChildChange(index, 'relationship', e.target.value)}
                          className="w-full p-3 border-2 border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-colors bg-gray-700 text-white"
                        >
                          <option value="">Select</option>
                          <option value="Biological">Biological</option>
                          <option value="Adopted">Adopted</option>
                          <option value="Stepchild">Stepchild</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addChild}
                  className="w-full p-4 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                >
                  + Add Another Child
                </button>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1e2a3b' }}>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Progress Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Information Collection</h1>
            <span className="text-gray-400 text-sm sm:text-base">Step {currentStep} of {steps.length}</span>
          </div>
          
          {/* Progress Bar */}
          <div className="bg-gray-600 rounded-full h-2 mb-4">
            <div 
              className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Step Indicators */}
          <div className="flex justify-between overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center min-w-0 flex-1">
                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                  step.id <= currentStep 
                    ? 'bg-cyan-600 text-white' 
                    : 'bg-gray-600 text-gray-400'
                }`}>
                  {step.id < currentStep ? '✓' : step.id}
                </div>
                <span className={`text-xs mt-2 text-center px-1 ${step.id <= currentStep ? 'text-cyan-400' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="rounded-lg border border-gray-600 p-6 sm:p-8 backdrop-blur-sm" style={{ backgroundColor: 'hsla(0, 0%, 100%, 0.05)' }}>
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-8 space-y-4 sm:space-y-0">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-4 sm:px-6 py-3 rounded-lg transition-colors font-semibold border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm sm:text-base ${
              currentStep === 1
                ? 'text-gray-500 cursor-not-allowed bg-gray-700'
                : 'text-gray-300 hover:text-white hover:bg-gray-700 bg-gray-700'
            }`}
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Previous</span>
          </button>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <button
              onClick={() => {
                localStorage.setItem('divorceFormData', JSON.stringify(formData))
                console.log('Progress saved')
              }}
              className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
            >
              <Save className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Save Progress</span>
            </button>

            {currentStep === steps.length ? (
              <button
                onClick={handleSubmit}
                className="flex items-center justify-center space-x-2 bg-cyan-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors text-sm sm:text-base"
              >
                <span>Generate Forms</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="flex items-center justify-center space-x-2 bg-cyan-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors text-sm sm:text-base"
              >
                <span>Next</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
} 