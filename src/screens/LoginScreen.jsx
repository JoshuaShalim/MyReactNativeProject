import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const LoginScreen = () => {
  return (
    <View>
      <Text style = {styles.loginText}>LoginScreen</Text>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
     loginText: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'Poppins-Regular',
    },
})