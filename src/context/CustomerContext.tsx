'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  customerLogin, 
  customerLogout, 
  customerRegister, 
  getCustomer, 
  requestPasswordReset,
  resetPassword,
  updateCustomerAddress,
  updateCustomerInfo as updateCustomerInfoAPI,
  Customer
} from '@/lib/customer';

interface CustomerContextType {
  customer: Customer | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ success: boolean; error?: string }>;
  requestReset: (email: string) => Promise<{ success: boolean; error?: string }>;
  resetCustomerPassword: (resetToken: string, password: string) => Promise<{ success: boolean; error?: string }>;
  updateAddress: (addressId: string | null, address: any) => Promise<{ success: boolean; error?: string }>;
  updateCustomerInfo: (customerInfo: any) => Promise<{ success: boolean; error?: string }>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Helper functions for localStorage
  const getFromStorage = useCallback((key: string) => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  }, []);

  const setInStorage = useCallback((key: string, value: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }, []);

  const removeFromStorage = useCallback((key: string) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }, []);

  // Check if user is logged in on mount
  useEffect(() => {
    const initializeCustomer = async () => {
      console.log("CustomerContext: initializing customer");
      setIsLoading(true);
      try {
        const storedToken = getFromStorage('customerAccessToken');
        console.log("CustomerContext: found stored token?", !!storedToken);
        
        if (storedToken) {
          try {
            const parsedToken = JSON.parse(storedToken);
            const { accessToken, expiresAt } = parsedToken;
            console.log("CustomerContext: token expires at", new Date(expiresAt));
            
            // Check if token is expired
            if (new Date(expiresAt) > new Date()) {
              console.log("CustomerContext: token is valid, setting access token");
              setAccessToken(accessToken);
              console.log("CustomerContext: fetching customer data with stored token");
              const customerData = await getCustomer(accessToken);
              console.log("CustomerContext: customer data received?", !!customerData);
              
              if (customerData) {
                console.log("CustomerContext: setting customer data", customerData);
                setCustomer(customerData);
              } else {
                // Token valid but customer not found - clear storage
                console.log("CustomerContext: no customer data found, clearing token");
                removeFromStorage('customerAccessToken');
              }
            } else {
              // Token expired - clear storage
              console.log("CustomerContext: token expired, clearing");
              removeFromStorage('customerAccessToken');
            }
          } catch (e) {
            // Invalid token format - clear storage
            console.error("CustomerContext: invalid token format", e);
            removeFromStorage('customerAccessToken');
          }
        }
      } catch (error) {
        console.error('CustomerContext: error initializing customer:', error);
      } finally {
        console.log("CustomerContext: finished initialization, isLoggedIn:", !!customer);
        setIsLoading(false);
      }
    };

    initializeCustomer();
  }, [getFromStorage, removeFromStorage]);

  // Login function
  const login = async (email: string, password: string) => {
    console.log("CustomerContext: login called with email", email);
    setIsLoading(true);
    try {
      const { customerAccessToken, errors } = await customerLogin(email, password);
      console.log("CustomerContext: login API response", { hasToken: !!customerAccessToken, errors });
      
      if (errors && errors.length > 0) {
        console.error("CustomerContext: login errors", errors);
        return { success: false, error: errors[0].message };
      }
      
      if (customerAccessToken) {
        console.log("CustomerContext: setting access token", customerAccessToken);
        setAccessToken(customerAccessToken.accessToken);
        setInStorage('customerAccessToken', JSON.stringify(customerAccessToken));
        
        console.log("CustomerContext: fetching customer data with token");
        const customerData = await getCustomer(customerAccessToken.accessToken);
        console.log("CustomerContext: customer data received", !!customerData);
        
        if (customerData) {
          console.log("CustomerContext: setting customer data");
          setCustomer(customerData);
          return { success: true };
        }
      }
      
      console.error("CustomerContext: login failed, no customerAccessToken or customer data");
      return { success: false, error: 'Unable to sign in. Please check your credentials.' };
    } catch (error: any) {
      console.error("CustomerContext: login exception", error);
      return { success: false, error: error.message || 'An error occurred during login' };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    console.log("CustomerContext: logging out user");
    removeFromStorage('customerAccessToken');
    setAccessToken(null);
    setCustomer(null);
    customerLogout();
    console.log("CustomerContext: user logged out");
  };

  // Register function
  const register = async (email: string, password: string, firstName?: string, lastName?: string) => {
    console.log("CustomerContext: register called", { email, firstName, lastName });
    setIsLoading(true);
    try {
      const { customer, customerUserErrors } = await customerRegister(email, password, firstName, lastName);
      console.log("CustomerContext: register API response", { hasCustomer: !!customer, errors: customerUserErrors });
      
      if (customerUserErrors && customerUserErrors.length > 0) {
        console.error("CustomerContext: register errors", customerUserErrors);
        return { success: false, error: customerUserErrors[0].message };
      }
      
      if (customer) {
        // Automatically log in the user after successful registration
        console.log("CustomerContext: register success, attempting login");
        const loginResult = await login(email, password);
        console.log("CustomerContext: auto-login after registration result", loginResult);
        return loginResult;
      }
      
      console.error("CustomerContext: register failed, no customer returned");
      return { success: false, error: 'Unable to create account' };
    } catch (error: any) {
      console.error("CustomerContext: register exception", error);
      return { success: false, error: error.message || 'An error occurred during registration' };
    } finally {
      setIsLoading(false);
    }
  };

  // Request password reset
  const requestReset = async (email: string) => {
    console.log("CustomerContext: requesting password reset for", email);
    setIsLoading(true);
    try {
      const { customerUserErrors } = await requestPasswordReset(email);
      console.log("CustomerContext: password reset request response", { errors: customerUserErrors });
      
      if (customerUserErrors && customerUserErrors.length > 0) {
        console.error("CustomerContext: password reset request errors", customerUserErrors);
        return { success: false, error: customerUserErrors[0].message };
      }
      
      console.log("CustomerContext: password reset request successful");
      return { success: true };
    } catch (error: any) {
      console.error("CustomerContext: password reset request exception", error);
      return { success: false, error: error.message || 'An error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password
  const resetCustomerPassword = async (resetToken: string, password: string) => {
    console.log("CustomerContext: resetting password with token");
    setIsLoading(true);
    try {
      const { customerUserErrors, customerAccessToken } = await resetPassword(resetToken, password);
      console.log("CustomerContext: reset password response", { 
        hasToken: !!customerAccessToken, 
        errors: customerUserErrors 
      });
      
      if (customerUserErrors && customerUserErrors.length > 0) {
        console.error("CustomerContext: reset password errors", customerUserErrors);
        return { success: false, error: customerUserErrors[0].message };
      }
      
      if (customerAccessToken) {
        console.log("CustomerContext: setting access token after password reset");
        setAccessToken(customerAccessToken.accessToken);
        setInStorage('customerAccessToken', JSON.stringify(customerAccessToken));
        
        console.log("CustomerContext: fetching customer data after password reset");
        const customerData = await getCustomer(customerAccessToken.accessToken);
        console.log("CustomerContext: customer data received after password reset?", !!customerData);
        
        if (customerData) {
          console.log("CustomerContext: setting customer data after password reset");
          setCustomer(customerData);
          return { success: true };
        }
      }
      
      console.error("CustomerContext: reset password failed, no access token or customer data");
      return { success: false, error: 'Unable to reset password' };
    } catch (error: any) {
      console.error("CustomerContext: reset password exception", error);
      return { success: false, error: error.message || 'An error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  // Update customer address
  const updateAddress = async (addressId: string | null, address: any) => {
    console.log("CustomerContext: updating address", { addressId, address });
    if (!accessToken) {
      console.error("CustomerContext: cannot update address, no access token");
      return { success: false, error: 'You must be logged in to update your address' };
    }
    
    setIsLoading(true);
    try {
      const { customerAddress, customerUserErrors } = await updateCustomerAddress(
        accessToken,
        addressId,
        address
      );
      console.log("CustomerContext: update address response", { 
        hasAddress: !!customerAddress, 
        errors: customerUserErrors 
      });
      
      if (customerUserErrors && customerUserErrors.length > 0) {
        console.error("CustomerContext: update address errors", customerUserErrors);
        return { success: false, error: customerUserErrors[0].message };
      }
      
      if (customerAddress) {
        // Refresh customer data to get updated addresses
        console.log("CustomerContext: fetching updated customer data after address update");
        const customerData = await getCustomer(accessToken);
        console.log("CustomerContext: customer data received after address update?", !!customerData);
        
        if (customerData) {
          console.log("CustomerContext: setting updated customer data after address update");
          setCustomer(customerData);
          return { success: true };
        }
      }
      
      console.error("CustomerContext: update address failed, no customer address or customer data");
      return { success: false, error: 'Unable to update address' };
    } catch (error: any) {
      console.error("CustomerContext: update address exception", error);
      return { success: false, error: error.message || 'An error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  // Update customer info
  const updateCustomerInfo = async (customerInfo: any) => {
    console.log("CustomerContext: updating customer info", customerInfo);
    if (!accessToken) {
      console.error("CustomerContext: cannot update customer info, no access token");
      return { success: false, error: 'You must be logged in to update your information' };
    }
    
    setIsLoading(true);
    try {
      const { customer, customerUserErrors } = await updateCustomerInfoAPI(
        accessToken,
        customerInfo
      );
      console.log("CustomerContext: update customer info response", { 
        hasCustomer: !!customer, 
        errors: customerUserErrors 
      });
      
      if (customerUserErrors && customerUserErrors.length > 0) {
        console.error("CustomerContext: update customer info errors", customerUserErrors);
        return { success: false, error: customerUserErrors[0].message };
      }
      
      if (customer) {
        // Refresh customer data
        console.log("CustomerContext: fetching updated customer data after info update");
        const customerData = await getCustomer(accessToken);
        console.log("CustomerContext: customer data received after info update?", !!customerData);
        
        if (customerData) {
          console.log("CustomerContext: setting updated customer data after info update");
          setCustomer(customerData);
          return { success: true };
        }
      }
      
      console.error("CustomerContext: update customer info failed, no customer or customer data");
      return { success: false, error: 'Unable to update information' };
    } catch (error: any) {
      console.error("CustomerContext: update customer info exception", error);
      return { success: false, error: error.message || 'An error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  console.log("CustomerContext: rendering with isLoggedIn:", !!customer, "isLoading:", isLoading);

  return (
    <CustomerContext.Provider
      value={{
        customer,
        isLoggedIn: !!customer,
        isLoading,
        login,
        logout,
        register,
        requestReset,
        resetCustomerPassword,
        updateAddress,
        updateCustomerInfo
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

// Custom hook to use the customer context
export function useCustomer() {
  const context = useContext(CustomerContext);
  
  if (context === undefined) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  
  return context;
}