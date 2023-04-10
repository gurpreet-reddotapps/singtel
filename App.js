import React, { useEffect, useState } from 'react';
import { Modal, StatusBar, StyleSheet, View, Text, SafeAreaView, Platform } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { androidPermission } from './src/appPermission/permissions';
import { colors } from './src/assects/colors';
import { width } from './src/assects/strings';
import { persistor, Store } from './src/redux/store';
import Routes from './src/routes';
import SplashScreen from './src/screens/splash';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import NetInfo from '@react-native-community/netinfo';
import { ConnectionLostIcon } from './src/assects/Icons';
import fonts from './src/assects/fonts';
import { ButtonComponent,  } from './src/component';
import { NotificationListner, requestUserPermission } from './src/utils/pushNnotification_helper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Interceptor from './src/api/interceptor';
Interceptor.interceptor(Store)
const App = () => {

  const [splash, setSplash] = useState(true);
  const [netInfo, setNetInfo] = useState('');
  

  useEffect(() => {
    // if (Platform.OS == "android") {
      requestUserPermission()
      NotificationListner()
    // }
  }, [])

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("DSD", state.isConnected)
      setNetInfo(state.isConnected);
    });

    return () => {
      // Unsubscribe to network state updates
      unsubscribe();
    };
  }, []);



  useEffect(() => {
    if (splash) {
      setTimeout(() => {
        setSplash(false)
      }, 2000);
    }
  }, [])

  function ConnectionLost({ visible }) {
    return (
      <Modal visible={visible}  >
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
          <StatusBar barStyle='dark-content' backgroundColor={"transparent"} />
          <ConnectionLostIcon width={width / 1.30} height={width} />
          <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsMedium, fontSize: 24 }} >Lost connection</Text>
          <Text style={{ color: colors.placeHolderTextColor, fontFamily: fonts.PoppinsMedium, fontSize: 16, textAlign: "center", marginVertical: 5 }} >Whoops, no internet connection found. Please check your connection.</Text>
          <ButtonComponent onPress={() => setNetInfo(false)} title={"Try again"} style={{ width: width / 1.10, height: width / 7, marginTop: 30 }} bgColor={colors.primaryColor} />
        </View>
      </Modal>
    )
  }
  return (
    <View style={styles.container} >
      {splash ?
        <SplashScreen /> 
       : 
         <Provider store={Store} >
          <PersistGate persistor={persistor} >
            <Routes />
            <ConnectionLost visible={!netInfo} />
            <FlashMessage animated position={"bottom"} />
          </PersistGate>
        </Provider>} 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, color: colors.primaryColor
  }
})
export default App;