import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PositiveButton from '../../../components/common/PositiveButton';
import Toolbar from '../../../components/common/Toolbar';
import {Dimension, Strings, Theme} from '../../../utils';
import {addProject, resetProducts} from '../../../redux/actions/ProductAction';
import FormDropdown from '../../../components/common/FormDropdown';

const SelectProject = ({
  navigation,
  addProject,
  addProductResponse,
  addProjectResponse,
  resetProducts,
}) => {
  const [projectName, setProjectName] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (addProjectResponse != null) {
      navigation.goBack();
    }
  }, [addProjectResponse]);

  const addProjectClicked = () => {
    if (projectName.length == 0) {
      setShowError(true);
    } else {
      setShowError(false);
      addProject(addProductResponse.productName, projectName);
    }
  };

  const items = addProductResponse?.projects ?? [];
  const projects = items.map(item => {
    return {label: item.name, value: item.name};
  });

  const onBackPressed = () => {
    resetProducts();
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{flex: 1}}>
        <Toolbar
          title={Strings.names.add_project}
          showBack={true}
          onBackPressed={() => onBackPressed()}
        />
        <View style={styles.container}>
          <FormDropdown
            title={Strings.names.project_name}
            placeholder={Strings.placeholder.project_name}
            list={projects}
            value={projectName}
            setValue={setProjectName}
            showError={showError}
          />
        </View>

        <PositiveButton
          title={Strings.names.add}
          style={{
            alignSelf: 'flex-end',
            margin: Dimension.dynamicSize(24),
          }}
          onPressed={() => addProjectClicked()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  container: {
    flex: 1,
    marginHorizontal: Dimension.dynamicSize(24),
  },
});

const mapStateToProps = state => {
  return {
    addProductResponse: state.ProductReducer.addProductResponse,
    addProjectResponse: state.ProductReducer.addProjectResponse,
    error: state.ProductReducer.error,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addProject,
      resetProducts,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectProject);
