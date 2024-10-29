import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ApiService from "../services/ApiService"; // Import your ApiService

const defaultPlaylists = [
  {
    id: "1",
    title: "My Books",
    icon: "book-outline",
    color: "#FFA500",
  },
  {
    id: "2",
    title: "My Favorites",
    icon: "heart-outline",
    color: "#FF6347",
  },
];

const PlaylistScreen = ({ navigation }) => {
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);

  // Fetch user playlists when component mounts
  useEffect(() => {
    fetchUserPlaylists();
  }, []);

  const fetchUserPlaylists = async () => {
    try {
      const data = await ApiService.getPlaylists();
      setUserPlaylists(data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  // Handle Create Playlist button
  const handleCreatePlaylist = () => {
    setIsCreateModalVisible(true);
  };

  // Submit new playlist
  const submitCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) {
      alert("Please enter a playlist name.");
      return;
    }
    try {
      await ApiService.createPlaylist(newPlaylistName.trim());
      setNewPlaylistName("");
      setIsCreateModalVisible(false);
      fetchUserPlaylists(); // Refresh the playlists after creation
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  // Handle Add Playlist button
  const handleAddPlaylist = () => {
    setIsAddModalVisible(true);
    setFilteredPlaylists([...defaultPlaylists, ...userPlaylists]);
  };

  // Handle search in Add Playlist modal
  const handleSearch = (text) => {
    setSearchQuery(text);
    const allPlaylists = [...defaultPlaylists, ...userPlaylists];
    if (text === "") {
      setFilteredPlaylists(allPlaylists);
    } else {
      const filtered = allPlaylists.filter((playlist) =>
        playlist.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPlaylists(filtered);
    }
  };

  // Render playlist item
  const renderPlaylistItem = ({ item }) => (
    <TouchableOpacity
      style={styles.playlistCard}
      onPress={() => {
        // Navigate to playlist details or perform desired action
      }}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
        <Icon name={item.icon} size={30} color="#FFF" />
      </View>
      <Text style={styles.playlistTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Playlists</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleAddPlaylist}>
          <Icon name="add-circle" size={24} color="#0066CC" />
          <Text style={styles.actionText}>Add Playlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleCreatePlaylist}>
          <Icon name="create" size={24} color="#0066CC" />
          <Text style={styles.actionText}>Create Playlist</Text>
        </TouchableOpacity>
      </View>

      {/* Playlist List */}
      <FlatList
        data={[...defaultPlaylists, ...userPlaylists]} // Show default and user-created playlists
        renderItem={renderPlaylistItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.playlistList}
      />

      {/* Modal for Creating Playlist */}
      <Modal
        visible={isCreateModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsCreateModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Create New Playlist</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Playlist Name"
              value={newPlaylistName}
              onChangeText={setNewPlaylistName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={submitCreatePlaylist}>
                <Text style={styles.modalButtonText}>Create</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsCreateModalVisible(false)}
              >
                <Text style={[styles.modalButtonText, styles.cancelButtonText]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for Adding to Playlist */}
      <Modal
        visible={isAddModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Search Playlists</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Search Playlists"
              value={searchQuery}
              onChangeText={handleSearch}
            />
            <FlatList
              data={filteredPlaylists}
              renderItem={renderPlaylistItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.playlistList}
            />
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setIsAddModalVisible(false)}
            >
              <Text style={[styles.modalButtonText, styles.cancelButtonText]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  actionButton: {
    alignItems: "center",
  },
  actionText: {
    marginTop: 5,
    fontSize: 14,
    color: "#0066CC",
  },
  playlistList: {
    paddingHorizontal: 20,
  },
  playlistCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  iconContainer: {
    padding: 15,
    borderRadius: 50,
    marginRight: 15,
  },
  playlistTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    backgroundColor: "#0066CC",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#CCC",
  },
  cancelButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
});