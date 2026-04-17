// AutoGo - TypeScript Type Definitions
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import type { store } from './store';

// ─── Data Models ───────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  avatar: string | null;
  membershipType: string;
  points: number;
  walletBalance: number;
}

export interface CarLocation {
  lat: number;
  lng: number;
  address?: string;
}

export interface CarReminder {
  type: string;
  message: string;
  urgent?: boolean;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  mileage: number;
  nextService: number;
  status: string;
  color: string;
  image: string | null;
  lastLocation: CarLocation | null;
  reminders: CarReminder[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  category: string;
}

export interface Workshop {
  id: string;
  name: string;
  address: string;
  distance: number;
  rating: number;
  reviewCount: number;
  isOpen: boolean;
  openHours: string;
  workDays: string;
  image: string | null;
  features: string[];
  location: { lat: number; lng: number };
}

export interface TowType {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: number;
}

export interface Driver {
  id: string;
  name: string;
  avatar: string | null;
  rating: number;
  reviewCount: number;
  towType: string;
  plate: string;
  eta: number;
  phone: string;
}

export interface Order {
  id: string;
  type: string;
  title: string;
  status: string;
  statusColor: string;
  driver?: Driver;
  workshop?: Workshop;
  car?: Car;
  date?: string;
  location?: string;
  createdAt: string;
  icon: string;
  rating?: number;
  comment?: string;
}

export interface HistoryOrder extends Order {
  price: number;
  month: string;
}

export interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  icon: string;
  color: string;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  action?: string;
  time: string;
  type: string;
  isToday: boolean;
}

export interface Address {
  id: string;
  label: string;
  address: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'driver';
  text: string;
  time: string;
}

export interface OnboardingItem {
  id: string;
  title: string;
  subtitle: string;
  highlightedText: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string | null;
}

export interface TrackingStep {
  label: string;
  time: string | null;
  done: boolean;
  active?: boolean;
}

export interface TrackingData {
  driverLocation: { lat: number; lng: number };
  eta: number;
  distance: number;
  status: string;
  steps: TrackingStep[];
}

// ─── Redux State Types ─────────────────────────────────────

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isOnboarded: boolean;
  isProfileComplete: boolean;
  otpSent: boolean;
  phone: string;
  error: string | null;
}

export interface GarageState {
  cars: Car[];
  activeCar: Car | null;
  isLoading: boolean;
}

export interface OrdersState {
  activeOrders: Order[];
  history: HistoryOrder[];
  currentOrder: Order | null;
  isSearching: boolean;
  driverFound: boolean;
  isLoading: boolean;
  trackingData: TrackingData;
}

export interface ServicesState {
  services: Service[];
  workshops: Workshop[];
  selectedService: Service | null;
  selectedWorkshop: Workshop | null;
  selectedDate: string | null;
  selectedTime: string | null;
  serviceMethod: 'center' | 'mobile' | null;
  activeCategory: string;
  searchQuery: string;
  workshopFilter: string;
}

export interface RootState {
  auth: AuthState;
  garage: GarageState;
  orders: OrdersState;
  services: ServicesState;
}

// ─── Store Types ───────────────────────────────────────────

export type AppDispatch = typeof store.dispatch;

// ─── Navigation Types ──────────────────────────────────────

export type RootStackParamList = {
  // Auth flow
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  OTP: { phone: string; isSignUp?: boolean; isReset?: boolean };
  ProfileSetup: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  // Main tabs
  MainTabs: undefined;
  // Car screens
  AddCar: undefined;
  CarDetails: { car: Car };
  // SOS flow
  SOS: undefined;
  TowType: undefined;
  Payment: { type: string; price: number };
  Searching: undefined;
  Tracking: undefined;
  // Service/Booking flow
  Services: undefined;
  WorkshopList: undefined;
  WorkshopDetail: { workshop: Workshop };
  Booking: undefined;
  ServiceMethod: undefined;
  BookingReview: undefined;
  // Orders
  ActiveOrders: undefined;
  OrderStatus: { order: Order };
  OrderDetail: { order: Order };
  // Communication
  Chat: undefined;
  Call: undefined;
  Rating: { orderId?: string };
  // Profile sub-screens
  EditProfile: undefined;
  Addresses: undefined;
  Wallet: undefined;
  PaymentMethods: undefined;
  Notifications: undefined;
  History: undefined;
  Invoice: { order: Order | HistoryOrder };
  Support: undefined;
  Terms: undefined;
  Settings: undefined;
  PrivacyPolicy: undefined;
  HelpCenter: undefined;
};

export type BottomTabParamList = {
  HomeTab: undefined;
  GarageTab: undefined;
  OrdersTab: undefined;
  ProfileTab: undefined;
};

// Screen props helpers
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type BottomTabScreenPropsType<T extends keyof BottomTabParamList> =
  BottomTabScreenProps<BottomTabParamList, T>;

// ─── Component Prop Types ──────────────────────────────────

export interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'large' | 'medium' | 'small';
  icon?: string;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  style?: any;
  textStyle?: any;
  fullWidth?: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: any;
  variant?: 'glass' | 'solid' | 'white' | 'accent' | 'danger' | 'warning';
  padding?: boolean;
}

export interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
  leftIcon?: string;
  onLeftPress?: () => void;
  transparent?: boolean;
  style?: any;
}

export interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  icon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  keyboardType?: 'default' | 'phone-pad' | 'email-address' | 'number-pad' | 'numeric';
  secureTextEntry?: boolean;
  multiline?: boolean;
  maxLength?: number;
  error?: string;
  editable?: boolean;
  style?: any;
  inputStyle?: any;
  labelStyle?: any;
  hint?: string;
  prefix?: string;
}

export interface MapPlaceholderProps {
  style?: any;
  height?: number;
  showPin?: boolean;
  label?: string;
}

export interface StarRatingProps {
  rating?: number;
  onChange?: (rating: number) => void;
  size?: number;
  showLabel?: boolean;
  readonly?: boolean;
}
