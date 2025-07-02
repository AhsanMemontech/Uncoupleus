// Formstack API Service for Document Generation

interface FormstackConfig {
  apiKey: string
  baseUrl: string
  templates: {
    ud1: string // Template ID for UD-1
    ud2: string // Template ID for UD-2
    ud6: string // Template ID for UD-6
    ud9: string // Template ID for UD-9
    ud10: string // Template ID for UD-10
    ud11: string // Template ID for UD-11
    feeWaiver: string // Template ID for Fee Waiver
  }
}

interface DocumentRequest {
  templateId: string
  mergeData: { [key: string]: any }
  fileName: string
}

interface DocumentResponse {
  documentId: string
  downloadUrl: string
  fileName: string
}

class FormstackService {
  private config: FormstackConfig

  constructor() {
    this.config = {
      apiKey: process.env.FORMSTACK_API_KEY || '',
      baseUrl: 'https://www.formstack.com/api/v2',
      templates: {
        ud1: process.env.FORMSTACK_TEMPLATE_UD1 || '',
        ud2: process.env.FORMSTACK_TEMPLATE_UD2 || '',
        ud6: process.env.FORMSTACK_TEMPLATE_UD6 || '',
        ud9: process.env.FORMSTACK_TEMPLATE_UD9 || '',
        ud10: process.env.FORMSTACK_TEMPLATE_UD10 || '',
        ud11: process.env.FORMSTACK_TEMPLATE_UD11 || '',
        feeWaiver: process.env.FORMSTACK_TEMPLATE_FEE_WAIVER || ''
      }
    }
  }

  // Generate a single document
  async generateDocument(request: DocumentRequest): Promise<DocumentResponse> {
    try {
      const response = await fetch(`${this.config.baseUrl}/documents`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          template_id: request.templateId,
          merge_data: request.mergeData,
          filename: request.fileName
        })
      })

      if (!response.ok) {
        throw new Error(`Formstack API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      
      return {
        documentId: data.document_id,
        downloadUrl: data.download_url,
        fileName: request.fileName
      }

    } catch (error) {
      console.error('Formstack document generation error:', error)
      throw error
    }
  }

  // Generate all divorce documents
  async generateAllDocuments(mergeData: { [key: string]: any }, submissionId: string) {
    const documents = []
    const errors = []

    // Define all documents to generate
    const documentRequests = [
      {
        templateId: this.config.templates.ud1,
        fileName: `UD-1_Summons_with_Notice_${submissionId}.pdf`,
        name: 'UD-1: Summons with Notice'
      },
      {
        templateId: this.config.templates.ud2,
        fileName: `UD-2_Verified_Complaint_${submissionId}.pdf`,
        name: 'UD-2: Verified Complaint'
      },
      {
        templateId: this.config.templates.ud6,
        fileName: `UD-6_Affidavit_of_Service_${submissionId}.pdf`,
        name: 'UD-6: Affidavit of Service'
      },
      {
        templateId: this.config.templates.ud9,
        fileName: `UD-9_Financial_Disclosure_${submissionId}.pdf`,
        name: 'UD-9: Financial Disclosure'
      },
      {
        templateId: this.config.templates.ud10,
        fileName: `UD-10_Settlement_Agreement_${submissionId}.pdf`,
        name: 'UD-10: Settlement Agreement'
      },
      {
        templateId: this.config.templates.ud11,
        fileName: `UD-11_Judgment_of_Divorce_${submissionId}.pdf`,
        name: 'UD-11: Judgment of Divorce'
      }
    ]

    // Generate Fee Waiver if applicable
    if (mergeData['{Can_Pay_Fees}'] === 'No') {
      documentRequests.push({
        templateId: this.config.templates.feeWaiver,
        fileName: `Fee_Waiver_Application_${submissionId}.pdf`,
        name: 'Fee Waiver Application'
      })
    }

    // Generate each document
    for (const request of documentRequests) {
      try {
        console.log(`Generating ${request.name}...`)
        
        const document = await this.generateDocument({
          templateId: request.templateId,
          mergeData,
          fileName: request.fileName
        })

        documents.push({
          ...document,
          name: request.name
        })

        console.log(`✅ Generated ${request.name}`)

      } catch (error) {
        console.error(`❌ Failed to generate ${request.name}:`, error)
        errors.push({
          document: request.name,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    return {
      documents,
      errors,
      submissionId,
      totalGenerated: documents.length,
      totalErrors: errors.length
    }
  }

  // Test the Formstack connection
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseUrl}/user`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`
        }
      })

      return response.ok
    } catch (error) {
      console.error('Formstack connection test failed:', error)
      return false
    }
  }

  // Get template information
  async getTemplateInfo(templateId: string) {
    try {
      const response = await fetch(`${this.config.baseUrl}/templates/${templateId}`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to get template info: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Failed to get template info:', error)
      throw error
    }
  }
}

// Export singleton instance
export const formstackService = new FormstackService()

// Export types for use in other files
export type { DocumentRequest, DocumentResponse, FormstackConfig } 