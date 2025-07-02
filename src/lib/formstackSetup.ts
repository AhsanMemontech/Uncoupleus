// Formstack Integration Setup for NY Uncontested Divorce
// This file contains the setup instructions and merge tag mappings

export interface FormstackTemplate {
  id: string
  name: string
  description: string
  pdfTemplate: string
  mergeTags: MergeTag[]
  conditional?: {
    field: string
    value: any
  }
}

export interface MergeTag {
  tag: string
  googleFormField: string
  description: string
  required: boolean
}

// Court Forms Templates
export const courtFormTemplates: FormstackTemplate[] = [
  {
    id: 'ud-1',
    name: 'UD-1: Summons with Notice',
    description: 'Official summons document for uncontested divorce',
    pdfTemplate: 'UD-1_Template.pdf',
    mergeTags: [
      { tag: '{Plaintiff_Name}', googleFormField: 'plaintiffName', description: 'Plaintiff full name', required: true },
      { tag: '{Plaintiff_Address}', googleFormField: 'plaintiffAddress', description: 'Plaintiff address', required: true },
      { tag: '{Defendant_Name}', googleFormField: 'defendantName', description: 'Defendant full name', required: true },
      { tag: '{Defendant_Address}', googleFormField: 'defendantAddress', description: 'Defendant address', required: true },
      { tag: '{Current_Date}', googleFormField: 'submissionDate', description: 'Current date', required: true }
    ]
  },
  {
    id: 'ud-2',
    name: 'UD-2: Verified Complaint',
    description: 'Complaint document with marriage and grounds details',
    pdfTemplate: 'UD-2_Template.pdf',
    mergeTags: [
      { tag: '{Plaintiff_Name}', googleFormField: 'plaintiffName', description: 'Plaintiff full name', required: true },
      { tag: '{Plaintiff_Address}', googleFormField: 'plaintiffAddress', description: 'Plaintiff address', required: true },
      { tag: '{Defendant_Name}', googleFormField: 'defendantName', description: 'Defendant full name', required: true },
      { tag: '{Defendant_Address}', googleFormField: 'defendantAddress', description: 'Defendant address', required: true },
      { tag: '{Marriage_Date}', googleFormField: 'marriageDate', description: 'Date of marriage', required: true },
      { tag: '{Marriage_City}', googleFormField: 'marriageCity', description: 'City of marriage', required: true },
      { tag: '{Marriage_State}', googleFormField: 'marriageState', description: 'State of marriage', required: true },
      { tag: '{Ceremony_Type}', googleFormField: 'ceremonyType', description: 'Type of ceremony', required: true },
      { tag: '{Name_Change}', googleFormField: 'nameChange', description: 'Whether names were changed', required: true },
      { tag: '{Who_Changed_Name}', googleFormField: 'whoChangedName', description: 'Who changed their name', required: false },
      { tag: '{Former_Name}', googleFormField: 'formerName', description: 'Former name', required: false },
      { tag: '{NY_Resident_2_Years}', googleFormField: 'nyResident2Years', description: 'NY residency for 2+ years', required: true },
      { tag: '{Alternative_Route}', googleFormField: 'alternativeRoute', description: 'Alternative residency route', required: false },
      { tag: '{Breakdown_Date}', googleFormField: 'breakdownDate', description: 'Date of marriage breakdown', required: true },
      { tag: '{No_Fault_Divorce}', googleFormField: 'noFaultDivorce', description: 'Filing for no-fault divorce', required: true }
    ]
  },
  {
    id: 'ud-6',
    name: 'UD-6: Affidavit of Service',
    description: 'Service affidavit for serving divorce papers',
    pdfTemplate: 'UD-6_Template.pdf',
    mergeTags: [
      { tag: '{Plaintiff_Name}', googleFormField: 'plaintiffName', description: 'Plaintiff full name', required: true },
      { tag: '{Plaintiff_Address}', googleFormField: 'plaintiffAddress', description: 'Plaintiff address', required: true },
      { tag: '{Plaintiff_Email}', googleFormField: 'plaintiffEmail', description: 'Plaintiff email', required: true },
      { tag: '{Plaintiff_Phone}', googleFormField: 'plaintiffPhone', description: 'Plaintiff phone', required: true },
      { tag: '{Defendant_Name}', googleFormField: 'defendantName', description: 'Defendant full name', required: true },
      { tag: '{Defendant_Address}', googleFormField: 'defendantAddress', description: 'Defendant address', required: true },
      { tag: '{Service_Date}', googleFormField: 'serviceDate', description: 'Date of service', required: true },
      { tag: '{Service_Method}', googleFormField: 'serviceMethod', description: 'Method of service', required: true }
    ]
  },
  {
    id: 'ud-9',
    name: 'UD-9: Financial Disclosure',
    description: 'Financial disclosure statement',
    pdfTemplate: 'UD-9_Template.pdf',
    mergeTags: [
      { tag: '{Plaintiff_Name}', googleFormField: 'plaintiffName', description: 'Plaintiff full name', required: true },
      { tag: '{Plaintiff_Address}', googleFormField: 'plaintiffAddress', description: 'Plaintiff address', required: true },
      { tag: '{Shared_Bank_Accounts}', googleFormField: 'sharedBankAccounts', description: 'Whether shared bank accounts exist', required: true },
      { tag: '{Bank_Account_Details}', googleFormField: 'bankAccountDetails', description: 'Bank account details and distribution', required: false },
      { tag: '{Shared_Property}', googleFormField: 'sharedProperty', description: 'Whether shared property exists', required: true },
      { tag: '{Property_Details}', googleFormField: 'propertyDetails', description: 'Property details and distribution', required: false }
    ]
  },
  {
    id: 'ud-10',
    name: 'UD-10: Settlement Agreement',
    description: 'Settlement agreement between parties',
    pdfTemplate: 'UD-10_Template.pdf',
    mergeTags: [
      { tag: '{Plaintiff_Name}', googleFormField: 'plaintiffName', description: 'Plaintiff full name', required: true },
      { tag: '{Defendant_Name}', googleFormField: 'defendantName', description: 'Defendant full name', required: true },
      { tag: '{Settlement_Agreement}', googleFormField: 'settlementAgreement', description: 'Whether settlement agreement exists', required: true },
      { tag: '{Shared_Bank_Accounts}', googleFormField: 'sharedBankAccounts', description: 'Whether shared bank accounts exist', required: true },
      { tag: '{Bank_Account_Details}', googleFormField: 'bankAccountDetails', description: 'Bank account details and distribution', required: false },
      { tag: '{Shared_Property}', googleFormField: 'sharedProperty', description: 'Whether shared property exists', required: true },
      { tag: '{Property_Details}', googleFormField: 'propertyDetails', description: 'Property details and distribution', required: false },
      { tag: '{Spousal_Support}', googleFormField: 'spousalSupport', description: 'Whether spousal support is included', required: true },
      { tag: '{Support_Amount}', googleFormField: 'supportAmount', description: 'Monthly support amount', required: false },
      { tag: '{Support_Duration}', googleFormField: 'supportDuration', description: 'Support duration', required: false }
    ]
  },
  {
    id: 'ud-11',
    name: 'UD-11: Judgment of Divorce',
    description: 'Final judgment dissolving the marriage',
    pdfTemplate: 'UD-11_Template.pdf',
    mergeTags: [
      { tag: '{Plaintiff_Name}', googleFormField: 'plaintiffName', description: 'Plaintiff full name', required: true },
      { tag: '{Defendant_Name}', googleFormField: 'defendantName', description: 'Defendant full name', required: true },
      { tag: '{Marriage_Date}', googleFormField: 'marriageDate', description: 'Date of marriage', required: true },
      { tag: '{Marriage_City}', googleFormField: 'marriageCity', description: 'City of marriage', required: true },
      { tag: '{Marriage_State}', googleFormField: 'marriageState', description: 'State of marriage', required: true },
      { tag: '{No_Fault_Divorce}', googleFormField: 'noFaultDivorce', description: 'Filing for no-fault divorce', required: true },
      { tag: '{Revert_Name}', googleFormField: 'revertName', description: 'Whether plaintiff wants to revert name', required: true },
      { tag: '{Former_Name_Plaintiff}', googleFormField: 'formerNamePlaintiff', description: 'Plaintiff former name', required: false },
      { tag: '{Spouse_Revert_Name}', googleFormField: 'spouseRevertName', description: 'Whether spouse wants to revert name', required: true },
      { tag: '{Former_Name_Spouse}', googleFormField: 'formerNameSpouse', description: 'Spouse former name', required: false }
    ]
  },
  {
    id: 'fee-waiver',
    name: 'Fee Waiver Application',
    description: 'Application for waiver of filing fees',
    pdfTemplate: 'Fee_Waiver_Template.pdf',
    mergeTags: [
      { tag: '{Plaintiff_Name}', googleFormField: 'plaintiffName', description: 'Plaintiff full name', required: true },
      { tag: '{Plaintiff_Address}', googleFormField: 'plaintiffAddress', description: 'Plaintiff address', required: true },
      { tag: '{Can_Pay_Fees}', googleFormField: 'canPayFees', description: 'Whether can pay filing fees', required: true }
    ],
    conditional: {
      field: 'canPayFees',
      value: false
    }
  }
]

// Zapier Workflow Configuration
export const zapierWorkflow = {
  name: 'NY Divorce Form Processing',
  description: 'Process Google Form submissions and generate PDF documents',
  steps: [
    {
      step: 1,
      name: 'Google Forms Trigger',
      description: 'Trigger when new form is submitted',
      action: 'Google Forms - New Response',
      config: {
        formId: 'YOUR_GOOGLE_FORM_ID',
        includeResponseData: true
      }
    },
    {
      step: 2,
      name: 'Formstack Document Generation',
      description: 'Generate PDF documents with merge tags',
      action: 'Formstack - Generate Document',
      config: {
        templateIds: courtFormTemplates.map(t => t.id),
        mergeData: 'Map Google Form fields to Formstack tags'
      }
    },
    {
      step: 3,
      name: 'Google Drive Storage',
      description: 'Save generated PDFs to Google Drive',
      action: 'Google Drive - Upload File',
      config: {
        folderId: 'YOUR_GOOGLE_DRIVE_FOLDER_ID',
        fileName: 'NY_Divorce_Forms_{timestamp}',
        fileContent: 'Generated PDFs from Formstack'
      }
    },
    {
      step: 4,
      name: 'Email Delivery',
      description: 'Send PDFs to user via email',
      action: 'Gmail - Send Email',
      config: {
        to: '{plaintiffEmail}',
        subject: 'Your NY Divorce Forms Are Ready',
        body: 'Your divorce forms have been generated and are attached.',
        attachments: 'Generated PDFs from Google Drive'
      }
    }
  ]
}

// Setup Instructions
export const setupInstructions = {
  googleForm: {
    title: 'Create Google Form',
    steps: [
      'Go to forms.google.com',
      'Create new form: "NY Uncontested Divorce - Information Collection"',
      'Add all sections A-F with questions as specified',
      'Set up conditional logic for dependent questions',
      'Enable file uploads for settlement agreements',
      'Get form ID for Zapier integration'
    ]
  },
  formstack: {
    title: 'Set up Formstack',
    steps: [
      'Upload all court form PDF templates',
      'Insert merge tags in PDF templates',
      'Create conditional templates (e.g., fee waiver only if needed)',
      'Test merge functionality with sample data',
      'Get template IDs for Zapier integration'
    ]
  },
  zapier: {
    title: 'Configure Zapier Workflow',
    steps: [
      'Create new Zap with Google Forms trigger',
      'Add Formstack action for document generation',
      'Add Google Drive action for file storage',
      'Add Gmail action for email delivery',
      'Test the complete workflow'
    ]
  }
}

// Export functions for integration
export function getRequiredTemplates(formData: any): FormstackTemplate[] {
  return courtFormTemplates.filter(template => {
    if (template.conditional) {
      return formData[template.conditional.field] === template.conditional.value
    }
    return true
  })
}

export function generateMergeData(formData: any): Record<string, any> {
  const mergeData: Record<string, any> = {}
  
  courtFormTemplates.forEach(template => {
    template.mergeTags.forEach(tag => {
      mergeData[tag.tag] = formData[tag.googleFormField] || ''
    })
  })
  
  return mergeData
} 