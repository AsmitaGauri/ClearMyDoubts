import React, { useEffect, useState } from 'react';
import {
  Button,
  Keyboard,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
} from 'react-native';
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
      <View style={styles.container}>
        {auth.isRegistering && <ActivityIndicator size={80} animating color="#0000ff" style={styles.activityIndicator} />}
        <View pointerEvents={auth.isRegistering ? 'none' : 'auto'} style={auth.isRegistering ? styles.inputs_disabled : null}>
          <Text style={styles.header}>Welcome Onboard</Text>
          <Text style={styles.subHeader}>Let us help you with Forex Signals</Text>
          <TextInput style={styles.input} placeholder="Name" onChangeText={(name) => handleChange('name', name)} onBlur={validateName} />
          {
         errors.name ? <Text style={styles.error}>{errors.name}</Text> : null
        }

          <TextInput style={styles.input} placeholder="Email" onChangeText={(email) => handleChange('email', email)} onBlur={validateEmail} />
          {
          errors.email ? <Text style={styles.error}>{errors.email}</Text> : null
        }

          <View style={styles.singleFeild}>
            <TextInput placeholder="Password" onChangeText={(password) => handleChange('password', password)} secureTextEntry={passwordHidden} onBlur={validatePassword} />
            <Switch onValueChange={toggleSwitchPass} value={!passwordHidden} />

          </View>
          {
          errors.password ? <Text style={styles.error}>{errors.password}</Text> : null
        }

          <View style={styles.singleFeild}>
            <TextInput placeholder="Confirm Password" onChangeText={(confirm) => handleChangeConfirm(confirm)} secureTextEntry={confirmPassHidden} />
            <Switch onValueChange={toggleSwitchConfirm} value={!confirmPassHidden} />
          </View>
          {
          errors.confirmPass ? <Text style={styles.error}>{errors.confirmPass}</Text> : null
        }

          <Button title="Register" disabled={!(isAllValidated.isUsernameValid && isAllValidated.isEmailValid && isAllValidated.isPassValid && isAllValidated.isConfirmPassSame)} onPress={() => handleSubmit()} />
          <Text style={styles.login}>
            Already have an account?
            <Text
              style={styles.loginLink}
              onPress={() => props.navigation.navigate('Login')}
            >
              Sign In
            </Text>
          </Text>
        </View>
      </View>
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
  inputs_disabled: {
    opacity: 0.4,
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
  login: {
    marginTop: 10,
  },
  loginLink: {
    color: 'blue',
  },
  activityIndicator: {
    position: 'absolute',
    display: 'flex',
    alignSelf: 'center',
    zIndex: 999,
  },
});

const mapStateToProps = (state: any) => ({
  auth: selectAuthState(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  registerWithEmailAndPassword: bindActionCreators(registerWithEmailAndPassword, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
