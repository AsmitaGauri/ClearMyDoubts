import React, { useState, useEffect } from 'react';
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import selectAuthState from '../redux/auth/selector';
import { signInWithEmailAndPassword } from '../redux/auth/service';

const Login = (props: any) => {
  const { auth } = props;
  const [userDetails, setuserDetails] = useState<any>({});
  const [passwordHidden, setpasswordHidden] = useState(true);
  const handleChange = (feild: any, val: any) => {
    setuserDetails((prevDetails: any) => ({
      ...prevDetails,
      [feild]: val.trim(),
    }));
  };

  useEffect(() => {
    if (auth.isLoggedIn) {
      props.navigation.dispatch(resetAction);
    }
  }, [auth.isLoggedIn]);

  const toggleSwitchPass = () => {
    setpasswordHidden(!passwordHidden);
  };

  const resetAction = CommonActions.reset({
    index: 1,
    routes: [
      { name: 'HomeScreen' },
    ],
  });

  const handleSubmit = () => {
    if (userDetails.email && userDetails.password) {
      props.signInWithEmailAndPassword(userDetails.email, userDetails.password);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={styles.container}>
        {auth.isLoggingIn && <ActivityIndicator size={80} animating color="black" style={styles.activityIndicator} />}
        <View style={styles.container}>

          <View style={styles.header}>
            <Text style={styles.headerText}>Welcome Back!</Text>
          </View>

          <Animatable.View pointerEvents={auth.isLoggingIn ? 'none' : 'auto'} style={auth.isLoggingIn ? styles.inputs_disabled : styles.footer}>
            <Text style={styles.error}>{auth.error.message}</Text>
            <View style={styles.inputFeild}>
              <FontAwesome
                name="envelope-o"
                color="black"
                size={20}
              />
              <TextInput placeholderTextColor="#A9A9A9" placeholder="Email" onChangeText={(email) => handleChange('email', email)} style={styles.placeholder} />
            </View>
            <View style={styles.singleFeild}>
              <View style={styles.inputFeildPassword}>
                <FontAwesome
                  name="lock"
                  color="black"
                  size={30}
                />
                <TextInput placeholderTextColor="#A9A9A9" placeholder="Password" onChangeText={(password) => handleChange('password', password)} secureTextEntry={passwordHidden} style={styles.placeholder} />
              </View>
              {
                passwordHidden ? <Feather name="eye-off" size={20} onPress={toggleSwitchPass} />
                  : <Feather name="eye" size={20} onPress={toggleSwitchPass} />
              }
            </View>

            <Button title="Sign In" onPress={() => handleSubmit()} disabled={!(userDetails.email && userDetails.password)} color="black" />
            <Text style={styles.signup}>
              Dont have an account?
              <Text
                style={styles.signupLink}
                onPress={() => props.navigation.navigate('Register')}
              >
                {' '}
                Register
              </Text>
            </Text>
          </Animatable.View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>

  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Comfortaa-Medium',
    flexGrow: 1,
    backgroundColor: '#000',
  },
  inputs_disabled: {
    opacity: 0.4,
    flex: 0.7,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  header: {
    justifyContent: 'flex-end',
    paddingTop: 100,
    fontFamily: 'Comfortaa-Medium',
    color: 'white',
    paddingHorizontal: 30,
    paddingBottom: 100,
    fontSize: 30,
  },
  headerText: {
    fontSize: 30,
    paddingVertical: 10,
    color: 'white',
    fontFamily: 'Comfortaa-Medium',
  },
  input: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    width: '100%',
    fontFamily: 'Comfortaa-Medium',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontFamily: 'Comfortaa-Medium',
  },
  singleFeild: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginBottom: '10%',
    fontFamily: 'Comfortaa-Medium',
  },
  inputFeild: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    marginBottom: '10%',
    fontFamily: 'Comfortaa-Medium',
  },
  inputFeildPassword: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '80%',
    fontFamily: 'Comfortaa-Medium',
  },
  signup: {
    marginTop: 10,
    fontFamily: 'Comfortaa-Medium',
  },
  placeholder: {
    fontSize: 16,
    marginLeft: 10,
    color: 'black',
    width: '100%',
    fontFamily: 'Comfortaa-Medium',
  },
  signupLink: {
    color: 'blue',
    fontFamily: 'Comfortaa-Medium',
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  footer: {
    flex: 1.5,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },

});

const mapStateToProps = (state: any) => ({
  auth: selectAuthState(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signInWithEmailAndPassword: bindActionCreators(signInWithEmailAndPassword, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
