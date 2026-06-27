import { SamplePackProvider } from '@/components/try/SamplePackProvider';
import MinimalHeader from '@/components/try/MinimalHeader';
import MinimalFooter from '@/components/try/MinimalFooter';
import TryHero from '@/components/try/TryHero';
import TryTrustStrip from '@/components/try/TryTrustStrip';
import TryCategoryClaim from '@/components/try/TryCategoryClaim';
import TryWhatsInOut from '@/components/try/TryWhatsInOut';
import TryMidCTABand from '@/components/try/TryMidCTABand';
import TryReasonsList from '@/components/try/TryReasonsList';
import TryFlavorShowcase from '@/components/try/TryFlavorShowcase';
import TryIngredientCards from '@/components/try/TryIngredientCards';
import TryComparisonChart from '@/components/try/TryComparisonChart';
import TryWhoFor from '@/components/try/TryWhoFor';
import TryFullBleedBreak from '@/components/try/TryFullBleedBreak';
import TryVideoGrid from '@/components/try/TryVideoGrid';
import TryReviews from '@/components/try/TryReviews';
import TryFaqs from '@/components/try/TryFaqs';
import TryFinalCTA from '@/components/try/TryFinalCTA';
import StickyMobileCTA from '@/components/try/StickyMobileCTA';

export const metadata = {
  title: 'Try Sunfruit for Free — $5 Shipping',
  description:
    'Try every Sunfruit flavor for free — just $5 shipping. The first daily organic beverage mix. Zero sugar, zero sodium, nothing artificial.',
  openGraph: {
    title: 'Try Sunfruit for Free — $5 Shipping',
    description:
      'The first daily organic beverage mix. 3 botanical flavors. Sample pack ships today.',
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
          <TryCategoryClaim />
          <TryWhatsInOut />
          <TryMidCTABand
            id="try-mid-cta-1"
            eyebrow="No commitment. No catch."
            headline="Try all 3 flavors — on us."
          />
          <TryReasonsList />
          <TryFlavorShowcase />
          <TryIngredientCards />
          <TryComparisonChart />
          <TryWhoFor />
          <TryMidCTABand
            id="try-mid-cta-2"
            eyebrow="Ready when you are"
            headline="Pick my sample pack."
            buttonLabel="Get my free samples"
          />
          <TryFullBleedBreak />
          <TryVideoGrid />
          <TryReviews />
          <TryFaqs />
          <TryFinalCTA />
        </main>
        <MinimalFooter />
        <StickyMobileCTA />
      </div>
    </SamplePackProvider>
  );
}
