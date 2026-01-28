
export interface Program {
  id: string;
  title: string;
  price: string;
  priceDetail?: string;
  description: string;
  imageUrl: string;
  features?: string[];
  isFeatured?: boolean;
  paypalLink: string;
}

export interface NavItem {
  label: string;
  href: string;
}
