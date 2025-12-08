import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createReview, getReviews } from '../scripts/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ReviewSection = ({ itemId, itemType, userId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

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
      
      {userId && (
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

      <View style={styles.reviewsList}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewAuthor}>
                  {review.user_details?.username || 'Anonymous'}
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
              <Text style={styles.reviewComment}>{review.comment}</Text>
              <Text style={styles.reviewDate}>
                {new Date(review.created_at).toLocaleDateString()}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noReviews}>No reviews yet. Be the first to review!</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#444',
  },
  reviewForm: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    marginRight: 5,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  reviewsList: {
    marginTop: 10,
  },
  reviewItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  reviewAuthor: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewComment: {
    color: '#333',
    marginBottom: 5,
    lineHeight: 20,
  },
  reviewDate: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  noReviews: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
    padding: 20,
  },
});

export default ReviewSection;
