# NY Uncontested Divorce App - Complete Setup Guide

## Overview
This guide will help you set up the complete Google Form + Formstack + Zapier workflow for the NY Uncontested Divorce app.

## 🎯 What We're Building
1. **Google Form** with all sections A-F (embedded in our app)
2. **Formstack** with PDF templates and merge tags
3. **Zapier** workflow to automate the entire process
4. **Google Drive** storage for generated documents
5. **Email delivery** to users

---

## 📋 Step 1: Create Google Form

### 1.1 Go to Google Forms
- Visit [forms.google.com](https://forms.google.com)
- Click "Blank" to create new form

### 1.2 Set Form Details
- **Title:** "NY Uncontested Divorce - Information Collection"
- **Description:** "Complete this form to generate your divorce documents"

### 1.3 Add Section A: Basic Information
1. Click "Add section" → Name it "Basic Information"
2. Add these questions:
   - **Your full legal name** (Short answer, Required)
   - **Your address** (Paragraph, Required)
   - **Your email** (Email, Required)
   - **Your phone number** (Phone number, Required)
   - **Spouse's full legal name** (Short answer, Required)
   - **Spouse's last known address** (Paragraph, Required)

### 1.4 Add Section B: Marriage Details
1. Click "Add section" → Name it "Marriage Details"
2. Add these questions:
   - **Date of marriage** (Date, Required)
   - **City of marriage** (Short answer, Required)
   - **State of marriage** (Short answer, Required)
   - **Type of ceremony** (Multiple choice, Required)
     - Civil
     - Religious
   - **Did either spouse change names?** (Yes/No, Required)
   - **Who changed their name?** (Multiple choice, Required if "Yes")
     - You
     - Your spouse
     - Both
   - **Former name** (Short answer, Required if "Yes")

### 1.5 Add Section C: Residency & Grounds
1. Click "Add section" → Name it "Residency & Grounds"
2. Add these questions:
   - **Have you lived in NY for 2+ years?** (Yes/No, Required)
   - **If No, which alternative route applies?** (Multiple choice, Required if "No")
     - Marriage occurred in NY
     - Grounds occurred in NY
     - Both parties consent to NY jurisdiction
   - **Approximate date of marriage breakdown** (Date, Required)
   - **Are you filing for no-fault divorce?** (Yes/No, Required)

### 1.6 Add Section D: Property & Support
1. Click "Add section" → Name it "Property & Support"
2. Add these questions:
   - **Do you have a signed settlement agreement?** (Yes/No, Required)
   - **Upload settlement agreement** (File upload, Required if "Yes")
     - Accept: PDF, DOC, DOCX
     - Max size: 10MB
   - **Do you have shared bank accounts?** (Yes/No, Required)
   - **Bank account details and who keeps which** (Paragraph, Required if "Yes")
   - **Do you have shared property/vehicles?** (Yes/No, Required)
   - **Property/vehicle details and assignment** (Paragraph, Required if "Yes")
   - **Will you include spousal support?** (Yes/No, Required)
   - **Monthly support amount** (Short answer, Required if "Yes")
   - **Support duration** (Short answer, Required if "Yes")

### 1.7 Add Section E: Name Change
1. Click "Add section" → Name it "Name Change"
2. Add these questions:
   - **Do you want to revert to a former name?** (Yes/No, Required)
   - **Your former name** (Short answer, Required if "Yes")
   - **Does your spouse want to revert to a former name?** (Yes/No, Required)
   - **Spouse's former name** (Short answer, Required if "Yes")

### 1.8 Add Section F: Filing & Support
1. Click "Add section" → Name it "Filing & Support"
2. Add these questions:
   - **Can you pay the ~$335 filing fees?** (Yes/No, Required)
   - **Do you have access to a printer/scanner?** (Yes/No, Required)
   - **Would you like an optional legal review call?** (Yes/No, Required)

### 1.9 Set Up Conditional Logic
For each conditional question:
1. Click the question
2. Click the three dots (⋮)
3. Select "Go to section based on answer"
4. Set up the logic:
   - **Section B Q5 → Q6:** If "Yes" → Show Q6
   - **Section B Q5 → Q7:** If "Yes" → Show Q7  
   - **Section C Q1 → Q2:** If "No" → Show Q2
   - **Section D Q1 → Q2:** If "Yes" → Show Q2
   - **Section D Q3 → Q4:** If "Yes" → Show Q4
   - **Section D Q5 → Q6:** If "Yes" → Show Q6
   - **Section D Q7 → Q8:** If "Yes" → Show Q8
   - **Section D Q7 → Q9:** If "Yes" → Show Q9
   - **Section E Q1 → Q2:** If "Yes" → Show Q2
   - **Section E Q3 → Q4:** If "Yes" → Show Q4

### 1.10 Get Embed Code
1. Click **"Send"**
2. Click **"Embed"** tab
3. Copy the **iframe code**
4. Note the **Form ID** from the URL

---

## 📄 Step 2: Set Up Formstack

### 2.1 Create Formstack Account
- Go to [formstack.com](https://formstack.com)
- Sign up for an account
- Choose a plan that supports PDF generation

### 2.2 Upload PDF Templates
Upload these official NY court forms:
- **UD-1:** Summons with Notice
- **UD-2:** Verified Complaint  
- **UD-6:** Affidavit of Service
- **UD-9:** Financial Disclosure
- **UD-10:** Settlement Agreement
- **UD-11:** Judgment of Divorce
- **DOH-2168:** Vital Records
- **Fee Waiver:** Fee Waiver Application

### 2.3 Insert Merge Tags
For each PDF template, insert these merge tags:

#### UD-1: Summons with Notice
- `{Plaintiff_Name}`
- `{Plaintiff_Address}`
- `{Defendant_Name}`
- `{Defendant_Address}`
- `{Current_Date}`

#### UD-2: Verified Complaint
- `{Plaintiff_Name}`
- `{Plaintiff_Address}`
- `{Defendant_Name}`
- `{Defendant_Address}`
- `{Marriage_Date}`
- `{Marriage_City}`
- `{Marriage_State}`
- `{Ceremony_Type}`
- `{Name_Change}`
- `{Who_Changed_Name}`
- `{Former_Name}`
- `{NY_Resident_2_Years}`
- `{Alternative_Route}`
- `{Breakdown_Date}`
- `{No_Fault_Divorce}`

#### UD-6: Affidavit of Service
- `{Plaintiff_Name}`
- `{Plaintiff_Address}`
- `{Plaintiff_Email}`
- `{Plaintiff_Phone}`
- `{Defendant_Name}`
- `{Defendant_Address}`
- `{Service_Date}`
- `{Service_Method}`

#### UD-9: Financial Disclosure
- `{Plaintiff_Name}`
- `{Plaintiff_Address}`
- `{Shared_Bank_Accounts}`
- `{Bank_Account_Details}`
- `{Shared_Property}`
- `{Property_Details}`

#### UD-10: Settlement Agreement
- `{Plaintiff_Name}`
- `{Defendant_Name}`
- `{Settlement_Agreement}`
- `{Shared_Bank_Accounts}`
- `{Bank_Account_Details}`
- `{Shared_Property}`
- `{Property_Details}`
- `{Spousal_Support}`
- `{Support_Amount}`
- `{Support_Duration}`

#### UD-11: Judgment of Divorce
- `{Plaintiff_Name}`
- `{Defendant_Name}`
- `{Marriage_Date}`
- `{Marriage_City}`
- `{Marriage_State}`
- `{No_Fault_Divorce}`
- `{Revert_Name}`
- `{Former_Name_Plaintiff}`
- `{Spouse_Revert_Name}`
- `{Former_Name_Spouse}`

#### Fee Waiver Application
- `{Plaintiff_Name}`
- `{Plaintiff_Address}`
- `{Can_Pay_Fees}`

### 2.4 Create Conditional Templates
Set up conditional logic so:
- **Fee Waiver** only generates if `{Can_Pay_Fees}` = "No"
- **Settlement Agreement** only generates if `{Settlement_Agreement}` = "Yes"

### 2.5 Test Templates
1. Use sample data to test each template
2. Verify all merge tags work correctly
3. Check conditional logic functions properly

---

## ⚡ Step 3: Configure Zapier Workflow

### 3.1 Create New Zap
1. Go to [zapier.com](https://zapier.com)
2. Click "Create Zap"
3. Name it "NY Divorce Form Processing"

### 3.2 Step 1: Google Forms Trigger
1. **App:** Google Forms
2. **Event:** New Response
3. **Account:** Connect your Google account
4. **Form:** Select your created form
5. **Test:** Submit a test response

### 3.3 Step 2: Formstack Document Generation
1. **App:** Formstack
2. **Event:** Generate Document
3. **Account:** Connect your Formstack account
4. **Template:** Select all court form templates
5. **Data Mapping:** Map Google Form fields to Formstack tags:
   - `plaintiffName` → `{Plaintiff_Name}`
   - `plaintiffAddress` → `{Plaintiff_Address}`
   - `plaintiffEmail` → `{Plaintiff_Email}`
   - `plaintiffPhone` → `{Plaintiff_Phone}`
   - `defendantName` → `{Defendant_Name}`
   - `defendantAddress` → `{Defendant_Address}`
   - `marriageDate` → `{Marriage_Date}`
   - `marriageCity` → `{Marriage_City}`
   - `marriageState` → `{Marriage_State}`
   - `ceremonyType` → `{Ceremony_Type}`
   - `nameChange` → `{Name_Change}`
   - `whoChangedName` → `{Who_Changed_Name}`
   - `formerName` → `{Former_Name}`
   - `nyResident2Years` → `{NY_Resident_2_Years}`
   - `alternativeRoute` → `{Alternative_Route}`
   - `breakdownDate` → `{Breakdown_Date}`
   - `noFaultDivorce` → `{No_Fault_Divorce}`
   - `settlementAgreement` → `{Settlement_Agreement}`
   - `sharedBankAccounts` → `{Shared_Bank_Accounts}`
   - `bankAccountDetails` → `{Bank_Account_Details}`
   - `sharedProperty` → `{Shared_Property}`
   - `propertyDetails` → `{Property_Details}`
   - `spousalSupport` → `{Spousal_Support}`
   - `supportAmount` → `{Support_Amount}`
   - `supportDuration` → `{Support_Duration}`
   - `revertName` → `{Revert_Name}`
   - `formerNamePlaintiff` → `{Former_Name_Plaintiff}`
   - `spouseRevertName` → `{Spouse_Revert_Name}`
   - `formerNameSpouse` → `{Former_Name_Spouse}`
   - `canPayFees` → `{Can_Pay_Fees}`

### 3.4 Step 3: Google Drive Storage
1. **App:** Google Drive
2. **Event:** Upload File
3. **Account:** Connect your Google account
4. **Folder:** Create a folder for divorce forms
5. **File Name:** `NY_Divorce_Forms_{timestamp}`
6. **File Content:** Generated PDFs from Formstack

### 3.5 Step 4: Email Delivery
1. **App:** Gmail
2. **Event:** Send Email
3. **Account:** Connect your Gmail account
4. **To:** `{plaintiffEmail}` (from Google Form)
5. **Subject:** "Your NY Divorce Forms Are Ready"
6. **Body:** 
   ```
   Dear {Plaintiff_Name},

   Your NY uncontested divorce forms have been generated and are attached to this email.

   Documents included:
   - UD-1: Summons with Notice
   - UD-2: Verified Complaint
   - UD-6: Affidavit of Service
   - UD-9: Financial Disclosure
   - UD-10: Settlement Agreement
   - UD-11: Judgment of Divorce
   {Fee Waiver Application (if applicable)}

   Next Steps:
   1. Review all forms carefully
   2. Print and sign where required
   3. File with your local court
   4. Serve papers to your spouse
   5. Attend court hearing if required

   Your forms have also been saved to Google Drive for your records.

   Best regards,
   The Uncouple Team
   ```
7. **Attachments:** Generated PDFs from Google Drive

### 3.6 Test the Complete Workflow
1. Submit a test form response
2. Verify all documents are generated
3. Check files are saved to Google Drive
4. Confirm email is sent with attachments

---

## 🔧 Step 4: Update Our App

### 4.1 Update Google Form URL
In `src/app/questionnaire/page.tsx`, replace:
```typescript
const googleFormUrl = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
```
With your actual Google Form embed URL.

### 4.2 Test the Integration
1. Navigate to `/questionnaire` in your app
2. Verify the Google Form loads correctly
3. Submit a test response
4. Check that the Zapier workflow triggers
5. Verify documents are generated and emailed

---

## 📊 Field Mapping Reference

| Google Form Field | Formstack Tag | Court Forms | Required |
|------------------|---------------|-------------|----------|
| plaintiffName | {Plaintiff_Name} | All | Yes |
| plaintiffAddress | {Plaintiff_Address} | UD-1, UD-2, UD-6, UD-9 | Yes |
| plaintiffEmail | {Plaintiff_Email} | UD-6 | Yes |
| plaintiffPhone | {Plaintiff_Phone} | UD-6 | Yes |
| defendantName | {Defendant_Name} | UD-1, UD-2, UD-6, UD-10, UD-11 | Yes |
| defendantAddress | {Defendant_Address} | UD-1, UD-2, UD-6 | Yes |
| marriageDate | {Marriage_Date} | UD-2, UD-11 | Yes |
| marriageCity | {Marriage_City} | UD-2, UD-11 | Yes |
| marriageState | {Marriage_State} | UD-2, UD-11 | Yes |
| ceremonyType | {Ceremony_Type} | UD-2 | Yes |
| nameChange | {Name_Change} | UD-2 | Yes |
| whoChangedName | {Who_Changed_Name} | UD-2 | No |
| formerName | {Former_Name} | UD-2 | No |
| nyResident2Years | {NY_Resident_2_Years} | UD-2 | Yes |
| alternativeRoute | {Alternative_Route} | UD-2 | No |
| breakdownDate | {Breakdown_Date} | UD-2 | Yes |
| noFaultDivorce | {No_Fault_Divorce} | UD-2, UD-11 | Yes |
| settlementAgreement | {Settlement_Agreement} | UD-10 | Yes |
| sharedBankAccounts | {Shared_Bank_Accounts} | UD-9, UD-10 | Yes |
| bankAccountDetails | {Bank_Account_Details} | UD-9, UD-10 | No |
| sharedProperty | {Shared_Property} | UD-9, UD-10 | Yes |
| propertyDetails | {Property_Details} | UD-9, UD-10 | No |
| spousalSupport | {Spousal_Support} | UD-10 | Yes |
| supportAmount | {Support_Amount} | UD-10 | No |
| supportDuration | {Support_Duration} | UD-10 | No |
| revertName | {Revert_Name} | UD-11 | Yes |
| formerNamePlaintiff | {Former_Name_Plaintiff} | UD-11 | No |
| spouseRevertName | {Spouse_Revert_Name} | UD-11 | Yes |
| formerNameSpouse | {Former_Name_Spouse} | UD-11 | No |
| canPayFees | {Can_Pay_Fees} | Fee Waiver | Yes |

---

## ✅ Final Checklist

- [ ] Google Form created with all sections A-F
- [ ] Conditional logic set up correctly
- [ ] Formstack templates uploaded with merge tags
- [ ] Zapier workflow configured and tested
- [ ] Google Drive folder created
- [ ] Email template configured
- [ ] App updated with Google Form embed URL
- [ ] Complete end-to-end test performed
- [ ] Documents generated and delivered successfully

---

## 🚀 Go Live!

Once everything is tested and working:
1. **Publish** the Google Form
2. **Activate** the Zapier workflow
3. **Deploy** your updated app
4. **Monitor** the first few submissions
5. **Celebrate** - you've built a complete automated divorce form system! 🎉

---

## 📞 Support

If you encounter any issues:
1. Check Zapier logs for workflow errors
2. Verify Google Form responses are being received
3. Test Formstack templates individually
4. Ensure all merge tags are correctly mapped
5. Verify email delivery settings

**Need help?** The setup files in `src/lib/formstackSetup.ts` contain all the configuration details and can be used for troubleshooting. 