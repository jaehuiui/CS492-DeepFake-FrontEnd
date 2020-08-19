import React from "react";

import { StatusBar, YellowBox } from "react-native";

import OngoingScreen from "./app/screens/OngoingScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import SelectScreen from "./app/screens/SelectScreen";
import LoginScreen from "./app/screens/LoginScreen";
import CreateScreen from "./app/screens/CreateScreen";
import Intro from "./app/screens/Intro";
import Mainpage from "./app/screens/Mainpage";
import HistoryScreen from "./app/screens/HistoryScreen";
import Caution from "./app/screens/Caution";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { firebaseConfig } from "./app/config/firebaseconfig";
import firebase from "firebase";
import * as Permissions from "expo-permissions";
import _ from "lodash";

const Main = createStackNavigator();
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  async componentDidMount() {
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const _console = _.clone(console);
    console.warn = (message) => {
      if (message.indexOf("Setting a timer") <= -1) {
        _console.warn(message);
      }
    };
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (newPermission.status === "granted") {
        console.log("Permission Granted");
      }
    }
  }
  render() {
    return (
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <Main.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Main.Screen name="Intro" component={Intro} />
          <Main.Screen name="Login" component={LoginScreen} />
          <Main.Screen name="Select" component={SelectScreen} />
          <Main.Screen name="Create" component={CreateScreen} />
          <Main.Screen name="Ongoing" component={OngoingScreen} />
          <Main.Screen name="MainPage" component={Mainpage} />
          <Main.Screen name="Profile" component={ProfileScreen} />
          <Main.Screen name="History" component={HistoryScreen} />
          <Main.Screen name="Caution" component={Caution} />
        </Main.Navigator>
      </NavigationContainer>
    );
  }
}
