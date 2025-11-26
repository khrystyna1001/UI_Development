import React, { useEffect, useState } from 'react'; // Import useState
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { getProducts, getProduct, getReviews, getReview } from '../../scripts/api';

import NavigationFooter from '../../components/footer';
import NavigationHeader from '../../components/header';

import { styles } from '../../styles/tabs/home.jsx';

export default function Home() {
  const [textInput1, onChangeTextInput1] = useState("");

  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  const fetchProducts = async () => {
    const response = await getProducts();
    setProducts(response);
  };

  const fetchReviews = async () => {
    const response = await getReviews();
    setReviews(response);
  };

  useEffect(() => {
    fetchProducts();
    fetchReviews();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <NavigationHeader />

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
            {products.map((item, i) => (
              <View key={i} style={styles.productCard}>
                <TouchableOpacity
                  style={styles.productTag}
                  onPress={() => alert(`View ${item.name}`)}
                >
                  <Text style={styles.productTagText}>{item.category}</Text>
                </TouchableOpacity>
                <Text style={styles.productName}>{item.name}</Text>
                <View style={styles.productInfo}>
                  <Text style={styles.productLabel}>{item.description}</Text>
                  <Text style={styles.productQty}>{item.quantity}</Text>
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
            {reviews.map((item, i) => (
              <View key={i} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewAvatar} />
                  <Text style={styles.reviewName}>{item.user}</Text>
                  <Image
                    source={{
                      uri:
                        "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/4Qxx5uBEiw/k6y70q4t_expires_30_days.png",
                    }}
                    resizeMode="stretch"
                    style={styles.stars}
                  />
                </View>
                <Text style={styles.reviewText}>{item.content}</Text>
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
            multiline
          />
          <Text style={styles.helperText}>
            Share your farming experiences and tips.
          </Text>

          <TouchableOpacity
            style={[styles.secondaryButton, { marginTop: 10 }]}
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
