# 🚀 Quick Start Guide - Google Docs Templates

## ⚡ **Get Started in 10 Minutes**

### **Step 1: Create Google Docs Templates (5 minutes)**

1. **Go to Google Docs** (docs.google.com)
2. **Create 8 new documents** using the templates from `NY_COURT_FORM_TEMPLATES.md`
3. **Copy each template** into a new Google Doc
4. **Name them**:
   - "UD-1 Summons Template"
   - "UD-2 Complaint Template"
   - "UD-6 Service Template"
   - "UD-9 Financial Template"
   - "UD-10 Settlement Template"
   - "UD-11 Judgment Template"
   - "Fee Waiver Template"
   - "Vital Records Template"

### **Step 2: Get Template IDs (2 minutes)**

For each Google Doc:
1. **Copy the URL** from the address bar
2. **Extract the ID** (between /d/ and /edit)
3. **Note down all 8 IDs**

Example: `https://docs.google.com/document/d/1ABC123.../edit`
ID: `1ABC123...`

### **Step 3: Set Up Google Apps Script (3 minutes)**

1. **Go to Google Apps Script** (script.google.com)
2. **Create new project** → "Divorce Document Generator"
3. **Copy the script** from `google-docs-automation.js`
4. **Update the CONFIG section** with your template IDs:

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

5. **Deploy** → "New deployment" → "Web app" → "Anyone" → "Deploy"
6. **Copy the web app URL**

### **Step 4: Test Everything (2 minutes)**

1. **Run the test script**:
   ```bash
   node test-google-docs.js
   ```

2. **Check your email** for generated PDFs
3. **Check Google Drive** for stored documents

## ✅ **What You'll Have:**

- ✅ **8 Court-Ready Templates** with proper NY formatting
- ✅ **Automatic Document Generation** from form submissions
- ✅ **PDF Conversion** and email delivery
- ✅ **Google Drive Storage** for all documents
- ✅ **Professional Email** with attachments

## 🎯 **Ready to Use:**

Your app now generates **court-acceptable NY divorce documents** automatically when users submit your Google Form!

## 🔧 **Next Steps:**

1. **Test with real form submissions**
2. **Customize email templates** if needed
3. **Set up Zapier** to connect Google Form to your webhook
4. **Deploy to production**

## 📞 **Need Help?**

- Check the logs in Google Apps Script console
- Run the test script to debug issues
- Review the detailed setup guide in `GOOGLE_DOCS_SETUP.md`

**You're all set! 🎉** 