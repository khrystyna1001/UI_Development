import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  scrollViewContent: {
    flex: 1,
    paddingHorizontal: 16,
  },

  container: {
      flex: 1,
      backgroundColor: "#FFFFFF"
  },

  sectionHeader: {
      fontSize: 16,
      fontWeight: '700',
      color: '#333',
      marginTop: 10,
      marginBottom: 8,
  },

  cardGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  cardIconContainer: {
    width: 100,
    height: 60,
    backgroundColor: '#f8fbff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e0f0ff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  activeUserAvatar: {
    marginRight: 12,
  },
  activeUserName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  activeUserStatus: {
    fontSize: 14,
    color: '#999',
  },

  messageItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f7f7f7',
  },
  messageAvatar: {
    borderRadius: 50,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
    justifyContent: 'center',
  },
  messageName: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  messageNameUnread: {
    fontWeight: '700',
  },
  messageSnippet: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  messageSnippetUnread: {
    fontWeight: '600',
    color: '#333',
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },


  searchContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
  },


  actionButtonsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },

  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },

  deleteButton: {
    backgroundColor: '#fff',
    borderColor: '#333',
  },

  readButton: {
    backgroundColor: '#fff',
    borderColor: '#333',
  },

  composeButton: {
    backgroundColor: '#000',
    borderColor: '#000',
  },

  buttonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },

  composeButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },

});