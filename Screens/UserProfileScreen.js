// // UserProfileScreen.js
// import React, { useState, useEffect, useContext } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
// } from 'react-native';
// import { AuthContext } from '../AuthProvider'; // Ensure correct path
// import { db } from '../config';
// import { doc, getDoc } from 'firebase/firestore';

// const UserProfileScreen = ({ navigation, route }) => {
//   const { user, logout } = useContext(AuthContext);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const getUser = async () => {
//     if (!user) return;

//     try {
//       const docRef = doc(db, 'Users', route.params ? route.params.userId : user.uid);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         setUserData(docSnap.data());
//       } else {
//         console.log('No such document!');
//       }
//     } catch (error) {
//       console.error('Error getting user document:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     console.log("AuthContext user:", user);
//     getUser();
//     const unsubscribe = navigation.addListener("focus", getUser);
//     return unsubscribe;
//   }, [navigation, user]);

//   if (!user) {
//     return null; // or a loading indicator
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
//       <ScrollView
//         style={styles.container}
//         contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
//         showsVerticalScrollIndicator={false}
//       >
//         <Image
//           style={styles.userImg}
//           source={{
//             uri: userData?.userImg || 'https://example.com/default-photo.jpg',
//           }}
//         />
//         <Text style={styles.userName}>
//           {userData ? `${userData.fname || 'Test'} ${userData.lname || 'User'}` : 'Test User'}
//         </Text>
//         <Text style={styles.aboutUser}>
//           {userData ? userData.about || 'No details added.' : ''}
//         </Text>
//         <View style={styles.userBtnWrapper}>
//           {route.params ? (
//             <>
//               <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
//                 <Text style={styles.userBtnTxt}>Message</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
//                 <Text style={styles.userBtnTxt}>Follow</Text>
//               </TouchableOpacity>
//             </>
//           ) : (
//             <>
//               <TouchableOpacity
//                 style={styles.userBtn}
//                 onPress={() => navigation.navigate('EditProfile')}
//               >
//                 <Text style={styles.userBtnTxt}>Edit</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
//                 <Text style={styles.userBtnTxt}>Logout</Text>
//               </TouchableOpacity>
//             </>
//           )}
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default UserProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   userImg: {
//     height: 150,
//     width: 150,
//     borderRadius: 75,
//   },
//   userName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   aboutUser: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#666',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   userBtnWrapper: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     width: '100%',
//     marginBottom: 10,
//   },
//   userBtn: {
//     borderColor: '#2e64e5',
//     borderWidth: 2,
//     borderRadius: 3,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     marginHorizontal: 5,
//   },
//   userBtnTxt: {
//     color: '#2e64e5',
//   },
// });
// UserProfileScreen.js
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { AuthContext } from '../AuthProvider';
import { db, storage } from '../config'; // Import storage from config for image upload
import { doc, getDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker for uploading image

const UserProfileScreen = ({ navigation, route }) => {
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null); // State for profile image

  const getUser = async () => {
    if (!user) return;

    try {
      const docRef = doc(db, 'Users', user.uid); // Use user.uid directly
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error getting user document:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [user]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      // Upload image to Firebase Storage here if needed
    }
  };

  if (!user) {
    return null; // or a loading indicator
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={pickImage}>
          <Image
            style={styles.userImg}
            source={image ? { uri: image } : require('../assets/favicon.png')}
          />
        </TouchableOpacity>
        <Text style={styles.userName}>{userData ? `${userData.fname || 'Test'} ${userData.lname || 'User'}` : 'Test User'}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        {/* You may replace this with a TextInput for editing password */}
        <Text style={styles.userPassword}>********</Text>
        <View style={styles.userBtnWrapper}>
          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.userBtnTxt}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
            <Text style={styles.userBtnTxt}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 10,
  },
  userPassword: {
    fontSize: 16,
    marginBottom: 20,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  userBtn: {
    backgroundColor: '#2e64e5',
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
