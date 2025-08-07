import React, { useState } from 'react';

import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { useNavigation } from '@react-navigation/native';

import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';

// This component is used to navigate back to the HomeScreen from the LoginScreen
const LoginScreen = () => {
  const [secureEntry, setSecureEntry] = useState(true);
  const navigation = useNavigation();   
  const handleBack = () => {
    // Navigate back to HomeScreen
    navigation.navigate('HOME');
  };
  const handleSignup = () => {
    // Handle sign-up logic here
  navigation.navigate('SIGNUP')}
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.backButtonWrapper]}
        onPress={handleBack}>
          <Ionicons name="arrow-back-outline" size={35} color={colors.primary}/>
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
          <Text style={styles.headingtext}>Hey,</Text>
          <Text style={styles.headingtext}>Welcome</Text>
          <Text style={styles.headingtext}>Back</Text>
        </View>
        {/* Form getting Started */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={23} color={colors.secondary} />
            <TextInput style={styles.textInput} placeholder='Enter your email' 
            placeholderTextColor={colors.secondary}
            keyboardType="email-address"/>
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="lock" size={23} color={colors.secondary} />
             <TextInput style={styles.textInput} placeholder='Enter your password' 
             placeholderTextColor={colors.secondary}
             secureTextEntry={secureEntry}/>
             <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
              <SimpleLineIcons name="eye" size={23} color={colors.secondary} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>
            <TouchableOpacity style={styles.loginButtonWrapper}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
        <Text style={styles.continueText}>Or continue with</Text>
            <TouchableOpacity style={styles.googleButtonContainer}>
              <Image source={require('../assets/google.png')} style={styles.googleImage}/>  
              <Text style={styles.googleButtonText}>Google</Text>
            </TouchableOpacity>
      <View style={styles.footerContainer}>
        <Text style={styles.noAccountText}>Don't have an account?</Text>
        <TouchableOpacity onPress={handleSignup}>
        <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
          </View>
      </View>
  )
}

export default LoginScreen

export const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.white,
    padding:20,
  },
  buttonContainer: {
        marginTop: 20,
        height: 50,
        width:50,
        backgroundColor: colors.grey,
        borderRadius: 100,
  },
    backButtonWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    textContainer: {
      marginVertical:20,
    },
    headingtext:{
      fontSize: 32,
      fontFamily:fonts.SemiBold,
      colors: colors.secondary,
    },
     formContainer: {
      marginTop:20,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20, 
      padding: 2,
      borderWidth: 1,
      borderRadius: 100,
      borderColor: colors.secondary,
      marginVertical: 4,
    },
    textInput: {
      flex: 1,
      paddingHorizontal: 10,
      fontSize: 15,
      fontFamily: fonts.Light,
      alignItems: 'center',
    },
    forgotPasswordText:{
      textAlign: 'right',
      marginVertical: 10,
      color : colors.primary,
      fontFamily: fonts.SemiBold,
    },
    loginButtonWrapper: {
      width: '100%',
      borderRadius: 100,
      padding: 10,
      marginVertical: 20,
      backgroundColor: colors.primary,
  },
  loginText: {
      color: colors.white,
      fontSize: 20,
      fontFamily: fonts.SemiBold,
      textAlign: 'center',     
  },
  continueText: {
      textAlign: 'center',
      marginVertical: 10,
      fontSize: 14,
      fontFamily: fonts.Regular,
      color: colors.primary,
  },
  googleButtonContainer: { 
      flexDirection: 'row',
      justifyContent: 'center',
      borderWidth: 2,
      borderRadius: 100,
      padding: 10,
      marginVertical: 20,
      borderColor: colors.primary,
      gap: 10,
  },
  googleImage: {
      marginVertical: 4.5,
      height: 20,
      width: 20,
  },
  googleButtonText: {
      color: colors.primary,
      fontSize: 20,
      fontFamily: fonts.SemiBold,
      textAlign: 'center',  
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 5,
  },
  noAccountText: {
      color: colors.primary,
      fontFamily: fonts.Regular,
  },
  signupText: {
      color: colors.primary,
      fontFamily: fonts.Bold,
  },
})