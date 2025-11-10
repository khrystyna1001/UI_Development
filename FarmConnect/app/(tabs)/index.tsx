import React, { useState } from 'react'; // Import useState
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import NavigationFooter from '../../components/footer';

export default function Home(props) {
  const [textInput1, onChangeTextInput1] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
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
          { icon: "🌱", label: "My Farm" },
          { icon: "📰", label: "Blog" },
          { icon: "👥", label: "Community" },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={styles.navButton} onPress={() => alert(`${item.label} Pressed!`)}>
            <View style={styles.navIconContainer}>
              <Text style={styles.navIcon}>{item.icon}</Text>
            </View>
            <Text style={styles.navLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
        {/* Available Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Products</Text>
            <Text style={styles.sectionSubtitle}>Fresh from the farm</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {[
              { tag: "Organic", name: "Fresh Tomatoes", label: "Tomatoes", qty: "5kg" },
              { tag: "Non-GMO", name: "Golden Wheat", label: "Wheat", qty: "10kg" },
              { tag: "Seasonal", name: "Rich Strawberries", label: "Strawberries", qty: "2kg" },
            ].map((item, i) => (
              <View key={i} style={styles.productCard}>
                <TouchableOpacity
                  style={styles.productTag}
                  onPress={() => alert(`View ${item.name}`)}
                >
                  <Text style={styles.productTagText}>{item.tag}</Text>
                </TouchableOpacity>
                <Text style={styles.productName}>{item.name}</Text>
                <View style={styles.productInfo}>
                  <Text style={styles.productLabel}>{item.label}</Text>
                  <Text style={styles.productQty}>{item.qty}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Customer Reviews</Text>
            <Text style={styles.sectionSubtitle}>What others are saying</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {[
              { name: "Alice", text: "Amazing quality products! The tomatoes are fresh." },
              { name: "Bob", text: "Loved the strawberries! Best I’ve ever had." },
            ].map((item, i) => (
              <View key={i} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewAvatar} />
                  <Text style={styles.reviewName}>{item.name}</Text>
                  <Image
                    source={{
                      uri:
                        "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/4Qxx5uBEiw/k6y70q4t_expires_30_days.png", // Using the provided stars image
                    }}
                    resizeMode="stretch"
                    style={styles.stars}
                  />
                </View>
                <Text style={styles.reviewText}>{item.text}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Share Your Thoughts */}
        <View style={styles.section}>
          <Text style={styles.sectionSubtitle}>Share your thoughts</Text>
          <TextInput
            placeholder="Write your blog here..."
            value={textInput1}
            onChangeText={onChangeTextInput1}
            style={styles.textInput}
            multiline // Added multiline for a better blog post experience
          />
          <Text style={styles.helperText}>
            Share your farming experiences and tips.
          </Text>

          <TouchableOpacity
            style={[styles.secondaryButton, { marginTop: 10 }]} // Adjusted margin for spacing
            onPress={() => alert("Save Draft Pressed!")}
          >
            <Text style={styles.secondaryButtonText}>Save Draft</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => {onChangeTextInput1(""); alert("Cancel Pressed!")}}
          >
            <Text style={styles.secondaryButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => alert(`Post Content: ${textInput1}`)}
          >
            <Text style={styles.primaryButtonText}>Post</Text>
          </TouchableOpacity>
        </View>

        {/* Farm Tips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Farm Tips</Text>
          </View>
          {[
            { icon: "🌱", title: "Watering Techniques", desc: "Best practices for irrigation." },
            { icon: "📅", title: "Crop Rotation", desc: "Improve soil health." },
            { icon: "☀️", title: "Pest Control", desc: "Natural methods that work." },
          ].map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <View style={styles.tipIcon}>
                <Text style={styles.tipIconText}>{tip.icon}</Text>
              </View>
              <View style={styles.tipText}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDesc}>{tip.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <NavigationFooter />
    </SafeAreaView>
  );
}

// --- Stylesheet ---
const styles = StyleSheet.create({
  // Utility and Structure
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContent: { paddingBottom: 20 }, // Added padding for content below scroll
  scrollArea: { flex: 1 },
  section: { paddingHorizontal: 16, marginBottom: 20 },
  sectionHeader: { marginBottom: 10 },
  sectionSubtitle: { color: "#777", fontSize: 14, marginBottom: 8 },

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

  // Section Titles
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },

  // Products
  horizontalScroll: { flexDirection: "row", overflow: 'visible' }, // Important for horizontal ScrollView
  productCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    width: 140,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  productTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#4CAF501A',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 6,
  },
  productTagText: { fontSize: 12, color: "#4CAF50", fontWeight: "600" },
  productName: { fontSize: 16, fontWeight: "500", color: "#000" },
  productInfo: { marginTop: 8 },
  productLabel: { fontSize: 14, color: "#555" },
  productQty: { fontSize: 12, color: "#999" },

  // Reviews
  reviewCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    width: 250, // Fixed width for horizontal scroll
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  reviewAvatar: { width: 24, height: 24, backgroundColor: "#0000001A", borderRadius: 12, marginRight: 8 },
  reviewName: { fontWeight: "600", color: "#000", marginRight: 'auto' },
  stars: { width: 60, height: 12 },
  reviewText: { color: "#555", fontSize: 14 },

  // Share Your Thoughts (Input/Buttons)
  textInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#000",
    minHeight: 100,
    textAlignVertical: 'top', // For Android multiline
    marginBottom: 8,
  },
  helperText: { fontSize: 12, color: "#999", marginBottom: 12 },

  primaryButton: {
    backgroundColor: "#000",
    borderRadius: 6,
    padding: 14,
    alignItems: "center",
    marginTop: 10,
  },
  primaryButtonText: { color: "#FFF", fontWeight: "600" },

  secondaryButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 6,
    padding: 12,
    alignItems: "center",
    marginTop: 8,
  },
  secondaryButtonText: { fontWeight: "600", color: "#000" },

  // Farm Tips
  tipRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  tipIcon: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E8F5E9', borderRadius: 20, marginRight: 12 },
  tipIconText: { fontSize: 20 },
  tipText: { flex: 1 },
  tipTitle: { fontWeight: '600', color: '#000', fontSize: 14 },
  tipDesc: { color: '#777', fontSize: 12 },

  // Footer Placeholder styles
  footerPlaceholder: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
  }
});