
import React, {useEffect} from 'react';
import {
  SafeAreaView
} from 'react-native';
import Home from "./src/Component";
import Notification from "./src/Notification";
import DynamicLinks from "./src/DynamicLink";
import SplashScreen from "react-native-splash-screen";


const App = () => {
    useEffect(() => {
        if (Platform.OS === 'android') SplashScreen.hide();
    }, []);

  return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#27ae60'}}>
        <DynamicLinks />
        <Notification />
        <Home />
      </SafeAreaView>
  )

};

export default App;
