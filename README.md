# react-native-button

<!-- badge -->
<!-- endbadge -->

React Native Button

<img src="https://raw.githubusercontent.com/MonkeyKingPlus/react-native-button/master/test/assets/react-native-tab-view-demo-ios.gif"/>
<img src="https://raw.githubusercontent.com/MonkeyKingPlus/react-native-button/master/test/assets/react-native-tab-view-demo-android.gif"/>

# Install
```bash
$ npm install mkp-react-native-button --save
```
# Support
ios/and

# Quick Start
```jsx
import Button from "mkp-react-native-button";

<Button
    styles={buttonStyles}
    disabled={true}>disabled</Button>
    
<Button 
    styles={buttonStyles} 
    onPress={event=>{
        this.message("i am pressed");
    }}>button</Button>
    
<Button 
    styles={buttonStyles} 
    onPress={(event,callback)=>{
        this.message("begin fetch ...");
        setTimeout(()=>{
            this.message("end fetch")
            callback();
        },2000);
    }}>async button</Button>
    
<Button 
    styles={{view:{
        marginTop:5,
        borderRadius:10
    }}}>border readius button</Button>
    
<Button 
    styles={buttonStyles}
    onPress={event=>{
        this.message("image button is pressed")
    }}>
    <Image source={require("./assets/button.png")}/>
</Button>
```