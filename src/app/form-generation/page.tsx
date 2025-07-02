'use client'

import { useState } from 'react'
import { formFieldMappings, courtForms, getFormMapping, generateMappingCSV, getFieldsBySection, getAllSections } from '@/lib/formMapping'
import { Download, FileText } from 'lucide-react'

export default function FormGenerationPage() {
  const [selectedCourtForm, setSelectedCourtForm] = useState<string>('')
  const [selectedSection, setSelectedSection] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')

  const sections = getAllSections()
  
  const filteredMappings = formFieldMappings.filter(mapping => {
    const matchesSearch = mapping.googleFormField.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mapping.formstackTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mapping.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourtForm = !selectedCourtForm || mapping.courtForms.includes(selectedCourtForm)
    const matchesSection = !selectedSection || mapping.section === selectedSection
    return matchesSearch && matchesCourtForm && matchesSection
  })

  const handleDownloadCSV = () => {
    const csv = generateMappingCSV()
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'form-field-mapping.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const getSectionName = (section: string) => {
    const names: { [key: string]: string } = {
      'A': 'Basic Info',
      'B': 'Marriage Details', 
      'C': 'Residency & Grounds',
      'D': 'Property & Support',
      'E': 'Name Change',
      'F': 'Filing & Support'
    }
    return names[section] || section
  }

  const getCourtFormDisplayName = (formCode: string) => {
    const names: { [key: string]: string } = {
      'UD-1': 'Summons with Notice',
      'UD-2': 'Verified Complaint', 
      'UD-6': 'Affidavit of Service',
      'UD-9': 'Financial Disclosure',
      'UD-10': 'Settlement Agreement',
      'UD-11': 'Judgment of Divorce',
      'DOH-2168': 'Vital Records',
      'Fee_Waiver': 'Fee Waiver Application'
    }
    return names[formCode] || formCode
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-cyan-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Field-to-Form Mapping System
          </h1>
          <p className="text-lg text-gray-600">
            Test and verify the mapping between Google Form fields, Formstack tags, and court forms.
            Based on client&apos;s exact Google Form specifications.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-cyan-600" />
              <div>
                <p className="text-2xl font-bold">{formFieldMappings.length}</p>
                <p className="text-sm text-gray-600">Total Fields</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{courtForms.length}</p>
                <p className="text-sm text-gray-600">Court Forms</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">
                  {formFieldMappings.filter(f => f.required).length}
                </p>
                <p className="text-sm text-gray-600">Required Fields</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {formFieldMappings.filter(f => f.conditional).length}
                </p>
                <p className="text-sm text-gray-600">Conditional Fields</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search fields, tags, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500"
            />
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">All Sections</option>
              {sections.map(section => (
                <option key={section} value={section}>
                  Section {section} - {getSectionName(section)}
                </option>
              ))}
            </select>
            <select
              value={selectedCourtForm}
              onChange={(e) => setSelectedCourtForm(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">All Court Forms</option>
              {courtForms.map(form => (
                <option key={form} value={form}>
                  {form} - {getCourtFormDisplayName(form)}
                </option>
              ))}
            </select>
            <button
              onClick={handleDownloadCSV}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              <Download className="h-5 w-5" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Mapping Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left">Section</th>
                  <th className="px-6 py-4 text-left">Google Form Field</th>
                  <th className="px-6 py-4 text-left">Description</th>
                  <th className="px-6 py-4 text-left">Formstack Tag</th>
                  <th className="px-6 py-4 text-left">Court Forms</th>
                  <th className="px-6 py-4 text-left">Type</th>
                  <th className="px-6 py-4 text-left">Required</th>
                  <th className="px-6 py-4 text-left">Conditional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMappings.map((mapping, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                        {mapping.section}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-sm">{mapping.googleFormField}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{mapping.description}</td>
                    <td className="px-6 py-4 font-mono text-sm">{mapping.formstackTag}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {mapping.courtForms.map(form => (
                          <span key={form} className="px-2 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs">
                            {form}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {mapping.fieldType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {mapping.required ? (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Yes</span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">No</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {mapping.conditional ? (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                          {mapping.conditional.dependsOn} = {String(mapping.conditional.value)}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Showing {filteredMappings.length} of {formFieldMappings.length} field mappings
          </p>
        </div>
      </div>
    </div>
  )
} 