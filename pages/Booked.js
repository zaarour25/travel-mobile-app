// BookedPage.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';

const BookedPage = ({ route, navigation }) => {
  const { bookedDestinations: initialBookedDestinations } = route.params;

  const [bookedDestinations, setBookedDestinations] = useState(initialBookedDestinations);

  const handleDelete = (index) => {
    const updatedDestinations = [...bookedDestinations];
    updatedDestinations.splice(index, 1);
    setBookedDestinations(updatedDestinations);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.bookedItemContainer}>
      <Image style={styles.bookedImage} source={item.image} />
      <View style={styles.bookedDetails}>
        <Text style={styles.bookedName}>{item.name}</Text>
        <Text style={styles.bookedPrice}>{item.price}</Text>
        <Text style={styles.bookedDescription}>{item.description}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(index)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booked Destinations</Text>
      <FlatList
        data={bookedDestinations}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#3498db',
  },
  bookedItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  bookedImage: {
    flex: 1,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  bookedDetails: {
    flex: 1,
  },
  bookedName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  bookedPrice: {
    fontSize: 16,
    color: '#e74c3c',
  },
  bookedDescription: {
    fontSize: 14,
    marginBottom: 10,
    color: '#34495e',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
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

export default BookedPage;
