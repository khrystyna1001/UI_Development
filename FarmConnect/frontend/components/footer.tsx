import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

import { styles } from '../styles/components/footer.jsx'

const NavTab = ({ iconName, label, IconComponent, nav }: any) => {

  return (
    <Pressable onPress={() =>
        router.navigate({pathname: `/(tabs)/${nav}`})
        } style={styles.tab}>
      <IconComponent name={iconName} size={24} />
      <Text style={styles.tabLabel}>{label}</Text>
    </Pressable>
  );
};

export default function NavigationFooter() {
  return (
    <View style={styles.tabBar}>
      <NavTab iconName="home" label="Home" IconComponent={AntDesign} nav="" />
      <NavTab iconName="shopping-bag" label="Marketplace" IconComponent={Feather} nav="marketplace" />
      <NavTab iconName="message" label="Messages" IconComponent={AntDesign} nav="messages" />
      <NavTab iconName="user" label="Profile" IconComponent={Feather} nav="profile" />
    </View>
  );
}
