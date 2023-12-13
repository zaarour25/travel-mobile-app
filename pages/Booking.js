import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';

const DestinationItem = ({ destination, handleBook }) => (
  <View style={styles.destinationContainer}>
    <Image style={styles.destinationImage} source={destination.image} />
    <View style={styles.destinationDetails}>
      <Text style={styles.destinationName}>{destination.name}</Text>
      <Text style={styles.destinationPrice}>${destination.price}</Text>
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => {
          handleBook(destination);
          showMessage({
            message: `${destination.name}  booked successfully!`,
            type: 'success',
          });
        }}
      >
        <Text style={styles.buttonText}>Book</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const BookingScreen = ({ navigation, handleBook }) => {
  const destinations = [
    { id: 1, name: 'California', price: 100, image: require('../images/California.jpg') },
    { id: 2, name: 'Chicago', price: 150, image: require('../images/Chicago.jpg') },
    { id: 3, name: 'SanFrancisco', price: 150, image: require('../images/SanFrancisco.jpg') },
    { id: 4, name: 'Brooklyn', price: 180, image: require('../images/Brooklyn.jpg') },
    { id: 5, name: 'Staten island', price: 200, image: require('../images/t5.jpg') },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {destinations.map((destination, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleBook(destination)}
            activeOpacity={1} 
          >
            <DestinationItem destination={destination} handleBook={handleBook} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlashMessage position="top" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  destinationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#ecf0f1',
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
    resizeMode: 'cover',
  },
  destinationDetails: {
    flex: 1,
  },
  destinationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  destinationPrice: {
    fontSize: 16,
    color: '#e74c3c',
  },
  bookButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BookingScreen;
