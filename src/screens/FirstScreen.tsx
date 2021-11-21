import { Component } from 'react';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { bindActionCreators, Dispatch } from 'redux';
// import SplashScreen from 'react-native-splash-screen';
import selectAuthState from '../redux/auth/selector';
import { Auth as AuthInterface } from '../interfaces';
import { Auth, Messaging } from '../../config/Firebase';
import { logout } from '../redux/auth/service';

interface Props {
  navigation: any,
  auth: AuthInterface,
  logoutUser: () => {},
}

export class FirstScreen extends Component<Props> {
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const { navigation, auth } = this.props;
    if (auth.isLoggedIn) {
      navigation.dispatch(this.resetAction('HomeScreen'));
    } else {
      navigation.dispatch(this.resetAction('Login'));
    }
  }

  componentDidMount() {
    const { navigation, logoutUser } = this.props;
    Auth.onAuthStateChanged((user: any) => {
      if (!user) {
        logoutUser();
        Messaging.deleteToken();
        navigation.dispatch(this.resetAction('Login'));
      }
    });
  }

  //   componentWillUnmount() {
  //     SplashScreen.hide();
  //   }

  resetAction = (comp: string) => CommonActions.reset({
    index: 1,
    routes: [
      { name: comp },
    ],
  });

  render() {
    return null;
  }
}

const mapStateToProps = (state: any) => ({
  auth: selectAuthState(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logoutUser: bindActionCreators(logout, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FirstScreen);
