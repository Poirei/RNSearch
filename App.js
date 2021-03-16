/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const API_ENDPOINT = 'https://randomuser.me/api/?seed=1&page=1&results=20';

export default function App() {
  // local states
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [textInput, setTextInput] = useState('');

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
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
          paddingBottom: 40,
          position: 'relative',
          right: '8%',
        }}>
        <Icon
          style={{
            padding: 10,
            right: 45,
            position: 'absolute',
            zIndex: 10,
            borderRadius: 100,
            backgroundColor: '#ffa',
            color: '#ff89ff',
            elevation: 1.5,
          }}
          size={20}
          name="search"
          color="#000"
        />
        <TextInput
          style={{
            flex: 1,
            width: '50%',
            position: 'absolute',
            padding: 2,
            backgroundColor: '#f1f1dc',
            borderRadius: 50,
            height: 40,
            color: '#868383',
            shadowOffset: {
              width: 3,
              height: 5,
            },
            shadowRadius: 20,
            shadowColor: '#000',
            elevation: 1.5,
          }}
          textAlign="center"
          placeholder="Search..."
          value={textInput}
          onChangeText={setTextInput}
          placeholderTextColor="#ada6a6"
        />
      </View>
      <FlatList
        contentContainerStyle={{paddingBottom: 20}}
        data={data}
        keyExtractor={(item, _index) => _index.toString()}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <Image
              style={{borderRadius: 100}}
              source={{uri: item.picture.thumbnail, height: 60, width: 60}}
            />
            <Text
              style={{
                padding: 15,
                color: '#5b9477',
                fontSize: 15.6,
                letterSpacing: 1,
              }}>{`${item.name.first} ${item.name.last}`}</Text>
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
    marginTop: 30,
    marginBottom: 30,
    fontWeight: '700',
  },
  listItem: {
    marginTop: 10,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      height: 4,
      width: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    width: '100%',
    elevation: 2.2,
  },
  listItemText: {
    fontSize: 18,
  },
});
