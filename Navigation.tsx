// import React from 'react';
// import { Image } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import { AuthProvider } from './AuthProvider';
// import AudioBooksScreen from './Screens/AudioBooks'; // Ensure the correct path
// import ResumePlayScreen from './Screens/ResumePlayScreen'; // Import the ResumePlayScreen
// import TranslatorScreen from './Screens/TranslatorScreen';
// import QuizScreen from './Screens/QuizScreen';
// import BooksScreen from './Screens/BooksScreen';
// import Playground from './Playground';
// import HomeScreen from './Screens/HomeScreen';
// import SignInScreen from './Screens/SignInScreen';
// import SignUpScreen from './Screens/SignUpScreen';
// import LogoutScreen from './Screens/LogoutScreen';

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// const UserStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
//     <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
//   </Stack.Navigator>
// );

// const QuizStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="QuizScreen" component={QuizScreen} options={{ headerShown: false }} />
//     <Stack.Screen name="Playground" component={Playground} options={{ headerShown: false }} />
//   </Stack.Navigator>
// );

// const BottomTabs = () => (
//   <Tab.Navigator>
//     <Tab.Screen 
//       name="Translator" 
//       component={TranslatorScreen} 
//       options={{
//         headerShown: false,
//         tabBarIcon: ({ focused }) => (
//           <Image
//             source={{ uri: focused ? 'https://i.pinimg.com/564x/77/70/bd/7770bd2c8984f99e4b961f97e441d3a5.jpg' : 'https://i.pinimg.com/564x/77/70/bd/7770bd2c8984f99e4b961f97e441d3a5.jpg' }}
//             style={{ width: 24, height: 24 }}
//           />
//         ),
//       }}
//     />
//     <Tab.Screen 
//       name="Books" 
//       component={BooksScreen} 
//       options={{
//         headerShown: false,
//         tabBarIcon: ({ focused }) => (
//           <Image
//             source={{ uri: focused ? 'https://i.pinimg.com/564x/66/e9/09/66e909cf0f6239f0d67f060484c7647b.jpg' : 'https://i.pinimg.com/564x/66/e9/09/66e909cf0f6239f0d67f060484c7647b.jpg' }}
//             style={{ width: 24, height: 24 }}
//           />
//         ),
//       }}
//     />
//     <Tab.Screen 
//       name="AudioLec" 
//       component={AudioBooksScreen} 
//       options={{
//         headerShown: false,
//         tabBarIcon: ({ focused }) => (
//           <Image
//             source={{ uri: focused ? 'https://i.pinimg.com/564x/1c/c3/b9/1cc3b9fd5003a1893d0e5959301a0cbe.jpg' : 'https://i.pinimg.com/564x/1c/c3/b9/1cc3b9fd5003a1893d0e5959301a0cbe.jpg' }}
//             style={{ width: 24, height: 24 }}
//           />
//         ),
//       }}
//     />
//     <Tab.Screen 
//       name="Quiz" 
//       component={QuizStack} 
//       options={{
//         headerShown: false,
//         tabBarIcon: ({ focused }) => (
//           <Image
//             source={{ uri: focused ? 'https://i.pinimg.com/564x/30/c7/e9/30c7e954c1ff3bf7b0c9c3b84fe8ebe3.jpg' : 'https://i.pinimg.com/564x/30/c7/e9/30c7e954c1ff3bf7b0c9c3b84fe8ebe3.jpg' }}
//             style={{ width: 24, height: 24 }}
//           />
//         ),
//       }}
//     />
//     <Tab.Screen 
//       name="Logout" 
//       component={LogoutScreen} 
//       options={{
//         headerShown: false,
//         tabBarIcon: ({ focused }) => (
//           <Image
//             source={{ uri: focused ? 'https://i.pinimg.com/564x/cd/89/66/cd89665cc727ab2b336b58b5b60d2165.jpg' : 'https://i.pinimg.com/564x/cd/89/66/cd89665cc727ab2b336b58b5b60d2165.jpg' }}
//             style={{ width: 24, height: 24 }}
//           />
//         ),
//       }}
//     />
//   </Tab.Navigator>
// );

// const MainStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//     <Stack.Screen name="UserStack" component={UserStack} options={{ headerShown: false }} />
//   </Stack.Navigator>
// );

// const Navigation = () => (
//   <AuthProvider>
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Main" component={MainStack} options={{ headerShown: false }} />
//         <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
//         <Stack.Screen name="ResumePlay" component={ResumePlayScreen} options={{ headerShown: false }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   </AuthProvider>
// );

// export default Navigation;



import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './AuthProvider';
import AudioBooksScreen from './Screens/AudioBooks';
import ResumePlayScreen from './Screens/ResumePlayScreen';
import TranslatorScreen from './Screens/TranslatorScreen';
import QuizScreen from './Screens/QuizScreen';
import BooksScreen from './Screens/BooksScreen';
import Playground from './Playground';
import HomeScreen from './Screens/HomeScreen';
import SignInScreen from './Screens/SignInScreen';
import SignUpScreen from './Screens/SignUpScreen';
import LogoutScreen from './Screens/LogoutScreen';
import { RootStackParamList } from './RootStackParamList';

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const UserStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const QuizStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="QuizScreen" component={QuizScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Playground" component={Playground} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const BottomTabs = () => (
  <Tab.Navigator>
    <Tab.Screen 
      name="Translator" 
      component={TranslatorScreen} 
      options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Image
            source={{ uri: 'https://i.pinimg.com/564x/77/70/bd/7770bd2c8984f99e4b961f97e441d3a5.jpg' }}
            style={{ width: 24, height: 24 }}
          />
        ),
      }}
    />
    <Tab.Screen 
      name="Books" 
      component={BooksScreen} 
      options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Image
            source={{ uri: 'https://i.pinimg.com/564x/66/e9/09/66e909cf0f6239f0d67f060484c7647b.jpg' }}
            style={{ width: 24, height: 24 }}
          />
        ),
      }}
    />
    <Tab.Screen 
      name="AudioLec" 
      component={AudioBooksScreen} 
      options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Image
            source={{ uri: 'https://i.pinimg.com/564x/1c/c3/b9/1cc3b9fd5003a1893d0e5959301a0cbe.jpg' }}
            style={{ width: 24, height: 24 }}
          />
        ),
      }}
    />
    <Tab.Screen 
      name="Quiz" 
      component={QuizStack} 
      options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Image
            source={{ uri: 'https://i.pinimg.com/564x/30/c7/e9/30c7e954c1ff3bf7b0c9c3b84fe8ebe3.jpg' }}
            style={{ width: 24, height: 24 }}
          />
        ),
      }}
    />
    <Tab.Screen 
      name="Logout" 
      component={LogoutScreen} 
      options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Image
            source={{ uri: 'https://i.pinimg.com/564x/cd/89/66/cd89665cc727ab2b336b58b5b60d2165.jpg' }}
            style={{ width: 24, height: 24 }}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="UserStack" component={UserStack} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const Navigation = () => (
  <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainStack} options={{ headerShown: false }} />
        <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="ResumePlay" component={ResumePlayScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  </AuthProvider>
);

export default Navigation;
