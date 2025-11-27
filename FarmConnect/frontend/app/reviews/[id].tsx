import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    Image,
    ScrollView, 
    ActivityIndicator, 
    TouchableOpacity
} from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { getReview } from '../../scripts/api';

import NavigationHeader from '../../components/header';
import NavigationFooter from "../../components/footer";
import { styles } from '../../styles/tabs/review';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function ReviewDetail() {
  const { id } = useLocalSearchParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const data = await getReview(id);
        setReview(data);
      } catch (err) {
        setError('Failed to fetch review');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a90e2" />
        <Text style={styles.loadingText}>Loading review details...</Text>
      </View>
    );
  }

  if (error || !review) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Review not found'}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const reviewTitle = review.product?.name || review.blog_post?.title || 'Review Details';
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  return (
    <View style={styles.mainContainer}> 
      <NavigationHeader />
      <ScrollView style={styles.container}>
        <Stack.Screen options={{ title: reviewTitle }} />
        
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#333" />
            <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.detailsContainer}>
            {/* Review Header (Author & Rating) */}
            <View style={styles.reviewHeader}>
                <Text style={styles.reviewTitle}>{reviewTitle}</Text>
                <View style={styles.authorRatingRow}>
                    <Text style={styles.authorName}>— {review.author?.name || 'Anonymous'}</Text>
                    <Text style={styles.starRating}>
                        {'★'.repeat(Math.round(review.rating))}
                        <Text style={styles.emptyStar}>{'☆'.repeat(5 - Math.round(review.rating))}</Text>
                    </Text>
                </View>
                <View style={styles.divider} />
            </View>
            
            {/* Content Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Review Content</Text>
                <Text style={styles.content}>{review.content}</Text>
            </View>

            {/* Date Details */}
            <View style={styles.dateSection}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Posted:</Text>
                    <Text style={styles.detailValue}>
                    {formatDate(review.created_at)}
                    </Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Last Updated:</Text>
                    <Text style={styles.detailValue}>
                    {formatDate(review.updated_at || review.created_at)}
                    </Text>
                </View>
            </View>

        </View>
      </ScrollView>
      
      <NavigationFooter />
    </View>
  );
}