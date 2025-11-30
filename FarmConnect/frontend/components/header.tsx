import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { logout } from '../scripts/api';
import { getMyData } from '../scripts/api';

import { AntDesign, Feather } from '@expo/vector-icons';

import { styles } from '../styles/components/navigation.jsx';

export default function NavigationHeader() {
    const [myData, setMyData] = useState(null);
    
    useEffect(() => {
        const fetchMyData = async () => {
            try {
                const data = await getMyData();
                setMyData(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching my data:', error);
            }
        };
        fetchMyData();
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            router.replace('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
    
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
          <Text style={styles.profileName}>{myData?.username}</Text>
          <Text style={styles.profileRole}>{myData?.is_superuser ? 'Organic Farmer' : 'User'}</Text>
        </View>
        <Pressable onPress={handleLogout} style={styles.profileButton}>
          <Feather name="log-out" size={16} color="#fff" />
        </Pressable>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navButtonRow}>
        {[
          { icon: <Feather name="feather" size={24} color="black" />, label: "Farms", nav: "farm" },
          { icon: <AntDesign name="file-search" size={24} color="black" />, label: "Blog", nav: "blogs" },
          { icon: <Feather name="image" size={24} color="black" />, label: "Gallery", nav: "gallery" },
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
