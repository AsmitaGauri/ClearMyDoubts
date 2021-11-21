import React, { useState } from 'react';
import {
  Button,
  Keyboard,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import selectAuthState from '../redux/auth/selector';
import { registerWithEmailAndPassword } from '../redux/auth/service';

const Login = (props: any) => {
  const [userDetails, setuserDetails] = useState<any>({});
  const [passwordHidden, setpasswordHidden] = useState(true);
  const handleChange = (feild: any, val: any) => {
    setuserDetails((prevDetails: any) => ({
      ...prevDetails,
      [feild]: val.trim(),
    }));
  };

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
    if (userDetails.email === 'asmita@gauri.com' && userDetails.password === '123456') {
      props.navigation.dispatch(resetAction);
      // console.log('Logged in!!');
    } else {
      // console.log('Not correct credentials');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          <Text style={styles.header}>Welcome Back</Text>
          <TextInput style={styles.input} placeholder="Email" onChangeText={(email) => handleChange('email', email)} />

          <View style={styles.singleFeild}>
            <TextInput placeholder="Password" onChangeText={(password) => handleChange('password', password)} secureTextEntry={passwordHidden} />
            <Switch onValueChange={toggleSwitchPass} value={!passwordHidden} />
          </View>

          <Button title="Sign In" onPress={() => handleSubmit()} disabled={!(userDetails.email && userDetails.password)} />
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
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  subHeader: {
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    width: '100%',
  },
  error: {
    color: 'red',
  },
  singleFeild: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  signup: {
    marginTop: 10,
  },
  signupLink: {
    color: 'blue',
  },
});

const mapStateToProps = (state: any) => ({
  auth: selectAuthState(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  registerWithEmailAndPassword: bindActionCreators(registerWithEmailAndPassword, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
