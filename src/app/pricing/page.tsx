"use client";

import { useState } from "react";
import { pricing } from "@/content/pricing";
import { Reveal } from "@/components/motion/Reveal";
import { Check } from "lucide-react";

export default function PricingPage() {
  const [area, setArea] = useState<number>(1200);
  const [city, setCity] = useState<string>("Bengaluru");
  const [packageType, setPackageType] = useState<string>("Signature");

  const cities = Object.keys(pricing.calculatorBands);
  // @ts-ignore
  const baseRate = pricing.calculatorBands[city][packageType];
  const estimate = area * baseRate;

  return (
    <div className="flex flex-col pt-24 pb-32">
      <div className="container mx-auto px-6 max-w-7xl">
        <Reveal>
          <h1 className="font-serif text-5xl md:text-7xl mb-8">Pricing</h1>
          <p className="text-xl md:text-2xl text-ink/70 max-w-3xl mb-24 leading-relaxed">
            Transparent, predictable pricing based on your carpet area and location.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {pricing.packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 0.1} className={`flex flex-col p-8 border ${pkg.popular ? 'border-brass bg-bone' : 'border-ink/10'}`}>
              {pkg.popular && <span className="text-[10px] uppercase tracking-widest font-medium text-brass mb-4 block">Most Popular</span>}
              <h3 className="font-serif text-3xl mb-2">{pkg.name}</h3>
              <p className="text-ink/70 mb-6 italic">{pkg.tagline}</p>
              <div className="text-2xl font-medium mb-8">{pkg.price}</div>
              <ul className="space-y-4 mb-8 flex-1">
                {pkg.features.map((feature, j) => (
                  <li key={j} className="flex gap-3 text-sm text-ink/80">
                    <Check className="w-5 h-5 text-brass shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="bg-ink text-paper p-8 md:p-12">
            <h2 className="font-serif text-4xl mb-2">Estimate Calculator</h2>
            <p className="text-paper/70 mb-12">Get a rough estimate for your project. Final quotation depends on material selections.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-7 space-y-8">
                <div>
                  <label className="block text-sm uppercase tracking-widest font-medium text-paper/70 mb-4">
                    Carpet Area: {area} sq ft
                  </label>
                  <input 
                    type="range" 
                    min="500" 
                    max="5000" 
                    step="50" 
                    value={area} 
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full accent-brass cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-paper/40 mt-2">
                    <span>500 sq ft</span>
                    <span>5000+ sq ft</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm uppercase tracking-widest font-medium text-paper/70 mb-4">City</label>
                    <select 
                      value={city} 
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-transparent border-b border-paper/20 pb-2 text-lg focus:outline-none focus:border-brass cursor-pointer"
                    >
                      {cities.map(c => <option key={c} value={c} className="bg-ink text-paper">{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm uppercase tracking-widest font-medium text-paper/70 mb-4">Package</label>
                    <select 
                      value={packageType} 
                      onChange={(e) => setPackageType(e.target.value)}
                      className="w-full bg-transparent border-b border-paper/20 pb-2 text-lg focus:outline-none focus:border-brass cursor-pointer"
                    >
                      {pricing.packages.map(p => <option key={p.name} value={p.name} className="bg-ink text-paper">{p.name}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 bg-paper/5 p-8 flex flex-col justify-center">
                <p className="text-sm uppercase tracking-widest text-paper/60 mb-2">Estimated Cost</p>
                <div className="font-serif text-5xl md:text-6xl text-brass mb-4">
                  ₹{new Intl.NumberFormat('en-IN').format(estimate)}
                </div>
                <p className="text-xs text-paper/40">{pricing.note}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
