import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Choose your Bundle | Sunfruit',
  description: 'Discover our curated bundle options for organic fruit and botanicals.',
  openGraph: {
    title: 'Choose your Bundle | Sunfruit',
    description: 'Discover our curated bundle options for organic fruit and botanicals.',
    type: 'website',
  },
};

export default function BundlePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main>
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-12 text-left">
              Choose your Bundle
            </h1>
            
            {/* Bundle content will go here */}
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Bundle options coming soon...
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}