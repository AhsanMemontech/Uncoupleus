# Google Docs Document Generation Setup Guide

## 🚀 **Step-by-Step Setup**

### **Step 1: Create Google Docs Templates**

1. **Go to Google Docs** (docs.google.com)
2. **Create 8 new documents** for each court form:

#### **Template 1: UD-1 - Summons with Notice**
- Create new Google Doc
- Name it: "UD-1 Summons with Notice Template"
- Add merge tags: `<<Plaintiff_Name>>`, `<<Plaintiff_Address>>`, `<<Defendant_Name>>`, `<<Defendant_Address>>`

#### **Template 2: UD-2 - Verified Complaint**
- Create new Google Doc
- Name it: "UD-2 Verified Complaint Template"
- Add merge tags: `<<Plaintiff_Name>>`, `<<Marriage_Date>>`, `<<Marriage_City>>`, `<<Breakdown_Date>>`, etc.

#### **Template 3: UD-6 - Affidavit of Service**
- Create new Google Doc
- Name it: "UD-6 Affidavit of Service Template"
- Add merge tags: `<<Plaintiff_Name>>`, `<<Plaintiff_Email>>`, `<<Plaintiff_Phone>>`

#### **Template 4: UD-9 - Financial Disclosure**
- Create new Google Doc
- Name it: "UD-9 Financial Disclosure Template"
- Add merge tags: `<<Plaintiff_Name>>`, `<<Shared_Bank_Accounts>>`, `<<Property_Details>>`

#### **Template 5: UD-10 - Settlement Agreement**
- Create new Google Doc
- Name it: "UD-10 Settlement Agreement Template"
- Add merge tags: `<<Plaintiff_Name>>`, `<<Defendant_Name>>`, `<<Settlement_Agreement>>`, `<<Spousal_Support>>`

#### **Template 6: UD-11 - Judgment of Divorce**
- Create new Google Doc
- Name it: "UD-11 Judgment of Divorce Template"
- Add merge tags: `<<Plaintiff_Name>>`, `<<Defendant_Name>>`, `<<Marriage_Date>>`, `<<Revert_Name>>`

#### **Template 7: Fee Waiver Application**
- Create new Google Doc
- Name it: "Fee Waiver Application Template"
- Add merge tags: `<<Plaintiff_Name>>`, `<<Can_Pay_Fees>>`

### **Step 2: Get Template IDs**

For each Google Doc template:
1. **Open the document**
2. **Copy the URL** from the address bar
3. **Extract the ID** (the long string between /d/ and /edit)
4. **Note down the ID** for each template

Example URL: `https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit`
Template ID: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

### **Step 3: Create Google Drive Folder**

1. **Go to Google Drive**
2. **Create a new folder** called "Divorce Documents Output"
3. **Copy the folder ID** from the URL
4. **Note down the folder ID**

### **Step 4: Set Up Google Apps Script**

1. **Go to Google Apps Script** (script.google.com)
2. **Create a new project**
3. **Name it**: "Divorce Document Generator"
4. **Copy the script** from `google-docs-automation.js`
5. **Paste it** into the Apps Script editor
6. **Update the configuration** with your template IDs and folder ID

### **Step 5: Update Configuration**

In the script, update the `CONFIG` section:

```javascript
const CONFIG = {
  templates: {
    ud1: 'YOUR_UD1_TEMPLATE_ID',
    ud2: 'YOUR_UD2_TEMPLATE_ID',
    ud6: 'YOUR_UD6_TEMPLATE_ID',
    ud9: 'YOUR_UD9_TEMPLATE_ID',
    ud10: 'YOUR_UD10_TEMPLATE_ID',
    ud11: 'YOUR_UD11_TEMPLATE_ID',
    feeWaiver: 'YOUR_FEE_WAIVER_TEMPLATE_ID'
  },
  outputFolderId: 'YOUR_OUTPUT_FOLDER_ID',
  fromEmail: 'your-email@gmail.com',
  subject: 'Your Divorce Documents Are Ready'
};
```

### **Step 6: Deploy the Script**

1. **Click "Deploy"** → **"New deployment"**
2. **Choose type**: "Web app"
3. **Set access**: "Anyone" (for webhook access)
4. **Click "Deploy"**
5. **Copy the web app URL** (you'll need this for Zapier)

### **Step 7: Test the Setup**

1. **Run the test function**: `testDocumentGeneration()`
2. **Check Google Drive** for generated PDFs
3. **Check Gmail** for test email

## 📋 **Merge Tags Reference**

### **Section A - Basic Info**
- `<<Plaintiff_Name>>` - Your full legal name
- `<<Plaintiff_Address>>` - Your address
- `<<Plaintiff_Email>>` - Your email
- `<<Plaintiff_Phone>>` - Your phone number
- `<<Defendant_Name>>` - Spouse's full legal name
- `<<Defendant_Address>>` - Spouse's last known address

### **Section B - Marriage Details**
- `<<Marriage_Date>>` - Date of marriage
- `<<Marriage_City>>` - City of marriage
- `<<Marriage_State>>` - State of marriage
- `<<Ceremony_Type>>` - Type of ceremony
- `<<Name_Change>>` - Did either change names?
- `<<Who_Changed_Name>>` - Who changed name?
- `<<Former_Name>>` - Former name

### **Section C - Residency & Grounds**
- `<<NY_Resident_2_Years>>` - Have you lived in NY ≥ 2 years?
- `<<Alternative_Route>>` - Which alternative route applies?
- `<<Breakdown_Date>>` - Approx date of marriage breakdown
- `<<No_Fault_Divorce>>` - Filing for no-fault divorce?

### **Section D - Property & Support**
- `<<Settlement_Agreement>>` - Do you have a signed settlement agreement?
- `<<Shared_Bank_Accounts>>` - Shared bank accounts?
- `<<Bank_Account_Details>>` - Who keeps which accounts
- `<<Shared_Property>>` - Shared property/vehicles?
- `<<Property_Details>>` - Describe & assign property
- `<<Spousal_Support>>` - Include spousal support?
- `<<Support_Amount>>` - Monthly support amount
- `<<Support_Duration>>` - Support duration

### **Section E - Name Change**
- `<<Revert_Name>>` - Do you want to revert to a former name?
- `<<Former_Name_Plaintiff>>` - Your former name
- `<<Spouse_Revert_Name>>` - Does spouse want to revert?
- `<<Former_Name_Spouse>>` - Spouse's former name

### **Section F - Filing & Support**
- `<<Can_Pay_Fees>>` - Can you pay ~$335 filing fees?
- `<<Has_Printer>>` - Do you have printer/scanner?
- `<<Legal_Review_Call>>` - Optional legal review call?

### **Metadata**
- `<<Submission_Date>>` - Date of submission
- `<<Submission_ID>>` - Unique submission ID
- `<<User_Email>>` - User's email address

## 🔧 **Integration with Your App**

Once the Google Apps Script is deployed:

1. **Update your webhook** to call the Google Apps Script URL
2. **Test the integration** with your Google Form
3. **Monitor the logs** in Apps Script console

## ✅ **What You Get**

- **Free document generation** using Google Docs
- **Automatic PDF creation** and email delivery
- **Professional email templates** with attachments
- **Google Drive storage** for all generated documents
- **Complete audit trail** of all submissions

## 🎯 **Next Steps**

1. **Create the Google Docs templates**
2. **Set up the Apps Script**
3. **Test with your Google Form**
4. **Deploy to production**

This solution gives you **professional document generation for free** using Google's tools! 

SUPREME COURT OF THE STATE OF NEW YORK
COUNTY OF ________________

<<Plaintiff_Name>>,
Plaintiff,
-vs-
<<Defendant_Name>>,
Defendant.

SUMMONS WITH NOTICE

TO THE ABOVE-NAMED DEFENDANT:
You are hereby summoned to serve upon the plaintiff's attorney, or upon the plaintiff if the plaintiff does not have an attorney, a notice of appearance or demand for a complaint within 20 days after the service of this summons, exclusive of the day of service...

[Rest of the official form content with merge tags] 