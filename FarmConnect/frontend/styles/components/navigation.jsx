import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    paddingHorizontal: 16,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    elevation: 3,
  },

  headerImage: {
      height: 24,
      width: '100%'
  },

  headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 12
  },

  headerTitle: {
      color: "#000",
      fontSize: 20,
      fontWeight: "600"
  },

  profileContainer: {
      flexDirection: "row",
      paddingTop: 16,
      marginBottom: 12,
      paddingHorizontal: 16
  },

  avatar: {
      width: 40,
      height: 40,
      backgroundColor: "#0000001A",
      borderRadius: 40,
      marginRight: 12
  },

  profileTextContainer: {
      flex: 1
  },

  profileName: {
      color: "#000",
      fontSize: 16,
      fontWeight: "600"
  },

  profileRole: {
      color: "#777",
      fontSize: 12
  },

  navButtonRow: {
      flexDirection: "row",
      paddingHorizontal: 16,
      marginBottom: 20
  },

  navButton: {
    flex: 1,
    alignItems: "center",
    borderColor: "#0000001A",
    borderRadius: 6,
    borderWidth: 1,
    paddingVertical: 6,
    marginRight: 8,
  },

  navIconContainer: {
      backgroundColor: "#0000000D",
      borderRadius: 24,
      padding: 4,
      marginBottom: 4
  },

  navIcon: {
      color: "#000",
      fontSize: 28
  },

  navLabel: {
      color: "#000",
      fontSize: 10,
      textAlign: 'center'
  },
  
  // Logout Button Styles
  profileButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  profileButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
})