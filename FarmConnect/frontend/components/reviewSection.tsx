import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { createReview, getReviews } from '../scripts/api';
import { styles } from '../styles/components/reviewButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ReviewSection = ({ itemId, itemType, userId, itemAuthorId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [seeAllReviews, setSeeAllReviews] = useState(false);

  const loadReviews = async () => {
    try {
      const allReviews = await getReviews();
      
      const filteredReviews = allReviews.filter(review => {
        if (itemType === 'product') {
          return String(review.product) === String(itemId);
        } else if (itemType === 'blog') {
          return String(review.blog_post) === String(itemId);
        }
        return false;
      });

      console.log('All reviews:', allReviews);
      console.log('Filtered reviews:', filteredReviews);
      setReviews(filteredReviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [itemId]);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      Alert.alert('Error', 'Please enter a comment');
      return;
    }

    try {
      setLoading(true);
      const reviewData = {
      content: comment,
      rating,
      author: userId,
      [itemType === 'product' ? 'product' : 'blog_post']: itemId
    };

      await createReview(reviewData);
      
      setComment('');
      await loadReviews();
      Alert.alert('Success', 'Your review has been submitted!');
    } catch (error) {
      console.error('Error submitting review:', error);
      Alert.alert('Error', 'Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= rating ? 'star' : 'star-border'}
          size={24}
          color={i <= rating ? '#FFD700' : '#000'}
          onPress={() => setRating(i)}
          style={styles.star}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviews</Text>

      <View style={styles.reviewsList}>
        {reviews.length > 0 ? (
          reviews.slice(0, seeAllReviews ? reviews.length : 3).map((review) => (
            <TouchableOpacity onPress={() => router.navigate(`reviews/${review.id}`)}>
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewAuthor}>
                  {review.author_info?.username || 'Anonymous'}
                </Text>
                <View style={styles.reviewRating}>
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name={i < review.rating ? 'star' : 'star-border'}
                      size={16}
                      color={i < review.rating ? '#FFD700' : '#000'}
                    />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewComment}>{review.content}</Text>
              <Text style={styles.reviewDate}>
                {new Date(review.created_at).toLocaleDateString()}
              </Text>
            </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noReviews}>No reviews yet.</Text>
        )}
      </View>
      {(userId !== itemAuthorId) && (
        <View style={styles.reviewForm}>
          <Text style={styles.subtitle}>Write a Review</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>Rating: </Text>
            <View style={styles.starsContainer}>
              {renderStars(rating)}
            </View>
          </View>
          <TextInput
            style={styles.commentInput}
            placeholder="Share your thoughts..."
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
          />
          <Button
            title={loading ? 'Submitting...' : 'Submit Review'}
            onPress={handleSubmit}
            disabled={loading}
            color="#4CAF50"
          />
        </View>
      )}
      {reviews.length > 3 && (
        <TouchableOpacity style={styles.seeAllButton} onPress={() => setSeeAllReviews(!seeAllReviews)}>
          <Text style={styles.seeAllText}>{seeAllReviews ? 'Show Less Reviews' : 'Show All Reviews'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ReviewSection;
