import { NextRequest, NextResponse } from 'next/server'

// Test endpoint to simulate Zapier webhook calls
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Simulate Google Form submission data with correct field names
    const testFormData = {
      // Section A – Basic Info
      yourFullLegalName: body.yourFullLegalName || 'John Doe',
      yourAddress: body.yourAddress || '123 Main St, New York, NY 10001',
      yourEmail: body.yourEmail || 'john.doe@example.com',
      yourPhoneNumber: body.yourPhoneNumber || '(555) 123-4567',
      spouseFullLegalName: body.spouseFullLegalName || 'Jane Doe',
      spouseLastKnownAddress: body.spouseLastKnownAddress || '456 Oak Ave, New York, NY 10002',
      
      // Section B – Marriage Details
      dateOfMarriage: body.dateOfMarriage || '2020-06-15',
      cityOfMarriage: body.cityOfMarriage || 'New York',
      stateOfMarriage: body.stateOfMarriage || 'NY',
      typeOfCeremony: body.typeOfCeremony || 'Civil',
      didEitherChangeNames: body.didEitherChangeNames || 'No',
      whoChangedName: body.whoChangedName || '',
      formerName: body.formerName || '',
      
      // Section C – Residency & Grounds
      livedInNY2Years: body.livedInNY2Years || 'Yes',
      alternativeRoute: body.alternativeRoute || '',
      marriageBreakdownDate: body.marriageBreakdownDate || '2023-01-15',
      noFaultDivorce: body.noFaultDivorce || 'Yes',
      
      // Section D – Property & Support
      signedSettlementAgreement: body.signedSettlementAgreement || 'No',
      settlementAgreementUpload: body.settlementAgreementUpload || '',
      sharedBankAccounts: body.sharedBankAccounts || 'No',
      bankAccountDetails: body.bankAccountDetails || '',
      sharedPropertyVehicles: body.sharedPropertyVehicles || 'No',
      propertyDetails: body.propertyDetails || '',
      includeSpousalSupport: body.includeSpousalSupport || 'No',
      monthlySupportAmount: body.monthlySupportAmount || '',
      supportDuration: body.supportDuration || '',
      
      // Section E – Name Change
      revertToFormerName: body.revertToFormerName || 'No',
      yourFormerName: body.yourFormerName || '',
      spouseRevertToFormerName: body.spouseRevertToFormerName || 'No',
      spouseFormerName: body.spouseFormerName || '',
      
      // Section F – Filing & Support
      canPayFilingFees: body.canPayFilingFees || 'Yes',
      havePrinterScanner: body.havePrinterScanner || 'Yes',
      legalReviewCall: body.legalReviewCall || 'No',
      
      // Metadata
      submissionId: body.submissionId || `test_${Date.now()}`,
      email: body.yourEmail || 'john.doe@example.com'
    }

    // Call the actual Zapier webhook endpoint
    const webhookUrl = `${request.nextUrl.origin}/api/webhook/zapier`
    
    console.log('Testing Zapier webhook with data:', testFormData)
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testFormData)
    })

    const result = await response.json()

    return NextResponse.json({
      success: true,
      message: 'Test webhook call completed',
      testData: testFormData,
      webhookResponse: result,
      webhookStatus: response.status
    })

  } catch (error) {
    console.error('Test webhook error:', error)
    return NextResponse.json(
      { error: 'Test failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// GET endpoint to show test instructions
export async function GET() {
  return NextResponse.json({
    message: 'Zapier Webhook Test Endpoint',
    instructions: {
      POST: 'Send test form data to simulate Zapier webhook call',
      example: {
        yourFullLegalName: 'John Doe',
        yourEmail: 'john.doe@example.com',
        spouseFullLegalName: 'Jane Doe',
        dateOfMarriage: '2020-06-15',
        canPayFilingFees: 'Yes'
      }
    },
    sections: {
      'Section A': 'Basic Info (names, addresses, contact)',
      'Section B': 'Marriage Details (date, location, name changes)',
      'Section C': 'Residency & Grounds (NY residency, breakdown date)',
      'Section D': 'Property & Support (settlement, assets, support)',
      'Section E': 'Name Change (reverting to former names)',
      'Section F': 'Filing & Support (fees, printer, legal review)'
    },
    endpoints: {
      test: '/api/test/zapier - Test the webhook',
      webhook: '/api/webhook/zapier - Real webhook endpoint',
      mapping: '/form-generation - View field mapping'
    }
  })
} 