import {StyleSheet} from 'react-native';
import {Font, Theme} from '../../../utils';
import {Dimension} from '../../../utils';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Theme.colors.white,
  },
  textStyle: {
    fontSize: Dimension.dynamicSize(20),
    fontWeight: '600',
    flex: 1,
    fontFamily: Font.notoBold,
  },
  logoutTextStyle: {
    paddingLeft: Dimension.dynamicSize(7),
    fontSize: Dimension.dynamicSize(15),
    color: '#05C6D9',
    fontWeight: '700',
    fontFamily: Font.notoBold,
  },
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: Dimension.dynamicSize(20),
    paddingVertical: Dimension.dynamicSize(10),
  },
  listWrapper: {width: '100%', flex: 1},
  listStyle: {
    paddingHorizontal: Dimension.dynamicSize(24),
    marginTop: Dimension.dynamicSize(10),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 1,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  syncText: {
    color: Theme.colors.primary,
    width: '100%',
    textAlign: 'center',
    paddingTop: Dimension.dynamicSize(8),
    paddingHorizontal: Dimension.dynamicSize(8),
    marginTop: 8,
  },
});

export default styles;
