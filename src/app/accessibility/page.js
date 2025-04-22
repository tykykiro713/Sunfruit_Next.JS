import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid';

export default function AccessibilityPage() {
  return (
    <div>
      <Navigation />
      <div className="bg-gray-50 px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
          <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-5xl">
            Accessibility
          </h1>
          <p className="mt-6 text-xl/8">
            At Sunfruit, we are dedicated to ensuring our website content is accessible and user-friendly for everyone. If you experience any difficulties viewing or navigating our website, or if you notice any features or content that you believe isn&apos;t fully accessible to individuals with disabilities, we want to hear from you. Please contact our Customer Support team at (919) 229-9255 or email us at hello@sunfruit.com with &quot;Accessibility Feedback&quot; in the subject line and include a description of the specific feature you find challenging or your suggestion for improvement. We value your feedback and will carefully consider it as we evaluate ways to better accommodate all our customers and enhance our overall accessibility practices.
          </p>
        </div>
      </div>
      <div className="h-16 bg-white"></div>
      <Footer />
    </div>
  );
}