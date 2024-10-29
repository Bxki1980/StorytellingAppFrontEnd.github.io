// src/screens/SettingsScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const SettingsScreen = ({ navigation }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [downloadOverWifi, setDownloadOverWifi] = useState(false);

  const toggleSwitch = (setter) => () =>
    setter((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Premium Account</Text>
          <Switch
            value={isPremium}
            onValueChange={toggleSwitch(setIsPremium)}
            thumbColor={isPremium ? "#0066CC" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>

        <Text style={styles.sectionTitle}>Playback</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Auto-Play Next Story</Text>
          <Switch
            value={autoPlay}
            onValueChange={toggleSwitch(setAutoPlay)}
            thumbColor={autoPlay ? "#0066CC" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>

        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Enable Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={toggleSwitch(setNotifications)}
            thumbColor={notifications ? "#0066CC" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>

        <Text style={styles.sectionTitle}>Downloads</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Download Over Wi-Fi Only</Text>
          <Switch
            value={downloadOverWifi}
            onValueChange={toggleSwitch(setDownloadOverWifi)}
            thumbColor={downloadOverWifi ? "#0066CC" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>

        <Text style={styles.sectionTitle}>Support</Text>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("Help")}
        >
          <Text style={styles.settingText}>Help</Text>
          <Icon name="chevron-forward" size={24} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("About")}
        >
          <Text style={styles.settingText}>About</Text>
          <Icon name="chevron-forward" size={24} color="#888" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#888888",
    marginTop: 30,
    marginBottom: 10,
    fontWeight: "bold",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomColor: "#EFEFEF",
    borderBottomWidth: 1,
  },
  settingText: {
    fontSize: 16,
    color: "#333333",
  },
});
