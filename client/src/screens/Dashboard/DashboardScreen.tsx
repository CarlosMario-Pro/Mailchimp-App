
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from "./DashboardScreen.module";
import axios from 'axios';

interface List {
  id: string;
  name: string;
  contact: {
    company: string;
    address1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
  };
  campaign_defaults: {
    from_email: string;
  };
}

export default function DashboardScreen() {
  const [listInfo, setListInfo] = useState<List[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getList = async () => {
      try {
        const response = await axios.get('http://localhost:3000/mailchimp');
        setListInfo(response.data.lists);
        setIsLoading(false);
      } catch (error) {
        throw new Error('Error when fetching information from your lists');
      }
    };
    getList();
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.start}>Your Information</Text>
      {listInfo.length > 0 ? (
        <FlatList
          data={listInfo}
          renderItem={({ item }) => (
            <View style={styles.memberContainer}>
              <Text style={styles.memberName}>{item.name}</Text>
              <Text style={styles.memberList}>List Id: {item.id}</Text>
              <Text style={styles.memberEmail}>{item.campaign_defaults.from_email}</Text>
              <Text style={styles.member}>Company: {item.contact.company}</Text>
              <Text style={styles.member}>Anddress: {item.contact.address1}</Text>
              <Text style={styles.member}>City: {item.contact.city}</Text>
              <Text style={styles.member}>State: {item.contact.state}</Text>
              <Text style={styles.member}>Country: {item.contact.country}</Text>
              <Text style={styles.member}>Zip: {item.contact.zip}</Text>
              <Text style={styles.member}>Phone: {item.contact.phone}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          style={styles.flatListContainer}
        />
      ) : (
        <Text>Error bringing your information.</Text>
      )}
    </View>
  );
};