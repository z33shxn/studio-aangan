export const pricing = {
  packages: [
    {
      name: "Essential",
      tagline: "Design-led, you execute.",
      price: "₹120–₹150/sq ft",
      features: [
        "Space Planning & Layout",
        "3D Visualisation",
        "Material Specifications",
        "Detailed BOQ",
        "Execution Drawings"
      ],
      popular: false
    },
    {
      name: "Signature",
      tagline: "Design + managed turnkey.",
      price: "₹1,800–₹2,600/sq ft",
      features: [
        "Everything in Essential",
        "End-to-End Execution",
        "Project Management",
        "Curated Furniture",
        "Final Styling & Handover"
      ],
      popular: true
    },
    {
      name: "Bespoke",
      tagline: "Architectural + custom everything.",
      price: "₹2,600–₹3,800/sq ft",
      features: [
        "Everything in Signature",
        "Bespoke Joinery",
        "Imported Finishes",
        "Art Curation",
        "Smart Home Integration"
      ],
      popular: false
    }
  ],
  calculatorBands: {
    "Bengaluru": { "Essential": 135, "Signature": 2200, "Bespoke": 3200 },
    "Hyderabad": { "Essential": 130, "Signature": 2100, "Bespoke": 3000 },
    "Pune":      { "Essential": 140, "Signature": 2300, "Bespoke": 3400 },
    "Chennai":   { "Essential": 135, "Signature": 2200, "Bespoke": 3200 },
    "Kochi":     { "Essential": 125, "Signature": 2000, "Bespoke": 2800 },
  },
  note: "Prices in ₹ (INR), exclusive of 18% GST unless stated."
};
