const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Google Forms API setup
const SCOPES = ['https://www.googleapis.com/auth/forms.body'];

async function createGoogleForm() {
  try {
    console.log('🚀 Creating Google Form...');
    
    // Initialize Google Auth
    const auth = new google.auth.GoogleAuth({
      keyFile: 'credentials.json', // You'll need to create this
      scopes: SCOPES,
    });

    const forms = google.forms({ version: 'v1', auth });

    // Form structure
    const formData = {
      info: {
        title: 'NY Uncontested Divorce - Information Collection',
        description: 'Complete this form to generate your divorce documents',
        documentTitle: 'NY Uncontested Divorce Form'
      },
      items: [
        // Section A: Basic Information
        {
          itemId: 'section_a',
          title: 'Section A: Basic Information',
          description: 'Please provide your basic contact information and your spouse\'s details.',
          itemGroup: {
            items: [
              {
                itemId: 'plaintiff_name',
                title: 'Your full legal name',
                questionItem: {
                  question: {
                    required: true,
                    textQuestion: {
                      paragraph: false
                    }
                  }
                }
              },
              {
                itemId: 'plaintiff_address',
                title: 'Your address',
                questionItem: {
                  question: {
                    required: true,
                    textQuestion: {
                      paragraph: true
                    }
                  }
                }
              },
              {
                itemId: 'plaintiff_email',
                title: 'Your email',
                questionItem: {
                  question: {
                    required: true,
                    textQuestion: {
                      paragraph: false
                    }
                  }
                }
              },
              {
                itemId: 'plaintiff_phone',
                title: 'Your phone number',
                questionItem: {
                  question: {
                    required: true,
                    textQuestion: {
                      paragraph: false
                    }
                  }
                }
              },
              {
                itemId: 'defendant_name',
                title: 'Spouse\'s full legal name',
                questionItem: {
                  question: {
                    required: true,
                    textQuestion: {
                      paragraph: false
                    }
                  }
                }
              },
              {
                itemId: 'defendant_address',
                title: 'Spouse\'s last known address',
                questionItem: {
                  question: {
                    required: true,
                    textQuestion: {
                      paragraph: true
                    }
                  }
                }
              }
            ]
          }
        },
        // Section B: Marriage Details
        {
          itemId: 'section_b',
          title: 'Section B: Marriage Details',
          description: 'Information about your marriage ceremony and any name changes.',
          itemGroup: {
            items: [
              {
                itemId: 'marriage_date',
                title: 'Date of marriage',
                questionItem: {
                  question: {
                    required: true,
                    dateQuestion: {
                      includeTime: false
                    }
                  }
                }
              },
              {
                itemId: 'marriage_city',
                title: 'City of marriage',
                questionItem: {
                  question: {
                    required: true,
                    textQuestion: {
                      paragraph: false
                    }
                  }
                }
              },
              {
                itemId: 'marriage_state',
                title: 'State of marriage',
                questionItem: {
                  question: {
                    required: true,
                    textQuestion: {
                      paragraph: false
                    }
                  }
                }
              },
              {
                itemId: 'ceremony_type',
                title: 'Type of ceremony',
                questionItem: {
                  question: {
                    required: true,
                    choiceQuestion: {
                      type: 'RADIO',
                      options: [
                        { value: 'Civil' },
                        { value: 'Religious' }
                      ]
                    }
                  }
                }
              },
              {
                itemId: 'name_change',
                title: 'Did either spouse change names?',
                questionItem: {
                  question: {
                    required: true,
                    choiceQuestion: {
                      type: 'RADIO',
                      options: [
                        { value: 'Yes' },
                        { value: 'No' }
                      ]
                    }
                  }
                }
              }
            ]
          }
        }
        // Add more sections here...
      ]
    };

    // Create the form
    const response = await forms.forms.create({
      requestBody: formData
    });

    console.log('✅ Google Form created successfully!');
    console.log('Form ID:', response.data.formId);
    console.log('Form URL:', response.data.responderUri);
    console.log('Edit URL:', `https://docs.google.com/forms/d/${response.data.formId}/edit`);
    console.log('Embed URL:', `https://docs.google.com/forms/d/e/${response.data.formId}/viewform?embedded=true`);

    // Save form info to file
    const formInfo = {
      formId: response.data.formId,
      formUrl: response.data.responderUri,
      editUrl: `https://docs.google.com/forms/d/${response.data.formId}/edit`,
      embedUrl: `https://docs.google.com/forms/d/e/${response.data.formId}/viewform?embedded=true`
    };

    fs.writeFileSync('form-info.json', JSON.stringify(formInfo, null, 2));
    console.log('📄 Form info saved to form-info.json');

    return response.data;

  } catch (error) {
    console.error('❌ Error creating Google Form:', error.message);
    console.log('\nTo create the form manually:');
    console.log('1. Follow the QUICK_SETUP.md guide');
    console.log('2. Or set up Google API credentials');
    throw error;
  }
}

// Instructions for setting up API credentials
function showCredentialInstructions() {
  console.log('\n🔧 To use the API method, you need to:');
  console.log('1. Go to Google Cloud Console: https://console.cloud.google.com/');
  console.log('2. Create a new project or select existing');
  console.log('3. Enable Google Forms API');
  console.log('4. Create service account credentials');
  console.log('5. Download credentials.json file');
  console.log('6. Place credentials.json in this directory');
  console.log('\nOr use the manual method in QUICK_SETUP.md');
}

// Main execution
if (require.main === module) {
  if (fs.existsSync('credentials.json')) {
    createGoogleForm()
      .then(() => {
        console.log('\n🎉 Form creation complete!');
        console.log('Update src/app/questionnaire/page.tsx with the embed URL');
      })
      .catch(showCredentialInstructions);
  } else {
    console.log('❌ credentials.json not found');
    showCredentialInstructions();
  }
}

module.exports = { createGoogleForm }; 