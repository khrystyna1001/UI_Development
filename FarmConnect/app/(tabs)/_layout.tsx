import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity, TextInput, } from "react-native";
import React from 'react';


export default function TabLayout() {

  return (
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: 'Marketplace',
            tabBarIcon: ({ color }) => <FontAwesome size={24} name="shopping-bag" color={color} />,
          }}
        />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color }) => <MaterialIcons name="message" size={26} color={color} />,
        }}
      />
      <Tabs.Screen
         name="profile"
         options={{
           title: 'Profile',
           tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
         }}
     />
    </Tabs>
  );
}
