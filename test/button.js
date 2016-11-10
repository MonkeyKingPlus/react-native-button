import React, {Component, PropTypes} from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableWithoutFeedback,
	TouchableNativeFeedback,
	TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
	view: {
		paddingTop: 10,
		paddingBottom: 10,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "green",
		shadowColor: "#000000",
		shadowOpacity: 0.2,
		shadowRadius: 1,
		shadowOffset: {
			width: 0,
			height: 2
		},
		flexDirection: "row"
	},
	disabledView: {
		backgroundColor: "gray"
	},
	text: {
		color: "white",
		textAlign: "center",
		flex: 1
	},
	disabledText: {}
});

export default class Button extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: props.disabled
		};
	}

	static propTypes = {
		children: PropTypes.any.isRequired,
		styles: PropTypes.object,
		disabled: PropTypes.bool,
		onPress: PropTypes.func
	}
	static defaultProps = {
		styles: {
			view: {},
			text: {},
			disabledView: {},
			disabledText: {}
		},
		disabled: false,
		onPress: ()=>null
	}

	componentWillReceiveProps(nextProps) {
		this.setState(Object.assign({}, this.state, {
			disabled: nextProps.disabled
		}));
	}

	disable(value=true){
		this.setState(Object.assign({},this.state,{
			disabled:value
		}));
	}

	render() {
		let viewStyle = [styles.view, this.props.styles.view];
		let textStyle = [styles.text, this.props.styles.text];
		if (this.state.disabled) {
			viewStyle.push(styles.disabledView);
			viewStyle.push(this.props.styles.disabledView);
			textStyle.push(styles.disabledText);
			textStyle.push(this.props.styles.disabledText);
		}
		return (
			<TouchableWithoutFeedback
				disabled={this.state.disabled}
				onPress={event=>{
					let len=this.props.onPress.length;
					if(len<=1){
						this.props.onPress(event);
					}
					else{
						this.disable();
						this.props.onPress(event,()=>{
							this.disable(false);
						});
					}
				}}>
				<View style={viewStyle}>
					<Text style={textStyle}>{this.props.children}</Text>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}