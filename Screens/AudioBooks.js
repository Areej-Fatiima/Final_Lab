import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native';
import { app, db } from '../config'; // Firebase configuration from firebase.js file
import { collection, getDocs } from 'firebase/firestore';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

const AudioBooksScreen = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAudioData = async () => {
      try {
        const collections = ['Arabic', 'Italian', 'French', 'Greek'];
        let audioData = [];

        for (const collectionName of collections) {
          const audiobooksCollection = collection(db, collectionName);
          const audiobooksSnapshot = await getDocs(audiobooksCollection);
          const audiobooksData = audiobooksSnapshot.docs.map(doc => doc.data());
          audioData = [...audioData, ...audiobooksData];
        }

        console.log("Fetched audio data:", audioData);
        setAudioFiles(audioData);
      } catch (error) {
        console.error('Error fetching audio data:', error);
      }
    };

    if (app) {
      fetchAudioData();
    }
  }, []);

  const playAudio = async (item) => {
    navigation.navigate('ResumePlay', { item });
  };

  const renderAudioItem = ({ item }) => (
    <TouchableOpacity style={styles.audioItem} onPress={() => playAudio(item)}>
      <Image source={{ uri: item.coverurl }} style={styles.audioImage} />
      <Text style={styles.audioTitle}>{item.title}</Text>
      <Text style={styles.audioDuration}>{item.duration}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/736x/4c/fd/b9/4cfdb9b7e5ab4917482accee76781461.jpg' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Audio Lectures</Text>
        <FlatList
          data={audioFiles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderAudioItem}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </ImageBackground>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color for readability
    paddingTop: 50,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
    width: windowWidth * 0.9,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  audioImage: {
    width: windowWidth * 1,
    height: windowHeight * 0.3,
    marginBottom: 10,
    borderRadius: 8,
  },
  audioTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    textAlign: 'center',
  },
  audioDuration: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default AudioBooksScreen;