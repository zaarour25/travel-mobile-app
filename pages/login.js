import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation(); 

  const handleLoginPress = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const credentials = require('./credentials.json');
      const { users } = credentials;

      const matchedUser = users.find((user) => user.email === email && user.password === password);

      if (matchedUser) {
        setError('');
        handleLogin();
      } else {
        setError('Invalid email or password.');
      }
    } catch (error) {
      console.error('Error reading JSON file:', error);
    }
  };

  const handleSignUpPress = () => {

    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../images/logo.png')} style={styles.logo} />

      <View style={styles.loginContainer}>
        <Text style={styles.companyName}>Just Travel</Text>
        <Text style={styles.title}>Log in</Text>
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          placeholder="Password"
          
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.additionalContainer}>
        <Text style={styles.additionalText}>Don't have an account?</Text>
        <TouchableOpacity onPress={handleSignUpPress}>
          <Text style={styles.signupText}>Sign up here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
     width: 400,
    height: 100,
    marginBottom: 32,
    resizeMode: 'contain',
  },
  loginContainer: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 16,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 16,
    paddingLeft: 20,
    fontSize: 16,
    color: '#333',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fc0050',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  additionalContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  additionalText: {
    color: '#777',
    fontSize: 16,
  },
  signupText: {
    color: '#3498db',
    fontSize: 16,
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default Login;
