import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import firebase from "firebase";
import { PricingCard } from "react-native-elements";
import { throwIfAudioIsDisabled } from "expo-av/build/Audio/AudioAvailability";

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
    };
  }

  render() {
    const user = firebase.auth().currentUser;
    const email = user.email;
    const name = email.split("@")[0];
    return (
      <View style={styles.container}>
        <View style={styles.toplayer}>
          <Image
            source={require("../Images/Avatar.jpg")}
            style={styles.avatar}
          ></Image>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subtext}>Normal User</Text>
        </View>
        <View style={styles.middle}>
          <PricingCard
            color="#4f9deb"
            title="Free"
            price="$0"
            info={["1 User", "Basic Support", "All Core Features"]}
            button={{ title: " Upgrade to Premium", icon: "flight-takeoff" }}
          ></PricingCard>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Login");
            }}
            style={styles.buttonL}
          >
            <Text style={styles.signin}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  toplayer: {
    flex: 2,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 40,
    marginBottom: 20,
    textAlign: "center",
  },
  subtext: {
    fontSize: 15,
    color: "gray",
  },
  middle: {
    flex: 3,
    justifyContent: "center",
  },
  bottom: {
    flex: 1.5,
    justifyContent: "center",
  },

  avatar: {
    marginTop: 30,

    marginBottom: 10,
  },

  button: {
    borderWidth: 1,
    height: 50,
    borderColor: colors.blue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
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
