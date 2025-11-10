const MarketPlacePage = () => {

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View
          style={{
        	backgroundColor: "#FFFFFF",
        	marginBottom: 12,
        	paddingHorizontal: 16,
        	shadowColor: "#0000001C",
        	shadowOpacity: 0.1,
        	shadowOffset: {
        	  width: 0,
        	  height: 0
        	},
        	shadowRadius: 6,
        	elevation: 6,
          }}>
          <Image
            style={{
         	  height: 24,
            }}
          />
          <View
        	style={{
        	  flexDirection: "row",
        	  justifyContent: "space-between",
        	  paddingVertical: 12,
        	}}>
        	<Text
        	  style={{
        	    color: "#000000",
        		fontSize: 20,
        	  }}>
        		{"PROFILE"}
        	</Text>
        	<View
        	  style={{
        		flexDirection: "row",
        	  }}>
        	  <Text
        		style={{
        		  color: "#000000",
        		  fontSize: 16,
        		  marginRight: 16,
        	  }}>
        		{"🌾"}
        	  </Text>
        	  <Text
        		style={{
        		  color: "#000000",
        		  fontSize: 16,
        	  }}>
        		{"📝"}
        	  </Text>
        	</View>
          </View>
        </View>
        <View
          style={{
        	flexDirection: "row",
        	paddingTop: 16,
        	marginBottom: 12,
        	paddingHorizontal: 16,
          }}>
          <View
        	style={{
        	  width: 40,
        	  height: 40,
        	  backgroundColor: "#0000001A",
        	  borderRadius: 40,
        	  marginRight: 12,
        	}}>
          </View>
        <View
          style={{
        	flex: 1,
          }}>
          <Text
        	style={{
              color: "#000000",
        	  fontSize: 16,
        	}}>
        	  {"John Doe"}
          </Text>
          <Text
        	style={{
        	  color: "#000000",
        	  fontSize: 12,
        	}}>
        	  {"Organic Farmer"}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 16,
        }}>
        <View
          style={{
        	flex: 1,
        	alignItems: "center",
        	borderColor: "#0000001A",
        	borderRadius: 6,
        	borderWidth: 1,
        	paddingVertical: 4,
        	marginRight: 8,
          }}>
        	<View
        	  style={{
        		backgroundColor: "#0000000D",
        		borderRadius: 24,
        		paddingBottom: 1,
        	  }}>
        		<Text
        		  style={{
        			color: "#000000",
        			fontSize: 30,
        		  }}>
        			{"🌱"}
        		</Text>
        	  </View>
              <Text
                style={{
                  color: "#000000",
                  fontSize: 10,
                }}>
                  {"My Farm"}
              </Text>
            </View>
            <View
        	  style={{
        		flex: 1,
        		alignItems: "center",
        		borderColor: "#0000001A",
        		borderRadius: 6,
        		borderWidth: 1,
        		paddingVertical: 4,
        		marginRight: 9,
        	  }}>
        	  <View
        		style={{
        		  backgroundColor: "#0000000D",
        		  borderRadius: 24,
        		  paddingBottom: 1,
        		}}>
        		<Text
        		  style={{
        			color: "#000000",
        			fontSize: 30,
        		  }}>
        			{"📰"}
        		</Text>
        	  </View>
        	  <Text
        		style={{
        		  color: "#000000",
        		  fontSize: 10,
        		}}>
        		  {"Blog"}
        	  </Text>
        	</View>
          <View
        	style={{
        	  flex: 1,
        	  alignItems: "center",
        	  borderColor: "#0000001A",
        	  borderRadius: 6,
        	  borderWidth: 1,
        	  paddingVertical: 4,
        	}}>
        	<View
        	  style={{
        		backgroundColor: "#0000000D",
        		borderRadius: 24,
        		paddingBottom: 1,
        	  }}>
              <Text
        		style={{
        		  color: "#000000",
        		  fontSize: 30,
        		}}>
        		{"👥"}
        	  </Text>
        	</View>
        	<Text
        	  style={{
        		color: "#000000",
        		fontSize: 10,
        	  }}>
        		{"Community"}
        	</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollViewContent}>
        </ScrollView>
        <NavigationFooter />
      </View>
    </SafeAreaView>
  );
};