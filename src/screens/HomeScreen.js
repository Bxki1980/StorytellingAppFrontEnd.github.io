// src/screens/HomeScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const recentlyPlayedData = [
  {
    id: "1",
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    title: "Cinderella",
    author: "Brothers Grimm",
    image: "https://via.placeholder.com/150",
  },
  // Add more items as needed
];

const HomeScreen = ({ navigation }) => {
  const renderRecentlyPlayedItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recentlyPlayedCard}
      onPress={() => navigation.navigate("Audiobook", { bookId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.recentlyPlayedImage} />
      <Text style={styles.recentlyPlayedTitle} numberOfLines={1}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const renderSectionHeader = (title) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  const data = [
    {
      key: "recentlyPlayed",
      render: () => (
        <View style={styles.section}>
          {renderSectionHeader("Recently Played")}
          <FlatList
            data={recentlyPlayedData}
            renderItem={renderRecentlyPlayedItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ),
    },
    {
      key: "playlists",
      render: () => (
        <View style={styles.section}>
          {renderSectionHeader("Playlists")}
          <TouchableOpacity
            style={styles.sectionCard}
            onPress={() => navigation.navigate("Playlist")}
          >
            <Image
              source={require("../../assets/images/Home-screen/playlist.webp")}
              style={styles.sectionImage}
            />
            <View style={styles.sectionOverlay}>
              <Icon name="musical-notes-outline" size={50} color="#FFF" />
              <Text style={styles.sectionOverlayText}>Playlists</Text>
            </View>
          </TouchableOpacity>
        </View>
      ),
    },
    {
      key: "library",
      render: () => (
        <View style={styles.section}>
          {renderSectionHeader("Library")}
          <TouchableOpacity
            style={styles.sectionCard}
            onPress={() => navigation.navigate("Library")}
          >
            <Image
              source={require("../../assets/images/Home-screen/library.webp")}
              style={styles.sectionImage}
            />
            <View style={styles.sectionOverlay}>
              <Icon name="library-outline" size={50} color="#FFF" />
              <Text style={styles.sectionOverlayText}>Library</Text>
            </View>
          </TouchableOpacity>
        </View>
      ),
    },
  ];

  const renderItem = ({ item }) => item.render();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Icon name="settings-outline" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={require("../../assets/images/Home-screen/user.webp")}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333333",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#DDDDDD",
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
  },
  section: {
    marginBottom: 30,
  },
  recentlyPlayedCard: {
    width: (width - 60) / 2,
    alignItems: "center",
    marginBottom: 15,
  },
  recentlyPlayedImage: {
    width: (width - 60) / 2,
    height: (width - 60) / 2,
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
  },
  recentlyPlayedTitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#333333",
    textAlign: "center",
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  sectionCard: {
    position: "relative",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  sectionOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 150,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionOverlayText: {
    marginTop: 10,
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
