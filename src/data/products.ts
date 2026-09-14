export type ProductCategory = 'all' | 'ground';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: Exclude<ProductCategory, 'all'>;
  weight: string;
  flavorNotes: string[];
  image: string;
  badge?: string;
  rating: number;
  bestSeller?: boolean;
}

export const products: Product[] = [
  {
    id: 'mhawaj-50',
    name: 'بن محوج 50 جرام',
    description: 'توليفة يمنية بأجود حبوب البن، محمّصة ومطحنة طبقاً للمواصفات القياسية اليمنية والمصرية.',
    price: 30,
    category: 'ground',
    weight: '50 جرام',
    flavorNotes: ['بن محوج'],
    image: 'https://d.top4top.io/p_39092k0t32.png',
    rating: 4.9,
  },
  {
    id: 'mhawaj-100',
    name: 'بن محوج 100 جرام',
    description: 'توليفة يمنية بأجود حبوب البن، محمّصة ومطحنة طبقاً للمواصفات القياسية اليمنية والمصرية.',
    price: 60,
    category: 'ground',
    weight: '100 جرام',
    flavorNotes: ['بن محوج'],
    image: 'https://c.top4top.io/p_3909u3r001.png',
    badge: 'الأكثر مبيعاً',
    rating: 4.9,
    bestSeller: true,
  },
  {
    id: 'mhawaj-250',
    name: 'بن محوج 250 جرام',
    description: 'توليفة يمنية بأجود حبوب البن، محمّصة ومطحنة طبقاً للمواصفات القياسية اليمنية والمصرية.',
    price: 150,
    category: 'ground',
    weight: '250 جرام',
    flavorNotes: ['بن محوج'],
    image: 'https://c.top4top.io/p_3909u3r001.png',
    badge: 'أفضل قيمة',
    rating: 4.9,
    bestSeller: true,
  },
  {
    id: 'mhawaj-1kg',
    name: 'بن محوج 1 كيلو',
    description: 'توليفة يمنية بأجود حبوب البن، محمّصة ومطحنة طبقاً للمواصفات القياسية اليمنية والمصرية.',
    price: 600,
    category: 'ground',
    weight: '1 كيلو',
    flavorNotes: ['بن محوج'],
    image: 'https://c.top4top.io/p_3909u3r001.png',
    badge: 'عبوة العائلة',
    rating: 5.0,
  },
];

export const categoryLabels: Record<ProductCategory, string> = {
  all: 'الكل',
  ground: 'بن محوج',
};