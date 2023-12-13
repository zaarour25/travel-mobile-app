import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, Button } from 'react-native';
import { Video } from 'expo-av';

const HomeScreen = () => {
  const videoRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const destinations = [
    { name: 'Chicago',  description: 'A vibrant city known for its architecture and cultural attractions.' },
    { name: 'California',  description: 'The Golden State with diverse landscapes, from beaches to mountains.' },
    { name: 'SanFrancisco', description: 'Famous for the Golden Gate Bridge and a hub of innovation and technology.' },
    { name: 'Brooklyn', description: 'Famous for its rich history a great place to enjoy different cultures.' },
  ];

  const services = [
    { name: 'food catering', description: 'Our agency offers excpetional international food catering service during your travel.', image: require('../images/2a.jpg') },
    { name: 'Bus shuttle', description: 'Our agency offers a bus shuttle service on command for specific sites during your travel.', image: require('../images/3a.jpg') },
    { name: 'Hotel booking', description: 'Our agency offers facilitating the booking of the best available hotels .', image: require('../images/4a.jpg') },
  ];

  const destinationImages = {
    Chicago: require('../images/Chicago.jpg'),
    California: require('../images/California.jpg'),
    SanFrancisco: require('../images/SanFrancisco.jpg'),
    Brooklyn: require('../images/Brooklyn.jpg'),
  };

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        await videoRef.current.playAsync();
      }
    };

    playVideo();
  }, []);

  const openModal = (destination) => {
    setModalVisible(true);
    setSelectedDestination(destination);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDestination(null);
  };

  const renderDestinationImages = () => {
    return destinations.map((destination, index) => (
      <TouchableOpacity key={index} onPress={() => openModal(destination.name)}>
        <View style={styles.destinationImageContainer}>
          <Image
            source={destinationImages[destination.name]}
            style={styles.destinationImage}
          />
          <Text style={styles.destinationName}>{destination.name}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  const renderServiceImages = () => {
    return services.map((service, index) => (
      <TouchableOpacity key={index} onPress={() => openModal(service.name)}>
        <View style={styles.destinationImageContainer}>
          <Image
            source={service.image}
            style={styles.destinationImage}
          />
          <Text style={styles.destinationName}>{service.name}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  const renderDestinationModal = () => {
    const selectedInfo = destinations.find((destination) => destination.name === selectedDestination);
    const selectedService = services.find((service) => service.name === selectedDestination);

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <ScrollView style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Details</Text>
          {selectedInfo && (
            <View style={styles.destinationInfoContainer}>
              <Image
                source={destinationImages[selectedInfo.name]}
                style={styles.destinationImageInModal}
              />
              <Text style={styles.destinationName}>{selectedInfo.name}</Text>
              <Text style={styles.destinationDescription}>{selectedInfo.description}</Text>
            </View>
          )}
          {selectedService && (
            <View style={styles.destinationInfoContainer}>
              <Image
                source={selectedService.image}
                style={styles.destinationImageInModal}
              />
              <Text style={styles.destinationName}>{selectedService.name}</Text>
              <Text style={styles.destinationDescription}>{selectedService.description}</Text>
            </View>
          )}
          <Button title="Close" onPress={closeModal} />
        </ScrollView>
      </Modal>
    );
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={require('../images/bgvid.mp4')}
          style={styles.backgroundVideo}
          resizeMode="cover"
          useNativeControls={false}
          isLooping
        />
        
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Popular Destinations</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imageSlider}
        >
          {renderDestinationImages()}
        </ScrollView>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Our Services</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.imageSlider}
        >
          {renderServiceImages()}
        </ScrollView>
      </View>

      {renderDestinationModal()}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  videoContainer: {
    height: 200,
    marginBottom: 16,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  sectionContainer: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  imageSlider: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  destinationImageContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  destinationImage: {
    width: 150,
    height: 140,
    borderRadius: 8,
  },
  destinationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    color: 'black', 
  },

  serviceImage: {
    width: 150,
    height: 140,
    marginRight: 10,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  destinationInfoContainer: {
    marginBottom: 20,
  },
  destinationImageInModal: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  destinationLocation: {
    fontSize: 18,
    marginBottom: 5,
    color: '#555',
  },
  destinationDescription: {
    fontSize: 16,
    color: '#555',
  },
});

export default HomeScreen;
