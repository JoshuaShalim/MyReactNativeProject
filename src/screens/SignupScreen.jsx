import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const SignupScreen = () => {
  return (
    <View>
      <Text style = {styles.signupText}>SignupScreen</Text>
    </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
    signupText: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'Poppins-Regular',
    },
})