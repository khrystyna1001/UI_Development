import React, {useState} from "react";
import { SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import NavigationFooter from "../../components/footer";
import NavigationHeader from '../../components/header';


export default function Profile (props) {
	const [textInput1, onChangeTextInput1] = useState('');
	return (
		<SafeAreaView style={styles.container}>
              {/* Header */}
              <NavigationHeader />
        <ScrollView
		  style={{
			flex: 1,
			backgroundColor: "#FFFFFF",
			margin: 20
		  }}>
                      <Text style={styles.sectionTitle}>Available Products</Text>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                        {[
                          { name: "Fresh Tomatoes", price: "$2.00/lb", tag: "Organic" },
                          { name: "Fresh Apples", price: "$1.50/lb", tag: "Organic" },
                          { name: "Potatoes", price: "$1.80/lb", tag: "Organic" },
                        ].map((item, index) => (
                          <View key={index} style={styles.productCard}>
                            <Text style={styles.tag}>{item.tag}</Text>
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.price}>{item.price}</Text>
                          </View>
                        ))}
                      </ScrollView>

                      {/* Customer Reviews */}
                      <Text style={styles.sectionTitle}>Customer Reviews</Text>
                      <View style={styles.reviewContainer}>
                        <View style={styles.reviewCard}>
                          <Text style={styles.reviewer}>Alice ⭐⭐⭐⭐⭐</Text>
                          <Text style={styles.reviewText}>Best tomatoes I've ever had!</Text>
                        </View>
                        <View style={styles.reviewCard}>
                          <Text style={styles.reviewer}>Bob ⭐⭐⭐⭐⭐</Text>
                          <Text style={styles.reviewText}>Fantastic quality and service!</Text>
                        </View>
                      </View>

                      {/* Farm Performance */}
                      <Text style={styles.sectionTitle}>Farm Performance</Text>
                      <View style={styles.performanceContainer}>
                        <View style={styles.performanceBox}>
                          <Text style={styles.performanceValue}>500 lbs</Text>
                          <Text style={styles.performanceLabel}>Crops Yielded</Text>
                          <Text style={styles.performanceChange}>+10%</Text>
                        </View>
                        <View style={styles.performanceBox}>
                          <Text style={styles.performanceValue}>$2000</Text>
                          <Text style={styles.performanceLabel}>Total Sales</Text>
                          <Text style={styles.performanceChange}>+5%</Text>
                        </View>
                        <View style={styles.performanceBox}>
                          <Text style={styles.performanceValue}>150</Text>
                          <Text style={styles.performanceLabel}>Customers</Text>
                          <Text style={styles.performanceChange}>+20%</Text>
                        </View>
                      </View>

                      {/* Recent Updates */}
                      <Text style={styles.sectionTitle}>Recent Updates</Text>
                      <View style={styles.updatesContainer}>
                        <View style={styles.updateCard}>
                          <Text style={styles.updateTitle}>Sunset at the farm</Text>
                          <Text style={styles.updateSubtitle}>Started planting fresh herbs today!</Text>
                          <Text style={styles.updateAuthor}>John Doe</Text>
                        </View>
                        <View style={styles.updateCard}>
                          <Text style={styles.updateTitle}>Introducing new crops</Text>
                          <Text style={styles.updateSubtitle}>Had a great day selling produce!</Text>
                          <Text style={styles.updateAuthor}>John Doe</Text>
                        </View>
                      </View>

                      {/* Buttons */}
                      <TouchableOpacity style={styles.shareButton}>
                        <Text style={styles.shareButtonText}>Share Profile</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.viewButton}>
                        <Text style={styles.viewButtonText}>View Location</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.contactButton}>
                        <Text style={styles.contactButtonText}>Contact</Text>
                      </TouchableOpacity>
                </ScrollView>
			<NavigationFooter />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
    // Utility and Structure
      container: { flex: 1, backgroundColor: "#FFFFFF" },
      scrollContent: { paddingBottom: 20 }, // Added padding for content below scroll
      scrollArea: { flex: 1 },
      section: { paddingHorizontal: 16, marginBottom: 20 },
      sectionHeader: { marginBottom: 10 },
      sectionSubtitle: { color: "#777", fontSize: 14, marginBottom: 8 },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 8,
        marginTop: 16,
      },
      horizontalScroll: {
        flexDirection: "row",
      },
      productCard: {
        backgroundColor: "#f8f8f8",
        borderRadius: 8,
        padding: 12,
        marginRight: 10,
        width: 140,
      },
      tag: {
        fontSize: 12,
        color: "#4CAF50",
        fontWeight: "600",
        marginBottom: 6,
      },
      productName: {
        fontSize: 16,
        fontWeight: "500",
      },
      price: {
        marginTop: 4,
        fontSize: 14,
        color: "#555",
      },
      reviewContainer: {
        flexDirection: "row",
        marginTop: 8,
      },
      reviewCard: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        borderRadius: 8,
        padding: 10,
        marginRight: 10,
      },
      reviewer: {
        fontWeight: "600",
        marginBottom: 4,
      },
      reviewText: {
        color: "#555",
      },
      performanceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
      },
      performanceBox: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        borderRadius: 8,
        padding: 10,
        alignItems: "center",
        marginRight: 8,
      },
      performanceValue: {
        fontSize: 18,
        fontWeight: "700",
      },
      performanceLabel: {
        fontSize: 14,
        color: "#555",
      },
      performanceChange: {
        color: "#4CAF50",
        marginTop: 4,
        fontSize: 12,
      },
      updatesContainer: {
        flexDirection: "row",
        marginTop: 8,
      },
      updateCard: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        borderRadius: 8,
        padding: 10,
        marginRight: 10,
      },
      updateTitle: {
        fontWeight: "600",
      },
      updateSubtitle: {
        marginTop: 4,
        color: "#555",
      },
      updateAuthor: {
        marginTop: 6,
        fontSize: 12,
        color: "#999",
      },
      shareButton: {
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 6,
        padding: 12,
        alignItems: "center",
        marginTop: 16,
      },
      shareButtonText: {
        fontWeight: "600",
      },
      viewButton: {
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 6,
        padding: 12,
        alignItems: "center",
        marginTop: 8,
      },
      viewButtonText: {
        fontWeight: "600",
      },
      contactButton: {
        backgroundColor: "#000",
        borderRadius: 6,
        padding: 14,
        alignItems: "center",
        marginTop: 10,
      },
      contactButtonText: {
        color: "#fff",
        fontWeight: "600",
      },
    });