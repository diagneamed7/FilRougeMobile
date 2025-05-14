import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {

  Home: undefined;
  Categories: undefined;
  AddCategories: undefined;
  ProductScreen : undefined;
  Product: { productId: string }; // <-- à garder
}

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;
