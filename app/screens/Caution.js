import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

export default class Caution extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toplayer}>
          <View style={styles.cautionbox}>
            <Text style={styles.title}> Caution </Text>
            <Text style={styles.content}>
              This application only supports {"\n"} proper video synthesis.{" "}
              {"\n"} {"\n"}
              Therefore, requests for synthesis {"\n"} using videos classified
              as {"\n"}
              pornography may be rejected {"\n"} at any time. {"\n"}
              {"\n"}
              You can choose Videos for {"\n"} Face and Body Source.{"\n"}
              Both Videos can be checked by {"\n"} our Detection Server. {"\n"}
            </Text>
          </View>
        </View>
        <View style={styles.bottomlayer}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Select");
            }}
            style={styles.buttonL}
          >
            <Text style={styles.signin}>Agree</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  toplayer: {
    flex: 6,
  },
  bottomlayer: {
    flex: 1,
  },
  cautionbox: {
    marginTop: 100,
    borderRadius: 30,
    backgroundColor: "#F4F5F6",
    alignSelf: "stretch",
    marginHorizontal: 30,
    height: "80%",
  },
  title: {
    marginTop: 50,
    fontSize: 30,
    textAlign: "center",
  },
  content: {
    marginHorizontal: 20,
    fontSize: 15,
    marginTop: 30,
  },
  buttonL: {
    borderWidth: 1,
    height: 50,
    backgroundColor: "#2D31AC",
    marginTop: 15,
    marginHorizontal: 40,
    marginBottom: 30,
    borderRadius: 30,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  signin: {
    fontSize: 20,
    color: "white",
  },
});
