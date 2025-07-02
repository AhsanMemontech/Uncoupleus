// Google Apps Script for Document Generation
// This script will receive form data and generate PDF documents

// Configuration
const CONFIG = {
  // Google Docs Template IDs (you'll need to replace these with your actual template IDs)
  templates: {
    ud1: '1kmwc1oSMjswMuwqEWA41BGBbbm1LeVti6Uue0pOsysk', // UD-1: Summons with Notice
    ud2: '1d3KjR1UX49TRnJ08R-F7Ys7x9odcGI3FnGKytmdqflc', // UD-2: Verified Complaint
    ud6: '1MqlFpjbgMmCPFYd6lt0jcb_ldrjXQUZB85a1BIKfCZ4', // UD-6: Affidavit of Service
    ud9: '1-x17Snk64xi55DiFD3Afcdh00i8UCTNCERa6mwnoYs4', // UD-9: Financial Disclosure
    ud10: '1bXw88_gX3xIohZAaE9arOA7BAmuNYXqPnmcrNw8dc20', // UD-10: Settlement Agreement
    ud11: '1Gu28jtI--6EpsJUx-C0r3Rtz6_L2_dyL-ktUe0GqjlA', // UD-11: Judgment of Divorce
    feeWaiver: '1Nk6eua6RnLJe0DvGvUpee48NJP9kNntrQhlwmgVjYbA', // Fee Waiver Application
    vitalrecords: '1cXX0ikvK2wdUuJ2MCfTCXs5pULXB2PiSZeG_G7xZZwA' // Vital Records
  },
  
  // Output folder ID in Google Drive
  outputFolderId: '17i6TdpZdUZXqQMYlvZdWLzMuVerEl4RB',
  
  // Email configuration
  fromEmail: 'ahsan@thebeacons.org',
  subject: 'Your Divorce Documents Are Ready'
};

function logToSheet(data) {
  // Replace with your actual Sheet ID
  var sheet = SpreadsheetApp.openById('1PD8jg9IieAEisRPEdk3TPoMnCXZWRk4-m8KfGGkMFZI').getActiveSheet();
  sheet.appendRow([new Date(), JSON.stringify(data)]);
}

// Main function to handle webhook requests
function doPost(e) {
  try {

    //logToSheet(e); // Log the entire event object
    // Optionally log specific parts:
    //logToSheet(e.postData ? e.postData.contents : 'no postData.contents');
    //logToSheet(e.parameter ? e.parameter : 'no parameter');
    //logToSheet(e.parameters ? e.parameters : 'no parameters');

    // Parse the incoming data
    const formData = JSON.parse(e.postData.contents);
    console.log('Received form data:', formData);
    Logger.log('Received form data:', formData);

    logToSheet(formData);
    logToSheet(JSON.stringify(formData));
    logToSheet(formData.Plaintiff_Name);

    // Generate documents
    const result = generateDocuments(formData);
    
    // Send email with documents
    const emailResult = sendEmailWithDocuments(formData.yourEmail, result.documents);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Documents generated successfully',
        documents: result.documents,
        email: emailResult
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing request:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Generate all documents
function generateDocuments(formData) {
  const documents = [];
  const errors = [];
  
  // Map form data to merge tags
  const mergeData = mapFormDataToMergeTags(formData);
  
  // Generate each document
  const documentTypes = [
    { key: 'ud1', name: 'UD-1_Summons_with_Notice', template: CONFIG.templates.ud1 },
    { key: 'ud2', name: 'UD-2_Verified_Complaint', template: CONFIG.templates.ud2 },
    { key: 'ud6', name: 'UD-6_Affidavit_of_Service', template: CONFIG.templates.ud6 },
    { key: 'ud9', name: 'UD-9_Financial_Disclosure', template: CONFIG.templates.ud9 },
    { key: 'ud10', name: 'UD-10_Settlement_Agreement', template: CONFIG.templates.ud10 },
    { key: 'ud11', name: 'UD-11_Judgment_of_Divorce', template: CONFIG.templates.ud11 }
  ];
  
  // Add Fee Waiver if applicable
  if (formData.canPayFilingFees === 'No') {
    documentTypes.push({
      key: 'feeWaiver',
      name: 'Fee_Waiver_Application',
      template: CONFIG.templates.feeWaiver
    });
  }
  
  // Generate each document
  for (const docType of documentTypes) {
    try {
      console.log(`Generating ${docType.name}...`);
      
      const document = generateSingleDocument(
        docType.template,
        docType.name,
        mergeData,
        formData.submissionId || Date.now().toString()
      );
      
      documents.push(document);
      console.log(`✅ Generated ${docType.name}`);
      
    } catch (error) {
      console.error(`❌ Failed to generate ${docType.name}:`, error);
      errors.push({
        document: docType.name,
        error: error.toString()
      });
    }
  }
  
  return {
    documents,
    errors,
    totalGenerated: documents.length,
    totalErrors: errors.length
  };
}

// Generate a single document
function generateSingleDocument(templateId, documentName, mergeData, submissionId) {
  try {
    // Copy template to create new document
    const template = DriveApp.getFileById(templateId);
    const newDoc = template.makeCopy(documentName + '_' + submissionId);
    
    // Get the document for editing
    const doc = DocumentApp.openById(newDoc.getId());
    const body = doc.getBody();
    
    // Replace merge tags with actual data
    for (const [tag, value] of Object.entries(mergeData)) {
      const searchText = `<<${tag}>>`;
      const replaceText = value || '';
      body.replaceText(searchText, replaceText);
    }
    
    // Save the document
    doc.saveAndClose();
    
    // Convert to PDF
    const pdf = newDoc.getAs('application/pdf');
    const pdfFile = DriveApp.createFile(pdf);
    pdfFile.setName(documentName + '_' + submissionId + '.pdf');
    
    // Move PDF to output folder
    const outputFolder = DriveApp.getFolderById(CONFIG.outputFolderId);
    outputFolder.addFile(pdfFile);
    DriveApp.getRootFolder().removeFile(pdfFile);
    
    // Delete the temporary Google Doc
    DriveApp.removeFile(newDoc);
    
    return {
      name: documentName,
      pdfId: pdfFile.getId(),
      pdfUrl: pdfFile.getUrl(),
      downloadUrl: `https://drive.google.com/uc?export=download&id=${pdfFile.getId()}`
    };
    
  } catch (error) {
    console.error(`Error generating ${documentName}:`, error);
    throw error;
  }
}

// Map form data to merge tags
function mapFormDataToMergeTags(formData) {
  const mergeData = {};
  
  // Section A - Basic Info
  mergeData['Plaintiff_Name'] = formData.yourFullLegalName || formData.Plaintiff_Name || '';
  mergeData['Plaintiff_Address'] = formData.yourAddress || formData.Plaintiff_Address || '';
  mergeData['Plaintiff_Email'] = formData.yourEmail || formData.Plaintiff_Email || '';
  mergeData['Plaintiff_Phone'] = formData.yourPhoneNumber || formData.Plaintiff_Phone || '';
  mergeData['Defendant_Name'] = formData.spouseFullLegalName || formData.Defendant_Name || '';
  mergeData['Defendant_Address'] = formData.spouseLastKnownAddress || formData.Defendant_Address || '';
  
  // Section B - Marriage Details
  mergeData['Marriage_Date'] = formData.dateOfMarriage || formData.Marriage_Date || '';
  mergeData['Marriage_City'] = formData.cityOfMarriage || formData.Marriage_City || '';
  mergeData['Marriage_State'] = formData.stateOfMarriage || formData.Marriage_State || '';
  mergeData['Ceremony_Type'] = formData.typeOfCeremony || formData.Ceremony_Type || '';
  mergeData['Name_Change'] = formData.didEitherChangeNames || formData.Name_Change || '';
  mergeData['Who_Changed_Name'] = formData.whoChangedName || formData.Who_Changed_Name || '';
  mergeData['Former_Name'] = formData.formerName || formData.Former_Name || '';
  
  // Section C - Residency & Grounds
  mergeData['NY_Resident_2_Years'] = formData.livedInNY2Years || formData.NY_Resident_2_Years || '';
  mergeData['Alternative_Route'] = formData.alternativeRoute || formData.Alternative_Route || '';
  mergeData['Breakdown_Date'] = formData.marriageBreakdownDate || formData.Breakdown_Date || '';
  mergeData['No_Fault_Divorce'] = formData.noFaultDivorce || formData.No_Fault_Divorce || '';
  
  // Section D - Property & Support
  mergeData['Settlement_Agreement'] = formData.signedSettlementAgreement || formData.Settlement_Agreement || '';
  mergeData['Shared_Bank_Accounts'] = formData.sharedBankAccounts || formData.Shared_Bank_Accounts || '';
  mergeData['Bank_Account_Details'] = formData.bankAccountDetails || formData.Bank_Account_Details || '';
  mergeData['Shared_Property'] = formData.sharedPropertyVehicles || formData.Shared_Property || '';
  mergeData['Property_Details'] = formData.propertyDetails || formData.Property_Details || '';
  mergeData['Spousal_Support'] = formData.includeSpousalSupport || formData.Spousal_Support || '';
  mergeData['Support_Amount'] = formData.monthlySupportAmount || formData.Support_Amount || '';
  mergeData['Support_Duration'] = formData.supportDuration || formData.Support_Duration || '';

  // Section E - Name Change
  mergeData['Revert_Name'] = formData.revertToFormerName || formData.Revert_Name || '';
  mergeData['Former_Name_Plaintiff'] = formData.yourFormerName || formData.Former_Name_Plaintiff || '';
  mergeData['Spouse_Revert_Name'] = formData.spouseRevertToFormerName || formData.Spouse_Revert_Name || '';
  mergeData['Former_Name_Spouse'] = formData.spouseFormerName || formData.Former_Name_Spouse || '';
  
  // Section F - Filing & Support
  mergeData['Can_Pay_Fees'] = formData.canPayFilingFees || formData.Can_Pay_Fees || '';
  mergeData['Has_Printer'] = formData.havePrinterScanner || formData.Has_Printer || '';
  mergeData['Legal_Review_Call'] = formData.legalReviewCall || formData.Legal_Review_Call || '';
  
  // Additional merge tags for court forms
  mergeData['County'] = formData.county || 'New York'; // Default to NYC
  mergeData['Service_Date'] = formData.serviceDate || new Date().toLocaleDateString();
  mergeData['Service_Method'] = formData.serviceMethod || 'Personal Service';
  mergeData['Service_Address'] = formData.serviceAddress || formData.spouseLastKnownAddress || '';
  mergeData['Financial_Hardship_Details'] = formData.financialHardshipDetails || 'Limited income and resources';
  mergeData['Monthly_Income'] = formData.monthlyIncome || '0';
  mergeData['Monthly_Expenses'] = formData.monthlyExpenses || '0';
  mergeData['Judge_Name'] = formData.judgeName || 'Hon. [Judge Name]';
  
  // Complex merge tags that combine multiple fields
  mergeData['Name_Change_Details'] = generateNameChangeDetails(formData);
  mergeData['Spousal_Support_Details'] = generateSpousalSupportDetails(formData);
  mergeData['Name_Change_Order'] = generateNameChangeOrder(formData);
  
  // Metadata
  mergeData['Submission_Date'] = new Date().toLocaleDateString();
  mergeData['Submission_ID'] = formData.submissionId || Date.now().toString();
  mergeData['User_Email'] = formData.yourEmail || '';
  
  return mergeData;
}

// Generate name change details for UD-2
function generateNameChangeDetails(formData) {
  if (formData.didEitherChangeNames === 'No') {
    return 'Neither party changed their name during the marriage.';
  }
  
  let details = '';
  if (formData.whoChangedName === 'Plaintiff') {
    details = `Plaintiff changed their name from ${formData.formerName || 'former name'} to ${formData.yourFullLegalName || 'current name'}.`;
  } else if (formData.whoChangedName === 'Defendant') {
    details = `Defendant changed their name during the marriage.`;
  } else if (formData.whoChangedName === 'Both') {
    details = `Both parties changed their names during the marriage. Plaintiff changed from ${formData.formerName || 'former name'} to ${formData.yourFullLegalName || 'current name'}.`;
  }
  
  return details || 'One or both parties changed their names during the marriage.';
}

// Generate spousal support details for UD-10
function generateSpousalSupportDetails(formData) {
  if (formData.includeSpousalSupport === 'No') {
    return 'The parties agree that no spousal support shall be paid by either party to the other.';
  }
  
  if (formData.includeSpousalSupport === 'Yes') {
    const amount = formData.monthlySupportAmount || 'agreed amount';
    const duration = formData.supportDuration || 'agreed duration';
    return `Plaintiff shall pay to Defendant the sum of $${amount} per month for spousal support for a period of ${duration}.`;
  }
  
  return 'The parties have agreed on spousal support terms as set forth in their settlement agreement.';
}

// Generate name change order for UD-11
function generateNameChangeOrder(formData) {
  let order = '';
  
  if (formData.revertToFormerName === 'Yes') {
    const formerName = formData.yourFormerName || 'former name';
    order += `Plaintiff is hereby restored to the name of ${formerName}. `;
  }
  
  if (formData.spouseRevertToFormerName === 'Yes') {
    const spouseFormerName = formData.spouseFormerName || 'former name';
    order += `Defendant is hereby restored to the name of ${spouseFormerName}.`;
  }
  
  return order || 'No name change order is requested.';
}

// Send email with documents
function sendEmailWithDocuments(userEmail, documents) {
  try {
    const subject = CONFIG.subject;
    const body = createEmailBody(documents);
    
    // Create email with attachments
    const email = GmailApp.createDraft(userEmail, subject, body);
    
    // Add PDF attachments
    for (const doc of documents) {
      const pdfFile = DriveApp.getFileById(doc.pdfId);
      email.addFileAttachment(pdfFile);
    }
    
    // Send the email
    email.send();
    
    return {
      sent: true,
      recipient: userEmail,
      attachments: documents.length,
      subject: subject
    };
    
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Create email body
function createEmailBody(documents) {
  let body = `
Dear User,

Your divorce documents have been generated successfully. Please find the attached PDF files:

`;

  for (const doc of documents) {
    body += `• ${doc.name}\n`;
  }

  body += `

Please review all documents carefully before filing with the court.

Important Notes:
- Print all documents on white paper
- Sign where required
- Make copies for your records
- File with your local court

If you have any questions, please contact us.

Best regards,
Your Divorce Document Service
`;

  return body;
}

// Test function (for development)
function testDocumentGeneration() {
  const testData = {
    yourFullLegalName: 'John Doe',
    yourEmail: 'john.doe@example.com',
    spouseFullLegalName: 'Jane Doe',
    dateOfMarriage: '2020-06-15',
    canPayFilingFees: 'Yes',
    submissionId: 'test_' + Date.now()
  };
  
  const result = generateDocuments(testData);
  console.log('Test result:', result);
  return result;
} 