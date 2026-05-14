export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  category: string;
  categorySlug: string;
  rating: number;
  reviewsCount: number;
  images: string[];
  stock: number;
  features: string[];
  isNew?: boolean;
  isFeatured?: boolean;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
};

export type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
  };
};

export type Testimonial = {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
};
