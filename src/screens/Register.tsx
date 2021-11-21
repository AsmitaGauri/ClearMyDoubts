import React, { useEffect, useState } from 'react';
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import selectAuthState from '../redux/auth/selector';
import { registerWithEmailAndPassword } from '../redux/auth/service';

const Register = (props: any) => {
  const { auth } = props;
  const [userDetails, setuserDetails] = useState<any>({});
  const [isAllValidated, setisAllValidated] = useState({
    isUsernameValid: false, isEmailValid: false, isPassValid: false, isConfirmPassSame: false,
  });
  const [errors, seterrors] = useState<any>({});
  const [passwordHidden, setpasswordHidden] = useState(true);
  const [confirmPassHidden, setconfirmPassHidden] = useState(true);

  useEffect(() => {
    if (auth.isLoggedIn) props.navigation.navigate('HomeScreen');
  }, [auth.isLoggedIn]);

  const handleChange = (feild:any, val:any) => {
    setuserDetails((prevDetails:any) => ({
      ...prevDetails,
      [feild]: val.trim(),
    }));
  };

  const validateName = () => {
    if (userDetails.name && userDetails.name.length >= 4) {
      seterrors({
        ...errors,
        name: '',
      });
      setisAllValidated({
        ...isAllValidated,
        isUsernameValid: true,
      });
    } else {
      seterrors({
        ...errors,
        name: 'Username must be 4 char long',
      });
      setisAllValidated({
        ...isAllValidated,
        isUsernameValid: false,
      });
    }
  };

  const validateEmail = () => {
    // eslint-disable-next-line
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(userDetails.email) === false) {
      seterrors({
        ...errors,
        email: 'Enter a valid email',
      });
      setisAllValidated({
        ...isAllValidated,
        isEmailValid: false,
      });
    } else {
      seterrors({
        ...errors,
        email: '',
      });
      setisAllValidated({
        ...isAllValidated,
        isEmailValid: true,
      });
    }
  };

  const validatePassword = () => {
    if (userDetails.password && userDetails.password.length >= 8
       && userDetails.password.trim().length <= 15) {
      // Check of of both digit and letters will make sure it is alphanumeric
      // To check if the input contains a digit
      if (/(?=.*\d)/.test(userDetails.password) === true) {
        // To check if the input conains an upper case letter
        if (/(?=.*[A-Z])/.test(userDetails.password) === true) {
          // To check if the input contains a lower case letter
          if (/(?=.*[a-z])/.test(userDetails.passwordal) === true) {
            // to check if the input contains a symbol
            if (/[-+_!@#$%^&*.,?]/.test(userDetails.password) === true) {
              seterrors({
                ...errors,
                password: '',
              });
              setisAllValidated({
                ...isAllValidated,
                isPassValid: true,
              });
              return;
            }
            seterrors({
              ...errors,
              password: 'Must contain a symbol',
            });
            setisAllValidated({
              ...isAllValidated,
              isPassValid: false,
            });
          } else {
            seterrors({
              ...errors,
              password: 'Must contain a smaller letter',
            });
            setisAllValidated({
              ...isAllValidated,
              isPassValid: false,
            });
          }
        } else {
          seterrors({
            ...errors,
            password: 'Password must have an uppercase letter',
          });
          setisAllValidated({
            ...isAllValidated,
            isPassValid: false,
          });
        }
      } else {
        seterrors({
          ...errors,
          password: 'Password must contain both letters and numbers',
        });
        setisAllValidated({
          ...isAllValidated,
          isPassValid: false,
        });
      }
    } else {
      seterrors({
        ...errors,
        password: 'Password must be of 8-15 chracters',
      });
      setisAllValidated({
        ...isAllValidated,
        isPassValid: false,
      });
    }
  };

  const handleChangeConfirm = (val:any) => {
    if (userDetails.password === undefined) {
      seterrors({
        ...errors,
        confirmPass: 'Password should be entered first',
      });
      setisAllValidated({
        ...isAllValidated,
        isConfirmPassSame: false,
      });
      return;
    }
    if (userDetails.password !== val) {
      seterrors({
        ...errors,
        confirmPass: 'Confirm password should be same as password',
      });
      setisAllValidated({
        ...isAllValidated,
        isConfirmPassSame: false,
      });
      return;
    }
    seterrors({
      ...errors,
      confirmPass: '',
    });
    setisAllValidated({
      ...isAllValidated,
      isConfirmPassSame: true,
    });
  };

  const toggleSwitchPass = () => {
    setpasswordHidden(!passwordHidden);
  };

  const toggleSwitchConfirm = () => {
    setconfirmPassHidden(!confirmPassHidden);
  };

  const handleSubmit = () => {
    if (isAllValidated.isUsernameValid
        && isAllValidated.isEmailValid
        && isAllValidated.isPassValid
        && isAllValidated.isConfirmPassSame) {
      props.registerWithEmailAndPassword(userDetails.email, userDetails.password);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.container}>
          <View style={styles.headerMain}>
            <Text style={styles.header}>Welcome Onboard!</Text>
            <Text style={styles.subHeader}>Let us help you with Clearing your doubts</Text>
          </View>
          {auth.isRegistering && <ActivityIndicator size={80} animating color="white" style={styles.activityIndicator} />}
          <Animatable.View
            animation="fadeInUpBig"
            pointerEvents={auth.isRegistering ? 'none' : 'auto'}
            style={auth.isRegistering ? styles.inputs_disabled : styles.footer}
          >
            <View style={styles.feild}>
              <View style={styles.inputFeild}>
                <FontAwesome
                  name="user-o"
                  color="black"
                  size={20}
                />
                <TextInput placeholderTextColor="#A9A9A9" placeholder="Name" onChangeText={(name) => handleChange('name', name)} onBlur={validateName} style={styles.placeholder} />
              </View>

              {
        errors.name ? <Text style={styles.error}>{errors.name}</Text> : null
        }
            </View>

            <View style={styles.inputFeild}>
              <FontAwesome
                name="envelope-o"
                color="black"
                size={20}
              />
              <TextInput placeholderTextColor="#A9A9A9" placeholder="Email" onChangeText={(email) => handleChange('email', email)} onBlur={validateEmail} style={styles.placeholder} />
            </View>

            {
        errors.email ? <Text style={styles.error}>{errors.email}</Text> : null
      }

            <View style={styles.singleFeild}>
              <View style={styles.passwordFeilds}>
                <FontAwesome
                  name="lock"
                  color="black"
                  size={30}
                />
                <TextInput placeholderTextColor="#A9A9A9" placeholder="Password" onChangeText={(password) => handleChange('password', password)} secureTextEntry={passwordHidden} onBlur={validatePassword} style={styles.placeholderPassword} />
              </View>

              {
            passwordHidden ? <Feather name="eye-off" size={20} onPress={toggleSwitchPass} />
              : <Feather name="eye" size={20} onPress={toggleSwitchPass} />
          }

            </View>
            {
        errors.password ? <Text style={styles.error}>{errors.password}</Text> : null
      }

            <View style={styles.singleFeild}>
              <View style={styles.passwordFeilds}>
                <FontAwesome
                  name="check"
                  color="black"
                  size={20}
                />
                <TextInput placeholderTextColor="#A9A9A9" placeholder="Confirm Password" onChangeText={(confirm) => handleChangeConfirm(confirm)} secureTextEntry={confirmPassHidden} style={styles.placeholderPassword} />
              </View>

              {
            confirmPassHidden ? <Feather name="eye-off" size={20} onPress={toggleSwitchConfirm} />
              : <Feather name="eye" size={20} onPress={toggleSwitchConfirm} />
          }

              {/* <Switch onValueChange={toggleSwitchConfirm} value={!confirmPassHidden} /> */}
            </View>
            {
        errors.confirmPass ? <Text style={styles.error}>{errors.confirmPass}</Text> : null
      }
            <View style={styles.register}>
              <Button title="Register" disabled={!(isAllValidated.isUsernameValid && isAllValidated.isEmailValid && isAllValidated.isPassValid && isAllValidated.isConfirmPassSame)} onPress={() => handleSubmit()} color="black" />
            </View>
            <Text style={styles.login}>
              Already have an account?
              <Text
                style={styles.loginLink}
                onPress={() => props.navigation.navigate('Login')}
              >
                {' '}
                Sign In
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
    flexGrow: 1,
    backgroundColor: 'black',
  },
  inputs_disabled: {
    opacity: 0.4,
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  headerMain: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  subHeader: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Comfortaa-Medium',
    marginBottom: 20,
  },
  footer: {
    flex: 1.5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  header: {
    fontSize: 30,
    paddingVertical: 10,
    color: 'white',
    fontFamily: 'Comfortaa-Bold',
  },
  error: {
    color: 'red',
    fontFamily: 'Comfortaa-Medium',
  },
  placeholder: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
    fontFamily: 'Comfortaa-Medium',
  },
  placeholderPassword: {
    fontSize: 16,
    marginLeft: 10,
    flex: 0.8,
    fontFamily: 'Comfortaa-Medium',
  },
  feild: {
    marginBottom: '2%',
  },
  topFeildBox: {
    marginBottom: '7%',
  },
  inputFeild: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    marginBottom: '5%',
    fontFamily: 'Comfortaa-Medium',
  },
  passwordFeilds: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  singleFeild: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginBottom: '5%',
    marginTop: '2%',
  },
  login: {
    marginTop: 10,
    fontFamily: 'Comfortaa-Medium',
  },
  loginLink: {
    color: 'blue',
    marginBottom: '3%',
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
  register: {
    marginTop: '5%',
  },
});

const mapStateToProps = (state: any) => ({
  auth: selectAuthState(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  registerWithEmailAndPassword: bindActionCreators(registerWithEmailAndPassword, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
