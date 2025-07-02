// Google Form Creation Script for NY Uncontested Divorce
// This script helps create the Google Form programmatically

const formStructure = {
  title: "NY Uncontested Divorce - Information Collection",
  description: "Complete this form to generate your divorce documents",
  sections: [
    {
      title: "Section A: Basic Information",
      description: "Please provide your basic contact information and your spouse's details.",
      questions: [
        {
          title: "Your full legal name",
          type: "SHORT_ANSWER",
          required: true
        },
        {
          title: "Your address",
          type: "PARAGRAPH",
          required: true
        },
        {
          title: "Your email",
          type: "EMAIL",
          required: true
        },
        {
          title: "Your phone number",
          type: "PHONE_NUMBER",
          required: true
        },
        {
          title: "Spouse's full legal name",
          type: "SHORT_ANSWER",
          required: true
        },
        {
          title: "Spouse's last known address",
          type: "PARAGRAPH",
          required: true
        }
      ]
    },
    {
      title: "Section B: Marriage Details",
      description: "Information about your marriage ceremony and any name changes.",
      questions: [
        {
          title: "Date of marriage",
          type: "DATE",
          required: true
        },
        {
          title: "City of marriage",
          type: "SHORT_ANSWER",
          required: true
        },
        {
          title: "State of marriage",
          type: "SHORT_ANSWER",
          required: true
        },
        {
          title: "Type of ceremony",
          type: "MULTIPLE_CHOICE",
          required: true,
          options: ["Civil", "Religious"]
        },
        {
          title: "Did either spouse change names?",
          type: "YES_NO",
          required: true
        },
        {
          title: "Who changed their name?",
          type: "MULTIPLE_CHOICE",
          required: false,
          conditional: {
            dependsOn: "Did either spouse change names?",
            value: "Yes",
            options: ["You", "Your spouse", "Both"]
          }
        },
        {
          title: "Former name",
          type: "SHORT_ANSWER",
          required: false,
          conditional: {
            dependsOn: "Did either spouse change names?",
            value: "Yes"
          }
        }
      ]
    },
    {
      title: "Section C: Residency & Grounds",
      description: "Residency requirements and grounds for filing divorce in New York.",
      questions: [
        {
          title: "Have you lived in NY for 2+ years?",
          type: "YES_NO",
          required: true
        },
        {
          title: "If No, which alternative route applies?",
          type: "MULTIPLE_CHOICE",
          required: false,
          conditional: {
            dependsOn: "Have you lived in NY for 2+ years?",
            value: "No",
            options: ["Marriage occurred in NY", "Grounds occurred in NY", "Both parties consent to NY jurisdiction"]
          }
        },
        {
          title: "Approximate date of marriage breakdown",
          type: "DATE",
          required: true
        },
        {
          title: "Are you filing for no-fault divorce?",
          type: "YES_NO",
          required: true
        }
      ]
    },
    {
      title: "Section D: Property & Support",
      description: "Details about shared assets, property, and support arrangements.",
      questions: [
        {
          title: "Do you have a signed settlement agreement?",
          type: "YES_NO",
          required: true
        },
        {
          title: "Upload settlement agreement (PDF)",
          type: "FILE_UPLOAD",
          required: false,
          conditional: {
            dependsOn: "Do you have a signed settlement agreement?",
            value: "Yes"
          },
          fileTypes: ["PDF", "DOC", "DOCX"],
          maxSize: "10MB"
        },
        {
          title: "Do you have shared bank accounts?",
          type: "YES_NO",
          required: true
        },
        {
          title: "Bank account details and who keeps which",
          type: "PARAGRAPH",
          required: false,
          conditional: {
            dependsOn: "Do you have shared bank accounts?",
            value: "Yes"
          }
        },
        {
          title: "Do you have shared property/vehicles?",
          type: "YES_NO",
          required: true
        },
        {
          title: "Property/vehicle details and assignment",
          type: "PARAGRAPH",
          required: false,
          conditional: {
            dependsOn: "Do you have shared property/vehicles?",
            value: "Yes"
          }
        },
        {
          title: "Will you include spousal support?",
          type: "YES_NO",
          required: true
        },
        {
          title: "Monthly support amount",
          type: "SHORT_ANSWER",
          required: false,
          conditional: {
            dependsOn: "Will you include spousal support?",
            value: "Yes"
          }
        },
        {
          title: "Support duration",
          type: "SHORT_ANSWER",
          required: false,
          conditional: {
            dependsOn: "Will you include spousal support?",
            value: "Yes"
          }
        }
      ]
    },
    {
      title: "Section E: Name Change",
      description: "Information about reverting to former names.",
      questions: [
        {
          title: "Do you want to revert to a former name?",
          type: "YES_NO",
          required: true
        },
        {
          title: "Your former name",
          type: "SHORT_ANSWER",
          required: false,
          conditional: {
            dependsOn: "Do you want to revert to a former name?",
            value: "Yes"
          }
        },
        {
          title: "Does your spouse want to revert to a former name?",
          type: "YES_NO",
          required: true
        },
        {
          title: "Spouse's former name",
          type: "SHORT_ANSWER",
          required: false,
          conditional: {
            dependsOn: "Does your spouse want to revert to a former name?",
            value: "Yes"
          }
        }
      ]
    },
    {
      title: "Section F: Filing & Support",
      description: "Final questions about filing fees and support options.",
      questions: [
        {
          title: "Can you pay the ~$335 filing fees?",
          type: "YES_NO",
          required: true
        },
        {
          title: "Do you have access to a printer/scanner?",
          type: "YES_NO",
          required: true
        },
        {
          title: "Would you like an optional legal review call?",
          type: "YES_NO",
          required: true
        }
      ]
    }
  ]
};

// Instructions for manual creation
console.log("=== GOOGLE FORM CREATION INSTRUCTIONS ===");
console.log("\n1. Go to: https://forms.google.com");
console.log("2. Click 'Blank' to create new form");
console.log("3. Set title: '" + formStructure.title + "'");
console.log("4. Set description: '" + formStructure.description + "'");
console.log("\n=== SECTIONS TO CREATE ===");

formStructure.sections.forEach((section, sectionIndex) => {
  console.log(`\n${sectionIndex + 1}. ${section.title}`);
  console.log(`   Description: ${section.description}`);
  console.log("   Questions:");
  
  section.questions.forEach((question, questionIndex) => {
    console.log(`   ${questionIndex + 1}. ${question.title}`);
    console.log(`      Type: ${question.type}`);
    console.log(`      Required: ${question.required}`);
    
    if (question.options) {
      console.log(`      Options: ${question.options.join(", ")}`);
    }
    
    if (question.conditional) {
      console.log(`      Conditional: Show if "${question.conditional.dependsOn}" = "${question.conditional.value}"`);
    }
    
    if (question.fileTypes) {
      console.log(`      File Types: ${question.fileTypes.join(", ")}`);
      console.log(`      Max Size: ${question.maxSize}`);
    }
  });
});

console.log("\n=== CONDITIONAL LOGIC SETUP ===");
console.log("For each conditional question:");
console.log("1. Click the question");
console.log("2. Click the three dots (⋮)");
console.log("3. Select 'Go to section based on answer'");
console.log("4. Set up the conditional logic as shown above");

console.log("\n=== GET EMBED CODE ===");
console.log("1. Click 'Send'");
console.log("2. Click 'Embed' tab");
console.log("3. Copy the iframe code");
console.log("4. Update the googleFormUrl in src/app/questionnaire/page.tsx");

console.log("\n=== FORM ID ===");
console.log("The form ID is in the URL: https://docs.google.com/forms/d/FORM_ID_HERE/edit");
console.log("Copy this ID for Zapier integration");

module.exports = formStructure; 