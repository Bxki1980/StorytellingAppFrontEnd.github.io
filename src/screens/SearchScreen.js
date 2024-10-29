// src/screens/SearchScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SearchScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Search for Stories</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  text: { fontSize: 24, color: "#FF6347" },
});

export default SearchScreen;
