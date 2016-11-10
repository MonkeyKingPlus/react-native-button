import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native';
import Button from "./button";

const styles=StyleSheet.create({
	view:{
		justifyContent:"center",
		alignItems:"center",
		flex:1
	}
});
const buttonStyles=StyleSheet.create({
	view:{
		marginTop:5
	}
});

export default class APP extends Component{

	render(){
		return (
			<View style={styles.view}>
				<Button
					onPress={event=>{

					}}
					styles={buttonStyles}
						disabled={true}>disabled</Button>
				<Button styles={buttonStyles}>button</Button>
				<Button styles={buttonStyles}>async button</Button>
				<Button styles={buttonStyles}>image button</Button>
			</View>
		);
	}
}