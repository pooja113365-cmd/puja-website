import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, ArrowRight } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import PujaCard from '../components/PujaCard';
import { PujaGridSkeleton } from '../components/PujaCardSkeleton';
import { ErrorState } from '../components/States';

const QUICK_CATEGORIES = [
  { title: 'Pujas', subtitle: 'Home & Office', img: '/images/hero-puja.jpg', to: '/pujas' },
  { title: 'Homams', subtitle: 'Havan & Shanti', img: '/images/navagraha.jpg', to: '/pujas?category=Navagraha' },
  { title: 'Puja Items', subtitle: 'Samagri Kits', img: '/images/puja-items.jpg', to: '/pujas?hasSamagri=true' },
  { title: 'Temple Services', subtitle: 'Special Rituals', img: '/images/rudrabhishek.jpg', to: '/pujas?location=temple' },
  { title: 'Astrology', subtitle: 'Muhurtham & Dosha', img: '/images/pandit-1.jpg', to: '/purohits' },
  { title: 'Festivals', subtitle: 'Vrat & Celebrations', img: '/images/vivah.jpg', to: '/pujas?category=Vivah' },
];

const PUJA_ITEMS_SHOP = [
  {
    name: 'Puja Samagri',
    tag: 'Complete Kits',
    price: '₹850+',
    img: '/images/puja-items.jpg',
    to: '/pujas?hasSamagri=true',
  },
  {
    name: 'Kumkum & Turmeric',
    tag: 'Pure Organic',
    price: '₹199+',
    img: '/images/satyanarayan.jpg',
    to: '/pujas?hasSamagri=true',
  },
  {
    name: 'Rudraksha & Malas',
    tag: 'Energized Beads',
    price: '₹499+',
    img: '/images/rudrabhishek.jpg',
    to: '/pujas?category=Rudrabhishek',
  },
  {
    name: 'Agarbatti & Dhoop',
    tag: 'Temple Fragrance',
    price: '₹149+',
    img: '/images/navagraha.jpg',
    to: '/pujas?hasSamagri=true',
  },
  {
    name: 'Kalash & More',
    tag: 'Copper & Brass',
    price: '₹650+',
    img: '/images/hero-puja.jpg',
    to: '/pujas?category=Griha+Pravesh',
  },
];

/* Custom Golden SVG Icons (#F7B928 / #F58216) */
function IconCalendarSvg() {
  return (
    <svg viewBox="0 0 28 28" className="h-7 w-7 shrink-0" fill="none">
      <rect x="3.5" y="5.5" width="21" height="19" rx="3" stroke="#F7B928" strokeWidth="2" />
      <path d="M3.5 11H24.5" stroke="#F7B928" strokeWidth="2" />
      <path d="M9 3V7M19 3V7" stroke="#F58216" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="9.5" cy="15.5" r="1.4" fill="#F7B928" />
      <circle cx="14" cy="15.5" r="1.4" fill="#F7B928" />
      <circle cx="18.5" cy="15.5" r="1.4" fill="#F7B928" />
      <circle cx="9.5" cy="19.8" r="1.4" fill="#F58216" />
      <circle cx="14" cy="19.8" r="1.4" fill="#F7B928" />
      <circle cx="18.5" cy="19.8" r="1.4" fill="#F7B928" />
    </svg>
  );
}

function IconShieldSvg() {
  return (
    <svg viewBox="0 0 28 28" className="h-7 w-7 shrink-0" fill="none">
      <path
        d="M14 3L23 6.8V13.8C23 19.4 19.1 23.6 14 25.5C8.9 23.6 5 19.4 5 13.8V6.8L14 3Z"
        stroke="#F7B928"
        strokeWidth="2"
        fill="#F7B928"
        fillOpacity="0.1"
      />
      <path d="M10 14.2L12.8 17L18.5 11.2" stroke="#F7B928" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconTempleSvg() {
  return (
    <svg viewBox="0 0 28 28" className="h-7 w-7 shrink-0" fill="none">
      <path d="M14 2.5L16 6H12L14 2.5Z" fill="#F58216" />
      <path d="M9 6H19L21 11H7L9 6Z" stroke="#F7B928" strokeWidth="1.8" fill="#F7B928" fillOpacity="0.15" />
      <path d="M6 11H22L23.5 16.5H4.5L6 11Z" stroke="#F7B928" strokeWidth="1.8" />
      <path d="M4 16.5H24V24.5H4V16.5Z" stroke="#F7B928" strokeWidth="1.8" />
      <path d="M11.5 24.5V19.5C11.5 18.2 12.6 17.2 14 17.2C15.4 17.2 16.5 18.2 16.5 19.5V24.5" fill="#F58216" />
      <line x1="2.5" y1="24.5" x2="25.5" y2="24.5" stroke="#F7B928" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconCartSvg() {
  return (
    <svg viewBox="0 0 28 28" className="h-7 w-7 shrink-0" fill="none">
      <path
        d="M3.5 5H7L9.6 17.2C9.8 18.2 10.7 19 11.8 19H21.2C22.2 19 23.1 18.3 23.4 17.3L25 10H8"
        stroke="#F7B928"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="11.5" cy="23" r="2" fill="#F58216" />
      <circle cx="20.5" cy="23" r="2" fill="#F58216" />
    </svg>
  );
}

function IconLiveVideoSvg() {
  return (
    <svg viewBox="0 0 28 28" className="h-7 w-7 shrink-0" fill="none">
      <rect x="3" y="5.5" width="22" height="15.5" rx="2.8" stroke="#F7B928" strokeWidth="2" />
      <path d="M12 10.2L17.8 13.3L12 16.4V10.2Z" fill="#F7B928" />
      <path d="M8.5 24H19.5" stroke="#F58216" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconGiftSvg() {
  return (
    <svg viewBox="0 0 28 28" className="h-7 w-7 shrink-0" fill="none">
      <rect x="4" y="11" width="20" height="4.5" rx="1.2" stroke="#F7B928" strokeWidth="1.9" />
      <path d="M5.5 15.5H22.5V23.5C22.5 24.3 21.8 25 21 25H7C6.2 25 5.5 24.3 5.5 23.5V15.5Z" stroke="#F7B928" strokeWidth="1.9" />
      <path d="M14 11V25" stroke="#F58216" strokeWidth="2" />
      <path
        d="M14 11C14 11 10 11 9 8.2C8.2 6.2 10 4.5 11.8 5.8C13.2 6.8 14 11 14 11Z"
        stroke="#F7B928"
        strokeWidth="1.8"
      />
      <path
        d="M14 11C14 11 18 11 19 8.2C19.8 6.2 18 4.5 16.2 5.8C14.8 6.8 14 11 14 11Z"
        stroke="#F7B928"
        strokeWidth="1.8"
      />
    </svg>
  );
}

const HERO_SIX_FEATURES = [
  {
    Icon: IconCalendarSvg,
    line1: 'Book Pujas &',
    line2: 'Homams Online',
    to: '/pujas',
  },
  {
    Icon: IconShieldSvg,
    line1: 'Verified &',
    line2: 'Experienced Priests',
    to: '/purohits',
  },
  {
    Icon: IconTempleSvg,
    line1: 'Temple Services &',
    line2: 'Special Rituals',
    to: '/pujas?location=temple',
  },
  {
    Icon: IconCartSvg,
    line1: 'Shop Puja Items',
    line2: '& Spiritual Essentials',
    to: '/pujas?hasSamagri=true',
  },
  {
    Icon: IconLiveVideoSvg,
    line1: 'Attend Pujas',
    line2: 'Live (Online)',
    to: '/pujas?location=online',
  },
  {
    Icon: IconGiftSvg,
    line1: 'Receive Prasad',
    line2: 'at Your Doorstep',
    to: '/pujas?hasSamagri=true',
  },
];

function HangingDiyas() {
  return (
    <svg
      viewBox="0 0 110 220"
      className="pointer-events-none absolute left-2 top-0 z-10 hidden h-52 w-28 select-none lg:block"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Left Hanging Diya */}
      <line x1="28" y1="0" x2="28" y2="132" stroke="#F7B928" strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="28" cy="126" r="22" fill="url(#diyaGlow)" />
      <path
        d="M28 104C28 104 34.5 114 34.5 121C34.5 125.5 31.5 128.5 28 128.5C24.5 128.5 21.5 125.5 21.5 121C21.5 114 28 104 28 104Z"
        fill="url(#flameGrad)"
      />
      <path d="M11 129H45L39.5 139C36.5 142 32 143 28 143C24 143 19.5 142 16.5 139L11 129Z" fill="url(#brassGrad)" />
      <path d="M22 143H34L36 147.5H20L22 143Z" fill="#F58216" />

      {/* Right Hanging Diya */}
      <line x1="68" y1="0" x2="68" y2="96" stroke="#F7B928" strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="68" cy="92" r="19" fill="url(#diyaGlow)" />
      <path
        d="M68 73C68 73 73.5 82 73.5 88C73.5 92 71 95 68 95C65 95 62.5 92 62.5 88C62.5 82 68 73 68 73Z"
        fill="url(#flameGrad)"
      />
      <path d="M53 96H83L78.5 104.5C76 107 72 108 68 108C64 108 60 107 57.5 104.5L53 96Z" fill="url(#brassGrad)" />
      <path d="M62 108H74L76 112H60L62 108Z" fill="#F58216" />

      <defs>
        <radialGradient id="diyaGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#F7B928" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#F58216" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#F7B928" />
          <stop offset="100%" stopColor="#F58216" />
        </linearGradient>
        <linearGradient id="brassGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B45309" />
          <stop offset="50%" stopColor="#F7B928" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function LotusBadgeIcon() {
  return (
    <svg viewBox="0 0 28 22" className="h-4 w-5 shrink-0" fill="none">
      <path
        d="M14 2C14 2 18.5 8 18.5 13C18.5 16 16.5 18.5 14 18.5C11.5 18.5 9.5 16 9.5 13C9.5 8 14 2 14 2Z"
        fill="#F7B928"
      />
      <path d="M9 7C5 9 3 13 4.5 16.5C7 18 10 17.5 11.5 15.5C9.8 13 9 10 9 7Z" fill="#F58216" />
      <path d="M19 7C23 9 25 13 23.5 16.5C21 18 18 17.5 16.5 15.5C18.2 13 19 10 19 7Z" fill="#F58216" />
    </svg>
  );
}

function OmOrnamentDivider() {
  return (
    <div className="my-3.5 flex max-w-md items-center gap-3" aria-hidden="true">
      <div className="flex flex-1 items-center">
        <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-[#F7B928]/85 to-[#F7B928]" />
        <span className="h-1.5 w-1.5 rotate-45 bg-[#F7B928]" />
      </div>
      <span className="font-serif text-xl font-bold leading-none text-[#F7B928] drop-shadow">ॐ</span>
      <div className="flex flex-1 items-center">
        <span className="h-1.5 w-1.5 rotate-45 bg-[#F7B928]" />
        <div className="h-[1.5px] flex-1 bg-gradient-to-l from-transparent via-[#F7B928]/85 to-[#F7B928]" />
      </div>
    </div>
  );
}

/**
 * Transparent decorative SVG illustration at the base of the Sacred Temple Arch:
 * Kalash with Coconut & Mango Leaves, Marigold Flowers, Kumkum/Haldi Thali & Multi-Flame Brass Deepam.
 */
function SacredKalashAndDeepamDecor() {
  return (
    <svg
      viewBox="0 0 380 185"
      className="pointer-events-none absolute -bottom-6 left-2 z-20 w-[85%] max-w-[350px] drop-shadow-[0_12px_20px_rgba(0,0,0,0.65)] select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="potGold" cx="0.38" cy="0.35" r="0.65">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="30%" stopColor="#F7B928" />
          <stop offset="72%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </radialGradient>
        <linearGradient id="coconutBrown" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B45309" />
          <stop offset="55%" stopColor="#92400E" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>
        <radialGradient id="lampFlameGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#F7B928" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#F58216" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Base Green Banana / Mango Leaves */}
      <path d="M18 158C45 142 82 146 105 162C75 168 42 168 18 158Z" fill="#15803D" />
      <path d="M165 162C190 146 225 144 252 158C225 168 192 168 165 162Z" fill="#15803D" />

      {/* Mango Leaves under Coconut */}
      <path d="M115 78C90 62 72 72 68 92C88 92 104 86 115 78Z" fill="#16A34A" />
      <path d="M155 78C180 62 198 72 202 92C182 92 166 86 155 78Z" fill="#16A34A" />
      <path d="M122 74C104 50 92 54 88 74C104 78 114 76 122 74Z" fill="#22C55E" />
      <path d="M148 74C166 50 178 54 182 74C166 78 156 76 148 74Z" fill="#22C55E" />

      {/* Sacred Coconut on Top of Kalash */}
      <path
        d="M135 20C152 34 162 54 158 72C155 82 146 86 135 86C124 86 115 82 112 72C108 54 118 34 135 20Z"
        fill="url(#coconutBrown)"
        stroke="#F7B928"
        strokeWidth="1.2"
      />
      {/* Sacred Om on Coconut */}
      <text x="135" y="62" textAnchor="middle" fill="#DC2626" fontSize="18" fontWeight="bold" fontFamily="serif">
        ॐ
      </text>

      {/* Brass Kalash Neck & Rim */}
      <ellipse cx="135" cy="84" rx="28" ry="6" fill="#F7B928" stroke="#92400E" strokeWidth="1" />
      <path d="M112 84H158L152 96H118L112 84Z" fill="url(#potGold)" />

      {/* Brass Kalash Rounded Body */}
      <ellipse cx="135" cy="130" rx="46" ry="38" fill="url(#potGold)" stroke="#F7B928" strokeWidth="1.2" />
      {/* Red Sacred Thread & Om on Kalash */}
      <path d="M92 115Q135 124 178 115" stroke="#DC2626" strokeWidth="2.5" fill="none" />
      <text x="135" y="142" textAnchor="middle" fill="#DC2626" fontSize="22" fontWeight="bold" fontFamily="serif">
        ॐ
      </text>

      {/* Marigold Flower Garland at Base of Kalash */}
      {[
        { cx: 64, cy: 148, r: 11, c: '#FACC15' },
        { cx: 78, cy: 158, r: 12, c: '#F58216' },
        { cx: 94, cy: 164, r: 12, c: '#DC2626' },
        { cx: 112, cy: 168, r: 13, c: '#FACC15' },
        { cx: 132, cy: 170, r: 13, c: '#F7B928' },
        { cx: 152, cy: 168, r: 13, c: '#FACC15' },
        { cx: 170, cy: 163, r: 12, c: '#F58216' },
        { cx: 185, cy: 154, r: 11, c: '#FEF08A' },
      ].map((fl, idx) => (
        <g key={idx}>
          <circle cx={fl.cx} cy={fl.cy} r={fl.r} fill={fl.c} stroke="#B45309" strokeWidth="0.8" />
          <circle cx={fl.cx} cy={fl.cy} r={fl.r * 0.55} fill="#F58216" opacity="0.65" />
        </g>
      ))}

      {/* Brass Puja Thali with Kumkum & Haldi Bowls */}
      <ellipse cx="248" cy="162" rx="58" ry="14" fill="url(#potGold)" stroke="#F7B928" strokeWidth="1.5" />
      {/* Haldi Bowl */}
      <ellipse cx="222" cy="158" rx="18" ry="6" fill="#92400E" />
      <path d="M206 158Q222 144 238 158Z" fill="#FACC15" />
      <path d="M205 158H239L234 167H210L205 158Z" fill="url(#potGold)" />
      {/* Kumkum Bowl */}
      <ellipse cx="262" cy="154" rx="18" ry="6" fill="#92400E" />
      <path d="M246 154Q262 140 278 154Z" fill="#DC2626" />
      <path d="M245 154H279L274 164H250L245 154Z" fill="url(#potGold)" />

      {/* Tall Standing Multi-Wick Brass Deepam on Right */}
      <circle cx="316" cy="76" r="32" fill="url(#lampFlameGlow)" />
      {/* Pillar Base */}
      <ellipse cx="316" cy="165" rx="26" ry="7" fill="url(#potGold)" stroke="#F7B928" strokeWidth="1" />
      <path d="M306 162L311 86H321L326 162H306Z" fill="url(#potGold)" />
      {/* Lamp Oil Tray */}
      <ellipse cx="316" cy="86" rx="30" ry="7" fill="url(#potGold)" stroke="#F7B928" strokeWidth="1.2" />
      {/* Top Finial */}
      <path d="M316 54L322 84H310L316 54Z" fill="url(#potGold)" />
      {/* 5 Glowing Flames on Deepam */}
      {[290, 302, 316, 330, 342].map((fx, i) => (
        <path
          key={i}
          d={`M${fx} ${i === 2 ? 44 : 64} C${fx} ${i === 2 ? 44 : 64} ${fx + 4.5} ${i === 2 ? 53 : 73} ${fx + 4.5} ${i === 2 ? 58 : 78} C${fx + 4.5} ${i === 2 ? 62 : 82} ${fx + 2.5} ${i === 2 ? 64 : 84} ${fx} ${i === 2 ? 64 : 84} C${fx - 2.5} ${i === 2 ? 64 : 84} ${fx - 4.5} ${i === 2 ? 62 : 82} ${fx - 4.5} ${i === 2 ? 58 : 78} C${fx - 4.5} ${i === 2 ? 53 : 73} ${fx} ${i === 2 ? 44 : 64} Z`}
          fill="url(#flameGrad)"
        />
      ))}
    </svg>
  );
}

export default function Home() {
  const { data, loading, error, reload } = useFetch('/pujas', { featured: 'true', limit: 6 });
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/pujas?search=${encodeURIComponent(searchText.trim())}`);
    } else {
      navigate('/pujas');
    }
  };

  return (
    <>
      {/* Hero Section — Deep Purple #300B32, Primary Gold #F7B928, Secondary Orange #F58216, 16:9 Desktop / 9:16 Mobile */}
      <section className="relative flex min-h-[calc(100vw*16/9)] items-center overflow-hidden bg-[#300B32] text-white sm:min-h-0 lg:aspect-[16/9] lg:max-h-[740px] lg:w-full">
        {/* Warm Ambient Gradient Overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 72% 48%, rgba(245, 130, 22, 0.28) 0%, rgba(247, 185, 40, 0.12) 32%, rgba(48, 11, 50, 0.96) 72%)',
          }}
        />

        {/* Hanging Diyas on Top-Left */}
        <HangingDiyas />

        {/* Subtle Top-Right Lotus Mandala Watermark */}
        <svg
          viewBox="0 0 200 200"
          className="pointer-events-none absolute -right-8 -top-8 h-72 w-72 opacity-15"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="88" stroke="#F7B928" strokeWidth="1.2" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="65" stroke="#F7B928" strokeWidth="1.2" />
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse
              key={i}
              cx="100"
              cy="45"
              rx="14"
              ry="38"
              stroke="#F7B928"
              strokeWidth="1.2"
              transform={`rotate(${i * 30} 100 100)`}
            />
          ))}
        </svg>

        {/* Warm Illuminated Charminar Silhouette in Center Backdrop */}
        <div className="pointer-events-none absolute inset-y-0 left-[46%] hidden w-[360px] -translate-x-1/2 items-center justify-center lg:flex">
          <div className="relative h-80 w-full">
            <img
              src="/images/charminar-bg.jpg"
              alt=""
              className="h-full w-full object-cover opacity-40 mix-blend-screen"
              style={{
                maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 72%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 72%)',
                filter: 'sepia(1) hue-rotate(-10deg) saturate(3) brightness(1.05)',
              }}
            />
          </div>
        </div>

        <div className="container-x relative z-10 grid w-full items-center gap-8 py-8 sm:py-10 lg:grid-cols-12">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-7"
          >
            {/* Top Lotus Pill Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#F7B928]/55 bg-[#300B32]/85 px-4 py-1.5 text-xs font-medium text-white shadow-sm">
              <LotusBadgeIcon />
              <span>Online Puja &amp; Spiritual Services</span>
            </div>

            {/* 3-Line Serif Heading */}
            <h1 className="mt-3.5 font-serif text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              Book Pujas, Buy
              <br />
              Puja Items &amp;
              <br />
              <span className="text-[#F7B928]">Spiritual Essentials</span>
            </h1>

            {/* Ornamental Gold Om Divider */}
            <OmOrnamentDivider />

            {/* Subtitle */}
            <p className="max-w-xl text-sm font-medium leading-relaxed text-white/95 sm:text-base">
              • Your Trusted Platform for Online Puja, Puja Items &amp;
              <br className="hidden sm:inline" /> Verified Priests in Hyderabad.
            </p>

            {/* White Pill Search Bar with Gold/Orange CTA */}
            <form
              onSubmit={handleSearch}
              className="mt-5 flex max-w-xl items-center gap-2 rounded-full border border-[#F7B928]/45 bg-white p-1.5 shadow-xl"
            >
              <Search className="ml-3.5 h-4 w-4 shrink-0 text-[#300B32]" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search for Pujas, Homams, Items, Temples..."
                className="w-full bg-transparent px-2 py-1.5 text-sm text-[#300B32] outline-none placeholder:text-[#300B32]/55"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-gradient-to-r from-[#F7B928] to-[#F58216] px-6 py-2.5 text-xs font-extrabold text-[#300B32] shadow-md transition hover:brightness-105 active:scale-[0.98]"
              >
                Get Started →
              </button>
            </form>

            {/* 6 Feature Cards in 3x2 Grid with Gold Transparent Borders & SVG Icons */}
            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {HERO_SIX_FEATURES.map(({ Icon, line1, line2, to }) => (
                <Link
                  key={line1 + line2}
                  to={to}
                  className="group flex items-center gap-3 rounded-xl border border-[#F7B928]/45 bg-[#300B32]/80 px-3.5 py-2.5 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#F7B928] hover:bg-[#3E1041]/90"
                >
                  <Icon />
                  <span className="text-xs font-medium leading-tight text-white">
                    {line1}
                    <br />
                    <span className="text-white/95">{line2}</span>
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Right Column — Scalloped Sacred Temple Arch Frame with Family Havan Photo & Transparent Decorative Kalash/Deepam */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="relative lg:col-span-5"
          >
            {/* Radial Golden-Orange Glow Behind Arch */}
            <div className="pointer-events-none absolute -inset-4 rounded-full bg-gradient-to-tr from-[#F58216]/35 via-[#F7B928]/25 to-transparent blur-2xl" />

            <div className="relative mx-auto max-w-[465px] pb-4">
              {/* SVG Temple Cusped Arch Frame */}
              <svg
                viewBox="0 0 460 440"
                className="w-full drop-shadow-[0_18px_38px_rgba(0,0,0,0.65)]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Cusped Temple Arch Path */}
                  <clipPath id="templeArchClip">
                    <path d="M 230 14 C 258 44, 298 46, 316 68 C 338 58, 378 78, 386 112 C 418 118, 444 156, 444 206 L 444 330 C 444 388, 398 422, 342 422 L 118 422 C 62 422, 16 388, 16 330 L 16 206 C 16 156, 42 118, 74 112 C 82 78, 122 58, 144 68 C 162 46, 202 44, 230 14 Z" />
                  </clipPath>
                  <linearGradient id="archGoldBorder" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFFBEB" />
                    <stop offset="35%" stopColor="#F7B928" />
                    <stop offset="70%" stopColor="#F58216" />
                    <stop offset="100%" stopColor="#F7B928" />
                  </linearGradient>
                </defs>

                {/* Clipped Hero Puja Image */}
                <g clipPath="url(#templeArchClip)">
                  <image
                    href="/images/hero-puja.jpg"
                    x="0"
                    y="10"
                    width="460"
                    height="425"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </g>

                {/* Outer & Inner Glowing Gold Arch Borders */}
                <path
                  d="M 230 14 C 258 44, 298 46, 316 68 C 338 58, 378 78, 386 112 C 418 118, 444 156, 444 206 L 444 330 C 444 388, 398 422, 342 422 L 118 422 C 62 422, 16 388, 16 330 L 16 206 C 16 156, 42 118, 74 112 C 82 78, 122 58, 144 68 C 162 46, 202 44, 230 14 Z"
                  fill="none"
                  stroke="url(#archGoldBorder)"
                  strokeWidth="5.5"
                />
                <path
                  d="M 230 22 C 256 49, 294 51, 311 72 C 332 63, 370 82, 378 114 C 408 120, 434 156, 434 206 L 434 328 C 434 382, 391 414, 338 414 L 122 414 C 69 414, 26 382, 26 328 L 26 206 C 26 156, 52 120, 82 114 C 90 82, 128 63, 149 72 C 166 51, 204 49, 230 22 Z"
                  fill="none"
                  stroke="#F7B928"
                  strokeOpacity="0.45"
                  strokeWidth="1.2"
                />
              </svg>

              {/* Transparent Decorative Kalash, Marigolds, Thali & Standing Brass Deepam at Base of Arch */}
              <SacredKalashAndDeepamDecor />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6 Visual Category Cards */}
      <section className="container-x mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-[#300B32] sm:text-3xl">Explore by Category</h2>
          <Link to="/pujas" className="text-xs font-bold text-[#F58216] hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
          {QUICK_CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              to={cat.to}
              className="group overflow-hidden rounded-2xl border border-[#F7B928]/60 bg-white text-center shadow-sm hover:-translate-y-1 hover:border-[#F58216] hover:shadow-lg hover:shadow-amber-900/10 transition-all duration-200"
            >
              <div className="h-28 w-full overflow-hidden bg-[#300B32]">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <div className="font-serif text-base font-bold text-[#300B32] group-hover:text-[#F58216]">
                  {cat.title}
                </div>
                <div className="text-[11px] text-[#300B32]/75">{cat.subtitle}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Pujas & Homams Grid */}
      <section className="container-x mt-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#300B32] sm:text-3xl">
              Popular Pujas &amp; Homams
            </h2>
            <p className="text-xs text-[#300B32]/80">
              Select a Puja to view package price, Samagri kit &amp; book your priest.
            </p>
          </div>
          <Link to="/pujas" className="btn-outline !py-2 text-xs">
            See All Pujas →
          </Link>
        </div>

        {loading && <PujaGridSkeleton count={6} />}
        {error && <ErrorState message={error} onRetry={reload} />}
        {data && data.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((p) => (
              <PujaCard key={p._id} puja={p} />
            ))}
          </div>
        )}
      </section>

      {/* Shop Puja Items Online Section */}
      <section className="container-x mt-14">
        <div className="rounded-3xl border-2 border-[#F7B928]/70 bg-[#300B32] p-6 sm:p-8 text-white shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F7B928] bg-[#431146] text-[#F7B928] shadow">
                <ShoppingCart className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#F7B928] sm:text-3xl">
                  Shop Puja Items Online
                </h2>
                <p className="text-xs text-white/90">All Your Spiritual Needs in One Place</p>
              </div>
            </div>
            <Link
              to="/pujas?hasSamagri=true"
              className="rounded-full bg-gradient-to-r from-[#F7B928] to-[#F58216] px-5 py-2 text-xs font-extrabold text-[#300B32] shadow hover:brightness-105 active:scale-[0.98]"
            >
              View All Kits <ArrowRight className="inline h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {PUJA_ITEMS_SHOP.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="group overflow-hidden rounded-2xl border border-[#F7B928]/55 bg-white text-center text-[#300B32] shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
              >
                <div className="relative h-32 w-full overflow-hidden bg-cream-100">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute right-2 top-2 rounded-full bg-[#300B32]/90 px-2 py-0.5 text-[10px] font-bold text-[#F7B928]">
                    {item.price}
                  </span>
                </div>
                <div className="p-3">
                  <div className="font-serif text-base font-bold leading-snug text-[#300B32] group-hover:text-[#F58216]">
                    {item.name}
                  </div>
                  <div className="mt-0.5 text-[11px] font-medium text-[#300B32]/75">{item.tag}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
