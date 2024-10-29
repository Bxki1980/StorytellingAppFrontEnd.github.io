// src/screens/PremiumScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PremiumScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Premium Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, color: "#fff" },
});

export default PremiumScreen;
