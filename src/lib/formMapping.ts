// Form Field Mapping for Formstack Integration
// This maps our form fields to Formstack merge tags and court forms
// Based on client's exact Google Form specifications

export interface FormMapping {
  googleFormField: string
  formstackTag: string
  courtForms: string[]
  fieldType: string
  required: boolean
  conditional?: {
    dependsOn: string
    value: any
  }
  section: string
  description: string
}

export const formFieldMappings: FormMapping[] = [
  // Section A – Basic Info
  {
    googleFormField: 'yourFullLegalName',
    formstackTag: '{Plaintiff_Name}',
    courtForms: ['UD-1', 'UD-2', 'UD-6', 'UD-9', 'UD-10', 'UD-11'],
    fieldType: 'text',
    required: true,
    section: 'A',
    description: 'Your full legal name'
  },
  {
    googleFormField: 'yourAddress',
    formstackTag: '{Plaintiff_Address}',
    courtForms: ['UD-1', 'UD-2', 'UD-6', 'UD-9'],
    fieldType: 'textarea',
    required: true,
    section: 'A',
    description: 'Your address'
  },
  {
    googleFormField: 'yourEmail',
    formstackTag: '{Plaintiff_Email}',
    courtForms: ['UD-6'],
    fieldType: 'email',
    required: true,
    section: 'A',
    description: 'Your email'
  },
  {
    googleFormField: 'yourPhoneNumber',
    formstackTag: '{Plaintiff_Phone}',
    courtForms: ['UD-6'],
    fieldType: 'tel',
    required: true,
    section: 'A',
    description: 'Your phone number'
  },
  {
    googleFormField: 'spouseFullLegalName',
    formstackTag: '{Defendant_Name}',
    courtForms: ['UD-1', 'UD-2', 'UD-6', 'UD-10', 'UD-11'],
    fieldType: 'text',
    required: true,
    section: 'A',
    description: 'Spouse\'s full legal name'
  },
  {
    googleFormField: 'spouseLastKnownAddress',
    formstackTag: '{Defendant_Address}',
    courtForms: ['UD-1', 'UD-2', 'UD-6'],
    fieldType: 'textarea',
    required: true,
    section: 'A',
    description: 'Spouse\'s last known address'
  },

  // Section B – Marriage Details
  {
    googleFormField: 'dateOfMarriage',
    formstackTag: '{Marriage_Date}',
    courtForms: ['UD-2', 'UD-11'],
    fieldType: 'date',
    required: true,
    section: 'B',
    description: 'Date of marriage'
  },
  {
    googleFormField: 'cityOfMarriage',
    formstackTag: '{Marriage_City}',
    courtForms: ['UD-2', 'UD-11'],
    fieldType: 'text',
    required: true,
    section: 'B',
    description: 'City of marriage'
  },
  {
    googleFormField: 'stateOfMarriage',
    formstackTag: '{Marriage_State}',
    courtForms: ['UD-2', 'UD-11'],
    fieldType: 'text',
    required: true,
    section: 'B',
    description: 'State of marriage'
  },
  {
    googleFormField: 'typeOfCeremony',
    formstackTag: '{Ceremony_Type}',
    courtForms: ['UD-2'],
    fieldType: 'select',
    required: true,
    section: 'B',
    description: 'Type of ceremony (Civil/Religious)'
  },
  {
    googleFormField: 'didEitherChangeNames',
    formstackTag: '{Name_Change}',
    courtForms: ['UD-2'],
    fieldType: 'radio',
    required: true,
    section: 'B',
    description: 'Did either change names?'
  },
  {
    googleFormField: 'whoChangedName',
    formstackTag: '{Who_Changed_Name}',
    courtForms: ['UD-2'],
    fieldType: 'select',
    required: false,
    conditional: { dependsOn: 'didEitherChangeNames', value: 'Yes' },
    section: 'B',
    description: 'Who changed name?'
  },
  {
    googleFormField: 'formerName',
    formstackTag: '{Former_Name}',
    courtForms: ['UD-2'],
    fieldType: 'text',
    required: false,
    conditional: { dependsOn: 'didEitherChangeNames', value: 'Yes' },
    section: 'B',
    description: 'Former name'
  },

  // Section C – Residency & Grounds
  {
    googleFormField: 'livedInNY2Years',
    formstackTag: '{NY_Resident_2_Years}',
    courtForms: ['UD-2'],
    fieldType: 'radio',
    required: true,
    section: 'C',
    description: 'Have you lived in NY ≥ 2 years?'
  },
  {
    googleFormField: 'alternativeRoute',
    formstackTag: '{Alternative_Route}',
    courtForms: ['UD-2'],
    fieldType: 'select',
    required: false,
    conditional: { dependsOn: 'livedInNY2Years', value: 'No' },
    section: 'C',
    description: 'Which alternative route applies?'
  },
  {
    googleFormField: 'marriageBreakdownDate',
    formstackTag: '{Breakdown_Date}',
    courtForms: ['UD-2'],
    fieldType: 'date',
    required: true,
    section: 'C',
    description: 'Approx date of marriage breakdown'
  },
  {
    googleFormField: 'noFaultDivorce',
    formstackTag: '{No_Fault_Divorce}',
    courtForms: ['UD-2'],
    fieldType: 'radio',
    required: true,
    section: 'C',
    description: 'Filing for no-fault divorce?'
  },

  // Section D – Property & Support
  {
    googleFormField: 'signedSettlementAgreement',
    formstackTag: '{Settlement_Agreement}',
    courtForms: ['UD-10'],
    fieldType: 'radio',
    required: true,
    section: 'D',
    description: 'Do you have a signed settlement agreement?'
  },
  {
    googleFormField: 'settlementAgreementUpload',
    formstackTag: '{Settlement_Upload}',
    courtForms: ['UD-10'],
    fieldType: 'file',
    required: false,
    conditional: { dependsOn: 'signedSettlementAgreement', value: 'Yes' },
    section: 'D',
    description: 'Upload settlement agreement'
  },
  {
    googleFormField: 'sharedBankAccounts',
    formstackTag: '{Shared_Bank_Accounts}',
    courtForms: ['UD-9', 'UD-10'],
    fieldType: 'radio',
    required: true,
    section: 'D',
    description: 'Shared bank accounts?'
  },
  {
    googleFormField: 'bankAccountDetails',
    formstackTag: '{Bank_Account_Details}',
    courtForms: ['UD-9', 'UD-10'],
    fieldType: 'textarea',
    required: false,
    conditional: { dependsOn: 'sharedBankAccounts', value: 'Yes' },
    section: 'D',
    description: 'Who keeps which accounts'
  },
  {
    googleFormField: 'sharedPropertyVehicles',
    formstackTag: '{Shared_Property}',
    courtForms: ['UD-9', 'UD-10'],
    fieldType: 'radio',
    required: true,
    section: 'D',
    description: 'Shared property/vehicles?'
  },
  {
    googleFormField: 'propertyDetails',
    formstackTag: '{Property_Details}',
    courtForms: ['UD-9', 'UD-10'],
    fieldType: 'textarea',
    required: false,
    conditional: { dependsOn: 'sharedPropertyVehicles', value: 'Yes' },
    section: 'D',
    description: 'Describe & assign property'
  },
  {
    googleFormField: 'includeSpousalSupport',
    formstackTag: '{Spousal_Support}',
    courtForms: ['UD-10'],
    fieldType: 'radio',
    required: true,
    section: 'D',
    description: 'Include spousal support?'
  },
  {
    googleFormField: 'monthlySupportAmount',
    formstackTag: '{Support_Amount}',
    courtForms: ['UD-10'],
    fieldType: 'text',
    required: false,
    conditional: { dependsOn: 'includeSpousalSupport', value: 'Yes' },
    section: 'D',
    description: 'Monthly support amount'
  },
  {
    googleFormField: 'supportDuration',
    formstackTag: '{Support_Duration}',
    courtForms: ['UD-10'],
    fieldType: 'text',
    required: false,
    conditional: { dependsOn: 'includeSpousalSupport', value: 'Yes' },
    section: 'D',
    description: 'Support duration'
  },

  // Section E – Name Change
  {
    googleFormField: 'revertToFormerName',
    formstackTag: '{Revert_Name}',
    courtForms: ['UD-11'],
    fieldType: 'radio',
    required: true,
    section: 'E',
    description: 'Do you want to revert to a former name?'
  },
  {
    googleFormField: 'yourFormerName',
    formstackTag: '{Former_Name_Plaintiff}',
    courtForms: ['UD-11'],
    fieldType: 'text',
    required: false,
    conditional: { dependsOn: 'revertToFormerName', value: 'Yes' },
    section: 'E',
    description: 'Your former name'
  },
  {
    googleFormField: 'spouseRevertToFormerName',
    formstackTag: '{Spouse_Revert_Name}',
    courtForms: ['UD-11'],
    fieldType: 'radio',
    required: true,
    section: 'E',
    description: 'Does spouse want to revert?'
  },
  {
    googleFormField: 'spouseFormerName',
    formstackTag: '{Former_Name_Spouse}',
    courtForms: ['UD-11'],
    fieldType: 'text',
    required: false,
    conditional: { dependsOn: 'spouseRevertToFormerName', value: 'Yes' },
    section: 'E',
    description: 'Spouse\'s former name'
  },

  // Section F – Filing & Support
  {
    googleFormField: 'canPayFilingFees',
    formstackTag: '{Can_Pay_Fees}',
    courtForms: ['Fee_Waiver'],
    fieldType: 'radio',
    required: true,
    section: 'F',
    description: 'Can you pay ~$335 filing fees?'
  },
  {
    googleFormField: 'havePrinterScanner',
    formstackTag: '{Has_Printer}',
    courtForms: [],
    fieldType: 'radio',
    required: true,
    section: 'F',
    description: 'Do you have printer/scanner?'
  },
  {
    googleFormField: 'legalReviewCall',
    formstackTag: '{Legal_Review_Call}',
    courtForms: [],
    fieldType: 'radio',
    required: true,
    section: 'F',
    description: 'Optional legal review call?'
  }
]

// Court Forms List
export const courtForms = [
  'UD-1',      // Summons with Notice
  'UD-2',      // Verified Complaint
  'UD-6',      // Affidavit of Service
  'UD-9',      // Financial Disclosure
  'UD-10',     // Settlement Agreement
  'UD-11',     // Judgment of Divorce
  'DOH-2168',  // Vital Records
  'Fee_Waiver' // Fee Waiver Application
]

// Generate mapping for specific court form
export function getFormMapping(courtForm: string): FormMapping[] {
  return formFieldMappings.filter(mapping => 
    mapping.courtForms.includes(courtForm)
  )
}

// Generate all mappings for CSV export
export function generateMappingCSV(): string {
  const headers = ['Section', 'Google Form Field', 'Description', 'Formstack Tag', 'Court Forms', 'Field Type', 'Required', 'Conditional']
  const rows = formFieldMappings.map(mapping => [
    mapping.section,
    mapping.googleFormField,
    mapping.description,
    mapping.formstackTag,
    mapping.courtForms.join(', '),
    mapping.fieldType,
    mapping.required ? 'Yes' : 'No',
    mapping.conditional ? `${mapping.conditional.dependsOn} = ${mapping.conditional.value}` : ''
  ])
  
  return [headers, ...rows].map(row => row.join(',')).join('\n')
}

// Get fields by section
export function getFieldsBySection(section: string): FormMapping[] {
  return formFieldMappings.filter(mapping => mapping.section === section)
}

// Get all sections
export function getAllSections(): string[] {
  return Array.from(new Set(formFieldMappings.map(mapping => mapping.section))).sort()
}

// Map Google Form data to field names for Google Docs
export function mapFormDataToFormstack(formData: any) {
  const mappedData: { [key: string]: any } = {}

  // Map each field using our mapping system
  formFieldMappings.forEach(mapping => {
    const googleFieldValue = formData[mapping.googleFormField]
    
    if (googleFieldValue !== undefined && googleFieldValue !== null && googleFieldValue !== '') {
      // Convert Formstack tags to Google Docs format (remove curly braces)
      const googleDocsTag = mapping.formstackTag.replace(/[{}]/g, '')
      mappedData[googleDocsTag] = googleFieldValue
    }
  })

  // Add metadata
  mappedData['Submission_Date'] = new Date().toISOString()
  mappedData['Submission_ID'] = formData.submissionId || Date.now().toString()
  mappedData['User_Email'] = formData.yourEmail || formData.email

  console.log('Mapped form data for Google Docs:', mappedData)
  return mappedData
} 