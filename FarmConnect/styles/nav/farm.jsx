import { StyleSheet, Dimensions } from 'react-native';

const PADDING_HORIZONTAL = 20;

export const styles = StyleSheet.create({
  safeArea: {
        flex: 1,
        backgroundColor: '#fff',
  },

  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 10,
  },

  mapContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 30,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },

  mapImage: {
    width: '100%',
    height: 300,
  },

  locationOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
  },

  actionButton: {
    backgroundColor: "#000",
    borderRadius: 6,
    padding: 14,
    alignItems: "center",
    marginTop: 10,
  },

  shareButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 6,
    padding: 12,
    alignItems: "center",
    marginTop: 8,
  },

  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

