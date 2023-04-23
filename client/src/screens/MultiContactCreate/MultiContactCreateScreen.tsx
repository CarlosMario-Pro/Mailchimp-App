import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import styles from './MultiContactCreateScreen.module';
import axios from 'axios';
import Papa from 'papaparse';

export default function MultiContactCreateScreen() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setFile(file);
  };

  const parseContactsFromCsv = async (file: File) => {
    const fileContent = await file.text();
    const { data } = Papa.parse(fileContent, { header: true });
    return data;
  };

  const handleSubmit = async () => {
    try {
      if (!file) {
        return;
      }
      setMessage("Loading...");
      setIsLoading(true);
      const contacts = await parseContactsFromCsv(file);
      const data = contacts.map(contact=>{
        const user = JSON.parse(JSON.stringify(contact));
        return{
          "email": user["Email Addresses\\Email address"] || "undefined",
          "status": 'subscribed',
          "firstName": user["First name"] || "undefined",
          "lastName": user["Last/Organization/Group/Household name"] || "undefined",
          "address": {
            "addr1": user["Addresses\\Address line 1"] || "undefined",
            "addr2": user["Addresses\\Address line 2"] || "undefined",
            "city": user["Addresses\\City"] || "undefined",
            "state": user["Addresses\\State abbreviation"] || "undefined",
            "country": user["Addresses\\Country abbreviation"] || "undefined",
            "zip": user["Addresses\\ZIP"]|| "undefined"
          },
          "phoneNumber": user["Phones\\Number"] || "undefined",
        }
      });      
      setIsSending(true);
      const response = await axios.post('http://localhost:3000/mailchimp/34d0ac8d7f/batch-members', data); // .slice(0, 74)
    } catch (error) {
      throw new Error('Failed to save contact block in Mailchimp');
    } finally {
      setMessage("Finished");
      setTimeout(()=>{
        setIsLoading(false);
      }, 5000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Upload CSV:</Text>
        <View style={styles.inputFile}>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            disabled={isLoading}
          />
        </View>
        <Button title="Submit" onPress={handleSubmit} disabled={!file || isLoading || isSending} />
        {isLoading && <Text style={styles.message}>{message}</Text>}
      </View>
    </View>
  );
};
