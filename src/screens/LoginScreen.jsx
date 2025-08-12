import React, { useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
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

  const redirectUri = 'com.omnix://login';

  // Handle Back Navigation
  const handleBack = () => {
    if (loading) return; // Prevent navigation while loading
    navigation.goBack();
  };
  // Handle Signup Navigation
  const handleSignup = () => {
    if (loading) return; // Prevent navigation while loading
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
      console.log('Attempting login for:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Supabase login response:', { data, error });

      if (error) {
        console.error('Login error:', error);
        setErrorMessage(error.message);
        return;
      }

      if (!data?.session) {
        console.error('Login failed - no session returned');
        setErrorMessage('Login failed — no session returned.');
        return;
      }

      console.log('Login successful, navigating to dashboard');
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
      return false;
    }
    
    setResetLoading(true);
    try {
      console.log('Sending password reset email to:', resetEmail);
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail);
      if (error) {
        console.error('Password reset error:', error);
        Alert.alert('Error', error.message);
      } else {
        console.log('Password reset email sent successfully');
        Alert.alert(
          'Password Reset Email Sent',
          'Please check your inbox for the reset link.',
        );
        setForgotVisiblee(false);
        setResetEmail('');
      }
    } catch (err) {
      console.error('Unexpected password reset error:', err);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setResetLoading(false);
    }
  };

  // Handle Google Login - Updated to match SignupScreen implementation
  const handleGoogleSignIn = async () => {
    try {
      console.log('Initiating Google sign-in...');
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUri,
        },
      });

      if (error) {
        console.error('Google OAuth error:', error);
        Alert.alert('Google Sign-in Error', error.message);
        return;
      }

      if (data?.url && await InAppBrowser.isAvailable()) {
        console.log('Opening Google OAuth in InAppBrowser...');
        const result = await InAppBrowser.open(data.url, {
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false
        });
        
        console.log('InAppBrowser result:', result);
        if (result.type === 'cancel') {
          console.log('User cancelled Google sign-in');
        }
      } else {
        console.error('InAppBrowser not available');
        Alert.alert('Error', 'InAppBrowser is not available on this device');
      }
    } catch (err) {
      console.error('Google sign-in error:', err);
      Alert.alert('Unexpected Error', err.message || 'Google sign-in failed');
    }
  };

  // Handle deep linking for authentication - Added to match SignupScreen
  React.useEffect(() => {
    const handleDeepLink = async (event) => {
      console.log('Deep link received:', event.url);
      const url = event.url;
      
      try {
        const { data, error } = await supabase.auth.getSessionFromUrl({ url });
        if (error) {
          console.error('Session error:', error);
          Alert.alert('Session Error', error.message);
        } else if (data?.session) {
          console.log('Session established successfully');
          // Successfully authenticated, navigate to dashboard
          navigation.navigate('DASHBOARD');
        }
      } catch (err) {
        console.error('Deep link handling error:', err);
        Alert.alert('Error', 'Failed to process authentication response');
      }
    };

    // Check if user is already authenticated
    const checkAuthStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          console.log('User already authenticated, redirecting to dashboard');
          navigation.navigate('DASHBOARD');
        }
      } catch (err) {
        console.error('Auth status check error:', err);
      }
    };

    checkAuthStatus();

    const subscription = Linking.addEventListener('url', handleDeepLink);
    return () => subscription?.remove();
  }, [navigation]);

  return (
    <TouchableWithoutFeedback style = {styles.feedbackAlert} onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Back Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.backButtonWrapper}
            onPress={handleBack}
            disabled={loading}
          >
            <Ionicons
              name="arrow-back-outline"
              size={35}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Welcome Text */}
        <View style={styles.textContainer}>
          <Text style={styles.headingtext}>Hey,</Text>
          <Text style={styles.headingtext}>Welcome</Text>
          <Text style={styles.headingtext}>Back</Text>
        </View>

        {/* Error Message */}
        {errorMessage ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </View>
        ) : null}

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
              accessibilityLabel="Email input field"
              accessibilityHint="Enter your email address for login"
              autoCorrect={false}
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
              accessibilityLabel="Password input field"
              accessibilityHint="Enter your password for login"
              autoCorrect={false}
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
          {/* Password Requirements
          <Text
            style={{
              fontSize: 12,
              marginLeft: 20,
              color:
                password.length === 0
                  ? colors.secondary // Default color before typing
                  : password.length >= 8 &&
                    /\d/.test(password) &&
                    /[!@#$%^&*]/.test(password)
                  ? 'green' // Valid password criteria met
                  : 'red', // Criteria not met while typing
            }}
          >
            Must be at least 8 characters, include a number and a special
            character
          </Text> */}
          <TouchableOpacity
            disabled={loading}
            onPress={() => setForgotVisiblee(true)}
          >
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
          accessibilityLabel="Sign in with Google"
          accessibilityHint="Opens Google sign-in in a browser"
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
          accessibilityLabel="Forgot password modal"
          accessibilityHint="Enter your email to receive a password reset link"
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
                  accessibilityLabel="Reset password email input"
                  accessibilityHint="Enter your email address to receive a password reset link"
                  autoCorrect={false}
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.modalCancel}
                    onPress={() => setForgotVisiblee(false)}
                    disabled={resetLoading}
                    accessibilityLabel="Cancel button"
                    accessibilityHint="Closes the password reset modal"
                  >
                    <Text style={styles.modalCancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalSubmit}
                    onPress={handlePasswordReset}
                    disabled={resetLoading}
                    accessibilityLabel="Send reset link button"
                    accessibilityHint="Sends a password reset link to your email"
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
  feedbackAlert: {
    marginVertical: 20,
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
    // marginVertical: 5,
    fontFamily: fonts.Regular,
  },
  errorContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
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
