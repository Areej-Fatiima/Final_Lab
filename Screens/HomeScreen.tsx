//Functional Component to Class Component
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

interface HomeScreenProps {
  navigation: NavigationProp<any>;
}

const imageUrls = [
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Pakistan.svg/125px-Flag_of_Pakistan.svg.png', alt: 'Pakistan' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/125px-Flag_of_Turkey.svg.png', alt: 'Turkey' },
  { src: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/125px-Flag_of_Japan.svg.png', alt: 'Japan' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/125px-Flag_of_Canada_%28Pantone%29.svg.png', alt: 'Canada' },
  { src: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/125px-Flag_of_Germany.svg.png', alt: 'Germany' },
  { src: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/125px-Flag_of_India.svg.png', alt: 'India' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/125px-Flag_of_the_People%27s_Republic_of_China.svg.png', alt: 'China' },
  { src: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/125px-Flag_of_France.svg.png', alt: 'France' }
];

const flagImages = [
  { src: 'https://www.countryflags.io/PK/flat/64.png', alt: 'Pakistan Flag' },
  { src: 'https://www.countryflags.io/GB/flat/64.png', alt: 'Turkey' },
  { src: 'https://www.countryflags.io/JP/flat/64.png', alt: 'Japan Flag' },
  { src: 'https://www.countryflags.io/CA/flat/64.png', alt: 'Canada Flag' },
  { src: 'https://www.countryflags.io/DE/flat/64.png', alt: 'Germany Flag' },
  { src: 'https://www.countryflags.io/IN/flat/64.png', alt: 'India Flag' },
  { src: 'https://www.countryflags.io/CN/flat/64.png', alt: 'China Flag' },
  { src: 'https://www.countryflags.io/FR/flat/64.png', alt: 'France Flag' }
];

class HomeScreen extends Component<HomeScreenProps> {
  handleButtonPress = () => {
    this.props.navigation.navigate('UserStack', { screen: 'SignIn' });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://i.pinimg.com/564x/4f/bf/f9/4fbff902a85605f749edfd2b6cffe4af.jpg' }}
          style={styles.backgroundImage}
        />
        <Text style={styles.title}> Welcome To</Text>
        <View style={styles.imageContainer}>
          {imageUrls.map((image, index) => (
            <View key={index} style={styles.imageItem}>
              <Image source={{ uri: image.src }} style={styles.flagImage} />
              <Image source={{ uri: flagImages[index].src }} style={styles.countryFlagImage} />
              <Text style={styles.imageText}>{image.alt}</Text>
            </View>
          ))}
          <Text style={styles.title}> Chatter Craft </Text>
          <Text style={styles.subtitle}>    Language Learning App</Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={this.handleButtonPress}>
          <Text style={styles.btnText}>Here We Go</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'white',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 2,
    color: 'white',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: -70,
  },
  imageItem: {
    alignItems: 'center',
    margin: 10,
  },
  flagImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 20,
  },
  countryFlagImage: {
    width: 40,
    height: 30,
  },
  imageText: {
    color: 'black',
    fontSize: 15,
    //fontWeight: 'bold',
    marginTop: -40,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    paddingVertical: 17,
    paddingHorizontal: 60,
    borderWidth: 1,
    backgroundColor: 'red',
    borderColor: 'red',
    marginTop: 250,
  },
  btnText: {
    color: 'white',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});

export default HomeScreen;
