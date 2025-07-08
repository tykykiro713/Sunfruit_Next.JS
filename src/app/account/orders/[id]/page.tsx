import OrderDetailClient from './OrderDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  // TODO: Implement proper order fetching from Shopify API
  // For now, we rely on the order being in the customer's order list
  // which is already loaded in CustomerContext
  
  return <OrderDetailClient orderId={id} />;
}