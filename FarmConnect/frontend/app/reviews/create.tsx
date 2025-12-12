import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getReview, updateReview, getMyData } from '../../scripts/api';
import { styles } from '../../styles/tabs/reviewcreate';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function CreateReviewScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [myData, setMyData] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If there's an ID, we're editing an existing review
  useEffect(() => {
    const fetchReview = async () => {
      if (id) {
        setLoading(true);
        try {
          const review = await getReview(id);
          const myData = await getMyData();
          setMyData(myData);
          setEditingReview(review);
          setRating(review.rating);
          setComment(review.content);
        } catch (error) {
          Alert.alert('Error', 'Failed to load review');
          console.error('Error fetching review:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchReview();
  }, [id]);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      Alert.alert('Error', 'Please enter a comment');
      return;
    }

    setIsSubmitting(true);
    try {
      const reviewData = {
        rating,
        content: comment.trim(),
        author: myData?.id,
      };

      if (editingReview) {
        await updateReview(editingReview.id, reviewData);
        Alert.alert('Success', 'Review updated successfully');
      } 
      router.back();
    } catch (error) {
      console.error('Error saving review:', error);
      Alert.alert('Error', 'Failed to save review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <TouchableOpacity
        key={star}
        onPress={() => setRating(star)}
        activeOpacity={0.7}
      >
        <Icon
          name={star <= rating ? 'star' : 'star-border'}
          size={32}
          color="#FFD700"
        />
      </TouchableOpacity>
    ));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {editingReview ? 'Edit Review' : 'Write a Review'}
      </Text>

      <View style={styles.ratingContainer}>
        <Text style={styles.ratingLabel}>Your Rating:</Text>
        <View style={styles.starsContainer}>
          {renderStars()}
        </View>
      </View>

      <View style={styles.commentContainer}>
        <Text style={styles.commentLabel}>Your Review:</Text>
        <TextInput
          style={styles.commentInput}
          placeholder="Share your thoughts about this product..."
          value={comment}
          onChangeText={setComment}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => router.back()}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.submitButton, isSubmitting && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={[styles.buttonText, styles.submitButtonText]}>
              {editingReview ? 'Update Review' : 'Submit Review'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}