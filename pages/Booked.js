import React from 'react';
import {View,Text,Image,TouchableOpacity,ScrollView,StyleSheet,} from 'react-native';

const BookedItem = ({ destination, handleDelete }) => (
  <View style={styles.destinationContainer}>
    <View style={styles.imageContainer}>
      <Image style={styles.destinationImage} source={destination.image} />
    </View>
    <View style={styles.destinationDetails}>
      <Text style={styles.destinationName}>{destination.name}</Text>
      <Text style={styles.destinationPrice}>${destination.price}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(destination.id)}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const BookedScreen = ({ navigation, bookedDestinations, handleDelete }) => {
  const bookedCount = bookedDestinations.length;
  const totalCost = bookedDestinations.reduce((sum, destination) => {
    const destinationPrice = parseFloat(destination.price);
    return isNaN(destinationPrice) ? sum : sum + destinationPrice;
  }, 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Booked Destinations: {bookedCount}
        </Text>
        <Text style={styles.summaryText}>
          Total Cost: ${totalCost}
        </Text>
      </View>
      {bookedDestinations.map((destination, index) => (
        <View key={index}>
          <BookedItem destination={destination} handleDelete={handleDelete} />
        </View>
      ))}
    </ScrollView>
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
  imageContainer: {
    flex: 1,
    height: 100,
  },
  destinationImage: {
    flex: 1,
    height: null,
    width: null,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  destinationDetails: {
    flex: 1,
    marginLeft: 10,
  },
  destinationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  destinationPrice: {
    fontSize: 16,
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
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
  summaryContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 10,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default BookedScreen;
