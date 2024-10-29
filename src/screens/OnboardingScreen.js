// src/screens/OnboardingScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Storytelling App!",
      description: "Discover fun and interactive stories for kids.",
      image: require("../../assets/images/anime.jpeg"),
    },
    {
      title: "Explore Our Library",
      description: "Find stories about magic, animals, and more!",
      image: require("../../assets/images/anime.jpeg"),
    },
    {
      title: "Save Your Favorites",
      description: "Keep track of the stories you love and listen anytime.",
      image: require("../../assets/images/anime.jpeg"),
    },
  ];

  // Handle Next Step or Complete Onboarding
  const handleNext = async () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Save flag that onboarding is complete
      await AsyncStorage.setItem("onboardingCompleted", "true");
      navigation.navigate("Login"); // Navigate to Login Screen after last step
    }
  };

  return (
    <View style={styles.container}>
      <Image source={steps[step].image} style={styles.image} />
      <Text style={styles.title}>{steps[step].title}</Text>
      <Text style={styles.description}>{steps[step].description}</Text>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {step < steps.length - 1 ? "Next" : "Get Started"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6347",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default OnboardingScreen;
