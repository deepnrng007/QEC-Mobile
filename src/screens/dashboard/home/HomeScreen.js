import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import ProductCard from '../../../components/ProductCard';
import {ALL_STACK, AUTH, REPORTS} from '../../../navigation/NavigationNames';
import styles from './HomeScreen.style';
import Toolbar from '../../../components/common/Toolbar';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  getDashBoard,
  resetDashboard,
} from '../../../redux/actions/ProductAction';
import CustomSearchBar from '../../../components/CustomSearchBar';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Storage, Strings} from '../../../utils';
import EmptyDataScreen from '../../../components/common/EmptyData';
import CustomAlert from '../../../components/CustomAlert';

const HomeScreen = props => {
  const [filterdData, setFilteredData] = useState(props.dashboardData);
  const [isAlertVisible, setVisibility] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getData();
    });
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      filterList(searchTerm);
    } else {
      setFilteredData(props.dashboardData);
    }
  }, [props.dashboardData]);

  useEffect(() => {
    if (!props.isProductSyncing) {
      getData();
    }
  }, [props.isProductSyncing]);

  const getData = async () => {
    props.getDashBoard();
  };

  const renderItem = ({item}) => (
    <ProductCard
      itemData={item}
      onPress={() => {
        props.navigation.push(ALL_STACK, {
          screen: REPORTS,
          params: {
            id: item.productId,
          },
        });
      }}
    />
  );

  const filterList = text => {
    setFilteredData(
      props.dashboardData.filter(item => {
        return item.projectName.toLowerCase().includes(text.toLowerCase());
      }),
    );
  };

  const logoutClicked = async () => {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        await GoogleSignin.signOut();
      }
    } catch (e) {
      console.log(e);
    }
    props.resetDashboard();
    await Storage.clear();
    props.navigation.reset({
      index: 0,
      routes: [{name: AUTH}],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Toolbar
        title={Strings.names.dashboard}
        showLogoutAction
        onLogoutPressed={() => setVisibility(true)}
      />

      <CustomAlert
        isVisible={isAlertVisible}
        onPress={logoutClicked}
        setModalVisibility={() => setVisibility(false)}
        titleText={Strings.text.logout_caption}
      />

      <CustomSearchBar
        ontextChange={text => {
          setSearchTerm(text);
          filterList(text);
        }}
      />

      {props.isProductSyncing ? (
        <Text
          style={
            styles.syncText
          }>{`${props.syncProductName} ${Strings.text.product_is_syncing}`}</Text>
      ) : null}

      {props.loading && props.dashboardData.length === 0 ? (
        <ActivityIndicator
          style={{
            justifyContent: 'center',
            flex: 1,
            alignSelf: 'center',
          }}
        />
      ) : props.dashboardData.length > 0 ? (
        <View style={styles.listWrapper}>
          <FlatList
            data={filterdData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={styles.listStyle}
          />
        </View>
      ) : (
        <EmptyDataScreen message={Strings.text.no_data_found} />
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    dashboardData: state.ProductReducer.dashboardData,
    loading: state.ProductReducer.loading,
    error: state.ProductReducer.error,
    isProductSyncing: state.ProductReducer.syncLoading,
    syncProductName: state.ProductReducer.syncProductName,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getDashBoard,
      resetDashboard,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
