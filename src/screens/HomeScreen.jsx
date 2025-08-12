import React, { useCallback, useMemo } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { supabase } from '../lib/supabaseClient';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';

const HomeScreen = () => {
  const navigation = useNavigation();
  
  // Check if user is already authenticated
  React.useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          console.log('User already authenticated, redirecting to dashboard');
          console.log('Session user:', session.user?.email);
          // Re-enable the redirect now that layout is fixed
          navigation.navigate('DASHBOARD');
        }
      } catch (err) {
        console.error('Auth status check error:', err);
      }
    };

    checkAuthStatus();
  }, [navigation]);

  const handleLogin = useCallback(() => {
    // Navigate to Login Screen
    navigation.navigate('LOGIN');
  }, [navigation]);

  const handleSignup = useCallback(() => {
    // Handle sign-up logic here
    navigation.navigate('SIGNUP');
  }, [navigation]);

  const memoizedStyles = useMemo(() => ({
    loginButtonStyle: [
      styles.loginButtonWrapper,
      { backgroundColor: colors.primary },
    ],
    loginTextStyle: [styles.buttonText, { color: colors.white }],
    signupTextStyle: [styles.buttonText, { color: colors.primary }],
  }), []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Image source={require('../assets/man.png')} style={styles.banner} />
      <Text style={styles.title}>Intelligence. Everywhere.</Text>
      <Text style={styles.subTitle}>
      Omnix is your intelligent companion, harnessing AI to deliver personalized insights, streamline workflows,
       and unlock opportunities across any domain — 
       turning complex problems into clear, 
       actionable solutions instantly.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={memoizedStyles.loginButtonStyle}
          onPress={handleLogin}
        >
          <Text style={memoizedStyles.loginTextStyle}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButtonWrapper}
          onPress={handleSignup}
        >
          <Text style={memoizedStyles.signupTextStyle}>
            Sign-Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logo: {
    height: 100,
    width: "50%",
    marginTop: 20,
    marginBottom: 30,
  },
  banner: {
    height: 240,
    width: 220,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontFamily: fonts.SemiBold,
    textAlign: 'center',
    color: colors.primary,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.secondary,
    fontFamily: fonts.Medium,
    paddingHorizontal: 20,
    marginBottom: 30,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: colors.primary,
    width: '100%',
    height: 58,
    borderRadius: 29,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    borderRadius: 27,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: fonts.SemiBold,
  },
});
