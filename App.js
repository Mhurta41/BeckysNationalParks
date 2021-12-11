import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	TouchableOpacity,
	Keyboard,
	ScrollView,
	SafeAreaView,
	Image,
} from 'react-native';
import mountain from './Images/mountain.jpg';
import NationalPark from './Components/NationalPark';
import listOfParks from './AllNationalParks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Shrikhand_400Regular } from '@expo-google-fonts/shrikhand';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

// background image
const background = mountain;
// async storage key
const NATIONAL_PARKS_KEY = 'MY_NATIONAL_PARKS';

export default function App() {
	// all national parks array
	const [parkItems, setParkItems] = useState([]);

	// state names font
	let [fontsLoaded, error] = useFonts({
		Shrikhand_400Regular,
	});

	// save any changes to individual national park items
	const saveParkItemsToStorage = async (newParkItems) => {
		try {
			await AsyncStorage.setItem(
				NATIONAL_PARKS_KEY,
				JSON.stringify({
					...newParkItems,
				})
			);
		} catch (err) {
			alert(err);
		}
	};

	// saves updated/checked national park item
	const saveItem = async () => {
		try {
			await AsyncStorage.setItem(
				NATIONAL_PARKS_KEY,
				JSON.stringify({
					...parkItems,
					[park]: { hasVisited: false },
				})
			);
		} catch (err) {
			alert(err);
		}
	};

	// loads all national park items & changes from local storage
	const load = async () => {
		try {
			let parks = await AsyncStorage.getItem(NATIONAL_PARKS_KEY);

			if (parks) {
				let parksUnstringified = JSON.parse(parks);
				setParkItems(parksUnstringified);
			} else {
				for (const parkName of listOfParks) {
					newParkItems[parkName] = { hasVisited: false };
				}
				saveParkItemsToStorage(newParkItems);
				setParkItems(newParkItems);
			}
		} catch (err) {
			alert(err);
		}
	};

	useEffect(() => {
		load();
	}, []);

	// needed to make fonts work on react native
	if (!fontsLoaded) {
		return <AppLoading />;
	}

	// handles the checkbox on each national park item
	const togglePark = (parkName) => {
		const newParkItems = {
			...parkItems,
			[parkName]: { hasVisited: !parkItems[parkName]?.hasVisited },
		};
		// save  to state
		setParkItems(newParkItems);

		// save onto async storage
		saveParkItemsToStorage(newParkItems);
	};

	return (
		<ImageBackground
			source={background}
			resizeMode='cover'
			style={styles.container}>
			<SafeAreaView>
				<ScrollView
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}>
					<Image source={require('./Images/Logo.png')} style={styles.logo} />
					<View style={styles.tasksWrapper}>
						<View style={styles.items}>
							{Object.keys(listOfParks).map((stateName) => {
								const currentParks = listOfParks[stateName];
								return [
									<Text style={styles.stateName}>{stateName}</Text>,
									currentParks.map((parkName) => {
										return (
											<TouchableOpacity
												key={`${parkName}`}
												onPress={() => togglePark(parkName)}>
												<NationalPark
													park={parkItems[parkName]}
													parkName={parkName}
													onToggle={() => togglePark(parkName)}
												/>
											</TouchableOpacity>
										);
									}),
								];
							})}
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 50,
	},
	tasksWrapper: {
		paddingTop: 5,
		paddingHorizontal: 10,
		opacity: 0.9,
		borderRadius: 8,
		width: '100%',
		paddingBottom: 15,
	},
	items: {
		marginTop: 15,
	},
	logo: {
		flex: 1,
		width: 325,
		height: 171,
		resizeMode: 'contain',
		marginBottom: -25,
		marginLeft: 20,
	},
	stateName: {
		lineHeight: 25,
		fontFamily: 'Shrikhand_400Regular',
		fontSize: 18,
		marginLeft: 10,
		marginBottom: 2,
		color: 'white',
	},
});
