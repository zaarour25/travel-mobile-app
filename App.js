import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import BookingPage from './pages/Booking';
import BookedPage from './pages/Booked';
import login from './pages/login';
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={BookingPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Booked"
          component={BookedPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="train" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="login"
          component={login}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="train" color={color} size={size} />
            ),
          }}
        />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
