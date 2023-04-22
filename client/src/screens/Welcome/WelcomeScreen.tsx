import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from "./WelcomeScreen.module";

type Props = {
  navigation: any;
};

export default function WelcomeScreen ({ navigation }: Props) {
  const handleWelcome = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <TouchableOpacity style={styles.button} onPress={handleWelcome}>
        <Text style={styles.buttonText}>START</Text>
      </TouchableOpacity>
    </View>
  );
};