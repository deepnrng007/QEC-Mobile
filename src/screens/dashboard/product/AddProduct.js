import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NegativeButton from '../../../components/common/NegativeButton';
import PositiveButton from '../../../components/common/PositiveButton';
import Toolbar from '../../../components/common/Toolbar';
import QECTextInput from '../../../components/QECTextInput';
import {Dimension, StaticData, Strings, Theme, Utils} from '../../../utils';
import {addProduct, resetProducts} from '../../../redux/actions/ProductAction';
import {SELECT_PROJECT} from '../../../navigation/NavigationNames';
import FormDropdown from '../../../components/common/FormDropdown';
import Loader from '../../../components/Loader';
import CustomAlert from '../../../components/CustomAlert';

const AddProduct = ({
  navigation,
  addProduct,
  addProductResponse,
  loading,
  resetProducts,
}) => {
  const [productName, setProductName] = useState('');
  const [jiraUrl, setJiraUrl] = useState('');
  const [username, setUsername] = useState('');
  const [apiKey, setAPIKey] = useState('');
  const [productManager, setProductManager] = useState('');
  const [showError, setShowError] = useState(false);
  const [isAlertVisible, setAlertVisibility] = useState(false);

  const closeScreen = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (addProductResponse != null) {
      navigation.replace(SELECT_PROJECT);
    }
  }, [addProductResponse]);

  const addProductClicked = () => {
    if (
      productName.length == 0 ||
      jiraUrl.length == 0 ||
      username.length == 0 ||
      apiKey.length == 0 ||
      productManager.length == 0
    ) {
      setShowError(true);
    } else if (!Utils.isValidURL(jiraUrl)) {
      setShowError(true);
    } else {
      setShowError(false);
      addProduct(productName, jiraUrl, username, apiKey, productManager);
    }
  };

  const onBackPressed = () => {
    if (
      productName.length > 0 ||
      jiraUrl.length > 0 ||
      username.length > 0 ||
      apiKey.length > 0 ||
      productManager.length > 0
    ) {
      setAlertVisibility(true);
    } else {
      closeScreen();
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{flex: 1}}>
        <Toolbar
          title={Strings.names.add_product}
          showBack={true}
          onBackPressed={() => onBackPressed()}
        />
        <CustomAlert
          isVisible={isAlertVisible}
          onPress={() => {
            resetProducts();
            closeScreen();
          }}
          setModalVisibility={() => setAlertVisibility(false)}
          titleText={Strings.text.changes_lost_caption}
        />

        <Loader loading={loading} />

        <KeyboardAvoidingView
          style={{flex: 1}}
          {...(Platform.OS === 'ios' && {behavior: 'padding'})}
          enabled>
          <ScrollView style={styles.container}>
            <QECTextInput
              required={true}
              title={Strings.names.product_name}
              placeholder={Strings.placeholder.product_name}
              showError={showError}
              value={productName}
              onChange={setProductName}
              autoCapitalize="sentences"
            />
            <QECTextInput
              required={true}
              title={Strings.names.jira_url}
              placeholder={Strings.placeholder.jira_url}
              keyboardType="url"
              showError={showError}
              value={jiraUrl}
              onChange={setJiraUrl}
            />
            <QECTextInput
              required={true}
              title={Strings.names.username}
              placeholder={Strings.placeholder.username}
              showError={showError}
              value={username}
              onChange={setUsername}
            />
            <QECTextInput
              required={true}
              title={Strings.names.api_key}
              placeholder={Strings.placeholder.api_key}
              showError={showError}
              value={apiKey}
              onChange={setAPIKey}
            />
            <FormDropdown
              title={Strings.names.product_manager}
              placeholder={Strings.placeholder.product_manager}
              list={StaticData.productManagers}
              value={productManager}
              setValue={setProductManager}
              showError={showError}
            />
          </ScrollView>
        </KeyboardAvoidingView>
        <View
          style={[
            styles.container,
            {
              flexDirection: 'row',
              marginBottom: Dimension.dynamicSize(24),
              justifyContent: 'flex-end',
            },
          ]}>
          <NegativeButton
            title={Strings.names.close}
            onPressed={() => closeScreen()}
          />
          <PositiveButton
            title={Strings.names.add}
            style={{marginStart: Dimension.dynamicSize(24)}}
            onPressed={() => addProductClicked()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  container: {
    marginHorizontal: Dimension.dynamicSize(24),
  },
});

const mapStateToProps = state => {
  return {
    addProductResponse: state.ProductReducer.addProductResponse,
    error: state.ProductReducer.error,
    loading: state.ProductReducer.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addProduct,
      resetProducts,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
