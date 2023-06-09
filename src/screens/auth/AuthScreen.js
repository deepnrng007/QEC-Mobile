import React, {useEffect} from 'react';
import {Image, SafeAreaView} from 'react-native';
import {Theme, Dimension, Images} from '../../utils';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signIn, authToken, resetAuth} from '../../redux/actions/AuthAction';
import {TAB_STACK} from '../../navigation/NavigationNames';
import SocialButton from '../../components/SocialButton';

const AuthScreen = props => {
  useEffect(() => {
    if (props.googleSuccess == true) {
      props.authToken();
    }
  }, [props.googleSuccess]);

  useEffect(() => {
    if (props.authSuccess == true) {
      props.resetAuth();
      props.navigation.replace(TAB_STACK);
    }
  }, [props.authSuccess]);

  const signInClicked = () => {
    props.signIn();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={Images.banner} />
      <View style={styles.signInContainer}>
        <SocialButton signIn={signInClicked} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.white,
  },
  image: {
    width: Dimension.screenWidth / 1.5,
    resizeMode: 'contain',
    marginBottom: Dimension.dynamicSize(20),
  },
  signInContainer: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: Dimension.screenHeight / 5,
  },
});

const mapStateToProps = state => {
  return {
    googleSuccess: state.AuthReducer.googleSuccess,
    authSuccess: state.AuthReducer.authSuccess,
    error: state.AuthReducer.error,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      signIn,
      authToken,
      resetAuth,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
