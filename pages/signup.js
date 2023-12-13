import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigation = useNavigation();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword) {
      setError('Please enter email, password, and confirm password.');
      setSuccess('');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and satisfy requirements.');
      setSuccess('');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setSuccess('');
      return;
    }

    setSuccess('Sign-up successful');
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../images/logo.png')} style={styles.logo} />

      <View style={styles.loginContainer}>
        <Text style={styles.companyName}>Just Travel</Text>
        <Text style={styles.title}>Sign Up</Text>
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
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          placeholder="Confirm Password"
          
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {success ? <Text style={styles.successText}>{success}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.additionalContainer}>
        <Text style={styles.additionalText}>Already have an account?</Text>
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={styles.signupText}>Login here</Text>
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
  successText: {
    color: 'green',
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

export default SignUp;
