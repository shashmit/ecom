import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ProductListScreen from './ProductListScreen';
import { HomeStackParamList } from '../../App';

type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'Home'>; 

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View style={styles.container}>
      <ProductListScreen navigation={navigation} route={{
        key: 'ProductList',
        name: 'Home',
        params: undefined
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;