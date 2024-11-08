// File: src/components/StoryCard.js

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const StoryCard = ({ story, onPress }) => {
  const coverPage = story.pages && story.pages.length > 0 ? story.pages[0] : null;

  const formattedImagePath =
    coverPage && coverPage.imagePath
      ? `file://${coverPage.imagePath.replace(/\\/g, '/')}`
      : null;

  console.log('Formatted Image Path:', formattedImagePath);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {formattedImagePath && (
        <Image
          source={{ uri: formattedImagePath }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <Text style={styles.title} numberOfLines={1}>
        {story.title}
      </Text>
    </TouchableOpacity>
  );
};

export default StoryCard;

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    marginBottom: 20,
    width: '48%',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    backgroundColor: '#EEE',
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});
