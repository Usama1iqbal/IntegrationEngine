import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import ScrollViewContainer from './components/ScrollViewContainer';
import Header from './components/Header';
import TextinputWraper from './components/TextinputWraper';
import BlueButton from './components/BlueButton';
import { loginUser } from '../API/Home';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      const response = await loginUser({ email, password });
      if (response) {
        navigation.navigate('DashBoard'); // ✅
      }
    } catch (error) {
      Alert.alert('Login Failed', error.message || 'Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollViewContainer>
      <View style={{ alignItems: 'center' }}>
        <Header title="Login" fontSize={25} />
      </View>

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
        title={loading ? 'Logging in...' : 'Sign in'}
        onPress={handleLogin}
        disabled={loading}
      />

      <View style={styles.footerContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={{ color: '#2F80ED', fontWeight: 'bold' }}>Sign up</Text>
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

export default Login;
