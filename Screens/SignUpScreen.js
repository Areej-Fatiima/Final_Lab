// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   SafeAreaView,
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   ImageBackground,
//   Alert // Import Alert for showing error messages
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../config'; // Import auth from firebaseConfig
// import Icon from 'react-native-vector-icons/Ionicons';
// import { getReactNativePersistence } from 'firebase/auth';




// const SignUpScreen = () => {
//   const navigation = useNavigation();
//   const [form, setForm] = useState({
//     email: '',
//     username: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleSignup = async () => {
//     if (form.password.length < 8) {
//       console.error('Password must be at least 8 characters');
//       return;
//     }
//     if (form.password !== form.confirmPassword) {
//       console.error('Passwords do not match');
//       return;
//     }
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
//       console.log('User signed up successfully:', userCredential.user);
//       navigation.navigate('Home');
//     } catch (error) {
//       console.error('Error signing up:', error.message);
//       // Handle the error here, for example, you can show an alert to the user
//       Alert.alert('Sign Up Error', error.message);
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
//       <ImageBackground
//         source={{
//           uri: 'https://i.pinimg.com/736x/31/36/a0/3136a01dc10b7bf57e8239c9117eb57f.jpg',
//         }}
//         style={styles.backgroundImage}
//       >
//         <KeyboardAwareScrollView contentContainerStyle={styles.container}>
//           <View style={styles.header}>
//             <Text style={styles.title}>Chatter Craft</Text>
//             <Text style={styles.subtitle}>Unlock fluency with our language learning app</Text>
//           </View>

//           <View style={styles.formContainer}>
//             <View style={styles.formBackground}>
//               <View style={styles.form}>
//                 <View style={styles.input}>
//                   <Text style={styles.inputLabel}>Email address</Text>
//                   <TextInput
//                     autoCapitalize="none"
//                     autoCorrect={false}
//                     keyboardType="email-address"
//                     onChangeText={(email) => setForm({ ...form, email })}
//                     placeholder="john@example.com"
//                     placeholderTextColor="#6b7280"
//                     style={styles.inputControl}
//                     value={form.email}
//                   />
//                 </View>

//                 <View style={styles.input}>
//                   <Text style={styles.inputLabel}>Username</Text>
//                   <TextInput
//                     onChangeText={(username) => setForm({ ...form, username })}
//                     placeholder="Username"
//                     placeholderTextColor="#6b7280"
//                     style={styles.inputControl}
//                     value={form.username}
//                   />
//                 </View>

//                 <View style={styles.input}>
//                   <Text style={styles.inputLabel}>Phone Number</Text>
//                   <TextInput
//                     onChangeText={(phone) => setForm({ ...form, phone })}
//                     placeholder="Phone number"
//                     placeholderTextColor="#6b7280"
//                     style={styles.inputControl}
//                     value={form.phone}
//                     keyboardType="phone-pad"
//                   />
//                 </View>

//                 <View style={styles.input}>
//                   <Text style={styles.inputLabel}>Password</Text>
//                   <View style={styles.passwordContainer}>
//                     <TextInput
//                       autoCorrect={false}
//                       onChangeText={(password) => setForm({ ...form, password })}
//                       placeholder="Password"
//                       placeholderTextColor="#6b7280"
//                       style={styles.passwordInput}
//                       secureTextEntry={!showPassword}
//                       value={form.password}
//                     />
//                     <TouchableOpacity
//                       onPress={() => setShowPassword(!showPassword)}
//                       style={styles.eyeIcon}
//                     >
//                       <Icon
//                         name={showPassword ? 'eye-off' : 'eye'}
//                         size={24}
//                         color="#6b7280"
//                       />
//                     </TouchableOpacity>
//                   </View>
//                 </View>

//                 <View style={styles.input}>
//                   <Text style={styles.inputLabel}>Confirm Password</Text>
//                   <View style={styles.passwordContainer}>
//                     <TextInput
//                       autoCorrect={false}
//                       onChangeText={(confirmPassword) =>
//                         setForm({ ...form, confirmPassword })
//                       }
//                       placeholder="Confirm Password"
//                       placeholderTextColor="#6b7280"
//                       style={styles.passwordInput}
//                       secureTextEntry={!showConfirmPassword}
//                       value={form.confirmPassword}
//                     />
//                     <TouchableOpacity
//                       onPress={() => setShowConfirmPassword(!showConfirmPassword)}
//                       style={styles.eyeIcon}
//                     >
//                       <Icon
//                         name={showConfirmPassword ? 'eye-off' : 'eye'}
//                         size={24}
//                         color="#6b7280"
//                       />
//                     </TouchableOpacity>
//                   </View>
//                 </View>

//                 <View style={styles.formAction}>
//                   <TouchableOpacity onPress={handleSignup}>
//                     <View style={styles.btn}>
//                       <Text style={styles.btnText}>Sign up</Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </View>

//           <TouchableOpacity
//             onPress={() => navigation.navigate('SignIn')}
//             style={{ marginTop: 'auto' }}
//           >
//             <Text style={styles.formFooter}>
//               Already have an account?{' '}
//               <Text style={{ textDecorationLine: 'underline', color: 'red' }}>
//                 Sign in
//               </Text>
//             </Text>
//           </TouchableOpacity>
//         </KeyboardAwareScrollView>
//         </ImageBackground>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//   },
//   title: {
//     fontSize: 45,
//     fontWeight: '700',
//     color: 'white',
//     marginBottom: 15,
//     marginTop: -30,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: 'white',
//     fontWeight: 'bold',
//     marginTop: -10,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   header: {
//     paddingTop: 50,
//   },
//   formContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   formBackground: {
//     width: '80%',
//     padding: 24,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.5)',
//     overflow: 'hidden',
//     alignSelf: 'center',
//   },
//   form: {
//     paddingVertical: 20,
//     borderRadius: 12,
//   },
//   formAction: {
//     marginTop: 4,
//     marginBottom: 16,
//     alignItems: 'center',
//   },
//   input: {
//     marginBottom: 16,
//   },
//   inputLabel: {
//     fontSize: 17,
//     fontWeight: '600',
//     color: 'black',
//     marginTop: -10,
//     marginBottom: 
//     8,
//   },
//   inputControl: {
//     height: 50,
//     backgroundColor: 'transparent',
//     paddingHorizontal: 16,
//     borderRadius: 12,
//     fontSize: 15,
//     fontWeight: '500',
//     color: 'black',
//     borderWidth: 1,
//     borderColor: 'black',
//     borderStyle: 'solid',
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   passwordInput: {
//     flex: 1, // Ensure the input field takes up the available space
//     height: 50, // Match the height of other input fields
//     backgroundColor: 'transparent',
//     paddingHorizontal: 16,
//     borderRadius: 12,
//     fontSize: 15,
//     fontWeight: '500',
//     color: 'black',
//     borderWidth: 1,
//     borderColor: 'black',
//     borderStyle: 'solid',
//   },
//   eyeIcon: {
//     position: 'absolute',
//     right: 10,
//   },
//   btn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 30,
//     paddingVertical: 8,
//     paddingHorizontal: 60,
//     borderWidth: 1,
//     backgroundColor: 'white',
//     borderColor: 'white',
//     marginTop: 10,
//     marginBottom: -30,
//   },
//   btnText: {
//     fontSize: 18,
//     lineHeight: 26,
//     fontWeight: '600',
//     color: 'red',
//   },
//   backgroundImage: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   formFooter: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: 'white',
//     textAlign: 'center',
//     letterSpacing: 0.15,
//     marginBottom: 10,
//   },
// });

// export default SignUpScreen;




import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert // Import Alert for showing error messages
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config'; // Import auth from firebaseConfig
import Icon from 'react-native-vector-icons/Ionicons';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    email: '',
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async () => {
    if (form.password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }
    if (form.password !== form.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      console.log('User signed up successfully:', userCredential.user);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error signing up:', error.message);
      Alert.alert('Sign Up Error', error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <ImageBackground
        source={{
          uri: 'https://i.pinimg.com/736x/31/36/a0/3136a01dc10b7bf57e8239c9117eb57f.jpg',
        }}
        style={styles.backgroundImage}
      >
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Chatter Craft</Text>
            <Text style={styles.subtitle}>Unlock fluency with our language learning app</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.formBackground}>
              <View style={styles.form}>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Email address</Text>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    onChangeText={(email) => setForm({ ...form, email })}
                    placeholder="john@example.com"
                    placeholderTextColor="#6b7280"
                    style={styles.inputControl}
                    value={form.email}
                  />
                </View>

                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Username</Text>
                  <TextInput
                    onChangeText={(username) => setForm({ ...form, username })}
                    placeholder="Username"
                    placeholderTextColor="#6b7280"
                    style={styles.inputControl}
                    value={form.username}
                  />
                </View>

                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Phone Number</Text>
                  <TextInput
                    onChangeText={(phone) => setForm({ ...form, phone })}
                    placeholder="Phone number"
                    placeholderTextColor="#6b7280"
                    style={styles.inputControl}
                    value={form.phone}
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      autoCorrect={false}
                      onChangeText={(password) => setForm({ ...form, password })}
                      placeholder="Password"
                      placeholderTextColor="#6b7280"
                      style={styles.passwordInput}
                      secureTextEntry={!showPassword}
                      value={form.password}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeIcon}
                    >
                      <Icon
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="#6b7280"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Confirm Password</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      autoCorrect={false}
                      onChangeText={(confirmPassword) =>
                        setForm({ ...form, confirmPassword })
                      }
                      placeholder="Confirm Password"
                      placeholderTextColor="#6b7280"
                      style={styles.passwordInput}
                      secureTextEntry={!showConfirmPassword}
                      value={form.confirmPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={styles.eyeIcon}
                    >
                      <Icon
                        name={showConfirmPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="#6b7280"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.formAction}>
                  <TouchableOpacity onPress={handleSignup}>
                    <View style={styles.btn}>
                      <Text style={styles.btnText}>Sign up</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            style={{ marginTop: 'auto' }}
          >
            <Text style={styles.formFooter}>
              Already have an account?{' '}
              <Text style={{ textDecorationLine: 'underline', color: 'red' }}>
                Sign in
              </Text>
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
        </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  title: {
    fontSize: 45,
    fontWeight: '700',
    color: 'white',
    marginBottom: 15,
    marginTop: -30,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
    fontWeight: 'bold',
    marginTop: -10,
    marginBottom: 20,
    textAlign: 'center',
  },
  header: {
    paddingTop: 50,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formBackground: {
    width: '80%',
    padding: 24,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  form: {
    paddingVertical: 20,
    borderRadius: 12,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
    alignItems: 'center',
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: 'black',
    marginTop: -10,
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1, // Ensure the input field takes up the available space
    height: 50, // Match the height of other input fields
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 60,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'white',
    marginTop: 10,
    marginBottom: -30,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: 'red',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 0.15,
    marginBottom: 10,
  },
});

export default SignUpScreen;

