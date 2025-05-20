'use client';

// Simple component that provides a button to open Zendesk chat
export default function ZendeskButton({ 
  children = 'Contact Us',
  className = "inline-flex items-center justify-center rounded-md bg-emeraldgreen-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-emeraldgreen-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emeraldgreen-500 transition-colors",
  onClick
}: {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  
  const handleClick = async () => {
    try {
      // Call additional onClick handler if provided
      if (onClick) {
        onClick();
      }
      
      // Use the global openZendeskChat function if available
      if (typeof window !== 'undefined' && (window as any).openZendeskChat) {
        console.log('Opening Zendesk using global function...');
        await (window as any).openZendeskChat();
      } else {
        console.error('Zendesk launcher function not available');
        
        // Fallback logic only if the global function isn't available
        if (typeof window !== 'undefined' && window.zE) {
          // Try different Zendesk API versions
          try {
            window.zE('webWidget', 'open');
          } catch (e1) {
            try {
              window.zE('webWidget:open');
            } catch (e2) {
              try {
                window.zE('messenger:open');
              } catch (e3) {
                console.error('All Zendesk methods failed', e1, e2, e3);
                alert('Our chat system is experiencing issues. Please try refreshing the page or contact us by email.');
              }
            }
          }
        } else {
          // Last resort - try loading the script directly
          console.log('Zendesk not available, attempting to load it directly...');
          const zendeskKey = process.env.NEXT_PUBLIC_ZENDESK_KEY;
          if (!zendeskKey) {
            console.error('Missing Zendesk key in environment variables');
            return;
          }
          
          // Set Zendesk settings before loading the script
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
                connectOnPageLoad: false
              }
            }
          };
          
          const script = document.createElement('script');
          script.id = 'ze-snippet';
          script.src = `https://static.zdassets.com/ekr/snippet.js?key=${zendeskKey}`;
          script.async = true;
          
          // Use a promise to handle script loading
          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
          
          // Wait for initialization and try to open
          setTimeout(() => {
            if (window.zE) {
              try {
                window.zE('webWidget', 'open');
              } catch (e) {
                console.error('Failed to open Zendesk after loading', e);
              }
            }
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Error opening Zendesk chat:', error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
}