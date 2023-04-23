import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from "./HomeScreen.module";
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Constants from "expo-constants";
// const LIST_ID = Constants.manifest.extra.LIST_ID;

type Props = {
  navigation: any;
};

interface Member {
  id: string;
  full_name: string;
  email_address: string;
};

export default function HomeScreen({ navigation }: Props) {
  const [listMembers, setListMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getListMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/mailchimp/34d0ac8d7f/members`);
        // const response = await axios.get(`http://localhost:3000/mailchimp/${LIST_ID}/members`);
        setListMembers(response.data.members);
        setIsLoading(false);
      } catch (error) {
        throw new Error('Failed to get your contacts');
      }
    };    
    getListMembers();
  }, []);

  const handleDeleteMember = async (memberId: string) => {
    try {
      const response = await axios.delete(`http://localhost:3000/mailchimp/34d0ac8d7f/members/${memberId}`);
      if (response.status === 204) {
        setListMembers(listMembers.filter(member => member.id !== memberId));
      }
    } catch (error) {
      throw new Error('Failed to delete contact');
    }
  };

  const handleDashboardScreen = () => {
    navigation.navigate('DashboardScreen');
  };
  const handleContactCreate = () => {
    navigation.navigate('ContactCreateScreen');
  };
  const handleMultiContactCreate = () => {
    navigation.navigate('MultiContactCreateScreen');
  };
  const handleMemberPress = (id: string) => {
    navigation.navigate('DetailScreen', { memberId: id });
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.container__button}>
        <TouchableOpacity style={styles.button} onPress={handleDashboardScreen}>
          <Text style={styles.buttonText}>Panel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleContactCreate}>
          <Text style={styles.buttonText}>Contact Create</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleMultiContactCreate}>
          <Text style={styles.buttonText}>Multi Contact Create</Text>
        </TouchableOpacity>
      </View>
      
      <View>
        <Text style={styles.listMembers}>LIST MEMBERS</Text>
        {listMembers.length > 0 ? (
          <FlatList
            data={listMembers}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleMemberPress(item.id)}
                style={styles.memberContainer}
              >
                <View>
                  <Text style={styles.memberName}>{item.full_name}</Text>
                  <Text style={styles.memberEmail}>{item.email_address}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleDeleteMember(item.id)}
                  style={styles.deleteButton}
                >
                  <MaterialCommunityIcons style={styles.icon} name='delete'/>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            style={styles.flatListContainer}
          />
        ) : (
          <Text style={styles.noMembers}>No members found.</Text>
        )}
      </View>
    </View>
  );
};
