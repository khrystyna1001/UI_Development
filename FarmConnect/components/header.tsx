import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';

import { styles } from '../styles/components/navigation.jsx';

export default function NavigationHeader() {
    return(
      <SafeAreaView>
      <View style={styles.headerContainer}>
        <Image style={styles.headerImage} />
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>HOME</Text>
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
          { icon: "🌱", label: "My Farm", nav: "myfarm" },
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
