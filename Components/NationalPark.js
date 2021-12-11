import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from 'react-native-check-box';
import { FiraSans_400Regular } from '@expo-google-fonts/fira-sans';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const NationalPark = (props) => {
	const { parkName, park, onToggle } = props;
	let [fontsLoaded, error] = useFonts({
		FiraSans_400Regular,
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<View style={styles.item}>
			<View style={styles.checkboxContainer}>
				<CheckBox onClick={onToggle} isChecked={park?.hasVisited} />
				<Text numberOfLines={3} style={styles.itemText}>
					{parkName}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	item: {
		backgroundColor: '#e97451',
		opacity: 0.8,
		padding: 10,
		borderRadius: 8,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 15,
		maxWidth: '100%',
		flex: 1,
		borderColor: 'white',
		borderWidth: 1.5,
	},
	itemText: {
		width: '80%',
		paddingLeft: 20,
		fontFamily: 'FiraSans_400Regular',
		fontWeight: 'bold',
		fontSize: 12,
	},
	checkboxContainer: {
		flexDirection: 'row',
		marginBottom: 10,
		alignItems: 'center',
		flexWrap: 'wrap',
	},
});

export default NationalPark;
