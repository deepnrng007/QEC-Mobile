import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toolbar from '../../../components/common/Toolbar';
import ProductScreenStyles from './ProductScreen.styles';
import FAB from '../../../components/common/FAB';
import PlusIcon from '../../../assets/images/plus.svg';
import GreenTickIcon from '../../../assets/images/green_tick.svg';
import SyncIcon from '../../../assets/images/sync.svg';
import {ADD_PRODUCT, ALL_STACK} from '../../../navigation/NavigationNames';
import {Dimension, Strings, Theme, Utils} from '../../../utils';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getProducts} from '../../../redux/actions/ProductAction';
import {syncProduct} from '../../../redux/actions/ProductAction';
import PersonImage from '../../../components/PersonImage';
import EmptyDataScreen from '../../../components/common/EmptyData';
import CustomSearchBar from '../../../components/CustomSearchBar';

const ProductScreen = props => {
  const [productID, setProductID] = useState('');
  const [data, setFilteredData] = useState(props.products);
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
      setFilteredData(props.products);
    }
  }, [props.products]);

  const getData = () => {
    props.getProducts();
  };

  const onSyncClicked = async item => {
    setProductID(item.id);
    await props.syncProduct(item.id, item.productName);

    props.getProducts();
  };

  const addProductClicked = () => {
    props.navigation.push(ALL_STACK, {
      screen: ADD_PRODUCT,
    });
  };

  const filterList = text => {
    setFilteredData(
      props.products.filter(item => {
        return item.productName.toLowerCase().includes(text.toLowerCase());
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Toolbar title={Strings.names.products} />
      <CustomSearchBar
        ontextChange={text => {
          setSearchTerm(text);
          filterList(text);
        }}
      />
      {props.loading && props.products.length === 0 ? (
        <ActivityIndicator
          style={{
            justifyContent: 'center',
            flex: 1,
          }}
        />
      ) : props.products.length > 0 ? (
        <View
          style={[styles.container, {paddingTop: Dimension.dynamicSize(15)}]}>
          <View
            style={{
              marginHorizontal: Dimension.dynamicSize(24),
              flex: 1,
            }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              keyExtractor={({id}) => id}
              renderItem={({item}) => (
                <ProductItem
                  product={item}
                  onSyncClicked={() => onSyncClicked(item)}
                  isLoading={props.syncLoading}
                  productID={productID}
                />
              )}
            />
          </View>
          <FAB icon={<PlusIcon />} onPressed={() => addProductClicked()} />
        </View>
      ) : (
        <EmptyDataScreen message={Strings.text.no_product_found} />
      )}
    </SafeAreaView>
  );
};

const ProductItem = ({product, onSyncClicked, isLoading, productID}) => {
  return (
    <View style={ProductScreenStyles.itemContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingEnd: Dimension.dynamicSize(40),
        }}>
        <Text style={ProductScreenStyles.itemTitle}>{product.productName}</Text>
        {product.isActive ? <GreenTickIcon /> : null}

        {isLoading && product.id === productID ? (
          <ActivityIndicator style={ProductScreenStyles.syncIcon} />
        ) : (
          <TouchableOpacity
            style={ProductScreenStyles.syncIcon}
            onPress={onSyncClicked}>
            <SyncIcon />
          </TouchableOpacity>
        )}
      </View>
      <Text style={ProductScreenStyles.productUrl}>{product.jiraUrl}</Text>
      {product.isActive ? (
        <Text
          style={[
            ProductScreenStyles.productUrl,
            {fontSize: 10, fontStyle: 'italic'},
          ]}>
          {`${Strings.names.last_updated} ${Utils.getSyncTime(
            product.lastUpdated,
          )}`}
        </Text>
      ) : null}
      <View style={ProductScreenStyles.ownerContainer}>
        <PersonImage url={product.productManager} />
        <Text style={ProductScreenStyles.ownerName}>
          {product.productManager}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
});

const mapStateToProps = state => {
  return {
    products: state.ProductReducer.products,
    error: state.ProductReducer.error,
    loading: state.ProductReducer.loading,
    syncLoading: state.ProductReducer.syncLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getProducts,
      syncProduct,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);
