import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";

// Type definitions
export interface CustomerAddress {
  id: string;
  address1: string;
  address2?: string;
  city: string;
  country: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  province?: string;
  zip: string;
}

export interface CustomerOrder {
  id: string;
  orderNumber: number;
  processedAt: string;
  statusUrl: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  lineItems: {
    edges: {
      node: {
        title: string;
        quantity: number;
        variant: {
          price: {
            amount: string;
            currencyCode: string;
          };
          image: {
            url: string;
            altText?: string;
          };
        };
      };
    }[];
  };
}

export interface Customer {
  id: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email: string;
  phone?: string;
  defaultAddress?: CustomerAddress;
  addresses: {
    edges: {
      node: CustomerAddress;
    }[];
  };
  orders: {
    edges: {
      node: CustomerOrder;
    }[];
  };
}

// GraphQL Mutations and Queries
export const CUSTOMER_LOGIN = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const CUSTOMER_REGISTER = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const CUSTOMER_PASSWORD_RESET_REQUEST = gql`
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const CUSTOMER_PASSWORD_RESET = gql`
  mutation customerResetByUrl($resetUrl: URL!, $password: String!) {
    customerResetByUrl(resetUrl: $resetUrl, password: $password) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const GET_CUSTOMER = gql`
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      displayName
      email
      phone
      defaultAddress {
        id
        address1
        address2
        city
        country
        firstName
        lastName
        phone
        province
        zip
      }
      addresses(first: 10) {
        edges {
          node {
            id
            address1
            address2
            city
            country
            firstName
            lastName
            phone
            province
            zip
          }
        }
      }
      orders(first: 10) {
        edges {
          node {
            id
            orderNumber
            processedAt
            statusUrl
            totalPrice {
              amount
              currencyCode
            }
            lineItems(first: 5) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    price {
                      amount
                      currencyCode
                    }
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const UPDATE_CUSTOMER_ADDRESS = gql`
  mutation customerAddressUpdate(
    $customerAccessToken: String!
    $id: ID!
    $address: MailingAddressInput!
  ) {
    customerAddressUpdate(
      customerAccessToken: $customerAccessToken
      id: $id
      address: $address
    ) {
      customerAddress {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const CREATE_CUSTOMER_ADDRESS = gql`
  mutation customerAddressCreate(
    $customerAccessToken: String!
    $address: MailingAddressInput!
  ) {
    customerAddressCreate(
      customerAccessToken: $customerAccessToken
      address: $address
    ) {
      customerAddress {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

// Add update customer mutations
export const UPDATE_CUSTOMER = gql`
  mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
    customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
      customer {
        id
        firstName
        lastName
        email
        phone
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const UPDATE_CUSTOMER_PASSWORD = gql`
  mutation customerPasswordUpdate($customerAccessToken: String!, $password: String!, $currentPassword: String!) {
    customerPasswordUpdate(customerAccessToken: $customerAccessToken, password: $password, currentPassword: $currentPassword) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

// API Functions
export async function customerLogin(email: string, password: string) {
  try {
    const { data } = await client.mutate({
      mutation: CUSTOMER_LOGIN,
      variables: {
        input: {
          email,
          password,
        },
      },
    });
    
    return {
      customerAccessToken: data.customerAccessTokenCreate.customerAccessToken,
      errors: data.customerAccessTokenCreate.customerUserErrors,
    };
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export async function customerLogout() {
  // This function is basically a placeholder - actual logout is handled client-side
  // by removing the token from localStorage in the customer context
  return true;
}

export async function customerRegister(
  email: string,
  password: string,
  firstName?: string,
  lastName?: string
) {
  try {
    const { data } = await client.mutate({
      mutation: CUSTOMER_REGISTER,
      variables: {
        input: {
          email,
          password,
          firstName,
          lastName,
        },
      },
    });
    
    return {
      customer: data.customerCreate.customer,
      customerUserErrors: data.customerCreate.customerUserErrors,
    };
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}

export async function requestPasswordReset(email: string) {
  try {
    const { data } = await client.mutate({
      mutation: CUSTOMER_PASSWORD_RESET_REQUEST,
      variables: {
        email,
      },
    });
    
    return {
      customerUserErrors: data.customerRecover.customerUserErrors,
    };
  } catch (error) {
    console.error("Error requesting password reset:", error);
    throw error;
  }
}

export async function resetPassword(resetUrl: string, password: string) {
  try {
    const { data } = await client.mutate({
      mutation: CUSTOMER_PASSWORD_RESET,
      variables: {
        resetUrl,
        password,
      },
    });
    
    return {
      customerAccessToken: data.customerResetByUrl.customerAccessToken,
      customerUserErrors: data.customerResetByUrl.customerUserErrors,
    };
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
}

export async function getCustomer(customerAccessToken: string): Promise<Customer | null> {
  try {
    const { data } = await client.query({
      query: GET_CUSTOMER,
      variables: {
        customerAccessToken,
      },
      fetchPolicy: "network-only", // Don't use cache for customer data
    });
    
    return data.customer;
  } catch (error) {
    console.error("Error fetching customer:", error);
    return null;
  }
}

export async function updateCustomerAddress(
  customerAccessToken: string,
  addressId: string | null,
  address: any
) {
  try {
    // If addressId is null, create new address, otherwise update existing one
    const mutation = addressId ? UPDATE_CUSTOMER_ADDRESS : CREATE_CUSTOMER_ADDRESS;
    const variables = addressId
      ? { customerAccessToken, id: addressId, address }
      : { customerAccessToken, address };
    
    const { data } = await client.mutate({
      mutation,
      variables,
    });
    
    // Handle response based on which mutation was used
    if (addressId) {
      return {
        customerAddress: data.customerAddressUpdate.customerAddress,
        customerUserErrors: data.customerAddressUpdate.customerUserErrors,
      };
    } else {
      return {
        customerAddress: data.customerAddressCreate.customerAddress,
        customerUserErrors: data.customerAddressCreate.customerUserErrors,
      };
    }
  } catch (error) {
    console.error("Error updating customer address:", error);
    throw error;
  }
}

// Add updateCustomerInfo function
export async function updateCustomerInfo(
  customerAccessToken: string,
  customerInfo: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    currentPassword?: string;
  }
) {
  try {
    // If updating password
    if (customerInfo.password && customerInfo.currentPassword) {
      const { data } = await client.mutate({
        mutation: UPDATE_CUSTOMER_PASSWORD,
        variables: {
          customerAccessToken,
          password: customerInfo.password,
          currentPassword: customerInfo.currentPassword,
        },
      });
      
      return {
        customer: data.customerPasswordUpdate.customer,
        customerUserErrors: data.customerPasswordUpdate.customerUserErrors,
      };
    }
    
    // Otherwise updating general info
    const { data } = await client.mutate({
      mutation: UPDATE_CUSTOMER,
      variables: {
        customerAccessToken,
        customer: {
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          email: customerInfo.email,
          phone: customerInfo.phone,
        },
      },
    });
    
    return {
      customer: data.customerUpdate.customer,
      customerUserErrors: data.customerUpdate.customerUserErrors,
    };
  } catch (error) {
    console.error("Error updating customer info:", error);
    throw error;
  }
}