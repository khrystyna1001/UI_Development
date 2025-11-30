import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from '../styles/components/searchfilter';

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onFilterPress: () => void;
  placeholder?: string;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  onFilterPress,
  placeholder = 'Search...',
}) => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <Feather name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholderTextColor="#999"
        />
      </View>
      <TouchableOpacity 
        style={styles.filterButton}
        onPress={onFilterPress}
      >
        <Feather name="filter" size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchFilterBar;
