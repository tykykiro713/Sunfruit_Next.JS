"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  OFFICE_RETAIL_PRICE_PER_STICK,
  startOfficeSubscriptionCheckout,
  type OfficeCheckoutResult,
  type OfficeSelections,
  type ResolvedOfficeFlavor,
} from "@/lib/offices/subscription";
import { trackEvent } from "@/lib/analytics";
import OfficeQuantityStepper from "./OfficeQuantityStepper";

const currency = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

interface OfficeOrderFormProps {
  flavors: ResolvedOfficeFlavor[];
}

export default function OfficeOrderForm({ flavors }: OfficeOrderFormProps) {
  const [selections, setSelections] = useState<OfficeSelections>(() =>
    Object.fromEntries(flavors.map((f) => [f.key, 0])),
  );
  const [companyName, setCompanyName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<OfficeCheckoutResult | null>(null);

  // Page view (existing GA wrapper; no-op if gtag absent).
  useEffect(() => {
    trackEvent("view_offices", { page_path: "/quickorder" });
  }, []);

  const totalCases = useMemo(
    () => Object.values(selections).reduce((sum, n) => sum + n, 0),
    [selections],
  );

  const pricePerDelivery = useMemo(
    () =>
      flavors.reduce((sum, f) => sum + (selections[f.key] ?? 0) * f.casePrice, 0),
    [flavors, selections],
  );

  // All flavors share the same case size/price; derive the per-stick figure once.
  const pricePerStick = flavors[0]
    ? flavors[0].casePrice / flavors[0].sticksPerCase
    : 0;

  const companyProvided = companyName.trim().length > 0;
  const hasCases = totalCases >= 1;
  const canCheckout = hasCases && companyProvided;

  const setQuantity = (key: string, next: number) => {
    setResult(null);
    setSelections((prev) => ({ ...prev, [key]: next }));
  };

  const handleCheckout = async () => {
    setSubmitted(true);
    setResult(null);
    if (!canCheckout || isSubmitting) return;

    setIsSubmitting(true);
    trackEvent("add_to_cart", {
      currency: "USD",
      value: pricePerDelivery,
      items: flavors
        .filter((f) => (selections[f.key] ?? 0) > 0)
        .map((f) => ({
          item_id: f.sku,
          item_name: f.name,
          price: f.casePrice,
          quantity: selections[f.key],
        })),
    });
    trackEvent("begin_checkout", {
      currency: "USD",
      value: pricePerDelivery,
      total_cases: totalCases,
    });

    try {
      const checkout = await startOfficeSubscriptionCheckout({
        flavors,
        selections,
        companyName,
      });
      // On success the browser redirects to Shopify; only non-redirect states
      // surface here.
      if (checkout.status !== "redirecting") setResult(checkout);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <header className="text-left">
        <h1 className="text-3xl font-bold tracking-tight text-emeraldgreen-500 sm:text-4xl">
          Quick Order — Cases
        </h1>
        <p className="mt-3 max-w-md text-base leading-relaxed text-gray-600">
          Organic drink mix, delivered to your office every month.
        </p>
      </header>

      {/* Case offer note */}
      <div className="mt-8 rounded-xl border border-emeraldgreen-100 bg-emeraldgreen-50 px-4 py-4 text-left">
        <p className="text-xl font-bold text-emeraldgreen-700 sm:text-2xl">
          Save 25% on all cases
        </p>
        <p className="mt-1 text-sm text-emeraldgreen-800">
          <span className="text-emeraldgreen-600/60 line-through">
            {currency(OFFICE_RETAIL_PRICE_PER_STICK)}/stick
          </span>{" "}
          <span className="font-semibold">{currency(pricePerStick)}/stick</span>
          <span className="text-emeraldgreen-700"> · 288 servings per case</span>
        </p>
      </div>

      {/* Flavor rows */}
      <ul className="mt-8 divide-y divide-gray-100 border-y border-gray-100">
        {flavors.map((flavor) => (
          <li
            key={flavor.key}
            className="flex items-center justify-between gap-4 py-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              {flavor.imageUrl ? (
                <Image
                  src={flavor.imageUrl}
                  alt={flavor.imageAlt}
                  width={56}
                  height={56}
                  className="h-14 w-14 flex-shrink-0 rounded-lg object-cover ring-1 ring-gray-200"
                />
              ) : (
                <div className="h-14 w-14 flex-shrink-0 rounded-lg bg-gray-100 ring-1 ring-gray-200" />
              )}
              <div className="min-w-0">
                <p className="truncate font-medium text-gray-900">
                  {flavor.name}
                </p>
                <p className="mt-0.5 text-sm text-gray-500">
                  {flavor.caseDescriptor} · {currency(flavor.casePrice)}/case
                </p>
                {!flavor.availableForSale && (
                  <p className="mt-0.5 text-sm text-red-600">
                    Currently unavailable
                  </p>
                )}
              </div>
            </div>
            <OfficeQuantityStepper
              label={flavor.name}
              value={selections[flavor.key] ?? 0}
              onChange={(next) => setQuantity(flavor.key, next)}
              max={flavor.availableForSale ? 999 : 0}
            />
          </li>
        ))}
      </ul>

      {/* Order summary */}
      <div className="mt-8 rounded-xl bg-gray-50 p-5">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Total cases</span>
          <span className="font-medium text-gray-900">{totalCases}</span>
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-base font-medium text-gray-900">
            Price per delivery
          </span>
          <span className="text-xl font-semibold text-gray-900">
            {currency(pricePerDelivery)}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500">Delivered monthly.</p>
      </div>

      {/* Company name — required (directly above the CTA) */}
      <div className="mt-8">
        <label
          htmlFor="company-name"
          className="mb-1.5 block text-sm font-medium text-gray-900"
        >
          Company name{" "}
          <span className="font-normal text-gray-500">(required)</span>
        </label>
        <input
          id="company-name"
          type="text"
          autoComplete="organization"
          required
          value={companyName}
          onChange={(e) => {
            setResult(null);
            setCompanyName(e.target.value);
          }}
          placeholder="Acme Inc."
          aria-invalid={submitted && !companyProvided}
          className={`h-16 w-full rounded-lg border px-4 text-base text-gray-900 placeholder-gray-400 transition focus:outline-none focus:ring-2 ${
            submitted && !companyProvided
              ? "border-red-400 focus:border-red-500 focus:ring-red-100"
              : "border-gray-300 focus:border-emeraldgreen-500 focus:ring-emeraldgreen-100"
          }`}
        />
        {submitted && !companyProvided && (
          <p className="mt-1.5 text-sm text-red-600">
            Please enter your company name to continue.
          </p>
        )}
      </div>

      {/* CTA */}
      <div className="mt-6">
        <button
          type="button"
          onClick={handleCheckout}
          disabled={isSubmitting}
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-emeraldgreen-500 px-16 py-3 text-base font-medium text-white transition hover:bg-brightgreen-500 focus:outline-none focus:ring-2 focus:ring-emeraldgreen-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Starting…" : "Continue to Checkout"}
        </button>

        {submitted && !hasCases && (
          <p className="mt-2 text-center text-sm text-red-600">
            Add at least one case to continue.
          </p>
        )}
        {result?.status === "error" && (
          <p className="mt-2 text-center text-sm text-red-600">
            {result.message}
          </p>
        )}
        <p className="mt-3 text-center text-sm text-gray-500">
          Skip, pause, or adjust quantities anytime from your account portal.
        </p>
      </div>
    </div>
  );
}
