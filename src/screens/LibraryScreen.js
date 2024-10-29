// src/screens/LibraryScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ApiService from "../services/ApiService";

const LibraryScreen = ({ navigation }) => {
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date"); // Default sort by date

  useEffect(() => {
    fetchStories();
  }, []);

  useEffect(() => {
    filterAndSortStories();
  }, [searchQuery, sortOption, stories]);

  const fetchStories = async () => {
    try {
      const data = await ApiService.getStories();
      setStories(data);
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  const filterAndSortStories = () => {
    let filtered = stories;

    // Filter by search query
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((story) =>
        story.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort based on selected option
    switch (sortOption) {
      case "date":
        filtered = filtered.sort(
          (a, b) => new Date(b.datePublished) - new Date(a.datePublished)
        );
        break;
      case "price":
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case "rating":
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredStories(filtered);
  };

  const renderStoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.storyCard}
      onPress={() => {
        // Navigate to story details
        navigation.navigate("StoryDetail", { storyId: item.id });
      }}
    >
      <View style={styles.storyInfo}>
        <Text style={styles.storyTitle}>{item.title}</Text>
        <Text style={styles.storyAuthor}>by {item.author}</Text>
        <Text style={styles.storyPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.storyRating}>
        <Icon name="star" size={16} color="#FFD700" />
        <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Your Library</Text>

      {/* Search Box */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search books..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Sorting Options */}
      <View style={styles.sortOptions}>
        <Text style={styles.sortText}>Sort by:</Text>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortOption === "date" && styles.activeSortButton,
          ]}
          onPress={() => setSortOption("date")}
        >
          <Text
            style={[
              styles.sortButtonText,
              sortOption === "date" && styles.activeSortButtonText,
            ]}
          >
            Date
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortOption === "price" && styles.activeSortButton,
          ]}
          onPress={() => setSortOption("price")}
        >
          <Text
            style={[
              styles.sortButtonText,
              sortOption === "price" && styles.activeSortButtonText,
            ]}
          >
            Price
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortOption === "rating" && styles.activeSortButton,
          ]}
          onPress={() => setSortOption("rating")}
        >
          <Text
            style={[
              styles.sortButtonText,
              sortOption === "rating" && styles.activeSortButtonText,
            ]}
          >
            Highest Rated
          </Text>
        </TouchableOpacity>
      </View>

      {/* Stories List */}
      <FlatList
        data={filteredStories}
        renderItem={renderStoryItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.storiesList}
      />
    </View>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  sortOptions: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  sortText: {
    marginRight: 10,
    fontSize: 16,
    color: "#333",
  },
  sortButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#F0F0F0",
    marginRight: 10,
  },
  sortButtonText: {
    fontSize: 14,
    color: "#333",
  },
  activeSortButton: {
    backgroundColor: "#0066CC",
  },
  activeSortButtonText: {
    color: "#FFF",
  },
  storiesList: {
    paddingBottom: 20,
  },
  storyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  storyInfo: {
    flex: 1,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  storyAuthor: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  storyPrice: {
    fontSize: 16,
    color: "#0066CC",
    marginTop: 5,
  },
  storyRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#333",
  },
});
