'use client'

import { useEffect, useRef } from 'react'

interface GoogleFormEmbedProps {
  formUrl: string
  title?: string
  description?: string
  onFormSubmit?: () => void
}

export default function GoogleFormEmbed({ formUrl, title, description, onFormSubmit }: GoogleFormEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const submissionDetected = useRef(false)
  const detectionStarted = useRef(false)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Check if message is from Google Forms
      if (event.origin.includes('docs.google.com')) {
        console.log('Google Form message:', event.data);
        
        try {
          const data = event.data;
          
          // Check for various form submission indicators
          if (data && typeof data === 'object') {
            if (data.type === 'form-submit' || 
                data.action === 'submit' || 
                data.event === 'submit' ||
                data.message === 'form-submitted' ||
                data.type === 'form-complete' ||
                data.action === 'complete' ||
                data.type === 'response-submitted') {
              console.log('Form submission detected via message!');
              if (!submissionDetected.current) {
                submissionDetected.current = true;
                onFormSubmit?.();
              }
            }
          }
          
          // Also check for string messages
          if (typeof data === 'string') {
            if (data.includes('submitted') || 
                data.includes('complete') || 
                data.includes('success') ||
                data.includes('recorded')) {
              console.log('Form submission detected via string message!');
              if (!submissionDetected.current) {
                submissionDetected.current = true;
                onFormSubmit?.();
              }
            }
          }
        } catch (err) {
          console.log('Error processing Google Form message:', err);
        }
      }
    };

    const checkFormCompletion = () => {
      if (iframeRef.current && !submissionDetected.current && detectionStarted.current) {
        try {
          const iframe = iframeRef.current;
          
          // Try to access iframe content (may fail due to CORS)
          try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
            if (iframeDoc) {
              const bodyText = iframeDoc.body?.textContent || '';
              console.log('Iframe content check:', bodyText.substring(0, 100));
              
              // Check for completion text patterns
              if (bodyText.includes('Your response has been recorded') ||
                  bodyText.includes('Submit another response') ||
                  bodyText.includes('Thank you for your response') ||
                  bodyText.includes('Response recorded') ||
                  bodyText.includes('Form submitted') ||
                  bodyText.includes('Successfully submitted')) {
                console.log('Form completion detected via content!');
                submissionDetected.current = true;
                onFormSubmit?.();
                return;
              }
            }
          } catch (corsError) {
            // CORS error is expected, continue with other methods
            console.log('CORS prevented content access, trying URL method');
          }

          // Fallback: Check URL for any changes
          const currentUrl = iframe.src;
          if (currentUrl.includes('formResponse') || 
              currentUrl.includes('submitted') || 
              currentUrl.includes('complete') ||
              currentUrl.includes('recorded') ||
              currentUrl.includes('thank') ||
              currentUrl.includes('success')) {
            console.log('Form completion detected via URL pattern!');
            submissionDetected.current = true;
            onFormSubmit?.();
            return;
          }

        } catch (err) {
          console.log('Could not check iframe:', err);
        }
      }
    };

    // Start detection after a delay to avoid false positives
    const startDetection = setTimeout(() => {
      detectionStarted.current = true;
      console.log('Form submission detection started');
    }, 3000); // Wait 3 seconds before starting detection

    // Check more frequently for content changes
    const frequentInterval = setInterval(() => {
      if (detectionStarted.current && !submissionDetected.current) {
        checkFormCompletion();
      }
    }, 1000); // Check every second
    
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(startDetection);
      clearInterval(frequentInterval);
    };
  }, [onFormSubmit]);

  const handleIframeLoad = () => {
    console.log('Google Form iframe loaded');
    submissionDetected.current = false; // Reset on new load
    detectionStarted.current = false; // Reset detection flag
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-xl mx-4 sm:mx-auto">
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white p-6 sm:p-10">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            {title || 'NY Uncontested Divorce Form'}
          </h1>
          <p className="text-cyan-100 text-sm sm:text-base">
            {description || 'Please complete all sections to generate your divorce documents'}
          </p>
        </div>
      </div>
      
      <div className="p-6 sm:p-10">
        <div className="aspect-[4/3] w-full">
          <iframe
            ref={iframeRef}
            src={formUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="NY Uncontested Divorce Form"
            className="rounded-2xl"
            onLoad={handleIframeLoad}
          >
            Loading…
          </iframe>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            After submitting the form, you&apos;ll be redirected to the next step automatically.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            If you see &quot;Your response has been recorded&quot;, the form was submitted successfully.
          </p>
        </div>
      </div>
    </div>
  )
} 