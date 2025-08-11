import React, { useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { authorize } from 'react-native-app-auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { useNavigation } from '@react-navigation/native';

import { supabase } from '../lib/supabaseClient';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';

const LoginScreen = () => {
  // Navigation hook
  const navigation = useNavigation();
  // State variables for login
  const [secureEntry, setSecureEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot password modal state
  const [forgotVisible, setForgotVisiblee] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   // Handle Back Navigation
  const handleBack = () => {
    navigation.goBack();
  };
  // Handle Signup Navigation
  const handleSignup = () => {
    navigation.navigate('SIGNUP');
  };
  // Email Validation
  const validateInputs = () => {
    if (!email.trim()) {
      setErrorMessage('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    if (!password.trim()) {
      setErrorMessage('Password is required');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  // Handle Login
  const handleLogin = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setErrorMessage('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Supabase login response:', { data, error });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      if (!data?.session) {
        setErrorMessage('Login failed — no session returned.');
        return;
      }

      navigation.navigate('DASHBOARD');
    } catch (err) {
      console.error('Unexpected login error:', err);
      setErrorMessage('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

    // Handle Password Reset
  const handlePasswordReset = async () => {
    if (!resetEmail.trim() || !emailRegex.test(resetEmail)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    setResetLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail);
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert(
          'Password Reset Email Sent',
          'Please check your inbox for the reset link.'
        );
        setForgotVisiblee(false);
        setResetEmail('');
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setResetLoading(false);
    }
  };

  // Handle Google Login
// Google Sign-In
const handleGoogleSignIn = async () => {
  setLoading(true);
  try {
    const config = {
      issuer: 'https://accounts.google.com',
      clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
      redirectUrl: 'com.Omnix://login',
      scopes: ['openid', 'profile', 'email'],
    };

    const authState = await authorize(config);

    // Exchange Google access token for Supabase session
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: authState.idToken,
    });

    if (error) {
      Alert.alert('Login Error', error.message);
    } else {
      navigation.navigate('DASHBOARD');
    }
  } catch (err) {
    console.error('Google sign-in error:', err);
    Alert.alert('Error', 'Google sign-in failed.');
  } finally {
    setLoading(false);
  }
};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        
        {/* Back Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButtonWrapper} onPress={handleBack} disabled={loading}>
            <Ionicons name="arrow-back-outline" size={35} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Welcome Text */}
        <View style={styles.textContainer}>
          <Text style={styles.headingtext}>Hey,</Text>
          <Text style={styles.headingtext}>Welcome</Text>
          <Text style={styles.headingtext}>Back</Text>
        </View>

        {/* Error Message */}
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

        {/* Email Input */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={23} color={colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email"
              placeholderTextColor={colors.secondary}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        {/* Password Input */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="lock" size={23} color={colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your password"
              placeholderTextColor={colors.secondary}
              secureTextEntry={secureEntry}
              editable={!loading}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setSecureEntry(!secureEntry)}
              disabled={loading}
            >
              <Ionicons
                name={secureEntry ? 'eye-outline' : 'eye-off-outline'}
                size={23}
                color={colors.secondary}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity disabled={loading}
            onPress={() => setForgotVisiblee(true)}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.loginButtonWrapper, loading && { opacity: 0.6 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginText}>
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>

        {/* Continue with Google */}
        <Text style={styles.continueText}>Or continue with</Text>
        <TouchableOpacity
          style={styles.googleButtonContainer}
          disabled={loading}
          onPress={handleGoogleSignIn}
        >
          <Image
            source={require('../assets/google.png')}
            style={styles.googleImage}
          />
          <Text style={styles.googleButtonText}>Google</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.noAccountText}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleSignup} disabled={loading}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        {/* Forgot Password Modal */}
        <Modal
          transparent
          visible={forgotVisible}
          animationType="slide"
          onRequestClose={() => setForgotVisiblee(false)}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Reset Password</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.secondary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={resetEmail}
                  onChangeText={setResetEmail}
                  editable={!resetLoading}
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.modalCancel}
                    onPress={() => setForgotVisiblee(false)}
                    disabled={resetLoading}
                  >
                    <Text style={styles.modalCancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalSubmit}
                    onPress={handlePasswordReset}
                    disabled={resetLoading}
                  >
                    {resetLoading ? (
                      <ActivityIndicator color={colors.white} />
                    ) : (
                      <Text style={styles.modalSubmitText}>Send Link</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  buttonContainer: {
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
    color: colors.primary,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: fonts.Regular,
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
  forgotPasswordText: {
    textAlign: 'right',
    marginVertical: 10,
    color: colors.primary,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    width: '85%',
  },
  modalTitle: {
    fontFamily: fonts.SemiBold,
    fontSize: 18,
    marginBottom: 10,
    color: colors.primary,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 8,
    padding: 10,
    fontFamily: fonts.Regular,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  modalCancel: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: colors.grey,
    borderRadius: 5,
  },
  modalCancelText: {
    color: colors.primary,
    fontFamily: fonts.SemiBold,
  },
  modalSubmit: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  modalSubmitText: {
    color: colors.white,
    fontFamily: fonts.SemiBold,
  },
});
