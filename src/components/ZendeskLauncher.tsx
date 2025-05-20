'use client';

import { useEffect, useState } from 'react';

// Define Zendesk window object types
declare global {
  interface Window {
    zE?: any;
    zESettings?: any;
    $zopim?: any;
    _zEACLoaded?: boolean;
  }
}

export default function ZendeskLauncher() {
  const [isZendeskLoaded, setIsZendeskLoaded] = useState(false);
  
  // Function to check if Zendesk is fully loaded and ready
  const isZendeskReady = () => {
    return window.zE && 
           typeof window.zE === 'function' && 
           (
             // Try to detect if the API is initialized by checking various properties
             window._zEACLoaded ||
             window.zE.activate ||
             window.zE.whereAmI ||
             window.zE.getWidgetApi
           );
  };

  // Force-load Zendesk and ensure it's properly initialized
  const loadZendeskScript = () => {
    return new Promise((resolve, reject) => {
      // Skip if already loading or loaded
      if (document.getElementById('ze-snippet') && isZendeskReady()) {
        resolve(true);
        return;
      }
      
      // Get Zendesk key from environment
      const zendeskKey = process.env.NEXT_PUBLIC_ZENDESK_KEY;
      if (!zendeskKey) {
        console.error('Zendesk key not found in environment variables');
        reject(new Error('Missing Zendesk key'));
        return;
      }
      
      // Remove any existing script to avoid conflicts
      const existingScript = document.getElementById('ze-snippet');
      if (existingScript) {
        existingScript.remove();
      }
      
      // Configure Zendesk settings before loading script
      window.zESettings = {
        webWidget: {
          color: { 
            theme: '#004E36', // Correct emerald green color
            header: '#004E36',
            launcherText: '#ffffff',
            articleLinks: '#004E36',
            button: '#004E36'
          },
          launcher: {
            chatLabel: {
              '*': 'Contact Us'
            }
          },
          chat: {
            title: 'Sunfruit Support',
            concierge: {
              avatarPath: '/images/logo.png' // Optional: use your logo as the avatar
            },
            connectOnPageLoad: false // Don't connect until we want to
          },
          contactForm: {
            title: {
              '*': 'Contact Sunfruit Support'
            }
          },
          offset: {
            mobile: {
              horizontal: '16px',
              vertical: '16px'
            }
          },
          navigation: {
            popoutButton: {
              enabled: true
            }
          }
        }
      };
      
      // Create and append Zendesk script
      const script = document.createElement('script');
      script.id = 'ze-snippet';
      script.src = `https://static.zdassets.com/ekr/snippet.js?key=${zendeskKey}`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        // Wait for Zendesk to be fully initialized
        const checkInterval = setInterval(() => {
          if (isZendeskReady()) {
            clearInterval(checkInterval);
            setIsZendeskLoaded(true);
            resolve(true);
          }
        }, 100);
        
        // Set a timeout to prevent infinite waiting
        setTimeout(() => {
          clearInterval(checkInterval);
          if (!isZendeskReady()) {
            console.warn('Zendesk script loaded but not fully initialized after timeout');
            resolve(true); // Resolve anyway to avoid blocking
          }
        }, 5000);
      };
      
      script.onerror = (err) => {
        console.error('Failed to load Zendesk script:', err);
        reject(err);
      };
      
      document.head.appendChild(script);
    });
  };

  // Function to open Zendesk, ensuring it's loaded first
  const openZendeskChat = async () => {
    try {
      // First ensure Zendesk is loaded
      if (!isZendeskReady()) {
        await loadZendeskScript();
        // Short delay to ensure everything is initialized
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      // Now try to open the widget using all possible methods
      if (window.zE) {
        // Log to help debug which method actually works
        console.log('Attempting to open Zendesk widget...');
        
        // Try classic web widget first (most common)
        try {
          console.log('Trying webWidget.open...');
          window.zE('webWidget', 'open');
          return true;
        } catch (e1) {
          console.log('webWidget.open failed, trying alternative methods...');
          
          try {
            console.log('Trying webWidget:open...');
            window.zE('webWidget:open');
            return true;
          } catch (e2) {
            try {
              console.log('Trying messenger:open...');
              window.zE('messenger:open');
              return true;
            } catch (e3) {
              try {
                console.log('Trying zE.activate...');
                if (typeof window.zE.activate === 'function') {
                  window.zE.activate();
                  return true;
                }
              } catch (e4) {
                try {
                  console.log('Trying $zopim.livechat...');
                  if (window.$zopim && window.$zopim.livechat) {
                    window.$zopim.livechat.window.show();
                    return true;
                  }
                } catch (e5) {
                  console.error('All Zendesk open methods failed', { e1, e2, e3, e4, e5 });
                  return false;
                }
              }
            }
          }
        }
      }
      
      console.error('Failed to open Zendesk - zE object not available');
      return false;
    } catch (error) {
      console.error('Error opening Zendesk chat:', error);
      return false;
    }
  };

  // Initialize Zendesk on component mount
  useEffect(() => {
    // Set up Zendesk settings before anything else
    if (typeof window !== 'undefined') {
      window.zESettings = {
        webWidget: {
          color: { 
            theme: '#004E36', // Correct emerald green color
            header: '#004E36',
            launcherText: '#ffffff',
            articleLinks: '#004E36',
            button: '#004E36'
          },
          launcher: {
            chatLabel: {
              '*': 'Contact Us'
            }
          },
          chat: {
            title: 'Sunfruit Support',
            concierge: {
              avatarPath: '/images/logo.png' // Optional: use your logo as the avatar
            },
            connectOnPageLoad: false // Don't connect until we want to
          },
          contactForm: {
            title: {
              '*': 'Contact Sunfruit Support'
            }
          },
          offset: {
            mobile: {
              horizontal: '16px',
              vertical: '16px'
            }
          },
          navigation: {
            popoutButton: {
              enabled: true
            }
          }
        }
      };
    }
    
    // Add the openZendeskChat function to the window object
    (window as any).openZendeskChat = openZendeskChat;
    
    // Preload Zendesk script but don't open widget yet
    loadZendeskScript().catch(err => {
      console.error('Failed to preload Zendesk script:', err);
    });
    
    // Cleanup function
    return () => {
      delete (window as any).openZendeskChat;
    };
  }, []);

  // No visible UI
  return null;
}