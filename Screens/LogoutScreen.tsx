//js to tsx file
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { StackNavigationProp } from '@react-navigation/stack'; // Import StackNavigationProp
import { RootStackParamList } from '../RootStackParamList'; // Import your RootStackParamList type

interface ConfirmationModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onCancel, onConfirm }) => {
  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalText}>Oh no! You're leaving...</Text>
      <Text style={styles.modalText}>Are you sure?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
          <Text style={styles.buttonText}>Yes, Log Me Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.buttonText}>Naah, Just Kidding</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

const LogoutScreen: React.FC<Props> = ({ navigation }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleCancel = () => {
    console.log('Cancel clicked');
    setShowModal(false);
  };

  const handleConfirm = () => {
    console.log('Confirm clicked');
    setShowModal(false);
    navigation.navigate('Home'); // Navigate to Home screen
  };

  return (
    <ImageBackground source={{ uri: 'https://i.pinimg.com/564x/68/b6/93/68b6935002f59d95fa863943bdfee459.jpg' }} style={styles.background}>
      <View style={styles.container}>
        <Image
          source={{ uri: 'https://i.pinimg.com/564x/c1/b6/1b/c1b61b9bc0e83e91e0ef5ab298007163.jpg' }} // Image URL
          style={styles.logo}
        />
        <Text style={styles.greetingText}>We're sad to see you go!</Text>
        <Text style={styles.infoText}>Thank you for using our app. If you change your mind, you can always log back in!</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={() => setShowModal(true)}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
        {showModal && <ConfirmationModal onCancel={handleCancel} onConfirm={handleConfirm} />}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  logo: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    marginTop: -40,
    marginBottom: 10,
  },
  greetingText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    color: 'black',
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginBottom: -10,
  },
  logoutButton: {
    backgroundColor: '#A0522D',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 150,
    marginBottom: -50,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    //color: 'black',
    borderRadius: 100,
    paddingVertical: 2,
    paddingHorizontal: 60,
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogoutScreen;
