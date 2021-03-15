/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';

const API_ENDPOINT = 'https://randomuser.me/api/?seed=1&page=1&results=20';

export default function App() {
  // local states
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // calling the API endpoint
  useEffect(() => {
    setIsLoading(true);
    fetch(API_ENDPOINT)
      .then(response => response.json())
      .then(json => {
        setData(json.results);
        setIsLoading(false); // call is successful
      })
      .catch(err => {
        setIsLoading(false);
        setError(err); //call failed coz of an error
      });
  }, []);
  console.log(data);

  // loader icon functionality with ActivityIndicator
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#65d3a5" />
      </View>
    );
  }

  // error handling on UI
  if (error) {
    return (
      <View>
        <Text>
          Error fetching data. Check your data connection or with your backend
          engineer.
        </Text>
      </View>
    );
  }

  // UI components to be rendered
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Flat list example </Text>
      <FlatList
        data={data}
        keyExtractor={(item, _index) => _index.toString()}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <Image
              source={{uri: item.picture.thumbnail, height: 60, width: 60}}
            />
          </View>
        )}
      />
    </View>
  );
}

// mock data
/* const data = [
  {id: '1', title: 'first item'},
  {id: '2', title: 'second item'},
  {id: '3', title: 'third item'},
  {id: '4', title: 'four item'},
]; */

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    fontWeight: '700',
  },
  listItem: {
    marginTop: 10,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
  },
  listItemText: {
    fontSize: 18,
  },
});
