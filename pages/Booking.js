// BookingPage.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const BookingPage = ({ navigation }) => {
  const [bookedDestinations, setBookedDestinations] = useState([]);
  const destinations = [
    { name: 'Paris', price: '$500', description: 'City of Love', image: require('../images/California.jpg') },
    { name: 'Tokyo', price: '$700', description: 'Vibrant and Modern', image: require('../images/logo.png') },
    { name: 'New York', price: '$600', description: 'The Big Apple', image: require('../images/logo.png') },
    // Add more destinations as needed
  ];

  const handleBookNow = (selectedDestination) => {
    const updatedDestinations = [...bookedDestinations, selectedDestination];
    setBookedDestinations(updatedDestinations);
    navigation.navigate('Booked', { bookedDestinations: updatedDestinations }); // Update this line
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Destination</Text>
      
      {destinations.map((destination, index) => (
        <TouchableOpacity
          key={index}
          style={styles.destinationContainer}
          onPress={() => handleBookNow(destination)}
        >
          <Image
            style={styles.destinationImage}
            source={destination.image}
           
          />
          <View style={styles.destinationDetails}>
            <Text style={styles.destinationName}>{destination.name}</Text>
            <Text style={styles.destinationPrice}>{destination.price}</Text>
            <Text style={styles.destinationDescription}>{destination.description}</Text>
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => handleBookNow(destination)}
            >
              <Text style={styles.buttonText}>Book</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // Set background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#3498db', // Set text color
  },
  destinationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#ecf0f1', // Set container background color
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  destinationImage: {
    flex: 1,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
    resizeMode: 'cover', // or 'center'
  },
  
  
  
  destinationDetails: {
    flex: 1,
  },
  destinationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50', // Set text color
  },
  destinationPrice: {
    fontSize: 16,
    color: '#e74c3c', // Set text color
  },
  destinationDescription: {
    fontSize: 14,
    marginBottom: 10,
    color: '#34495e', // Set text color
  },
  bookButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookingPage;
