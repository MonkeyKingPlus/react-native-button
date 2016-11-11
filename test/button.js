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
			disabled: props.disabled,
			opacity: 1,
			activity: false
		};
		this.async=props.onPress.length>1;
		this.asyncRunning=false;
	}

	static propTypes = {
		children: PropTypes.any.isRequired,
		styles: PropTypes.object,
		disabled: PropTypes.bool,
		onPress: PropTypes.func,
		activeOpacity: PropTypes.number
	}
	static defaultProps = {
		styles: {
			view: {},
			text: {},
			disabledView: {},
			disabledText: {}
		},
		disabled: false,
		activeOpacity: 0.2,
		onPress: ()=>null
	}


	disable(value = true, callback = ()=>null) {
		this.setState(Object.assign({}, this.state, {
			disabled: value
		}), callback);
	}


	componentWillReceiveProps(nextProps) {
		this.setState(Object.assign({}, this.state, {
			disabled: nextProps.disabled
		}));
	}

	shouldComponentUpdate(){
		if(this.asyncRunning){
			return false;
		}
		return true;
	}

	render() {
		let viewStyle = [styles.view, this.props.styles.view, {
			opacity: this.state.opacity
		}];
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
				onPressIn={event=>{
					this.setState(Object.assign({},this.state,{
						opacity:this.props.activeOpacity,
						activity:true
					}));
				}}
				onPressOut={event=>{
					this.setState(Object.assign({},this.state,{
						opacity:1,
						activity:false
					}),()=>{
						if(!this.async){
							this.props.onPress(event);
						}
						else{
							this.disable(true,()=>{
								this.asyncRunning=true
								this.props.onPress(event,()=>{
									this.asyncRunning=false;
									this.disable(false);
								});
							});

						}
					});
				}}>

				<View style={viewStyle}>
					{typeof this.props.children === "string" && <Text style={textStyle}>{this.props.children}</Text>}
					{typeof this.props.children !== "string" && this.props.children}
				</View>
			</TouchableWithoutFeedback>
		);
	}
}