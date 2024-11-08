// File: src/screens/StoryDetail.js

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import ApiService from "../services/ApiService";

const StoryDetail = ({ route, navigation }) => {
  const { storyId } = route.params;
  const [story, setStory] = useState(null);

  useEffect(() => {
    fetchStory();
  }, []);

  const fetchStory = async () => {
    try {
      const data = await ApiService.getStoryById(storyId);
      setStory(data);
    } catch (error) {
      console.error("Error fetching story:", error);
    }
  };

  if (!story) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading story...</Text>
      </View>
    );
  }

  // Get the cover image from the first page
  const coverPage = story.pages && story.pages.length > 0 ? story.pages[0] : null;

  const formattedCoverImagePath =
    coverPage && coverPage.imagePath
      ? `file://${coverPage.imagePath.replace(/\\/g, "/")}`
      : null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {formattedCoverImagePath && (
        <Image
          source={{ uri: formattedCoverImagePath }}
          style={styles.coverImage}
          resizeMode="cover"
        />
      )}
      <Text style={styles.title}>{story.title}</Text>
      <Text style={styles.description}>{story.description}</Text>

      {/* Start Reading Button */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate("StoryReader", { storyId: story.id })}
      >
        <Text style={styles.startButtonText}>Start Reading</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default StoryDetail;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FAF8EF",
  },
  coverImage: {
    width: "100%",
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: "#EEE",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  description: {
    fontSize: 18,
    color: "#555",
    lineHeight: 24,
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: "#FFB74D",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  startButtonText: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#FAF8EF",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 20,
    color: "#333",
  },
});
