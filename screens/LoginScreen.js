import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
  Dimensions,
  Keyboard,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Icon } from 'native-base';

const SCREEN_HEIGHT = Dimensions.get('screen').height;

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderText: 'Enter your mobile number',
      mobilenumber: '',
    };
  }
  componentWillMount() {
    this.loginHeight = new Animated.Value(150);

    this.keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow,
    );
    this.keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide,
    );

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardWillShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardWillHide,
    );

    this.keyboardHeight = new Animated.Value(0);
    this.forwardArrowopacity = new Animated.Value(0);
    this.borderBottomWidth = new Animated.Value(0);
  }
  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  keyboardWillShow = event => {
    let duration = null;
    if (Platform.OS === 'android') {
      duration = 100;
    } else {
      duration = event.duration;
    }
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: duration + 100,
        toValue: event.endCoordinates.height + 10,
      }),
      Animated.timing(this.forwardArrowopacity, {
        duration: duration,
        toValue: 1,
      }),
      Animated.timing(this.borderBottomWidth, {
        duration: duration,
        toValue: 1,
      }),
    ]).start();
  };
  keyboardWillHide = event => {
    let duration = null;
    if (Platform.OS === 'android') {
      duration = 100;
    } else {
      duration = event.duration;
    }
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: duration + 100,
        toValue: 0,
      }),
      Animated.timing(this.forwardArrowopacity, {
        duration: duration,
        toValue: 0,
      }),
      Animated.timing(this.borderBottomWidth, {
        duration: duration,
        toValue: 0,
      }),
    ]).start();
  };
  increaseHeightOfLogin = () => {
    this.setState({
      placeholderText: '08219554256',
    });
    Animated.timing(this.loginHeight, {
      toValue: SCREEN_HEIGHT,
      duration: 500,
    }).start(() => {
      this.refs.textInputMobile.focus();
    });
  };

  decreaseHeightOfLogin = () => {
    this.setState({
      mobilenumber: '',
      placeholderText: 'Enter your mobile number',
    });
    Keyboard.dismiss();
    Animated.timing(this.loginHeight, {
      toValue: 150,
      duration: 500,
    }).start();
  };

  render() {
    const headerTextOpacity = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [1, 0],
    });
    const marginTop = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [25, 100],
    });

    const headerBackArrowOpacity = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [0, 1],
    });

    const titleTextBottom = this.loginHeight.interpolate({
      inputRange: [150, 400, SCREEN_HEIGHT],
      outputRange: [0, 0, 100],
    });
    const titleTextLeft = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [100, 25],
    });
    const titleTextOpacity = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [0, 1],
    });

    return (
      <View style={{ flex: 1 }}>
        <Animated.View
          style={{
            position: 'absolute',
            height: 60,
            width: 60,
            top: 60,
            left: 25,
            zIndex: 100,
            opacity: headerBackArrowOpacity,
          }}>
          <TouchableOpacity onPress={() => this.decreaseHeightOfLogin()}>
            <Icon
              name="md-arrow-back"
              style={{
                color: 'black',
              }}
            />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            height: 60,
            width: 60,
            right: 10,
            bottom: this.keyboardHeight,
            opacity: this.forwardArrowopacity,
            zIndex: 100,
            backgroundColor: '#54575e',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
          }}>
          <TouchableOpacity>
            <Icon name="md-arrow-forward" style={{ color: '#fff' }} />
          </TouchableOpacity>
        </Animated.View>
        <ImageBackground
          source={require('../Images/login_bg.jpg')}
          style={{ flex: 1 }}>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Animatable.View
              animation="zoomIn"
              iterationCount={1}
              style={{
                backgroundColor: '#fff',
                height: 100,
                width: 100,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontWeight: 'bold', fontSize: 26 }}>UBER</Text>
            </Animatable.View>
          </View>
          <Animatable.View animation="slideInUp" iterationCount={1}>
            <Animated.View
              style={{ height: this.loginHeight, backgroundColor: '#fff' }}>
              <Animated.View
                style={{
                  alignItems: 'flex-start',
                  marginTop: marginTop,
                  opacity: headerTextOpacity,
                  paddingHorizontal: 25,
                }}>
                <Text style={{ fontSize: 24 }}>Get moving with Uber</Text>
              </Animated.View>
              <TouchableOpacity onPress={() => this.increaseHeightOfLogin()}>
                <Animated.View
                  style={{
                    marginTop: marginTop,
                    paddingHorizontal: 25,
                    flexDirection: 'row',
                  }}>
                  <Animated.Text
                    style={{
                      fontSize: 24,
                      color: 'gray',
                      position: 'absolute',
                      zIndex: 100,
                      bottom: titleTextBottom,
                      left: titleTextLeft,
                      opacity: titleTextOpacity,
                    }}>
                    Enter Your Mobile Number
                  </Animated.Text>
                  <Image
                    source={require('../Images/india.png')}
                    style={{ height: 24, width: 24, resizeMode: 'contain' }}
                  />
                  <Animated.View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      borderBottomWidth: this.borderBottomWidth,
                    }}
                    pointerEvents="none">
                    <Text style={{ paddingHorizontal: 10, fontSize: 20 }}>
                      +91
                    </Text>
                    <TextInput
                      keyboardType="numeric"
                      ref="textInputMobile"
                      style={{ flex: 1, fontSize: 20 }}
                      value={this.state.mobilenumber}
                      placeholder={this.state.placeholderText}
                      underlineColorAndroid="transparent"
                      onChangeText={mobilenumber =>
                        this.setState({
                          mobilenumber: mobilenumber,
                        })
                      }
                    />
                  </Animated.View>
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
            <View
              style={{
                height: 70,
                backgroundColor: '#fff',
                alignItems: 'flex-start',
                justifyContent: 'center',
                borderTopColor: '#e8e8ec',
                borderTopWidth: 1,
                paddingHorizontal: 25,
              }}>
              <Text style={{ color: '#5a7fdf', fontWeight: 'bold' }}>
                Or, Connect using social account
              </Text>
            </View>
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
