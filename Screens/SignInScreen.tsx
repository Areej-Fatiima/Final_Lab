//js to Tsx file
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { signInWithEmailAndPassword } from 'firebase/auth';

type RootStackParamList = {
  SignUp: undefined;
  BottomTabs: { screen: string };
};

type SignInScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'BottomTabs'
>;

const SignInScreen: React.FC = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const [form, setForm] = useState<{ email: string; password: string }>({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleLogin = async () => {
    const { email, password } = form;

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    console.log('Email:', email);
    console.log('Password:', password);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User data:', user);
      navigation.navigate('BottomTabs', { screen: 'Translator' });
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        console.log('User does not exist. Please sign up.');
        setErrorMessage('User does not exist. Please sign up.');
      } else if (error.code === 'auth/wrong-password') {
        console.log('Invalid password. Please try again.');
        setErrorMessage('Invalid password. Please try again.');
      } else {
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <ImageBackground
        source={{ uri: 'https://i.pinimg.com/736x/31/36/a0/3136a01dc10b7bf57e8239c9117eb57f.jpg' }}
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
                  <Text style={styles.inputLabel}>Password</Text>
                  <TextInput
                    autoCorrect={false}
                    onChangeText={(password) => setForm({ ...form, password })}
                    placeholder=""
                    placeholderTextColor="#6b7280"
                    style={styles.inputControl}
                    secureTextEntry={true}
                    value={form.password}
                  />
                </View>

                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                <View style={styles.formAction}>
                  <TouchableOpacity onPress={handleLogin}>
                    <View style={styles.btn}>
                      <Text style={styles.btnText}>Log in</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <Text style={styles.formLink}>Forgot password?</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{ marginTop: 'auto' }}>
            <Text style={styles.formFooter}>
              Don't have an account?{' '}
              <Text style={{ textDecorationLine: 'underline', color: 'red' }}>Sign up</Text>
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
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
   
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
    borderRadius: 12,
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
  formLink: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 0.15,
    marginBottom: 10,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: 'black',
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
    margin: 30,
    marginBottom: 10,
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
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default SignInScreen;
