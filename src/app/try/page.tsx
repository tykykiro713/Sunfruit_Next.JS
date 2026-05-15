import { SamplePackProvider } from '@/components/try/SamplePackProvider';
import MinimalHeader from '@/components/try/MinimalHeader';
import MinimalFooter from '@/components/try/MinimalFooter';
import TryHero from '@/components/try/TryHero';
import TryTrustStrip from '@/components/try/TryTrustStrip';
import TryHowItWorks from '@/components/try/TryHowItWorks';
import TryFlavorShowcase from '@/components/try/TryFlavorShowcase';
import TryWhyBlock from '@/components/try/TryWhyBlock';
import TryReviews from '@/components/try/TryReviews';
import TryUGCStrip from '@/components/try/TryUGCStrip';
import TryFaqs from '@/components/try/TryFaqs';
import TryFinalCTA from '@/components/try/TryFinalCTA';
import StickyMobileCTA from '@/components/try/StickyMobileCTA';

export const metadata = {
  title: 'Try Sunfruit for Free — $5 Shipping',
  description:
    'Try every Sunfruit flavor for free — just $5 shipping. Variety sample pack ships today. USDA Organic, no sugar, no artificial anything.',
  openGraph: {
    title: 'Try Sunfruit for Free — $5 Shipping',
    description:
      'Try every Sunfruit flavor for free — just $5 shipping. Variety sample pack ships today.',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function TryPage() {
  return (
    <SamplePackProvider>
      <div className="min-h-screen bg-white">
        <MinimalHeader />
        <main>
          <TryHero />
          <TryTrustStrip />
          <TryHowItWorks />
          <TryFlavorShowcase />
          <TryWhyBlock />
          <TryReviews />
          <TryUGCStrip />
          <TryFaqs />
          <TryFinalCTA />
        </main>
        <MinimalFooter />
        <StickyMobileCTA />
      </div>
    </SamplePackProvider>
  );
}
