import React, {
  useEffect,
  useState,
} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { supabase } from '../lib/supabaseClient';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setUserEmail(data.session.user.email);
      }
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigation.navigate('LOGIN'); // change if your login screen name is different
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to your Dashboard</Text>
      <Text style={styles.email}>Logged in as: {userEmail}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.Bold,
    color: colors.primary,
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: colors.secondary,
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  logoutText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.SemiBold,
  },
});
