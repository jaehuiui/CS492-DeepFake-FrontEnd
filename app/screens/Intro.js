import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  useState,
  Image,
  inactiveColor,
  hidden,
  activeColor,
} from "react-native";

import Swiper from "react-native-swiper";

export default class Intro extends Component {
  render() {
    const { width, height } = Dimensions.get("window");

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <Swiper showsButtons={false} autoplay={true}>
            <View style={{ width, height }}>
              <View style={styles.first}>
                <Text style={styles.firstpage}>Welcome to NPD!</Text>
                <Text style={styles.first_sub}>
                  We provide a high quality of FaceSwap {"\n"}
                  Self-Detect Porn Media!
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Login");
                }}
                style={styles.button_signin}
              >
                <Text style={styles.signin}>Skip</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width, height }}>
              <Image
                source={require("../Images/a1.png")}
                style={styles.imageStyle}
              />
              <View style={styles.wrapper}>
                <Text style={styles.header}>
                  High quality of {"\n"}FaceSwap
                </Text>
                <Text style={styles.paragraph}>Based on DeepLearning</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Login");
                }}
                style={styles.button_signin}
              >
                <Text style={styles.signin}>Skip</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width, height }}>
              <Image
                source={require("../Images/a2.png")}
                style={styles.imageStyle}
              />
              <View style={styles.wrapper}>
                <Text style={styles.header}>Provide Porn Detection</Text>
                <Text style={styles.paragraph}>
                  Can't Integrate with Dangerous Videos
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Login");
                }}
                style={styles.button_signin}
              >
                <Text style={styles.signin}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </Swiper>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    justifyContent: "center",
    top: 100,
  },
  first: {
    flex: 5,
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 30,
  },
  firstpage: {
    marginTop: 200,
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 30,
  },
  first_sub: {
    justifyContent: "center",
    color: "gray",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 25,
  },

  wrapper: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 17,
    color: "gray",
  },
  imageStyle: {
    flex: 3,
    width: "70%",
    height: "100%",
    alignSelf: "center",
    marginTop: 60,
  },
  button_signin: {
    flex: 1,
    display: "flex",
  },
  signin: {
    fontSize: 18,
    marginRight: 30,
    alignSelf: "flex-end",
    margin: "auto",
  },
});
