// Test script for Google Docs integration
// Run this to test the document generation workflow

const testFormData = {
  // Section A - Basic Info
  yourFullLegalName: 'John Doe',
  yourAddress: '123 Main Street, New York, NY 10001',
  yourEmail: 'john.doe@example.com',
  yourPhoneNumber: '(555) 123-4567',
  spouseFullLegalName: 'Jane Doe',
  spouseLastKnownAddress: '456 Oak Avenue, Brooklyn, NY 11201',
  
  // Section B - Marriage Details
  dateOfMarriage: '2020-06-15',
  cityOfMarriage: 'New York',
  stateOfMarriage: 'New York',
  typeOfCeremony: 'Civil',
  didEitherChangeNames: 'Yes',
  whoChangedName: 'Both',
  formerName: 'John Smith',
  
  // Section C - Residency & Grounds
  livedInNY2Years: 'Yes',
  alternativeRoute: '',
  marriageBreakdownDate: '2023-01-15',
  noFaultDivorce: 'Yes',
  
  // Section D - Property & Support
  signedSettlementAgreement: 'Yes',
  settlementAgreementUpload: '',
  sharedBankAccounts: 'Yes',
  bankAccountDetails: 'Joint checking account #1234 - John keeps it',
  sharedPropertyVehicles: 'Yes',
  propertyDetails: '2019 Honda Civic - John keeps it',
  includeSpousalSupport: 'No',
  monthlySupportAmount: '',
  supportDuration: '',
  
  // Section E - Name Change
  revertToFormerName: 'Yes',
  yourFormerName: 'John Smith',
  spouseRevertToFormerName: 'No',
  spouseFormerName: '',
  
  // Section F - Filing & Support
  canPayFilingFees: 'Yes',
  havePrinterScanner: 'Yes',
  legalReviewCall: 'No',
  
  // Metadata
  submissionId: 'test_' + Date.now()
};

// Simple mapping function for testing
function mapFormDataToFormstack(formData) {
  const mappedData = {};
  
  // Map basic fields
  const fieldMappings = {
    yourFullLegalName: 'Plaintiff_Name',
    yourAddress: 'Plaintiff_Address',
    yourEmail: 'Plaintiff_Email',
    yourPhoneNumber: 'Plaintiff_Phone',
    spouseFullLegalName: 'Defendant_Name',
    spouseLastKnownAddress: 'Defendant_Address',
    dateOfMarriage: 'Marriage_Date',
    cityOfMarriage: 'Marriage_City',
    stateOfMarriage: 'Marriage_State',
    typeOfCeremony: 'Ceremony_Type',
    didEitherChangeNames: 'Name_Change',
    whoChangedName: 'Who_Changed_Name',
    formerName: 'Former_Name',
    livedInNY2Years: 'NY_Resident_2_Years',
    alternativeRoute: 'Alternative_Route',
    marriageBreakdownDate: 'Breakdown_Date',
    noFaultDivorce: 'No_Fault_Divorce',
    signedSettlementAgreement: 'Settlement_Agreement',
    sharedBankAccounts: 'Shared_Bank_Accounts',
    bankAccountDetails: 'Bank_Account_Details',
    sharedPropertyVehicles: 'Shared_Property',
    propertyDetails: 'Property_Details',
    includeSpousalSupport: 'Spousal_Support',
    monthlySupportAmount: 'Support_Amount',
    supportDuration: 'Support_Duration',
    revertToFormerName: 'Revert_Name',
    yourFormerName: 'Former_Name_Plaintiff',
    spouseRevertToFormerName: 'Spouse_Revert_Name',
    spouseFormerName: 'Former_Name_Spouse',
    canPayFilingFees: 'Can_Pay_Fees',
    havePrinterScanner: 'Has_Printer',
    legalReviewCall: 'Legal_Review_Call'
  };
  
  // Map each field
  for (const [googleField, formstackTag] of Object.entries(fieldMappings)) {
    const value = formData[googleField];
    if (value !== undefined && value !== null && value !== '') {
      mappedData[formstackTag] = value;
    }
  }
  
  // Add metadata
  mappedData['Submission_Date'] = new Date().toLocaleDateString();
  mappedData['Submission_ID'] = formData.submissionId || Date.now().toString();
  mappedData['User_Email'] = formData.yourEmail || '';
  
  return mappedData;
}

async function testGoogleDocsIntegration() {
  console.log('🧪 Testing Google Docs Integration...\n');
  
  try {
    // Test the webhook endpoint
    const webhookUrl = 'http://localhost:3000/api/webhook/zapier';
    
    console.log('📡 Calling webhook endpoint...');
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testFormData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ Webhook response:', JSON.stringify(result, null, 2));
    
    if (result.success) {
      console.log('\n🎉 Test successful!');
      console.log(`📄 Generated ${result.documents?.length || 0} documents`);
      console.log(`📧 Email sent to: ${result.email?.recipient || 'N/A'}`);
    } else {
      console.log('\n❌ Test failed:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Test error:', error.message);
    console.log('\n💡 Make sure:');
    console.log('1. Your Next.js app is running (npm run dev)');
    console.log('2. Google Apps Script is deployed and URL is set');
    console.log('3. Environment variables are configured');
  }
}

// Test the mapping function
function testMapping() {
  console.log('🗺️ Testing field mapping...\n');
  
  const mappedData = mapFormDataToFormstack(testFormData);
  
  console.log('Mapped data for Google Docs:');
  Object.entries(mappedData).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
  });
}

// Run tests
if (require.main === module) {
  console.log('🚀 Google Docs Integration Test\n');
  
  // Test mapping first
  testMapping();
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test webhook integration
  testGoogleDocsIntegration();
}

module.exports = { testFormData, testGoogleDocsIntegration, testMapping }; 