

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';

export default function ResumePlayScreen({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAudio = async () => {
      setLoading(true);
      try {
        if (!item.audiourl) {
          console.error('Error: audioURL is null or undefined');
          return;
        }

        const { sound: newSound } = await Audio.Sound.createAsync({ uri: item.audiourl }, { shouldPlay: true });
        newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

        setSound(newSound);
        setIsPlaying(true);
      } catch (error) {
        console.error('Error loading audio:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [item]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', async () => {
      if (sound) {
        await sound.pauseAsync();
        await sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
      }
    });

    return unsubscribe;
  }, [navigation, sound]);

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);
    }
  };

  const handlePlayPause = async () => {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderValueChange = async (value) => {
    if (sound) {
      const seekPosition = value * duration;
      await sound.setPositionAsync(seekPosition);
      setPosition(seekPosition);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading audio...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.coverurl }} style={styles.coverImage} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>{item.author}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={position / duration || 0}
        onValueChange={handleSliderValueChange}
        minimumTrackTintColor="#1E90FF"
        maximumTrackTintColor="#000000"
        thumbTintColor="#1E90FF"
      />
      <TouchableOpacity onPress={handlePlayPause} style={styles.playPauseButton}>
        <Text style={styles.playPauseText}>{isPlaying ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>
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
    padding: 20,
  },
  coverImage: {
    width: 250,
    height: 350,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  author: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
    marginVertical: 20,
  },
  playPauseButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 70,
    marginTop:50,
    borderRadius: 50,
  },
  playPauseText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
