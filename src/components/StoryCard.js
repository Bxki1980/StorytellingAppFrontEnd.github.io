// src/components/StoryCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const StoryCard = ({ story, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{story.title}</Text>
      <Text style={styles.description}>{story.description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  description: { fontSize: 14, marginTop: 5 },
});

export default StoryCard;
