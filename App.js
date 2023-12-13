
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';

import BookingScreen from './pages/Booking';
import BookedScreen from './pages/Booked';
import Home from './pages/Home';
import SignUp from './pages/signup';
import Login from './pages/login';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthNavigator = ({ handleLogin }) => (
  <Stack.Navigator>
    <Stack.Screen name="Login">
      {(props) => <Login {...props} handleLogin={handleLogin} />}
    </Stack.Screen>
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);


const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [bookedDestinations, setBookedDestinations] = useState([]);

  const handleBook = (destination) => {
    if (!bookedDestinations.some((bookedDestination) => bookedDestination.id === destination.id)) {
      setBookedDestinations([...bookedDestinations, destination]);
    }
  };

  const handleDelete = (id) => {
    const updatedBookedDestinations = bookedDestinations.filter(
      (destination) => destination.id !== id
    );
    setBookedDestinations(updatedBookedDestinations);
  };

  const handleLogin = () => {
    setAuthenticated(true);
  };

  return (
    <NavigationContainer>
      {authenticated ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Booking"
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="ticket" color={color} size={size} />
              ),
            }}
          >
            {(props) => (
              <BookingScreen
                {...props}
                handleBook={handleBook}
              />
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Booked"
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="train" color={color} size={size} />
              ),
            }}
          >
            {(props) => (
              <BookedScreen
                {...props}
                bookedDestinations={bookedDestinations}
                handleDelete={handleDelete}
              />
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="home" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <AuthNavigator handleLogin={handleLogin} />
      )}
    </NavigationContainer>
  );
};

export default App;
