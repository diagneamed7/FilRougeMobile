import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
    Home: undefined;
    Categories: undefined;
    AddCategories: undefined;
<<<<<<< HEAD

=======
    Product: { productId: string };
>>>>>>> 4cd6a8b68325256e46af1ba83948a779e6f6cb19
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>; 