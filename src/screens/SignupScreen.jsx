import React from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';

import { colors } from '../utils/colors';

const SignupScreen = () => {
  const navigation = useNavigation();
  const handleBack = () => {
    // Navigate back to HomeScreen
    navigation.navigate('HOME');
  };
  return (
     <View>
      <View style={styles.buttonContainer}>
                  <TouchableOpacity style={[styles.backButtonWrapper]}
                      onPress={handleBack}
                  >
                   <Ionicons name="arrow-back-outline" size={35} color={colors.primary} />
                  </TouchableOpacity>
                  
                </View>
    </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 40,
        height: 60,
        marginHorizontal: 10,
        width: '15%',
        backgroundColor: colors.white,
       // borderWidth: 1,
        borderRadius: 100,
  },
    backButtonWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
})