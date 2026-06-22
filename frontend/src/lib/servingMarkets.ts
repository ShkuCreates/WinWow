export type Market = {
  flag: string;
  label: string;
};

// Keep existing markets and add the new ones.
// NOTE: Flags are emoji; replace with real icons/images if you have assets.
export const SERVING_MARKETS: Market[] = [
  { flag: '🇺🇸', label: 'USA' },
  { flag: '🇮🇳', label: 'India' },
  { flag: '🇨🇦', label: 'Canada' },
  { flag: '🇦🇪', label: 'Dubai' },
  { flag: '🇦🇺', label: 'Australia' },
  { flag: '🇹🇷', label: 'Turkey' },
  { flag: '🇷🇺', label: 'Russia' },
  { flag: '🇨🇳', label: 'China' },
  { flag: '🇮🇷', label: 'Iran' },
];

