import React, {useState} from "react";
import { SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity, TextInput, } from "react-native";
export default (props) => {
	const [textInput1, onChangeTextInput1] = useState('');
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: "#FFFFFF",
			}}>
			<ScrollView
				style={{
					flex: 1,
					backgroundColor: "#FFFFFF",
				}}>
				<View
					style={{
						backgroundColor: "#FFFFFF",
						marginBottom: 12,
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
							paddingHorizontal: 16,
						}}>
						<Text
							style={{
								color: "#000000",
								fontSize: 20,
							}}>
							{"Home"}
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
						paddingHorizontal: 12,
						marginBottom: 12,
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
						paddingHorizontal: 12,
						marginBottom: 12,
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
								marginBottom: 4,
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
								marginBottom: 4,
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
								marginBottom: 4,
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
				<View
					style={{
						height: 225,
						paddingHorizontal: 12,
						marginBottom: 12,
					}}>
					<View
						style={{
							paddingTop: 16,
							marginBottom: 8,
						}}>
						<Text
							style={{
								color: "#000000",
								fontSize: 18,
							}}>
							{"Products"}
						</Text>
						<Text
							style={{
								color: "#000000",
								fontSize: 12,
							}}>
							{"Fresh from the farm"}
						</Text>
					</View>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						style={{
							flexDirection: "row",
						}}>
						<View
							style={{
								borderColor: "#0000001A",
								borderRadius: 6,
								borderWidth: 1,
								marginRight: 8,
							}}>
							<View
								style={{
									alignSelf: "flex-start",
									backgroundColor: "#0000000D",
								}}>
								<TouchableOpacity
									style={{
										alignSelf: "flex-start",
										backgroundColor: "#0000000D",
										borderTopLeftRadius: 6,
										borderBottomRightRadius: 6,
										padding: 4,
										marginBottom: 46,
									}} onPress={()=>alert('Pressed!')}>
									<Text
										style={{
											color: "#000000",
											fontSize: 12,
										}}>
										{"Organic"}
									</Text>
								</TouchableOpacity>
								<Text
									style={{
										color: "#000000",
										fontSize: 12,
										marginBottom: 71,
										marginHorizontal: 34,
									}}>
									{"Fresh tomatoes"}
								</Text>
							</View>
							<View
								style={{
									alignSelf: "flex-start",
									paddingVertical: 8,
									paddingLeft: 8,
									paddingRight: 90,
								}}>
								<Text
									style={{
										color: "#000000",
										fontSize: 12,
										marginBottom: 4,
									}}>
									{"Tomatoes"}
								</Text>
								<Text
									style={{
										color: "#000000",
										fontSize: 16,
									}}>
									{"5kg"}
								</Text>
							</View>
						</View>
						<View
							style={{
								borderColor: "#0000001A",
								borderRadius: 6,
								borderWidth: 1,
								marginRight: 8,
							}}>
							<View
								style={{
									alignSelf: "flex-start",
									backgroundColor: "#0000000D",
								}}>
								<TouchableOpacity
									style={{
										alignSelf: "flex-start",
										backgroundColor: "#0000000D",
										borderTopLeftRadius: 6,
										borderBottomRightRadius: 6,
										padding: 4,
										marginBottom: 46,
									}} onPress={()=>alert('Pressed!')}>
									<Text
										style={{
											color: "#000000",
											fontSize: 12,
										}}>
										{"Non-GMO"}
									</Text>
								</TouchableOpacity>
								<Text
									style={{
										color: "#000000",
										fontSize: 12,
										marginBottom: 71,
										marginHorizontal: 39,
									}}>
									{"Golden wheat"}
								</Text>
							</View>
							<View
								style={{
									alignSelf: "flex-start",
									paddingVertical: 8,
									paddingLeft: 8,
									paddingRight: 109,
								}}>
								<Text
									style={{
										color: "#000000",
										fontSize: 12,
										marginBottom: 4,
									}}>
									{"Wheat"}
								</Text>
								<Text
									style={{
										color: "#000000",
										fontSize: 16,
									}}>
									{"10kg"}
								</Text>
							</View>
						</View>
						<View
							style={{
								borderColor: "#0000001A",
								borderRadius: 6,
								borderWidth: 1,
							}}>
							<View
								style={{
									alignSelf: "flex-start",
									backgroundColor: "#0000000D",
								}}>
								<TouchableOpacity
									style={{
										alignSelf: "flex-start",
										backgroundColor: "#0000000D",
										borderTopLeftRadius: 6,
										borderBottomRightRadius: 6,
										padding: 4,
										marginBottom: 46,
									}} onPress={()=>alert('Pressed!')}>
									<Text
										style={{
											color: "#000000",
											fontSize: 12,
										}}>
										{"Seasonal"}
									</Text>
								</TouchableOpacity>
								<Text
									style={{
										color: "#000000",
										fontSize: 12,
										marginBottom: 71,
										marginHorizontal: 39,
									}}>
									{"Rich strawberries"}
								</Text>
							</View>
							<View
								style={{
									alignSelf: "flex-start",
									paddingVertical: 8,
									paddingLeft: 8,
									paddingRight: 109,
								}}>
								<Text
									style={{
										color: "#000000",
										fontSize: 12,
										marginBottom: 4,
									}}>
									{"Strawberries"}
								</Text>
								<Text
									style={{
										color: "#000000",
										fontSize: 16,
									}}>
									{"2kg"}
								</Text>
							</View>
						</View>
					</ScrollView>
				</View>
				<View
					style={{
						paddingHorizontal: 12,
						marginBottom: 12,
					}}>
					<View
						style={{
							paddingTop: 16,
							marginBottom: 8,
						}}>
						<Text
							style={{
								color: "#000000",
								fontSize: 18,
							}}>
							{"Latest Posts"}
						</Text>
						<Text
							style={{
								color: "#000000",
								fontSize: 12,
							}}>
							{"From fellow farmers"}
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
						}}>
						<View
							style={{
								flex: 1,
								borderColor: "#0000001A",
								borderRadius: 6,
								borderWidth: 1,
								marginRight: 8,
							}}>
							<View
								style={{
									alignItems: "center",
									backgroundColor: "#0000000D",
								}}>
								<Text
									style={{
										color: "#000000",
										fontSize: 12,
										marginTop: 76,
										marginBottom: 66,
									}}>
									{"Sunset on the farm"}
								</Text>
								<View
									style={{
										flexDirection: "row",
										marginBottom: 8,
									}}>
									<View
										style={{
											width: 20,
											height: 4,
											backgroundColor: "#FFFFFF",
											borderRadius: 100,
											marginRight: 4,
										}}>
									</View>
									<View
										style={{
											width: 4,
											height: 4,
											backgroundColor: "#0000004D",
											borderRadius: 100,
											marginRight: 4,
										}}>
									</View>
									<View
										style={{
											width: 4,
											height: 4,
											backgroundColor: "#0000004D",
											borderRadius: 100,
											marginRight: 4,
										}}>
									</View>
									<View
										style={{
											width: 4,
											height: 4,
											backgroundColor: "#0000004D",
											borderRadius: 100,
										}}>
									</View>
								</View>
							</View>
							<View
								style={{
									alignItems: "center",
									paddingVertical: 8,
								}}>
								<Text
									style={{
										color: "#000000",
										fontSize: 12,
										marginBottom: 8,
									}}>
									{"Beautiful evening at the farm!"}
								</Text>
								<View
									style={{
										flexDirection: "row",
										marginBottom: 8,
										marginHorizontal: 8,
									}}>
									<View
										style={{
											backgroundColor: "#0000000D",
											borderColor: "#0000001A",
											borderRadius: 2,
											borderWidth: 1,
											paddingVertical: 2,
											paddingHorizontal: 4,
											marginRight: 6,
										}}>
										<Text
											style={{
												color: "#000000",
												fontSize: 12,
											}}>
											{"Sunset"}
										</Text>
									</View>
									<View
										style={{
											backgroundColor: "#0000000D",
											borderColor: "#0000001A",
											borderRadius: 2,
											borderWidth: 1,
											paddingVertical: 2,
											paddingHorizontal: 4,
										}}>
										<Text
											style={{
												color: "#000000",
												fontSize: 12,
											}}>
											{"Nature"}
										</Text>
									</View>
								</View>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										marginHorizontal: 8,
									}}>
									<View
										style={{
											width: 20,
											height: 20,
											backgroundColor: "#0000001A",
											borderRadius: 20,
											marginRight: 8,
										}}>
									</View>
									<View
										style={{
											flex: 1,
											paddingBottom: 1,
										}}>
										<Text
											style={{
												color: "#000000",
												fontSize: 12,
											}}>
											{"Jane Smith"}
										</Text>
									</View>
								</View>
							</View>
						</View>
						<View
							style={{
								flex: 1,
								borderColor: "#0000001A",
								borderRadius: 6,
								borderWidth: 1,
							}}>
							<View
								style={{
									alignItems: "center",
									backgroundColor: "#0000000D",
								}}>
								<Text
									style={{
										color: "#000000",
										fontSize: 12,
										marginTop: 77,
										marginBottom: 63,
									}}>
									{"New irrigation system"}
								</Text>
								<View
									style={{
										flexDirection: "row",
										marginBottom: 8,
									}}>
									<View
										style={{
											width: 20,
											height: 4,
											backgroundColor: "#FFFFFF",
											borderRadius: 100,
											marginRight: 4,
										}}>
									</View>
									<View
										style={{
											width: 4,
											height: 4,
											backgroundColor: "#0000004D",
											borderRadius: 100,
											marginRight: 4,
										}}>
									</View>
									<View
										style={{
											width: 4,
											height: 4,
											backgroundColor: "#0000004D",
											borderRadius: 100,
											marginRight: 4,
										}}>
									</View>
									<View
										style={{
											width: 4,
											height: 4,
											backgroundColor: "#0000004D",
											borderRadius: 100,
										}}>
									</View>
								</View>
							</View>
							<View
								style={{
									padding: 8,
								}}>
								<Text
									style={{
										color: "#000000",
										fontSize: 12,
										marginBottom: 8,
									}}>
									{"Just installed a new irrigation system!"}
								</Text>
								<View
									style={{
										flexDirection: "row",
										marginBottom: 8,
									}}>
									<View
										style={{
											backgroundColor: "#0000000D",
											borderColor: "#0000001A",
											borderRadius: 2,
											borderWidth: 1,
											paddingVertical: 2,
											paddingHorizontal: 4,
											marginRight: 6,
										}}>
										<Text
											style={{
												color: "#000000",
												fontSize: 12,
											}}>
											{"Irrigation"}
										</Text>
									</View>
									<View
										style={{
											backgroundColor: "#0000000D",
											borderColor: "#0000001A",
											borderRadius: 2,
											borderWidth: 1,
											paddingVertical: 2,
											paddingHorizontal: 4,
										}}>
										<Text
											style={{
												color: "#000000",
												fontSize: 12,
											}}>
											{"Technology"}
										</Text>
									</View>
								</View>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
									}}>
									<View
										style={{
											width: 20,
											height: 20,
											backgroundColor: "#0000001A",
											borderRadius: 20,
											marginRight: 8,
										}}>
									</View>
									<View
										style={{
											flex: 1,
											paddingBottom: 1,
										}}>
										<Text
											style={{
												color: "#000000",
												fontSize: 12,
											}}>
											{"Tom Brown"}
										</Text>
									</View>
								</View>
							</View>
						</View>
					</View>
				</View>
				<View
					style={{
						paddingRight: 12,
						marginBottom: 12,
					}}>
					<Text
						style={{
							color: "#000000",
							fontSize: 14,
							marginBottom: 4,
							marginLeft: 12,
						}}>
						{"Share your thoughts"}
					</Text>
					<TextInput
						placeholder={"Write your blog here..."}
						value={textInput1}
						onChangeText={onChangeTextInput1}
						style={{
							color: "#000000",
							fontSize: 14,
							marginBottom: 4,
							marginLeft: 12,
							borderColor: "#0000001A",
							borderRadius: 6,
							borderWidth: 1,
							paddingVertical: 8,
							paddingHorizontal: 12,
						}}
					/>
					<Text
						style={{
							color: "#000000",
							fontSize: 12,
							marginLeft: 12,
						}}>
						{"Share your farming experiences and tips."}
					</Text>
				</View>
				<View
					style={{
						paddingHorizontal: 12,
						marginBottom: 12,
					}}>
					<TouchableOpacity
						style={{
							alignItems: "center",
							backgroundColor: "#FFFFFF",
							borderColor: "#000000",
							borderRadius: 8,
							borderWidth: 1,
							paddingVertical: 10,
							marginBottom: 8,
						}} onPress={()=>alert('Pressed!')}>
						<Text
							style={{
								color: "#000000",
								fontSize: 16,
							}}>
							{"Save Draft"}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							alignItems: "center",
							backgroundColor: "#FFFFFF",
							borderColor: "#000000",
							borderRadius: 8,
							borderWidth: 1,
							paddingVertical: 10,
							marginBottom: 8,
						}} onPress={()=>alert('Pressed!')}>
						<Text
							style={{
								color: "#000000",
								fontSize: 16,
							}}>
							{"Cancel"}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							alignItems: "center",
							backgroundColor: "#000000",
							borderRadius: 8,
							paddingVertical: 10,
						}} onPress={()=>alert('Pressed!')}>
						<Text
							style={{
								color: "#FFFFFF",
								fontSize: 16,
							}}>
							{"Post"}
						</Text>
					</TouchableOpacity>
				</View>
				<View
					style={{
						height: 225,
						paddingHorizontal: 12,
						marginBottom: 12,
					}}>
					<View
						style={{
							paddingTop: 16,
							marginBottom: 8,
						}}>
						<Text
							style={{
								color: "#000000",
								fontSize: 18,
							}}>
							{"User Reviews"}
						</Text>
						<Text
							style={{
								color: "#000000",
								fontSize: 12,
							}}>
							{"What others are saying"}
						</Text>
					</View>
					<View
						style={{
							flex: 1,
						}}>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							style={{
								flexDirection: "row",
							}}>
							<View
								style={{
									backgroundColor: "#0000000D",
									borderRadius: 6,
									padding: 12,
									marginRight: 8,
								}}>
								<View
									style={{
										alignSelf: "flex-start",
										flexDirection: "row",
										alignItems: "center",
										marginBottom: 8,
									}}>
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											marginRight: 4,
										}}>
										<View
											style={{
												width: 24,
												height: 24,
												backgroundColor: "#0000001A",
												borderRadius: 24,
												marginRight: 8,
											}}>
										</View>
										<View
											style={{
												paddingBottom: 1,
												paddingRight: 75,
											}}>
											<Text
												style={{
													color: "#000000",
													fontSize: 12,
												}}>
												{"Alice"}
											</Text>
										</View>
									</View>
									<Image
										source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/4Qxx5uBEiw/k6y70q4t_expires_30_days.png"}}
										resizeMode = {"stretch"}
										style={{
											width: 58,
											height: 9,
										}}
									/>
								</View>
								<Text
									style={{
										color: "#000000",
										fontSize: 14,
										width: 188,
									}}>
									{"Amazing quality products! The tomatoes are fresh."}
								</Text>
							</View>
							<View
								style={{
									backgroundColor: "#0000000D",
									borderRadius: 6,
									padding: 12,
								}}>
								<View
									style={{
										alignSelf: "flex-start",
										flexDirection: "row",
										alignItems: "center",
										marginBottom: 8,
									}}>
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
											marginRight: 4,
										}}>
										<View
											style={{
												width: 24,
												height: 24,
												backgroundColor: "#0000001A",
												borderRadius: 24,
												marginRight: 8,
											}}>
										</View>
										<View
											style={{
												paddingBottom: 1,
												paddingRight: 75,
											}}>
											<Text
												style={{
													color: "#000000",
													fontSize: 12,
												}}>
												{"Bob"}
											</Text>
										</View>
									</View>
									<Image
										source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/4Qxx5uBEiw/l8qbk3kh_expires_30_days.png"}}
										resizeMode = {"stretch"}
										style={{
											width: 58,
											height: 9,
										}}
									/>
								</View>
								<Text
									style={{
										color: "#000000",
										fontSize: 14,
										width: 188,
									}}>
									{"Loved the strawberries! Best I’ve ever had."}
								</Text>
							</View>
						</ScrollView>
					</View>
				</View>
				<View
					style={{
						paddingHorizontal: 12,
						marginBottom: 12,
					}}>
					<View
						style={{
							paddingTop: 16,
							paddingBottom: 1,
						}}>
						<Text
							style={{
								color: "#000000",
								fontSize: 18,
							}}>
							{"Farm Tips"}
						</Text>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							paddingVertical: 12,
						}}>
						<View
							style={{
								backgroundColor: "#0000000D",
								borderRadius: 16,
								paddingBottom: 1,
								marginRight: 8,
							}}>
							<Text
								style={{
									color: "#000000",
									fontSize: 20,
								}}>
								{"🌱"}
							</Text>
						</View>
						<View
							style={{
								flex: 1,
							}}>
							<Text
								style={{
									color: "#000000",
									fontSize: 14,
								}}>
								{"Watering Techniques"}
							</Text>
							<Text
								style={{
									color: "#000000",
									fontSize: 12,
								}}>
								{"Best practices for irrigation."}
							</Text>
						</View>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							paddingVertical: 12,
						}}>
						<View
							style={{
								backgroundColor: "#0000000D",
								borderRadius: 16,
								paddingBottom: 1,
								marginRight: 8,
							}}>
							<Text
								style={{
									color: "#000000",
									fontSize: 20,
								}}>
								{"📅"}
							</Text>
						</View>
						<View
							style={{
								flex: 1,
							}}>
							<Text
								style={{
									color: "#000000",
									fontSize: 14,
								}}>
								{"Crop Rotation"}
							</Text>
							<Text
								style={{
									color: "#000000",
									fontSize: 12,
								}}>
								{"Improve soil health."}
							</Text>
						</View>
					</View>
					<View >
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginVertical: 12,
							}}>
							<View
								style={{
									backgroundColor: "#0000000D",
									borderRadius: 16,
									paddingBottom: 1,
									marginRight: 8,
								}}>
								<Text
									style={{
										color: "#000000",
										fontSize: 20,
									}}>
									{"☀️"}
								</Text>
							</View>
							<View
								style={{
									flex: 1,
								}}>
								<Text
									style={{
										color: "#000000",
										fontSize: 14,
									}}>
									{"Pest Control"}
								</Text>
								<Text
									style={{
										color: "#000000",
										fontSize: 12,
									}}>
									{"Natural methods that work."}
								</Text>
							</View>
						</View>
						<Image
							source = {{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/4Qxx5uBEiw/1reuv35u_expires_30_days.png"}}
							resizeMode = {"stretch"}
							style={{
								height: 1,
							}}
						/>
					</View>
				</View>
				<View
					style={{
						flexDirection: "row",
						backgroundColor: "#FFFFFF",
						shadowColor: "#0000001C",
						shadowOpacity: 0.1,
						shadowOffset: {
						    width: 0,
						    height: 0
						},
						shadowRadius: 6,
						elevation: 6,
					}}>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}