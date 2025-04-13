'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCustomer } from '@/context/CustomerContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { CustomerAddress } from '@/lib/customer';

export default function AddressesPage() {
  const { customer, isLoggedIn, isLoading, updateAddress } = useCustomer();
  const router = useRouter();
  
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  
  // New address form state
  const [addressForm, setAddressForm] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    province: '',
    zip: '',
    country: 'United States',
    phone: '',
  });
  
  useEffect(() => {
    // Redirect to login if not logged in and not currently loading
    if (!isLoading && !isLoggedIn) {
      router.push('/account/login');
    }
  }, [isLoading, isLoggedIn, router]);

  // If editing an address, populate the form with existing address data
  useEffect(() => {
    if (isEditingAddress && customer) {
      const addressToEdit = customer.addresses.edges.find(
        ({ node }) => node.id === isEditingAddress
      )?.node;
      
      if (addressToEdit) {
        setAddressForm({
          firstName: addressToEdit.firstName || '',
          lastName: addressToEdit.lastName || '',
          address1: addressToEdit.address1 || '',
          address2: addressToEdit.address2 || '',
          city: addressToEdit.city || '',
          province: addressToEdit.province || '',
          zip: addressToEdit.zip || '',
          country: addressToEdit.country || 'United States',
          phone: addressToEdit.phone || '',
        });
      }
    }
  }, [isEditingAddress, customer]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    
    // Validate required fields
    if (!addressForm.firstName || !addressForm.lastName || !addressForm.address1 || !addressForm.city || !addressForm.zip || !addressForm.country) {
      setFormError('Please fill out all required fields');
      return;
    }
    
    try {
      const result = await updateAddress(
        isEditingAddress, // If editing, pass the ID, otherwise null for new address
        addressForm
      );
      
      if (result.success) {
        setFormSuccess(isEditingAddress ? 'Address updated successfully' : 'Address added successfully');
        // Reset the form and editing state
        setIsAddingAddress(false);
        setIsEditingAddress(null);
        setAddressForm({
          firstName: '',
          lastName: '',
          address1: '',
          address2: '',
          city: '',
          province: '',
          zip: '',
          country: 'United States',
          phone: '',
        });
      } else {
        setFormError(result.error || 'An error occurred');
      }
    } catch (error: any) {
      setFormError(error.message || 'An error occurred');
    }
  };

  // Helper function to format an address
  const formatAddress = (address: CustomerAddress) => {
    const parts = [
      address.firstName && address.lastName ? `${address.firstName} ${address.lastName}` : '',
      address.address1,
      address.address2,
      address.city && address.province ? `${address.city}, ${address.province}` : address.city || '',
      address.zip,
      address.country,
    ].filter(Boolean);
    
    return parts.join(', ');
  };

  // While checking authentication status, show a loading state
  if (isLoading) {
    return (
      <div>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-emeraldgreen-600"></div>
        </div>
      </div>
    );
  }

  // Only render if logged in
  if (!isLoggedIn) {
    return null; // Will redirect due to useEffect
  }

  return (
    <div>
      <Navigation />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-medium text-gray-900">Saved Addresses</h1>
                <Link href="/account" className="text-sm text-emeraldgreen-600 hover:text-emeraldgreen-500">
                  Back to Account
                </Link>
              </div>
            </div>

            {/* Success/Error Messages */}
            {formSuccess && (
              <div className="mx-6 mt-4 p-4 bg-green-50 text-green-700 rounded-md">
                {formSuccess}
              </div>
            )}
            
            {formError && (
              <div className="mx-6 mt-4 p-4 bg-red-50 text-red-700 rounded-md">
                {formError}
              </div>
            )}
            
            {/* Address Form (for adding/editing) */}
            {(isAddingAddress || isEditingAddress) && (
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  {isEditingAddress ? 'Edit Address' : 'Add New Address'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-800">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={addressForm.firstName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-emeraldgreen-500 focus:ring-emeraldgreen-500 text-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-800">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={addressForm.lastName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-emeraldgreen-500 focus:ring-emeraldgreen-500 text-gray-900"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="address1" className="block text-sm font-medium text-gray-800">
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      id="address1"
                      name="address1"
                      value={addressForm.address1}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-emeraldgreen-500 focus:ring-emeraldgreen-500 text-gray-900"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address2" className="block text-sm font-medium text-gray-800">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      id="address2"
                      name="address2"
                      value={addressForm.address2}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-emeraldgreen-500 focus:ring-emeraldgreen-500 text-gray-900"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-800">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={addressForm.city}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-emeraldgreen-500 focus:ring-emeraldgreen-500 text-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="province" className="block text-sm font-medium text-gray-800">
                        State / Province
                      </label>
                      <input
                        type="text"
                        id="province"
                        name="province"
                        value={addressForm.province}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-emeraldgreen-500 focus:ring-emeraldgreen-500 text-gray-900"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="zip" className="block text-sm font-medium text-gray-800">
                        Zip / Postal Code *
                      </label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={addressForm.zip}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-emeraldgreen-500 focus:ring-emeraldgreen-500 text-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-800">
                        Country *
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={addressForm.country}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-emeraldgreen-500 focus:ring-emeraldgreen-500 text-gray-900"
                        required
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        {/* Add more countries as needed */}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-800">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={addressForm.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-emeraldgreen-500 focus:ring-emeraldgreen-500 text-gray-900"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingAddress(false);
                        setIsEditingAddress(null);
                        setFormError(null);
                        setFormSuccess(null);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emeraldgreen-500 hover:bg-emeraldgreen-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emeraldgreen-500"
                    >
                      {isEditingAddress ? 'Update Address' : 'Add Address'}
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Addresses List */}
            <div className="px-6 py-4">
              {!isAddingAddress && !isEditingAddress && (
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setIsAddingAddress(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emeraldgreen-500 hover:bg-emeraldgreen-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emeraldgreen-500"
                  >
                    Add New Address
                  </button>
                </div>
              )}
              
              {customer && customer.addresses.edges.length > 0 ? (
                <div className="space-y-4">
                  {customer.addresses.edges.map(({ node: address }) => (
                    <div key={address.id} className="bg-gray-50 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900">
                            {address.firstName} {address.lastName}
                          </p>
                          {customer.defaultAddress && customer.defaultAddress.id === address.id && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emeraldgreen-100 text-emeraldgreen-800">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{address.address1}</p>
                        {address.address2 && (
                          <p className="text-sm text-gray-500">{address.address2}</p>
                        )}
                        <p className="text-sm text-gray-500">
                          {address.city}, {address.province} {address.zip}
                        </p>
                        <p className="text-sm text-gray-500">{address.country}</p>
                        {address.phone && (
                          <p className="text-sm text-gray-500">{address.phone}</p>
                        )}
                      </div>
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setIsEditingAddress(address.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={async () => {
                            try {
                              const result = await updateAddress(
                                null, // For setting default
                                { 
                                  id: address.id,
                                  isDefault: true 
                                }
                              );
                              if (result.success) {
                                setFormSuccess('Default address updated');
                              } else {
                                setFormError(result.error || 'An error occurred');
                              }
                            } catch (error: any) {
                              setFormError(error.message || 'An error occurred');
                            }
                          }}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-emeraldgreen-500 hover:bg-emeraldgreen-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emeraldgreen-500"
                          disabled={customer.defaultAddress && customer.defaultAddress.id === address.id}
                        >
                          Set as Default
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No addresses saved</h3>
                  <p className="mt-1 text-sm text-gray-500">Add an address to save it for future orders.</p>
                  
                  {!isAddingAddress && (
                    <div className="mt-6">
                      <button
                        onClick={() => setIsAddingAddress(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emeraldgreen-500 hover:bg-emeraldgreen-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emeraldgreen-500"
                      >
                        Add New Address
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}