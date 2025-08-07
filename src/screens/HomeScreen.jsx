import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';

const HomeScreen = () => {
  const navigation = useNavigation();
  const handleLogin = () => {
    // Navigate to Login Screen
    navigation.navigate('LOGIN');
  };
  const handleSignup = () => {
    // Handle sign-up logic here
  navigation.navigate('SIGNUP')}
 
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Image source={require('../assets/man.png')} style={styles.banner} />
      <Text style={styles.title}>Lorem Ipsum Dollor</Text>
      <Text style={styles.subTitle}>Lorem Ipsum is simply dummy 
        text of the printing and typesetting industry.
         Lorem Ipsum has been the industry's standard dummy 
         text ever since the 1500s, when an unknown printer 
         took a galley of type and scrambled it to make a type 
         specimen book.</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.loginButtonWrapper,
               {backgroundColor: colors.primary}
               ]}
                onPress={handleLogin}
            >
              <Text style={[styles.buttonText,{color: colors.white}]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButtonWrapper}
              onPress={handleSignup}
              >
              <Text style={[styles.buttonText,{color: colors.primary}]}>Sign-Up</Text>
            </TouchableOpacity>
            
          </View>
    </View>
  );
};

export default HomeScreen;

export const styles = StyleSheet.create({
  // Add styles here if needed
  container: {
      flex: 1,
      backgroundColor: colors.white, 
      alignItems: 'center',
  },
  logo: {
      height: 50,
      width: 140,
      marginVertical: 40,
  },
  banner: {
      height: 250,
      width: 230,
      marginVertical: '200px',
  },
   title: {
      fontSize: 40,
      fontFamily: fonts.SemiBold,
      paddingHorizontal: 20,
      textAlign: 'center',
      color: colors.primary,
      marginTop: 70,
  },
  subTitle: {
      fontSize: 18,
      textAlign: 'center',
      color : colors.secondary,
      fontFamily: fonts.Medium,
      paddingHorizontal: 40,
      marginVertical: 20,
  },
  buttonContainer: {
      flexDirection: 'row',
      marginTop: 20,
      borderWidth: 2,
      borderColor: colors.primary,
      width: '75%',
      height: 60,
      borderRadius: 100,
  },
  loginButtonWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '50%',
      borderRadius: 98,
  },
  buttonText: {
      fontSize: 20,
      fontFamily: fonts.SemiBold,
      
  },
});