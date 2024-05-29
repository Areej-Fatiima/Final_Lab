//Flat List into Custom Flat List.

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, Linking, Image } from 'react-native';
import { app, db } from '../config'; // Firebase configuration from firebase.js file
import { collection, getDocs } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';

const BooksScreen = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const booksCollection = collection(db, 'Books');
        const booksSnapshot = await getDocs(booksCollection);
        const booksData = booksSnapshot.docs.map(doc => {
          const data = doc.data();
          console.log('Fetched book data:', data); // Log each book's data to verify fields
          return {
            ...data, 
            coverURL: data.coverurl, // Use 'coverurl' from Firestore
            url: data.url // Explicitly set url
          };
        });
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBookData();
  }, []);

  const openInBrowser = (url) => {
    if (typeof url === 'string' && url.startsWith('http')) {
      try {
        Linking.openURL(url);
      } catch (error) {
        console.error('Error opening URL:', error);
      }
    } else {
      console.error('Invalid URL:', url);
    }
  };

  const renderBookItem = (item) => (
    <TouchableOpacity
      key={item.url}
      style={styles.bookItem}
      onPress={() => openInBrowser(item.url)} // Use 'url' instead of 'bookUrl'
    >
      {item.coverURL ? (
        <Image // Use Image component for the cover image
          source={{ uri: item.coverURL }}
          style={styles.bookImage}
          resizeMode="cover"
        />
      ) : (
        <Text style={styles.errorText}>No Cover Image</Text>
      )}
      <Text style={styles.bookTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  if (books.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Books Available</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/736x/4c/fd/b9/4cfdb9b7e5ab4917482accee76781461.jpg' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>Books for You..</Text>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {books.map(renderBookItem)}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(244, 244, 244, 0)', // Semi-transparent background color to improve readability
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    marginTop: 30,
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
  },
  scrollViewContainer: {
    padding: 20,
  },
  bookItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  bookImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default BooksScreen;
