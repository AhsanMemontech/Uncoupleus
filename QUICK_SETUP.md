# Quick Google Form Setup Guide

## 🚀 Create the Google Form in 10 Minutes

### Step 1: Go to Google Forms
1. Open [forms.google.com](https://forms.google.com)
2. Click **"Blank"** to create new form

### Step 2: Set Basic Info
- **Title:** `NY Uncontested Divorce - Information Collection`
- **Description:** `Complete this form to generate your divorce documents`

### Step 3: Add Sections (Copy & Paste)

#### Section A: Basic Information
**Description:** `Please provide your basic contact information and your spouse's details.`

**Questions:**
1. **Your full legal name** (Short answer, Required ✓)
2. **Your address** (Paragraph, Required ✓)
3. **Your email** (Email, Required ✓)
4. **Your phone number** (Phone number, Required ✓)
5. **Spouse's full legal name** (Short answer, Required ✓)
6. **Spouse's last known address** (Paragraph, Required ✓)

#### Section B: Marriage Details
**Description:** `Information about your marriage ceremony and any name changes.`

**Questions:**
1. **Date of marriage** (Date, Required ✓)
2. **City of marriage** (Short answer, Required ✓)
3. **State of marriage** (Short answer, Required ✓)
4. **Type of ceremony** (Multiple choice, Required ✓)
   - Civil
   - Religious
5. **Did either spouse change names?** (Yes/No, Required ✓)
6. **Who changed their name?** (Multiple choice, Required if "Yes")
   - You
   - Your spouse
   - Both
7. **Former name** (Short answer, Required if "Yes")

#### Section C: Residency & Grounds
**Description:** `Residency requirements and grounds for filing divorce in New York.`

**Questions:**
1. **Have you lived in NY for 2+ years?** (Yes/No, Required ✓)
2. **If No, which alternative route applies?** (Multiple choice, Required if "No")
   - Marriage occurred in NY
   - Grounds occurred in NY
   - Both parties consent to NY jurisdiction
3. **Approximate date of marriage breakdown** (Date, Required ✓)
4. **Are you filing for no-fault divorce?** (Yes/No, Required ✓)

#### Section D: Property & Support
**Description:** `Details about shared assets, property, and support arrangements.`

**Questions:**
1. **Do you have a signed settlement agreement?** (Yes/No, Required ✓)
2. **Upload settlement agreement** (File upload, Required if "Yes")
   - Accept: PDF, DOC, DOCX
   - Max: 10MB
3. **Do you have shared bank accounts?** (Yes/No, Required ✓)
4. **Bank account details and who keeps which** (Paragraph, Required if "Yes")
5. **Do you have shared property/vehicles?** (Yes/No, Required ✓)
6. **Property/vehicle details and assignment** (Paragraph, Required if "Yes")
7. **Will you include spousal support?** (Yes/No, Required ✓)
8. **Monthly support amount** (Short answer, Required if "Yes")
9. **Support duration** (Short answer, Required if "Yes")

#### Section E: Name Change
**Description:** `Information about reverting to former names.`

**Questions:**
1. **Do you want to revert to a former name?** (Yes/No, Required ✓)
2. **Your former name** (Short answer, Required if "Yes")
3. **Does your spouse want to revert to a former name?** (Yes/No, Required ✓)
4. **Spouse's former name** (Short answer, Required if "Yes")

#### Section F: Filing & Support
**Description:** `Final questions about filing fees and support options.`

**Questions:**
1. **Can you pay the ~$335 filing fees?** (Yes/No, Required ✓)
2. **Do you have access to a printer/scanner?** (Yes/No, Required ✓)
3. **Would you like an optional legal review call?** (Yes/No, Required ✓)

### Step 4: Set Up Conditional Logic

For each conditional question:
1. Click the question
2. Click the three dots (⋮)
3. Select **"Go to section based on answer"**
4. Set up the logic:

**Conditional Questions:**
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

### Step 5: Get Embed Code
1. Click **"Send"**
2. Click **"Embed"** tab
3. Copy the **iframe code**
4. Note the **Form ID** from the URL

### Step 6: Update Our App
In `src/app/questionnaire/page.tsx`, replace:
```typescript
const googleFormUrl = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
```
With your actual Google Form embed URL.

## ✅ Done!

Your Google Form is now ready and embedded in the app. The next steps are:
1. Set up Formstack with PDF templates
2. Configure Zapier workflow
3. Test the complete system

**Time to complete:** ~10-15 minutes 