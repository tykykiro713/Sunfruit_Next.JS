import ResetPasswordClient from './ResetPasswordClient';

interface PageProps {
  params: Promise<{ resetToken: string }>;
}

export default async function ResetPasswordPage({ params }: PageProps) {
  const { resetToken } = await params;
  
  return <ResetPasswordClient resetToken={decodeURIComponent(resetToken)} />;
}