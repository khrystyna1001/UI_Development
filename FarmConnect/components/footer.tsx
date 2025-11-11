import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

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
      <NavTab iconName="shopping-bag" label="Marketplace" IconComponent={Feather} nav="blogs" />
      <NavTab iconName="message" label="Messages" IconComponent={AntDesign} nav="messages" />
      <NavTab iconName="user" label="Profile" IconComponent={Feather} nav="profile" />
    </View>
  );
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: 40,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
    },
    tabLabel: {
        fontSize: 12,
        fontWeight: '500',
        marginTop: 2,
    },
});