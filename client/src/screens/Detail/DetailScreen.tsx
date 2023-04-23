import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity  } from 'react-native';
import axios from 'axios';
import { RouteProp } from '@react-navigation/native';
import { DetailScreenNavigationProp, RootStackParamList } from '../RootStackParamList';
import styles from "./DetailScreen.module";

interface Member {
  id: string;
  full_name: string;
  email_address: string;
  merge_fields: {
    ADDRESS: {
      addr1: string;
      addr2: string;
      city: string;
      state: string;
      country: string;
    };
    PHONE: string;
  };
};

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'DetailScreen'>;

type Props = {
  route: DetailScreenRouteProp;
  navigation: DetailScreenNavigationProp;
};

export default function DetailScreen ({ route, navigation }: Props) {
  const { memberId } = route.params;
  const [member, setMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMember = async () => {
      try {
        if (!memberId) {
          setIsLoading(false);
          return null;
        }
        const response = await axios.get(`http://localhost:3000/mailchimp/34d0ac8d7f/members/${memberId}`);
        if (!response.data) {
          setIsLoading(false);
          return null;
        }
        setMember(response.data);
        setIsLoading(false);
      } catch (error) {
        throw new Error('Error fetching your contact details');
      }
    };
    getMember();
  }, [memberId]);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  };

  if (!member) {
    return (
      <View style={styles.memberContainer}>
        <Text style={styles.memberName}>No member found.</Text>
      </View>
    );
  };

  const handleMemberPress = (id: string) => {
    navigation.navigate('ContactUpdateScreen', { memberId: id });
  };

  return (
    <View style={styles.memberContainer}>
      <Text style={styles.memberName}>Name: {member.full_name}</Text>
      <Text style={styles.memberEmail}>Email: {member.email_address}</Text>
      <Text style={styles.member}>Address 1: {member.merge_fields.ADDRESS.addr1}</Text>
      <Text style={styles.member}>Address 2: {member.merge_fields.ADDRESS.addr2}</Text>
      <Text style={styles.member}>City: {member.merge_fields.ADDRESS.city}</Text>
      <Text style={styles.member}>State: {member.merge_fields.ADDRESS.state}</Text>
      <Text style={styles.member}>Country: {member.merge_fields.ADDRESS.country}</Text>
      <Text style={styles.member}>Phone: {member.merge_fields.PHONE}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleMemberPress(member.id)}
      >
        <Text style={styles.buttonText}>Update Contact</Text>
      </TouchableOpacity>
    </View>
  );
};