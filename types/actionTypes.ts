import { Schema } from "mongoose";

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  DRAFT = 'DRAFT',
  ARCHIVED = 'ARCHIVED',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export interface MediaAsset {
  mediaId: string;
  type: MediaType;
  url: string;
  altText?: string;
  isPrimary: boolean;
}

export interface ProductAttribute {
  name: string;
  value: string;
}

export interface ShippingDetails {
  weight: number;
  weightUnit: 'kg' | 'lb';
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
  isEligibleForPrime: boolean;
}

export interface Review {
  userId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  commentBody: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  createdAt: Date;
}

export interface ProductVariant {
  variantId: string;
  sku: string;
  attributes: ProductAttribute[];
  priceInCents: number;
  salePriceInCents?: number;
  quantity: number;
  imageIds: string[];
}

export interface IProduct {
  title: string;
  description: string;
  brand: string;
  sku: string;
  price: number;
  salePrice?: number;
  currency: 'USD' | 'EUR' | 'MAD';
  quantity: number;
  categoryIds: string[];
  tags?: string[];
  status: ProductStatus;
  isFeatured: boolean;
  mediaAssets: MediaAsset[];
  shippingDetails: ShippingDetails;
  hasVariants: boolean;
  variants: ProductVariant[];
  sellerId: string;
  averageRating: number;
  reviewCount: number;
  recentReviews: Review[];
  technicalSpecifications: ProductAttribute[];
}
interface CreditCardInfo {
  cardholderName: string;
  last4Digits: string; // Only store the last 4 digits for display
  expirationMonth: number;
  expirationYear: number;
  cardType: string; // e.g., "Visa", "MasterCard"
  billingAddressId: string; // Link to an address in the user's address book
}
enum PaymentMethodType {
  CREDIT_CARD = 'CREDIT_CARD',
  COD = "CASH ON DELIVERY" ,
  DEBIT_CARD = 'DEBIT_CARD',
  BANK_ACCOUNT = 'BANK_ACCOUNT',
  GIFT_CARD_BALANCE = 'GIFT_CARD_BALANCE',
}
interface PaymentMethod {
  paymentMethodType: PaymentMethodType;
  token: string; // A secure token from a payment processor (e.g., Stripe, Braintree)
  details: CreditCardInfo; // Could be a union type for different payment methods
  isDefault: boolean;
}
export interface IUser {
   _id: string;
  // --- Core Account Information ---
  fullName: string;
  email: string;
  isVerified: boolean;
  phoneNumber?: string;
  hashedPassword: string; // Stored as a hash, never plaintext
  gender: "male" | "female",
  isAdmin: boolean;
  // --- Profile & Personalization ---
  profilePictureUrl?: string;

  
  // --- Related Data Collections (Relationships) ---
  addresses: Schema.Types.ObjectId[];
  paymentMethods: PaymentMethod[];
  orderHistory: Schema.Types.ObjectId[]; // Array of order IDs
  browsingHistory: Schema.Types.ObjectId[]; // Array of product IDs
  wishLists: Schema.Types.ObjectId[]; // Array of wish list IDs
  

  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}