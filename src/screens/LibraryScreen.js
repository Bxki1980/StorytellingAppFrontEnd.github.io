// File: src/screens/LibraryScreen.js

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from "react-native";
import ApiService from "../services/ApiService";
import StoryCard from "../components/StoryCard";
import Icon from "react-native-vector-icons/Ionicons";

const LibraryScreen = ({ navigation }) => {
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date");
  const [isAscending, setIsAscending] = useState(true); // To toggle sorting order

  useEffect(() => {
    fetchStories();
  }, []);

  useEffect(() => {
    filterAndSortStories();
  }, [searchQuery, sortOption, isAscending, stories]);

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

    // Sort based on selected option and order
    filtered.sort((a, b) => {
      const compareValue = sortOption === "date" 
        ? new Date(a.datePublished) - new Date(b.datePublished)
        : a.rating - b.rating;
      return isAscending ? compareValue : -compareValue;
    });

    setFilteredStories(filtered);
  };

  const toggleSortOption = (option) => {
    if (sortOption === option) {
      setIsAscending(!isAscending); // Toggle the order if the same option is selected again
    } else {
      setSortOption(option);
      setIsAscending(true); // Default to ascending when changing sort option
    }
  };

  const renderStoryItem = ({ item }) => (
    <StoryCard
      story={item}
      onPress={() => navigation.navigate("StoryDetail", { storyId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Library</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search stories..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <TouchableOpacity style={styles.sortButton} onPress={() => toggleSortOption("date")}>
          <Text style={styles.sortText}>Date</Text>
          <Icon
            name={isAscending && sortOption === "date" ? "arrow-up" : "arrow-down"}
            size={16}
            color="#333"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.sortButton} onPress={() => toggleSortOption("rating")}>
          <Text style={styles.sortText}>Rating</Text>
          <Icon
            name={isAscending && sortOption === "rating" ? "arrow-up" : "arrow-down"}
            size={16}
            color="#333"
          />
        </TouchableOpacity>
      </View>

      {/* Stories List */}
      <FlatList
        data={filteredStories}
        renderItem={renderStoryItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.storiesList}
      />
    </View>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF8EF",
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    alignSelf: "center",
    marginBottom: 15,
  },
  searchInput: {
    height: 40,
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "#FFF",
  },
  sortContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: "#E0E0E0",
  },
  sortText: {
    fontSize: 16,
    marginRight: 5,
    color: "#333",
  },
  storiesList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});
