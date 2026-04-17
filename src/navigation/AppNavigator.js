// AutoGo - Navigation Configuration
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { borderRadius } from '../theme/spacing';

// Auth screens
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import OTPScreen from '../screens/OTPScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';

// Main screens
import HomeScreen from '../screens/HomeScreen';
import GarageScreen from '../screens/GarageScreen';
import SOSScreen from '../screens/SOSScreen';
import ServicesScreen from '../screens/ServicesScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Sub screens
import AddCarScreen from '../screens/AddCarScreen';
import CarDetailsScreen from '../screens/CarDetailsScreen';
import TowTypeScreen from '../screens/TowTypeScreen';
import SearchingScreen from '../screens/SearchingScreen';
import TrackingScreen from '../screens/TrackingScreen';
import PaymentScreen from '../screens/PaymentScreen';
import WorkshopListScreen from '../screens/WorkshopListScreen';
import WorkshopDetailScreen from '../screens/WorkshopDetailScreen';
import BookingScreen from '../screens/BookingScreen';
import ServiceMethodScreen from '../screens/ServiceMethodScreen';
import BookingReviewScreen from '../screens/BookingReviewScreen';
import ActiveOrdersScreen from '../screens/ActiveOrdersScreen';
import OrderStatusScreen from '../screens/OrderStatusScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import ChatScreen from '../screens/ChatScreen';
import CallScreen from '../screens/CallScreen';
import RatingScreen from '../screens/RatingScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AddressesScreen from '../screens/AddressesScreen';
import WalletScreen from '../screens/WalletScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import InvoiceScreen from '../screens/InvoiceScreen';
import SupportScreen from '../screens/SupportScreen';
import TermsScreen from '../screens/TermsScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import HelpCenterScreen from '../screens/HelpCenterScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tab.background,
          borderTopColor: colors.divider,
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 25,
          paddingTop: 10,
        },
        tabBarActiveTintColor: colors.tab.active,
        tabBarInactiveTintColor: colors.tab.inactive,
        tabBarLabelStyle: {
          ...typography.caption,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'HomeTab': iconName = focused ? 'home' : 'home-outline'; break;
            case 'GarageTab': iconName = focused ? 'car-sport' : 'car-sport-outline'; break;
            case 'OrdersTab': iconName = focused ? 'list-circle' : 'list-circle-outline'; break;
            case 'ProfileTab': iconName = focused ? 'person' : 'person-outline'; break;
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ tabBarLabel: 'حسابي' }} />
      <Tab.Screen name="OrdersTab" component={ActiveOrdersScreen} options={{ tabBarLabel: 'طلباتي' }} />
      <Tab.Screen name="GarageTab" component={GarageScreen} options={{ tabBarLabel: 'جراجي' }} />
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarLabel: 'الرئيسية' }} />
    </Tab.Navigator>
  );
};

// Root Navigator
const AppNavigator = () => {
  const { isAuthenticated, isOnboarded, isProfileComplete } = useSelector(state => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_left' }}>
        {!isAuthenticated ? (
          // Auth flow
          <>
            <Stack.Screen name="Splash" component={SplashScreen} options={{ animation: 'fade' }} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="OTP" component={OTPScreen} />
            <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        ) : (
          // Main app flow
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} options={{ animation: 'fade' }} />
            {/* Car screens */}
            <Stack.Screen name="AddCar" component={AddCarScreen} />
            <Stack.Screen name="CarDetails" component={CarDetailsScreen} />
            {/* SOS flow */}
            <Stack.Screen name="SOS" component={SOSScreen} />
            <Stack.Screen name="TowType" component={TowTypeScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="Searching" component={SearchingScreen} options={{ animation: 'fade' }} />
            <Stack.Screen name="Tracking" component={TrackingScreen} />
            {/* Service/Booking flow */}
            <Stack.Screen name="Services" component={ServicesScreen} />
            <Stack.Screen name="WorkshopList" component={WorkshopListScreen} />
            <Stack.Screen name="WorkshopDetail" component={WorkshopDetailScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />
            <Stack.Screen name="ServiceMethod" component={ServiceMethodScreen} />
            <Stack.Screen name="BookingReview" component={BookingReviewScreen} />
            {/* Orders */}
            <Stack.Screen name="ActiveOrders" component={ActiveOrdersScreen} />
            <Stack.Screen name="OrderStatus" component={OrderStatusScreen} />
            <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
            {/* Communication */}
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Call" component={CallScreen} options={{ animation: 'fade' }} />
            <Stack.Screen name="Rating" component={RatingScreen} options={{ animation: 'slide_from_bottom' }} />
            {/* Profile sub-screens */}
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="Addresses" component={AddressesScreen} />
            <Stack.Screen name="Wallet" component={WalletScreen} />
            <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
            <Stack.Screen name="Invoice" component={InvoiceScreen} />
            <Stack.Screen name="Support" component={SupportScreen} />
            <Stack.Screen name="Terms" component={TermsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
            <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default AppNavigator;
