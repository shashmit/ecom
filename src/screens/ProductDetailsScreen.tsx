import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, Button, Dimensions, Platform } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { fetchProductById } from '../services/api';
import { Product } from '../types/product';
import { HomeStackParamList } from '../../App'; 
import { useCart } from '../context/CartContext';

type ProductDetailsScreenProps = NativeStackScreenProps<HomeStackParamList, 'ProductDetails'>; 

const { width } = Dimensions.get('window');

const ProductDetailsScreen = ({ route, navigation }: ProductDetailsScreenProps) => {
  const { addToCart } = useCart();
  const { productId } = route.params;

  const { data: product, isLoading, error } = useQuery<Product, Error>({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
    enabled: !!productId, 
  });


  React.useEffect(() => {
    if (product) {
      navigation.setOptions({ title: product.title });
    }
  }, [product, navigation]);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text>Error fetching product details: {error.message}</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centerContainer}>
        <Text>Product not found.</Text>
      </View>
    );
  }


  const renderImageSlider = () => (
    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.sliderContainer}>
      {product.images.map((imageUri, index) => (
        <Image key={index} source={{ uri: imageUri }} style={styles.sliderImage} />
      ))}
    </ScrollView>
  );

  return (
    <ScrollView style={styles.container}>
      {renderImageSlider()}
      <View style={styles.summaryContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Button 
          title="Add to Cart" 
          onPress={() => {
            addToCart(product);
          }} 
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sliderContainer: {
    height: width, 
  },
  sliderImage: {
    width: width,
    height: width,
    resizeMode: 'cover',
  },
  summaryContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#888',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
});

export default ProductDetailsScreen;