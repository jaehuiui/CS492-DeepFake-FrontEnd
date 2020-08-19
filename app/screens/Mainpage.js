import React, { Component } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import firebase from "firebase";

export default class Mainpage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: null,
      numofreq: null,
      username: "",
    };
  }

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      "focus",
      async () => {
        var user = firebase.auth().currentUser;
        if (user != null) {
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .onSnapshot((doc) => {
              var timearr = doc.data().time.split("-").map(Number);
              var uploadsec =
                timearr[0] * 24 * 60 * 60 +
                timearr[1] * 60 * 60 +
                timearr[2] * 60 +
                timearr[3];
              var nowsec =
                new Date().getDate() * 24 * 60 * 60 +
                new Date().getHours() * 60 * 60 +
                new Date().getMinutes() * 60 +
                new Date().getSeconds();
              var intervalsec = nowsec - uploadsec;
              var remainder = intervalsec;

              var numhour = Math.floor(remainder / (60 * 60));
              remainder = remainder % (60 * 60);
              var numminute = Math.floor(remainder / 60);
              remainder = remainder % 60;
              var numsecond = remainder;
              var timestring = numhour + " hours " + numminute + " min";
              console.log(timestring);
              this.setState({
                time: timestring,
              });
            });
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .collection("history")
            .get()
            .then((res) => {
              this.setState({
                numofreq: res.size,
              });
            });
        }
      }
    );
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
            onPress={() => {
              this.props.navigation.navigate("Profile");
            }}
          />
          <Text
            style={styles.Username}
            onPress={() => {
              this.props.navigation.navigate("Profile");
            }}
          >
            {" "}
            {name}
          </Text>
        </View>
        <View style={styles.middlelayer}>
          <View style={styles.rectangle}>
            <Text
              style={styles.ongoing}
              onPress={() => {
                this.props.navigation.navigate("Ongoing");
              }}
            >
              Requests
            </Text>

            <Text style={styles.dd}>
              <Text
                style={styles.inside1}
                onPress={() => {
                  this.props.navigation.navigate("Ongoing");
                }}
              >
                Time Spent :{" "}
              </Text>
              <Text
                style={{
                  bottom: 24,
                  fontSize: 20,
                  left: 180,
                  paddingRight: 15,
                  fontWeight: "bold",
                }}
              >
                {this.state.time}
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.bottomlayer}>
          <View style={styles.big_rectangle}>
            <Text
              style={styles.history}
              onPress={() => {
                this.props.navigation.navigate("History");
              }}
            >
              History
            </Text>
            <Text style={styles.his}>
              <Text style={styles.num}>Number of Request : </Text>
              <Text style={styles.num1}> {this.state.numofreq} </Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Caution");
            }}
            style={styles.buttonL}
          >
            <Text style={styles.signin}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#FFF",
  },

  //second layer

  avatar: {
    alignSelf: "center",
  },

  toplayer: {
    flex: 2,
    marginTop: 30,
    marginBottom: 50,
  },
  middlelayer: {
    flex: 2,
    marginTop: 50,
  },
  bottomlayer: {
    flex: 2.5,
    marginBottom: 40,
  },

  Username: {
    marginTop: 20,
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
  },
  avatar: {
    marginTop: 30,
    alignSelf: "center",
    marginBottom: 10,
  },
  dd: {
    marginLeft: 30,
  },
  rectangle: {
    borderRadius: 30,
    backgroundColor: "#F4F5F6",
    alignSelf: "stretch",
    marginHorizontal: 30,
    height: "80%",
  },
  ongoing: {
    paddingVertical: 15,
    fontWeight: "bold",
    marginLeft: 30,
    fontSize: 25,
  },
  big_rectangle: {
    borderRadius: 30,
    backgroundColor: "#F4F5F6",
    marginHorizontal: 30,
    alignSelf: "stretch",
    marginBottom: 10,
    height: "70%",
  },
  history: {
    fontSize: 25,
    paddingVertical: 15,
    left: 25,
    fontWeight: "bold",
  },
  lastweek: {
    fontSize: 15,
    left: 260,
    bottom: 45,
  },
  inside1: {
    marginLeft: 30,
    fontSize: 20,
    color: "black",
  },
  inside2: {
    bottom: 24,
    fontSize: 30,
    left: 180,
    paddingRight: 15,
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

  num: {
    fontSize: 20,
    marginLeft: 30,
  },
  num1: {
    fontSize: 20,
    marginLeft: 30,
    fontWeight: "bold",
  },
  his: {
    flexDirection: "row",
    marginLeft: 30,
  },
  uu: {
    color: "gray",
    fontSize: 15,
    marginLeft: 30,
    paddingVertical: 5,
  },
});
