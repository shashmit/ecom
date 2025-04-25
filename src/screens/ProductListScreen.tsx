import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { fetchProducts } from '../services/api';
import { Product } from '../types/product';
import { HomeStackParamList } from '../../App'; 


type ProductListScreenProps = NativeStackScreenProps<HomeStackParamList, 'Home'>;

type SortOption = 'default' | 'price-asc' | 'price-desc';

const SORT_OPTIONS: SortOption[] = ['default', 'price-desc', 'price-asc']; 

const ProductListScreen = ({ navigation }: ProductListScreenProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('default'); 

  const { data: products, isLoading, error, refetch } = useQuery<Product[], Error>({
    queryKey: ['products', submittedSearchTerm],
    queryFn: () => fetchProducts(0, 100, submittedSearchTerm), 
    enabled: true, 
  });


  const sortedProducts = useMemo(() => {
    if (!products) return [];
    const productsCopy = [...products]; 
    switch (sortOption) {
      case 'price-asc':
        return productsCopy.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return productsCopy.sort((a, b) => b.price - a.price);
      case 'default':
      default:
        return productsCopy; 
    }
  }, [products, sortOption]);


  const handleSortToggle = () => {
    const currentIndex = SORT_OPTIONS.indexOf(sortOption);
    const nextIndex = (currentIndex + 1) % SORT_OPTIONS.length;
    setSortOption(SORT_OPTIONS[nextIndex]);
  };

  const getSortButtonTitle = () => {
    switch (sortOption) {
      case 'price-asc':
        return 'Sort: Price Low-High';
      case 'price-desc':
        return 'Sort: Price High-Low';
      case 'default':
      default:
        return 'Sort: Default';
    }
  };

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
        <Text>Error fetching products: {error.message}</Text>
      </View>
    );
  }

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
    >
      <Image source={{ uri: item.images[0] || 'https://placehold.co/600x400' }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={() => setSubmittedSearchTerm(searchTerm)}
        returnKeyType="search" 
      />

      <View style={styles.sortContainer}>
        <Button title={getSortButtonTitle()} onPress={handleSortToggle} />
      </View>

      <FlatList
        data={sortedProducts} 
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        onRefresh={() => {
          refetch();
        }}
        refreshing={isLoading}
      />
    </View>
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
    backgroundColor: '#f8f8f8',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listContainer: {
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  productItem: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 10,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
});

export default ProductListScreen;