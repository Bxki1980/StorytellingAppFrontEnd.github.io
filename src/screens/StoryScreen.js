// src/screens/StoryScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import ApiService from "../services/ApiService";
import { Video } from "expo-av";

const StoryScreen = ({ route }) => {
  const { storyId } = route.params;
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ApiService.getStoryById(storyId)
      .then((data) => {
        setStory(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [storyId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading story...</Text>
      </View>
    );
  }

  if (!story) {
    return (
      <View style={styles.errorContainer}>
        <Text>Failed to load story.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{story.title}</Text>
      <Text style={styles.description}>{story.description}</Text>
      {story.images && story.images.length > 0 && (
        <ScrollView horizontal style={styles.imageContainer}>
          {story.images.map((image) => (
            <Image
              key={image.id}
              source={{ uri: ApiService.getBaseUrl() + image.imagePath }}
              style={styles.image}
            />
          ))}
        </ScrollView>
      )}
      {story.audioPath && (
        <Video
          source={{ uri: ApiService.getBaseUrl() + story.audioPath }}
          useNativeControls
          style={styles.audioPlayer}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  description: { fontSize: 16, marginBottom: 10 },
  imageContainer: { flexDirection: "row", marginBottom: 10 },
  image: { width: 200, height: 200, marginRight: 10 },
  audioPlayer: { width: "100%", height: 50, marginBottom: 20 },
});

export default StoryScreen;
