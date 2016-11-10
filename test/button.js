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

	componentWillReceiveProps(nextProps) {
		this.setState(Object.assign({}, this.state, {
			disabled: nextProps.disabled
		}));
	}

	disable(value = true,callback=()=>null) {
		console.log("begin disable ...")
		this.setState(Object.assign({}, this.state, {
			disabled: value
		}),()=>{
			console.log("end disable");
			callback();
		});
	}
	componentWillReceiveProps(nextProps){
		console.log(nextProps);
		console.log(this.state);
	}
	componentDidMount(){
		console.log("=========== did mount");
	}

	render() {
		console.log("render button",this.state.disabled)
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
					let len=this.props.onPress.length;
					if(len<=1){
						this.setState(Object.assign({},this.state,{
							opacity:this.props.activeOpacity,
							activity:true
						}));
					}
				}}
				onPressOut={event=>{
					let len=this.props.onPress.length;
					if(len<=1){
						this.setState(Object.assign({},this.state,{
							opacity:1,
							activity:false
						}));
					}
				}}
				onPress={event=>{
					let len=this.props.onPress.length;
					if(len<=1){
						this.props.onPress(event);
					}
					else{
						this.disable(true,()=>{
							this.props.onPress(event,()=>{
								this.disable(false);
							});
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