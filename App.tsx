import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Text } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ProductListScreen from './src/screens/ProductListScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import CartScreen from './src/screens/CartScreen';
import HomeScreen from './src/screens/HomeScreen';
import { CartProvider } from './src/context/CartContext';
import { useCart } from './src/context/CartContext';


export type HomeStackParamList = {
  Home: undefined;
  ProductDetails: { productId: number };
};

export type TabParamList = {
  HomeFlow: undefined; 
  Cart: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>(); 
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>(); 
const queryClient = new QueryClient();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Products' }} 
      />
      <HomeStack.Screen 
        name="ProductDetails" 
        component={ProductDetailsScreen} 
        options={{ title: 'Product Details' }} 
      />
    </HomeStack.Navigator>
  );
};

const MainTabs = () => {
  const { cartItems } = useCart();
  const cartItemCount = cartItems.length;
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        headerShown: false, 
      }}
    >
      <Tab.Screen 
        name="HomeFlow" 
        component={HomeStackNavigator} 
        options={{
          title: 'Home', 
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{
          title: 'Cart',
          headerShown: true, 
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 24, color }}>🛒</Text>
          ),
          tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="MainTabs" 
              component={MainTabs} 
              options={{ headerShown: false }} 
            />
 
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </QueryClientProvider>
  );
}
