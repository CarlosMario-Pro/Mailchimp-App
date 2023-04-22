import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  WelcomeScreen: undefined;
  HomeScreen: undefined;
  DashboardScreen: undefined;
  ContactCreateScreen: undefined;
  DetailScreen: { memberId: string };
  ContactUpdateScreen: { memberId: string };
};

export type DetailScreenRouteProp = RouteProp<RootStackParamList, 'DetailScreen'>;
export type DetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DetailScreen'>;

export type ContactCreateScreenRouteProp = RouteProp<RootStackParamList, 'ContactCreateScreen'>;
export type ContactCreateScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ContactCreateScreen'>;

export type ContactUpdateScreenRouteProp = RouteProp<RootStackParamList, 'ContactUpdateScreen'>;
export type ContactUpdateScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ContactUpdateScreen'>;