import Navigation from "@/components/Navigation";
import ProductRecirculation from "@/components/ProductRecirculation"
import Footer from "@/components/Footer";
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid';

export default function AboutPage() {
  return (
    <div>
      <Navigation />
      <div className="bg-gray-50 px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
          <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-5xl">
            Our Story
          </h1>
          <p className="mt-6 text-xl/8">
            We're a dedicated team passionate about creating innovative solutions. Our mission is to deliver exceptional products and services that make a difference in people's lives.
          </p>
          <div className="mt-6 text-xl/8">
            <p>
              Founded with a vision to revolutionize the industry, we've been on a journey to create products that combine quality, sustainability, and innovation. Our team brings together diverse expertise and a shared commitment to excellence.
            </p>
            <ul role="list" className="mt-6 text-xl/8 space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <CheckCircleIcon aria-hidden="true" className="mt-1 size-5 flex-none text-brightgreen-500" />
                <span>
                  <strong className="font-semibold text-gray-900">Quality First.</strong> We never compromise on the quality of our products, sourcing only the finest ingredients and materials to ensure exceptional experiences for our customers.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon aria-hidden="true" className="mt-1 size-5 flex-none text-brightgreen-500" />
                <span>
                  <strong className="font-semibold text-gray-900">Sustainability.</strong> Environmental responsibility is at the heart of everything we do, from our sourcing practices to our packaging choices.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon aria-hidden="true" className="mt-1 size-5 flex-none text-brightgreen-500" />
                <span>
                  <strong className="font-semibold text-gray-900">Innovation.</strong> We're constantly exploring new ideas and technologies to improve our products and create better solutions for our customers.
                </span>
              </li>
            </ul>
            <p className="mt-8">
              Our journey began with a simple idea: to create products that we ourselves would love to use. This philosophy continues to guide our development process, ensuring that every item we offer meets our high standards.
            </p>
            <h2 className="mt-16 text-pretty text-3xl font-semibold tracking-tight text-emeraldgreen-500">
              Meet Our Team
            </h2>
            <p className="mt-6">
              Behind every great product is a team of dedicated individuals working tirelessly to bring it to life. Our diverse team brings together expertise from various fields, united by a shared passion for excellence and innovation.
            </p>
            <figure className="mt-10 border-l border-indigo-600 pl-9">
              <blockquote className="font-semibold text-gray-900">
                <p>
                  "What sets us apart is our unwavering commitment to quality and customer satisfaction. We believe in creating products that not only meet but exceed expectations, establishing lasting relationships with our customers based on trust and reliability."
                </p>
              </blockquote>
              <figcaption className="mt-6 flex gap-x-4">
                <img
                  alt="Founder"
                  src="/images/founder.jpg"
                  className="size-6 flex-none rounded-full bg-gray-50"
                />
                <div className="text-sm/6">
                  <strong className="font-semibold text-gray-900">Sarah Johnson</strong> – Founder & CEO
                </div>
              </figcaption>
            </figure>
            <p className="mt-10">
              Our team's collective expertise allows us to approach challenges from multiple perspectives, resulting in innovative solutions that address real customer needs. We value collaboration, creativity, and a commitment to continuous improvement.
            </p>
          </div>
          <figure className="mt-16">
            <img
              alt="Our team at work"
              src="/images/team.jpg"
              className="aspect-video rounded-xl bg-gray-50 object-cover"
            />
            <figcaption className="mt-4 flex gap-x-2 text-sm/6 text-gray-500">
              <InformationCircleIcon aria-hidden="true" className="mt-0.5 size-5 flex-none text-gray-300" />
              Our team collaborating on new product development.
            </figcaption>
          </figure>
          <div className="mt-16 max-w-2xl">
            <h2 className="text-pretty text-3xl font-semibold tracking-tight text-emeraldgreen-500">
              Our Vision for the Future
            </h2>
            <p className="mt-6 text-xl/8">
              As we look ahead, we remain committed to our founding principles while embracing new opportunities for growth and innovation. We're excited to continue developing products that make a positive impact and building relationships with customers who share our values.
            </p>
            <p className="mt-6 text-xl/8">
              Thank you for taking the time to learn more about us. We invite you to explore our products and join us on our journey to create better solutions for a better future.
            </p>
          </div>
        </div>
      </div>
      <ProductRecirculation />
      <div className="h-16 bg-white"></div>
      <Footer />
    </div>
  );
}