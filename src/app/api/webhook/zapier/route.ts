import { NextRequest, NextResponse } from 'next/server'
import { mapFormDataToFormstack } from '@/lib/formMapping'

// Google Apps Script webhook URL (you'll need to replace this with your actual deployed script URL)
const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'

// Webhook endpoint for Zapier to send Google Form submission data
export async function POST(request: NextRequest) {
  try {
    console.log('🔔 Zapier webhook received')
    
    const formData = await request.json()
    console.log('📝 Form data received:', formData)
    
    // Map the form data to the correct field names
    const mappedData = mapFormDataToFormstack(formData)
    console.log('🗺️ Mapped data:', mappedData)
    
    // Add submission ID and timestamp
    const submissionData = {
      ...mappedData,
      submissionId: `sub_${Date.now()}`,
      submissionTimestamp: new Date().toISOString()
    }
    
    // Call Google Apps Script for document generation
    console.log('📄 Calling Google Apps Script for document generation...')
    const googleResponse = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData)
    })
    
    if (!googleResponse.ok) {
      throw new Error(`Google Apps Script error: ${googleResponse.status} ${googleResponse.statusText}`)
    }
    
    const googleResult = await googleResponse.json()
    console.log('✅ Google Apps Script response:', googleResult)
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Documents generated and sent successfully',
      submissionId: submissionData.submissionId,
      documents: googleResult.documents || [],
      email: googleResult.email || {}
    })

  } catch (error) {
    console.error('❌ Webhook error:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

// Test endpoint for development
export async function GET() {
  return NextResponse.json({
    message: 'Zapier webhook endpoint is running',
    status: 'ready',
    timestamp: new Date().toISOString(),
    nextSteps: [
      '1. Deploy Google Apps Script',
      '2. Update GOOGLE_APPS_SCRIPT_URL environment variable',
      '3. Set up Zapier to call this webhook',
      '4. Test with Google Form submission'
    ]
  })
} 