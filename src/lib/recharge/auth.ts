import { 
  sendPasswordlessCode, 
  validatePasswordlessCode,
  getCustomerPortalAccess,
  getCustomer,
  listSubscriptions
} from '@rechargeapps/storefront-client';

export class RechargeAuth {
  async sendVerificationCode(email: string) {
    try {
      const response = await sendPasswordlessCode(email, {
        send_email: false,
        send_sms: true // Send via SMS only
      });
      
      // The response might be a string directly or have a session_token property
      return response.session_token || response;
    } catch (error) {
      
      // More specific error handling
      if (error?.message?.includes('network') || error?.message?.includes('fetch')) {
        throw new Error('Network connection error. Please check your internet connection.');
      } else if (error?.status === 404) {
        throw new Error('Customer not found. Please verify your email address.');
      } else if (error?.status === 401) {
        throw new Error('Authentication failed. Please contact support.');
      } else {
        throw new Error(`Failed to send verification code: ${error?.message || 'Unknown error'}`);
      }
    }
  }

  async validateCodeAndGetPortal(
    email: string, 
    sessionToken: string, 
    code: string,
    pageDestination: string = 'overview'
  ) {
    try {
      if (!sessionToken) {
        throw new Error('Session token is required');
      }
      
      // Validate the code
      const session = await validatePasswordlessCode(email, sessionToken, code);
      
      // Get portal access URL
      const portalAccess = await getCustomerPortalAccess(session, {
        page_destination: pageDestination
      });
      
      return portalAccess.portal_url;
    } catch (error) {
      throw new Error('Invalid verification code');
    }
  }

  async getCustomerData(session: any) {
    try {
      const customerData = await getCustomer(session);
      const subscriptionsData = await listSubscriptions(session, {
        limit: 50,
        sort_by: 'created_at-desc'
      });
      
      return {
        customer: customerData,
        subscriptions: subscriptionsData.subscriptions || []
      };
    } catch (error) {
      console.error('Failed to get customer data:', error);
      throw error;
    }
  }
}