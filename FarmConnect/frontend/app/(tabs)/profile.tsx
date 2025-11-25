import React, {useState} from "react";
import { SafeAreaView,
    View,
    ScrollView,
    Image,
    Text,
    TouchableOpacity,
    TextInput
    } from "react-native";
import NavigationFooter from "../../components/footer";
import NavigationHeader from '../../components/header';

import { styles } from '../../styles/tabs/profile.jsx';

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
