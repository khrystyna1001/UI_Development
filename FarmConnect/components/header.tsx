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

import { styles } from '../styles/navigation.jsx';

import { router } from 'expo-router';


export default function NavigationHeader() {
    return(
      <SafeAreaView>
      <View style={styles.headerContainer}>
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
