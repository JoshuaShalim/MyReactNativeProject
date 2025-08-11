import React, { useState } from 'react';

import {
  Alert,
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

import { supabase } from '../lib/supabaseClient';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';

// import { authorize } from 'react-native-app-auth';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  // State variables for form inputs
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    // Navigate back to HomeScreen
    navigation.navigate('HOME');
  };
  const handleLogin = () => {
    // navigate to Login screen
    navigation.navigate('LOGIN');
  };

  const validateForm = () => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return false;
    }

    // Phone validation regex (digits only, min 8–10 numbers)
    const phoneRegex = /^[0-9]{8,15}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert(
        'Invalid Phone',
        'Please enter a valid phone number (8–15 digits)',
      );
      return false;
    }

    // Password validation regex
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert(
        'Weak Password',
        'Password must be at least 8 characters long and include a letter, a number, and a special character',
      );
      return false;
    }

    return true;
  };

  // Function to handle form submission
  const handleSignup = async () => {
    if (!validateForm()) return; // If validation fails, stop here

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        phone,
      });

      if (error) {
        Alert.alert('Signup Error', error.message);
      } else {
        Alert.alert('Success', 'Please check your email for confirmation');
        navigation.navigate('LOGIN');
      }
    } catch (err) {
      Alert.alert('Unexpected Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  // Render the Signup screen
  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity
          style={[styles.backButtonWrapper]}
          onPress={handleBack}
        >
          <Ionicons
            name="arrow-back-outline"
            size={35}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headingtext}>Let's get</Text>
        <Text style={styles.headingtext}>started</Text>
      </View>
      {/* Form getting Started */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={23} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor={colors.secondary}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons
            name="phone-portrait-outline"
            size={23}
            color={colors.secondary}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your phone number"
            placeholderTextColor={colors.secondary}
            keyboardType="number-pad"
            value={phone}
            onChangeText={text => setPhone(text.replace(/[^0-9]/g, ''))} // remove non-numbers
            maxLength={12} // limit to 12 digits
          />
        </View>
      </View>
      {/* Password input */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name="lock" size={23} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={colors.secondary}
            secureTextEntry={secureEntry}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
            <Ionicons
              name={secureEntry ? 'eye-outline' : 'eye-off-outline'}
              size={23}
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
        {/* Password Requirements */}
        <Text
          style={{
            fontSize: 12,
            marginLeft: 20,
            color:
              password.length >= 8 &&
              /\d/.test(password) &&
              /[!@#$%^&*]/.test(password)
                ? 'green'
                : 'red',
          }}
        >
          Must be at least 8 characters, include a number and a special
          character
        </Text>
      </View>
      {/* <TouchableOpacity style={styles.signupButtonWrapper}>
        <Text style={styles.signupText}>Sign up</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.signupButtonWrapper}
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={styles.signupText}>
          {loading ? 'Signing up...' : 'Sign up'}
        </Text>
      </TouchableOpacity>
      {/* Divider */}
      <Text style={styles.continueText}>Or continue with</Text>
      {/* Google Auth Button */}
      <TouchableOpacity style={styles.googleButtonContainer}>
        <Image
          source={require('../assets/google.png')}
          style={styles.googleImage}
        />
        <Text style={styles.googleButtonText}>Google</Text>
      </TouchableOpacity>
      <View style={styles.footerContainer}>
        <Text style={styles.noAccountText}>Don't have an account?</Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  backButtonContainer: {
    marginTop: 20,
    height: 50,
    width: 50,
    backgroundColor: colors.grey,
    borderRadius: 100,
  },
  backButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textContainer: {
    marginVertical: 20,
  },
  headingtext: {
    fontSize: 32,
    fontFamily: fonts.SemiBold,
    colors: colors.secondary,
  },
  formContainer: {
    marginTop: 20,
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
  signupButtonWrapper: {
    width: '100%',
    borderRadius: 100,
    padding: 10,
    marginVertical: 30,
    backgroundColor: colors.primary,
  },
  signupText: {
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
    marginVertical: 20,
    gap: 5,
  },
  noAccountText: {
    color: colors.primary,
    fontFamily: fonts.Regular,
  },
  loginText: {
    color: colors.primary,
    fontFamily: fonts.Bold,
  },
});
