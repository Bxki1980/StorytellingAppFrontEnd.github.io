// File: src/screens/StoryReader.js

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import ApiService from "../services/ApiService";
import { Audio } from "expo-av"; // Assuming you're using expo-av for audio playback

const { width } = Dimensions.get("window");

const StoryReader = ({ route, navigation }) => {
  const { storyId } = route.params;
  const [story, setStory] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    fetchStory();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const fetchStory = async () => {
    try {
      const data = await ApiService.getStoryById(storyId);
      setStory(data);
    } catch (error) {
      console.error("Error fetching story:", error);
    }
  };

  const playAudio = async (audioPath) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const formattedAudioPath =
        audioPath ? `file://${audioPath.replace(/\\/g, '/')}` : null;

      const { sound: newSound } = await Audio.Sound.createAsync({ uri: formattedAudioPath });
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const renderPage = () => {
    if (!story || !story.pages || story.pages.length === 0) {
      return null;
    }
    const page = story.pages[currentPageIndex];

    // Option A: Using imagePath
    const formattedImagePath =
      page && page.imagePath
        ? `file://${page.imagePath.replace(/\\/g, '/')}`
        : null;

    // Option B: Using imageBase64
    const imageUri = page.imageBase64
      ? `data:image/png;base64,${page.imageBase64}`
      : null;

    // Use the appropriate image source
    const imageSource = imageUri
      ? { uri: imageUri }
      : formattedImagePath
      ? { uri: formattedImagePath }
      : null;

    return (
      <View style={styles.pageContainer}>
        {imageSource && (
          <Image
            source={imageSource}
            style={styles.pageImage}
            resizeMode="cover"
          />
        )}
        <Text style={styles.pageText}>{page.text}</Text>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => playAudio(page.audioPath)}
        >
          <Text style={styles.playButtonText}>Play Audio</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const goToNextPage = () => {
    if (currentPageIndex < story.pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  if (!story) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading story...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderPage()}
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={[styles.navButton, currentPageIndex === 0 && styles.disabledButton]}
          onPress={goToPreviousPage}
          disabled={currentPageIndex === 0}
        >
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navButton,
            currentPageIndex === story.pages.length - 1 && styles.disabledButton,
          ]}
          onPress={goToNextPage}
          disabled={currentPageIndex === story.pages.length - 1}
        >
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StoryReader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF8EF",
    alignItems: "center",
    justifyContent: "center",
  },
  pageContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    width: width,
  },
  pageImage: {
    width: width - 40,
    height: width - 40,
    borderRadius: 15,
    backgroundColor: "#EEE",
    marginBottom: 20,
  },
  pageText: {
    fontSize: 22,
    color: "#333",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: "#FFB74D",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  playButtonText: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
  },
  navigationButtons: {
    flexDirection: "row",
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: "#FFB74D",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  navButtonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#CCC",
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
