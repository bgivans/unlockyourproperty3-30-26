import caseStudy1Img from "@/assets/case-study-1.jpg";
import caseStudy2Img from "@/assets/case-study-2.jpg";
import caseStudy3Img from "@/assets/case-study-3.jpg";
import caseStudy4Img from "@/assets/case-study-4.jpg";

// Real case study photos
import triplexHemetExtImg from "@/assets/cs-triplex-hemet-exterior.jpg";
import triplexHemetAerialImg from "@/assets/cs-triplex-hemet-aerial.jpg";

import fallbrookMission1Img from "@/assets/cs-02-fallbrook-mission-1.jpg";
import fallbrookMission2Img from "@/assets/cs-02-fallbrook-mission-2.jpg";

import hemetSanJacinto1Img from "@/assets/cs-03-hemet-sanjacinto-1.jpg";
import hemetSanJacinto2Img from "@/assets/cs-03-hemet-sanjacinto-2.jpg";

import hemetAcacia1Img from "@/assets/cs-04-hemet-acacia-1.jpg";
import hemetAcacia2Img from "@/assets/cs-04-hemet-acacia-2.jpg";

import hemetGene1Img from "@/assets/cs-05-hemet-gene-1.jpg";
import hemetGene2Img from "@/assets/cs-05-hemet-gene-2.jpg";

import sanJacintoMead1Img from "@/assets/cs-06-sanjacinto-mead-1.jpg";
import sanJacintoMead2Img from "@/assets/cs-06-sanjacinto-mead-2.jpg";

import hemetGirard1Img from "@/assets/cs-07-hemet-girard-1.jpg";
import hemetGirard2Img from "@/assets/cs-07-hemet-girard-2.jpg";

import hemetGrovewood1Img from "@/assets/cs-08-hemet-grovewood-1.jpg";
import hemetGrovewood2Img from "@/assets/cs-08-hemet-grovewood-2.jpg";

import hemetGladiola1Img from "@/assets/cs-09-hemet-gladiola-1.jpg";
import hemetGladiola2Img from "@/assets/cs-09-hemet-gladiola-2.jpg";

import hemetElk1Img from "@/assets/cs-10-hemet-elk-1.jpg";
import hemetElk2Img from "@/assets/cs-10-hemet-elk-2.jpg";

import banningWilson1Img from "@/assets/cs-12-banning-wilson-1.jpg";
import banningWilson2Img from "@/assets/cs-12-banning-wilson-2.jpg";

import escondidoFoxley1Img from "@/assets/cs-13-escondido-foxley-1.jpg";
import escondidoFoxley2Img from "@/assets/cs-13-escondido-foxley-2.jpg";

import escondidoLasPalmas1Img from "@/assets/cs-14-escondido-laspalmas-1.jpg";
import escondidoLasPalmas2Img from "@/assets/cs-14-escondido-laspalmas-2.jpg";

import fallbrookDulin1Img from "@/assets/cs-15-fallbrook-dulin-1.jpg";
import fallbrookDulin2Img from "@/assets/cs-15-fallbrook-dulin-2.jpg";

import sanMarcosBorden1Img from "@/assets/cs-17-sanmarcos-borden-1.jpg";
import sanMarcosBorden2Img from "@/assets/cs-17-sanmarcos-borden-2.jpg";

import delMarAdu1Img from "@/assets/cs-19-delmar-adu-1.jpg";
import delMarAdu2Img from "@/assets/cs-19-delmar-adu-2.jpg";
import delMarAdu3Img from "@/assets/cs-19-delmar-adu-3.jpg";

import escondidoAdu1Img from "@/assets/cs-20-escondido-adu-1.jpg";
import escondidoAdu2Img from "@/assets/cs-20-escondido-adu-2.jpg";

import escondidoGarage1Img from "@/assets/cs-21-escondido-garage-1.jpg";
import escondidoGarage2Img from "@/assets/cs-21-escondido-garage-2.jpg";

import elCajonBeforeImg from "@/assets/cs-22-elcajon-before.jpg";
import elCajonAfter1Img from "@/assets/cs-22-elcajon-after1.jpg";
import elCajonAfter2Img from "@/assets/cs-22-elcajon-after2.jpg";

import sanDiegoBeforeImg from "@/assets/cs-23-sandiego-before.jpg";
import sanDiegoAfter1Img from "@/assets/cs-23-sandiego-after1.jpg";
import sanDiegoAfter2Img from "@/assets/cs-23-sandiego-after2.jpg";

import escondidoProjBeforeImg from "@/assets/cs-24-escondido-proj-before.jpg";
import escondidoProjAfter1Img from "@/assets/cs-24-escondido-proj-after1.jpg";
import escondidoProjAfter2Img from "@/assets/cs-24-escondido-proj-after2.jpg";

export type CaseStudy = {
  title: string;
  address?: string;
  price?: string;
  problem: string;
  whatWeDid: string;
  outcome: string;
  image: string;
  images?: string[];
  imageAlt: string;
  badges: string[];
};

export const caseStudies: CaseStudy[] = [
  // ── Real case studies ────────────────────────────────────────────────
  {
    title: "Triplex Investment — Inland Empire",
    address: "661 Lanier Dr, Hemet, CA 92543",
    price: "$650,000",
    problem: "Buyer was seeking a long-term hold multi-unit property with cash flow potential and room for future ADU development.",
    whatWeDid: "Represented the buyer, secured financing through RWM Home Loans, acquired the triplex, and assisted with tenant placement and lease structuring.",
    outcome: "Property is now generating passive cash flow with a future ADU opportunity identified on the lot.",
    image: triplexHemetExtImg,
    images: [triplexHemetExtImg, triplexHemetAerialImg],
    imageAlt: "Triplex investment property at 661 Lanier Dr, Hemet CA",
    badges: ["Investment Property", "Tenant Placement", "ADU Potential"],
  },
  {
    title: "Value-Add Rental — Seller Financing Deal",
    address: "132 N Mission Rd, Fallbrook, CA 92028",
    price: "$450,000",
    problem: "Underperforming rental required repairs and the seller needed a flexible exit with tax deferral.",
    whatWeDid: "Buyer purchased AS-IS and assumed existing tenants. Structured a seller financing deal with a private note so the seller could defer taxes through a 1031 Exchange.",
    outcome: "Buyer acquired a value-add property with built-in tenants. Seller deferred taxes and reinvested into stronger assets.",
    image: fallbrookMission1Img,
    images: [fallbrookMission1Img, fallbrookMission2Img],
    imageAlt: "132 N Mission Rd, Fallbrook CA — value-add rental property",
    badges: ["Value-Add", "Seller Financing", "1031 Exchange"],
  },
  {
    title: "Uncooperative Tenant Exit — Clean Close",
    address: "521 S San Jacinto St, Hemet, CA 92543",
    price: "$300,000",
    problem: "Owner had an underperforming rental with an uncooperative tenant blocking property access and repairs.",
    whatWeDid: "C2C Legal served a legal notice to regain property access. Sold the property as-is and delivered it vacant at closing.",
    outcome: "Seller deferred taxes through a 1031 Exchange and reinvested out of state into a multi-unit property with stronger cash flow.",
    image: hemetSanJacinto1Img,
    images: [hemetSanJacinto1Img, hemetSanJacinto2Img],
    imageAlt: "521 S San Jacinto St, Hemet CA — tenant exit property",
    badges: ["Legal Notice", "Sold As-Is", "1031 Exchange"],
  },
  {
    title: "Below-Market Rental to First-Time Buyer",
    address: "40362 Acacia Ave, Hemet, CA 92544",
    price: "$260,000",
    problem: "Outdated rental producing below-market income. Tenants vacated after 60-day notice, leaving debris behind.",
    whatWeDid: "Coordinated the tenant exit, cleared the property, and matched it with a first-time homebuyer using FHA financing.",
    outcome: "Seller deferred taxes through a 1031 Exchange and reinvested out of state into a turnkey rental with better returns.",
    image: hemetAcacia1Img,
    images: [hemetAcacia1Img, hemetAcacia2Img],
    imageAlt: "40362 Acacia Ave, Hemet CA — rental property sold to FHA buyer",
    badges: ["FHA Buyer", "Tenant Exit", "1031 Exchange"],
  },
  {
    title: "Vacant Rental — FHA Upgrade & Reinvestment",
    address: "26451 Gene St, Hemet, CA 92544",
    price: "$390,000",
    problem: "Vacant rental requiring repairs and needing FHA-compliant improvements before it could sell to the right buyer.",
    whatWeDid: "Completed all FHA-required improvements, then identified and closed with a qualified FHA buyer.",
    outcome: "Seller deferred taxes through a 1031 Exchange and reinvested out of state into a turnkey rental.",
    image: hemetGene1Img,
    images: [hemetGene1Img, hemetGene2Img],
    imageAlt: "26451 Gene St, Hemet CA — vacant rental upgraded for FHA sale",
    badges: ["FHA Buyer", "Property Upgrades", "1031 Exchange"],
  },
  {
    title: "Tenant Trouble to Multi-Unit Reinvestment",
    address: "560 E Mead St, San Jacinto, CA 92543",
    price: "$270,000",
    problem: "Underperforming rental with uncooperative tenants blocking access and delaying needed repairs.",
    whatWeDid: "C2C Legal served a legal notice to regain access. Property sold as-is and delivered vacant at closing.",
    outcome: "Seller deferred taxes through a 1031 Exchange and reinvested into a multi-unit asset out of state.",
    image: sanJacintoMead1Img,
    images: [sanJacintoMead1Img, sanJacintoMead2Img],
    imageAlt: "560 E Mead St, San Jacinto CA — tenant problem rental sold as-is",
    badges: ["Legal Notice", "Sold As-Is", "1031 Exchange"],
  },
  {
    title: "Vacant Duplex — Passive Investor Exit",
    address: "26213 Girard St, Hemet, CA 92544",
    price: "$400,000",
    problem: "Duplex was vacant, outdated, and in need of repairs — carrying costs were mounting with no income.",
    whatWeDid: "Sold the duplex AS-IS to a passive investor, structured the transaction for a smooth 1031 Exchange for the seller.",
    outcome: "Seller deferred taxes and reinvested out of state into a 4-plex, significantly increasing cash flow.",
    image: hemetGirard1Img,
    images: [hemetGirard1Img, hemetGirard2Img],
    imageAlt: "26213 Girard St, Hemet CA — duplex sold to passive investor",
    badges: ["Duplex", "Passive Investor", "1031 Exchange"],
  },
  {
    title: "Equity Leverage — VA Buyer Match",
    address: "44514 Grovewood Cir, Hemet, CA 92544",
    price: "$410,000",
    problem: "Seller needed to leverage accumulated home equity and market appreciation to upgrade for a growing family.",
    whatWeDid: "Marketed the property, identified a qualified VA buyer with no money down, and structured seller cooperation to make the deal work.",
    outcome: "Seller successfully upgraded their lifestyle. Buyer achieved homeownership with zero down payment.",
    image: hemetGrovewood1Img,
    images: [hemetGrovewood1Img, hemetGrovewood2Img],
    imageAlt: "44514 Grovewood Cir, Hemet CA — home sold to VA buyer",
    badges: ["VA Loan", "Home Equity", "Market Appreciation"],
  },
  {
    title: "Family Upsize — $60K Negotiated Savings",
    address: "565 Gladiola St, Hemet, CA 92545",
    price: "$530,000",
    problem: "Growing family needed to upsize into a larger home and maximize their purchasing power.",
    whatWeDid: "Secured FHA loan financing through RWM Home Loans and negotiated $60,000 off the asking price with seller cooperation.",
    outcome: "Family moved into their 5-bedroom dream home — homeownership made possible through strategic negotiation.",
    image: hemetGladiola1Img,
    images: [hemetGladiola1Img, hemetGladiola2Img],
    imageAlt: "565 Gladiola St, Hemet CA — family upsize with FHA loan",
    badges: ["FHA Loan", "$60K Negotiated", "Family Upsize"],
  },
  {
    title: "4-Unit Portfolio Builder — Passive Income",
    address: "230 N Elk St, Hemet, CA 92543",
    price: "$737,000",
    problem: "Investor sought to build a real estate portfolio with reliable passive income from a multi-unit property.",
    whatWeDid: "Identified the right 4-unit investment property and financed the buyer through RWM Home Loans.",
    outcome: "Property now generates consistent passive cash flow, forming the foundation of the buyer's growing portfolio.",
    image: hemetElk1Img,
    images: [hemetElk1Img, hemetElk2Img],
    imageAlt: "230 N Elk St, Hemet CA — 4-unit investment property",
    badges: ["4-Unit Investment", "Passive Income", "Portfolio Growth"],
  },
  {
    title: "6-Unit Exit — 1031 Exchange Reinvestment",
    address: "5231 W Wilson St, Banning, CA 92220",
    price: "$785,000",
    problem: "6-unit rental was underperforming and in need of upgrades. C2C Legal served a 60-day notice to resolve occupancy issues.",
    whatWeDid: "Buyer purchased AS-IS and assumed existing tenants. Structured a 1031 Exchange for the seller's tax-deferred exit.",
    outcome: "Seller reinvested out of state into a larger multi-unit asset. Buyer acquired an income property with upside potential.",
    image: banningWilson1Img,
    images: [banningWilson1Img, banningWilson2Img],
    imageAlt: "5231 W Wilson St, Banning CA — 6-unit investment property",
    badges: ["6-Unit Investment", "Legal Notice", "1031 Exchange"],
  },
  {
    title: "Out-of-State Relocation — New Construction",
    address: "3511 Foxley Dr, Escondido, CA 92026",
    price: "$1,064,379",
    problem: "Out-of-state buyer relocating to North County San Diego needed guidance navigating an unfamiliar market.",
    whatWeDid: "Assisted through multiple showings across North County, ultimately securing a brand-new construction home. Buyer purchased in cash.",
    outcome: "Buyer successfully downsized and relocated closer to family — a strategic life transition executed seamlessly.",
    image: escondidoFoxley1Img,
    images: [escondidoFoxley1Img, escondidoFoxley2Img],
    imageAlt: "3511 Foxley Dr, Escondido CA — new construction relocation purchase",
    badges: ["New Construction", "Cash Purchase", "Relocation"],
  },
  {
    title: "Military Family Downsize & Relocation",
    address: "1715 Las Palmas, Escondido, CA 92027",
    price: "$850,000",
    problem: "Military family needed to downsize and relocate, leveraging their equity to make the next move financially viable.",
    whatWeDid: "Leveraged market appreciation and home equity for the seller. Buyer used FHA financing with seller cooperation to close.",
    outcome: "Military family successfully downsized and relocated. Buyer achieved homeownership through creative financing.",
    image: escondidoLasPalmas1Img,
    images: [escondidoLasPalmas1Img, escondidoLasPalmas2Img],
    imageAlt: "1715 Las Palmas, Escondido CA — military family relocation sale",
    badges: ["Military Family", "FHA Financing", "Relocation"],
  },
  {
    title: "Military Divorce Settlement — VA Loan Close",
    address: "4944 Dulin Rd, Fallbrook, CA 92028",
    price: "$647,700",
    problem: "Military couple needed to sell during a divorce settlement — a sensitive transaction requiring a clean, timely exit.",
    whatWeDid: "Leveraged equity and market appreciation for the sellers. Buyer secured the home using a VA loan with zero down.",
    outcome: "Sellers moved forward cleanly. Buyer achieved homeownership with no down payment — both parties reached their next chapter.",
    image: fallbrookDulin1Img,
    images: [fallbrookDulin1Img, fallbrookDulin2Img],
    imageAlt: "4944 Dulin Rd, Fallbrook CA — military divorce settlement sale",
    badges: ["Military", "VA Loan", "Divorce Settlement"],
  },
  {
    title: "Probate Sale — Development Opportunity",
    address: "1165 Borden Rd, San Marcos, CA 92069",
    price: "$640,000",
    problem: "Probate case opened with no will or trust. Seller inherited a vacant property needing repairs, with estate debts to resolve.",
    whatWeDid: "Sold the property AS-IS to resolve estate debts. Identified a buyer who recognized the corner lot's development potential.",
    outcome: "Estate resolved cleanly. Buyer acquired a property with ADU or urban lot split potential.",
    image: sanMarcosBorden1Img,
    images: [sanMarcosBorden1Img, sanMarcosBorden2Img],
    imageAlt: "1165 Borden Rd, San Marcos CA — probate sale with ADU potential",
    badges: ["Probate", "Development Opportunity", "ADU Potential"],
  },
  {
    title: "Del Mar ADU — Equity to Passive Income",
    problem: "Homeowner wanted to unlock equity in their Del Mar property but didn't know how to navigate the ADU permitting process.",
    whatWeDid: "Handled full planning and entitlement, design and permit approval. Owner hired licensed contractor Ricmar Construction Inc to build.",
    outcome: "ADU fully approved and move-in ready. Homeowner downsized into the ADU and now rents the main home for passive income.",
    image: delMarAdu2Img,
    images: [delMarAdu1Img, delMarAdu2Img, delMarAdu3Img],
    imageAlt: "Del Mar ADU — before and after construction",
    badges: ["ADU Construction", "Home Equity", "Passive Income"],
  },
  {
    title: "Escondido ADU — Owner Builder Construction",
    problem: "Homeowner wanted to build a new ADU on their Escondido lot to increase property value and create housing for family.",
    whatWeDid: "Handled planning and entitlement, designed plans, secured approved permits, and guided the owner through owner-builder construction.",
    outcome: "ADU fully approved and move-in ready. Property value increased with flexible housing for family or rental income.",
    image: escondidoAdu2Img,
    images: [escondidoAdu1Img, escondidoAdu2Img],
    imageAlt: "Escondido ADU — new construction before and after",
    badges: ["ADU Construction", "Owner Builder", "Permit Approval"],
  },
  {
    title: "Illegal Garage Conversion — Code Violation Resolved",
    problem: "Homeowner inherited an illegal garage conversion with an open code enforcement case and no permits on record.",
    whatWeDid: "Designed plans, secured permits, closed the code enforcement case, and rectified the structure to meet building code.",
    outcome: "Fully permitted legal ADU unit. Property value increased with housing for family or rental income.",
    image: escondidoGarage1Img,
    images: [escondidoGarage1Img, escondidoGarage2Img],
    imageAlt: "Escondido garage conversion — illegal to legal ADU",
    badges: ["Garage Conversion", "Code Violation", "Legal ADU"],
  },
  {
    title: "El Cajon Full Renovation — Complete Transformation",
    problem: "Severely distressed property requiring a full gut renovation — demolition, debris removal, and structural repairs throughout.",
    whatWeDid: "Executed a complete renovation from demo to finish: new exterior, modernized interior layout, updated systems, and fresh landscaping.",
    outcome: "Property fully transformed and market-ready — delivering significant value appreciation from a distressed shell.",
    image: elCajonAfter1Img,
    images: [elCajonBeforeImg, elCajonAfter1Img, elCajonAfter2Img],
    imageAlt: "El Cajon renovation project — before and after transformation",
    badges: ["Full Renovation", "Before & After", "Value Add"],
  },
  {
    title: "San Diego Full Renovation — Modern Remodel",
    problem: "Dated property with old finishes and deferred maintenance needed a comprehensive remodel to compete in the market.",
    whatWeDid: "Full remodel including new exterior, modernized kitchen, upgraded rear addition, new systems, and improved landscaping.",
    outcome: "Property transformed with modern finishes — dramatically increased market value and buyer appeal.",
    image: sanDiegoAfter1Img,
    images: [sanDiegoBeforeImg, sanDiegoAfter1Img, sanDiegoAfter2Img],
    imageAlt: "San Diego renovation project — before and after remodel",
    badges: ["Full Renovation", "Kitchen Remodel", "Before & After"],
  },
  {
    title: "Escondido Full Renovation — Neglected to Market-Ready",
    problem: "Severely neglected property with hoarded contents, deferred maintenance, and outdated systems throughout the home.",
    whatWeDid: "Full renovation including full cleanout, exterior transformation, complete interior modernization, and new landscaping.",
    outcome: "Complete before-to-after transformation — property restored to excellent condition and positioned for maximum market value.",
    image: escondidoProjAfter1Img,
    images: [escondidoProjBeforeImg, escondidoProjAfter1Img, escondidoProjAfter2Img],
    imageAlt: "Escondido renovation project — before and after transformation",
    badges: ["Full Renovation", "Before & After", "Value Add"],
  },

  // ── Original placeholder case studies ────────────────────────────────
  {
    title: "Outdated Rental With Low Income",
    problem: "The owner had a run-down rental with below-market rents and no clear path to improve returns or exit cleanly.",
    whatWeDid: "We helped repair the property, identified the right buyer, negotiated key concessions, and structured a 1031 exchange.",
    outcome: "The seller exited cleanly and reinvested into a stronger rental with better long-term upside.",
    image: caseStudy1Img,
    imageAlt: "Before and after property transformation",
    badges: ["1031 Exchange", "Property Repairs", "Buyer Negotiation"],
  },
  {
    title: "Homeowner Stuck in a Slow Market",
    problem: "The homeowner needed to sell in a slow market and worried the right buyer would never show up.",
    whatWeDid: "We matched the property with a VA buyer and structured terms that worked for both sides.",
    outcome: "The seller achieved a top-dollar sale and moved smoothly into their next home.",
    image: caseStudy2Img,
    imageAlt: "Home sold successfully",
    badges: ["VA Buyer", "Creative Terms", "Top-Dollar Sale"],
  },
  {
    title: "Tenant Trouble Exit",
    problem: "Uncooperative tenants, property damage, and financing issues were turning the property into a constant headache.",
    whatWeDid: "We handled notice strategy, negotiated cash-for-keys, matched the deal with a cash buyer, and structured a tax-deferred exit.",
    outcome: "The seller turned a stressful situation into liquidity and a clean exit.",
    image: caseStudy3Img,
    imageAlt: "Distressed property to clean exit",
    badges: ["Cash for Keys", "Cash Buyer", "Tax-Deferred Exit"],
  },
  {
    title: "Unlocking Hidden Value",
    problem: "The owner had an underperforming property and was unsure how to unlock its full potential.",
    whatWeDid: "We repositioned the property and structured a 1031 exchange that moved the owner from a single-door asset into a stronger multi-property portfolio.",
    outcome: "One underperforming property became three better-performing assets.",
    image: caseStudy4Img,
    imageAlt: "One property growing into three properties",
    badges: ["1031 Exchange", "Portfolio Growth", "Repositioning Strategy"],
  },
];
