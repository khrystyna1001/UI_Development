import React, { useState } from 'react'; // Import useState
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { router } from 'expo-router';


export default function NavigationHeader() {
    return(
        <SafeAreaView>
      <View style={styles.headerContainer}>
        {/* The 'Image' component needs a source, using a placeholder for now */}
        <Image style={styles.headerImage} source={{ uri: "https://via.placeholder.com/24x24" }} />
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>HOME</Text>
          <View style={styles.headerIcons}>
            <Text style={styles.icon}>🌾</Text>
            <Text style={styles.icon}>📝</Text>
          </View>
        </View>
      </View>

      {/* Profile */}
      <View style={styles.profileContainer}>
        <View style={styles.avatar} />
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileRole}>Organic Farmer</Text>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navButtonRow}>
        {[
          { icon: "🌱", label: "My Farm", nav: "farm" },
          { icon: "📰", label: "Blog", nav: "blogs" },
          { icon: "👥", label: "Gallery", nav: "gallery" },
        ].map((item, i) => (
          <Pressable key={i} onPress={() =>
              router.navigate({pathname: `/(nav)/${item.nav}`})}
              style={styles.navButton}>
            <View style={styles.navIconContainer}>
              <Text style={styles.navIcon}>{item.icon}</Text>
            </View>
            <Text style={styles.navLabel}>{item.label}</Text>

          </Pressable>
        ))}
      </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
 // Header
  headerContainer: {
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    paddingHorizontal: 16,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    elevation: 3, // Android shadow
  },
  headerImage: { height: 24, width: '100%' }, // Added width for placeholder
  headerRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 12 },
  headerTitle: { color: "#000", fontSize: 20, fontWeight: "600" },
  headerIcons: { flexDirection: "row" },
  icon: { color: "#000", fontSize: 16, marginRight: 16 },

  // Profile
  profileContainer: { flexDirection: "row", paddingTop: 16, marginBottom: 12, paddingHorizontal: 16 },
  avatar: { width: 40, height: 40, backgroundColor: "#0000001A", borderRadius: 40, marginRight: 12 },
  profileTextContainer: { flex: 1 },
  profileName: { color: "#000", fontSize: 16, fontWeight: "600" },
  profileRole: { color: "#777", fontSize: 12 },

  // Nav Buttons
  navButtonRow: { flexDirection: "row", paddingHorizontal: 16, marginBottom: 20 },
  navButton: {
    flex: 1,
    alignItems: "center",
    borderColor: "#0000001A",
    borderRadius: 6,
    borderWidth: 1,
    paddingVertical: 6,
    marginRight: 8,
  },
  navIconContainer: { backgroundColor: "#0000000D", borderRadius: 24, padding: 4, marginBottom: 4 },
  navIcon: { color: "#000", fontSize: 28 },
  navLabel: { color: "#000", fontSize: 10, textAlign: 'center' },
})