import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import TextinputWraper from './components/TextinputWraper';
import BlueButton from './components/BlueButton';
import { signupUser } from '../API/Home'; 

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      await signupUser({
         user_name: name,
        email,
        password,
      });
      Alert.alert('Success', 'Account created! Please Login.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      Alert.alert('Signup Failed', error.message || 'Error creating account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollViewContainer>
      <View style={{ alignItems: 'center' }}>
        <Header title="Sign Up" fontSize={25} />
      </View>

      <TextinputWraper
        placeholder="Enter your Name"
        icon={require('../assests/Profile.png')}
        value={name}
        onChangeText={setName}
      />
      <TextinputWraper
        placeholder="Enter your Email"
        icon={require('../assests/Email.png')}
        value={email}
        onChangeText={setEmail}
      />
     <TextinputWraper
        placeholder="Enter your Password"
        icon={require('../assests/Password.png')}
        rightIcon={require('../assests/eye-slash.png')}
        isPassword={true}
        value={password}
        onChangeText={setPassword}
      />

      <BlueButton
        title={loading ? 'Creating Account...' : 'Sign up'}
        onPress={handleSignup}
        disabled={loading}
      />

      <View style={styles.footerContainer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: '#2F80ED', fontWeight: 'bold' }}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollViewContainer>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Signup;
