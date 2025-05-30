import 'react-native-gesture-handler';
import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Route from './app/navigation/Route';
import store from './app/redux/store';
import NetworkStatusBanner from './app/components/NetworkStatusBanner';
// import { ToastProvider } from './app/context/ToastContext';

export default class App extends Component {

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <SafeAreaProvider>
        {/* <ToastProvider> */}
          <SafeAreaView
            style={{
              flex: 1
            }}>
            <StatusBar style="dark" />
            <NetworkStatusBanner />
            <Provider store={store}>
              <Route />
            </Provider>
          </SafeAreaView>
        {/* </ToastProvider> */}
      </SafeAreaProvider>
    );
  }

};