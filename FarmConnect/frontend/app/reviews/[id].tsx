import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    TouchableOpacity,
    Modal
} from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { deleteReview, getReview, getMyData } from '../../scripts/api';

import { UpdateButton } from '../../components/updateButton';
import { DeleteButton } from '../../components/deleteButton';

import NavigationHeader from '../../components/header';
import NavigationFooter from "../../components/footer";

import { styles } from '../../styles/tabs/review';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoadingSpinner from '../../components/LoadingSpinner';


export default function ReviewDetail() {
  const { id } = useLocalSearchParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const data = await getReview(id);
        setReview(data);

        const userData = await getMyData();
        setUser(userData);
      } catch (err) {
        setError('Failed to fetch review');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  const handleDeleteReview = async () => {
    try {
      const response = await deleteReview(id);
      console.log(response);
    } catch (e) {
      console.error(e)
    }
    setShowDeleteModal(false);
    router.replace('/(tabs)');
  }

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  }

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  if (error || !review) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Review not found'}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back() || router.replace('home')}>
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
        <TouchableOpacity onPress={() => router.back() || router.replace('/(tabs)')} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#333" />
            <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.detailsContainer}>
            {/* Review Header (Author & Rating) */}
            <View style={styles.reviewHeader}>
                <Text style={styles.reviewTitle}>{reviewTitle}</Text>
                <View style={styles.authorRatingRow}>
                    <Text style={styles.authorName}>— {review.author_info?.username || 'Anonymous'}</Text>
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

            {/* Action Buttons */}
            {(review.author === user?.id || user?.is_superuser) && (
            <View style={styles.actionButtons}>
              <UpdateButton item={review.title} onPress={() => router.push(`/reviews/create?id=${review?.id}`)} />
              <DeleteButton item={review.title} onPress={handleShowDeleteModal} />
              <Modal
              visible={showDeleteModal}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setShowDeleteModal(false)}
              >
              <View style={styles.modalOverlay}>
                  <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>
                      {'Delete Review'}
                  </Text>
                  <Text style={styles.modalText}>
                      {'Are you sure you want to delete this review? This action cannot be undone.'}
                  </Text>
                  <View style={styles.modalButtons}>
                      <TouchableOpacity
                      style={[styles.modalButton, styles.cancelButton]}
                      onPress={() => setShowDeleteModal(false)}
                      >
                      <Text style={[styles.modalButtonText, styles.cancelButtonText]}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      style={[styles.modalButton, styles.deleteButton]}
                      onPress={handleDeleteReview}
                      >
                      <Text style={[styles.modalButtonText, styles.deleteButtonText]}>Delete</Text>
                      </TouchableOpacity>
                  </View>
                  </View>
              </View>
              </Modal>
            </View>
            )}
        </View>
      </ScrollView>
      
      <NavigationFooter />
    </View>
  );
}