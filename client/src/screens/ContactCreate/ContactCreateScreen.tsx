import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../RootStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from "./ContactCreateScreen.module";
import axios from 'axios';


interface Address {
  addr1: string;
  addr2: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

interface ContactFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: Address;
  phoneNumber: string;
}

type ContactCreateScreenRouteProp = RouteProp<RootStackParamList, 'ContactCreateScreen'>;
type ContactCreateScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ContactCreateScreen'>;

type Props = {
  route: ContactCreateScreenRouteProp;
  navigation: ContactCreateScreenNavigationProp;
};

export default function ContactCreateScreen ({ navigation }: Props)  {
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState<ContactFormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: {
      addr1: '',
      addr2: '',
      city: '',
      state: '',
      country: '',
      zip: '',
    },
    phoneNumber: ''
  });

  const [isFormComplete, setIsFormComplete] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleInputChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value
    });
    if (key === 'email') {
      setEmailError(validateEmail(value));
    } else {
      validateForm();
    }
  };

  const handleAddressChange = (key: keyof Address, value: string) => {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [key]: value
      },
    });
    validateForm();
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      return 'Email is required';
    } else if (!regex.test(email)) {
      return 'Invalid email format';
    } else {
      return '';
    }
  }

  const validateForm = () => {
    const { email, firstName, lastName, address, phoneNumber } = formData;
    if (email && firstName && lastName && address.addr1 && address.city && address.state && address.country && address.zip && phoneNumber && emailError === '') {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  };

  const handleSubmit = async () => {
    const { email } = formData;
    try {
      // Verificar si el correo electrónico ya existe en la lista de miembros
      const res = await axios.get(`http://localhost:3000/mailchimp/34d0ac8d7f/members/${email}`);
      if (res.data.status === 404) {
        // El correo electrónico no existe, por lo que podemos agregar el nuevo contacto
        const response = await axios.post('http://localhost:3000/mailchimp/34d0ac8d7f/members', formData);
        setFormData({
          email: '',
          firstName: '',
          lastName: '',
          address: {
            addr1: '',
            addr2: '',
            city: '',
            state: '',
            country: '',
            zip: '',
          },
          phoneNumber: ''
        })
        navigation.navigate('HomeScreen');
      } else {
        // El correo electrónico ya existe, establecer el mensaje de error
        setErrorMessage('The e-mail already exists in the members list.');
      }
    } catch (error) {
      throw new Error('Contact could not be created');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          placeholder="Your email"
          onChangeText={(value) => handleInputChange('email', value)}
        />
        <Text style={styles.error}>{emailError}</Text>
      </View>
  
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name:</Text>
        <TextInput
          style={styles.input}
          value={formData.firstName}
          placeholder="Name"
          onChangeText={(value) => handleInputChange('firstName', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          style={styles.input}
          value={formData.lastName}
          placeholder="Last Name"
          onChangeText={(value) => handleInputChange('lastName', value)}
        />
      </View>

  <View style={styles.inputContainer}>
    <Text style={styles.label}>Address:</Text>
    <TextInput
      style={styles.input}
      value={formData.address.addr1}
      placeholder="Address line 1"
      onChangeText={(value) => handleAddressChange('addr1', value)}
    />
    <TextInput
      style={styles.input}
      value={formData.address.addr2}
      placeholder="Address line 2"
      onChangeText={(value) => handleAddressChange('addr2', value)}
    />
    <TextInput
      style={styles.input}
      value={formData.address.city}
      placeholder="City"
      onChangeText={(value) => handleAddressChange('city', value)}
    />
    <TextInput
      style={styles.input}
      value={formData.address.state}
      placeholder="State"
      onChangeText={(value) => handleAddressChange('state', value)}
    />
    <TextInput
      style={styles.input}
      value={formData.address.country}
      placeholder="Country"
      onChangeText={(value) => handleAddressChange('country', value)}
    />
    <TextInput
      style={styles.input}
      value={formData.address.zip}
      placeholder="Zip code"
      onChangeText={(value) => handleAddressChange('zip', value)}
    />
  </View>

  <View style={styles.inputContainer}>
    <Text style={styles.label}>Phone Number:</Text>
    <TextInput
      style={styles.input}
      value={formData.phoneNumber}
      placeholder="Phone number"
      onChangeText={(value) => handleInputChange('phoneNumber', value)}
    />
  </View>

  {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
  <TouchableOpacity
    style={[styles.submitButton, isFormComplete ? styles.submitButtonEnabled : styles.disabledButton]}
    onPress={handleSubmit}
    disabled={!isFormComplete}
  >
    <Text style={styles.submitButtonText}>Submit</Text>
  </TouchableOpacity>
</View>
  );
}
