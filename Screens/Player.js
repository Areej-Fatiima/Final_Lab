import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import UserContext from '../UserContext';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export default function Player({ route, navigation }) {
  const { audiobooks, currentIndex } = route.params;
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(UserContext);
  const db = getFirestore();

  const collectionName = ['Arabic', 'Italian', 'French', 'Greek'];

  useEffect(() => {
    const loadProgress = async (userId, audiobookTitle, audiobookAuthor) => {
      try {
        const docRef = doc(collection(db, collectionName), `${audiobookTitle}_${audiobookAuthor}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const progress = docSnap.data();
          return progress ? progress.position : 0;
        }
        return 0;
      } catch (error) {
        console.error('Error loading progress:', error);
        return 0;
      }
    };

    const loadProgressAndPlay = async () => {
      const lastPosition = await loadProgress(userId, audiobooks[currentIndex].title, audiobooks[currentIndex].author);
      setPosition(lastPosition);
      if (audiobooks[currentIndex].audioUrl) {
        playSound(audiobooks[currentIndex].audioUrl, lastPosition);
      } else {
        console.error('Error: audioUrl is null or undefined');
      }
    };

    if (currentIndex !== null && audiobooks.length > 0) {
      loadProgressAndPlay();
    }

    return () => {
      if (sound) {
        saveProgress(userId, audiobooks[currentIndex].title, audiobooks[currentIndex].author, position);
        sound.unloadAsync();
      }
    };
  }, [currentIndex]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', async () => {
      if (sound) {
        await saveProgress(userId, audiobooks[currentIndex].title, audiobooks[currentIndex].author, position);
        await sound.pauseAsync();
        await sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
      }
    });

    return unsubscribe;
  }, [navigation, sound, position]);

  const playSound = async (uri, lastPosition) => {
    setLoading(true);
    try {
      if (!uri) {
        throw new Error('audioUrl is null or undefined');
      }

      if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded && status.isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
          return;
        }
      }

      console.log('Attempting to play audio:', uri);
      const { sound: newSound } = await Audio.Sound.createAsync({ uri });
      console.log('Audio loaded successfully');
      setSound(newSound);

      newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

      const initialStatus = {
        shouldPlay: true,
        positionMillis: lastPosition * 1000,
      };

      await newSound.setStatusAsync(initialStatus);
      setIsPlaying(true);
      setLoading(false);
      console.log('Audio playback started');
    } catch (error) {
      console.error('Error playing audio:', error);
      setLoading(false);
    }
  };

  const saveProgress = async (userId, audiobookTitle, audiobookAuthor, position) => {
    try {
      const docRef = doc(collection(db, collectionName), `${audiobookTitle}_${audiobookAuthor}`);
      await setDoc(docRef, {
        position,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis / 1000);
      setDuration(status.durationMillis / 1000);
      setIsPlaying(status.isPlaying);
    } else if (status.error) {
      console.error('Playback error:', status.error);
    }
  };

  const handleSliderValueChange = (value) => {
    setPosition(value);
  };

  const handleSlidingComplete = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value * 1000);
    }
  };

  const pauseSound = async () => {
    try {
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error pausing audio:', error);
    }
  };

  const stopSound = async () => {
    try {
      if (sound) {
        await sound.pauseAsync();
        await sound.setPositionAsync(0);
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error stopping audio:', error);
    }
  };

  if (loading) {
    return (
      <ImageBackground
        source={{ uri: 'https://i.pinimg.com/736x/4c/fd/b9/4cfdb9b7e5ab4917482accee76781461.jpg' }}
        style={styles.backgroundImage}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </ImageBackground>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: audiobooks[currentIndex].coverUrl }} style={styles.coverImage} />
      <Text style={styles.title}>{audiobooks[currentIndex].title}</Text>
      <Text style={styles.author}>{audiobooks[currentIndex].author}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onValueChange={handleSliderValueChange}
        onSlidingComplete={handleSlidingComplete}
      />
      <View style={styles.controls}>
        <TouchableOpacity onPress={isPlaying ? pauseSound : () => playSound(audiobooks[currentIndex].audioUrl, position)}>
          <Text style={styles.controlButton}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={stopSound}>
          <Text style={styles.controlButton}>Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImage: {
    width: 200,
    height: 600,
  },
  backgroundImage: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 18,
    color: 'gray',
  },
  slider: {
    width: '80%',
    height: 40,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: 20,
  },
  controlButton: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
