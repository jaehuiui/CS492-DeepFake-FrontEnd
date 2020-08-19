import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import clr from "../config/clr";
import firebase from "firebase";
import HistoryList from "../../components/HistoryList";

export default class HistoryScreen extends Component {
  constructor(props) {
    super(props);
    var user = firebase.auth().currentUser;

    this.state = {
      datalist: [],
      uid: user.uid,
    };
  }

  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      "focus",
      async () => {
        await this.gethistory();
      }
    );
  }

  async gethistory() {
    const dbh = firebase.firestore();
    var arr = [];
    dbh
      .collection("users")
      .doc(this.state.uid)
      .collection("history")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          doc.data()["color"] = clr[1];
          arr.push(doc.data());
        });
        for (var i = 0; i < arr.length; i++) {
          arr[i]["color"] = clr[i % 5];
        }
        this.setState({
          datalist: arr,
        });
        console.log(this.state.datalist);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toplayer}>
          <Text style={styles.title}>History</Text>
        </View>
        <View style={styles.middlelayer}>
          <View style={styles.ongoingbox}>
            <FlatList
              data={this.state.datalist}
              keyExtractor={(item) => item.name}
              horizontal={false}
              extraData={this.state.datalist}
              showsHorizontalScrollIndicator={true}
              renderItem={({ item }) => <HistoryList list={item} />}
            />
          </View>
        </View>
        <View style={styles.bottomlayer}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("MainPage");
            }}
            style={styles.buttonL}
          >
            <Text style={styles.signin}>Back to MainPage</Text>
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
    alignSelf: "center",
    textAlign: "center",
    alignItems: "center",
    marginTop: 80,
  },
  ongoingbox: {
    width: "100%",
    paddingHorizontal: 10,
    bottom: 100,
    marginBottom: 100,
  },
  middlelayer: {
    flex: 4,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    paddingHorizontal: 20,
  },
  signin: {
    fontSize: 20,
    color: "white",
  },
  bottomlayer: {
    flex: 1.5,
    alignItems: "center",
  },
  buttonL: {
    borderWidth: 1,
    height: 50,
    backgroundColor: "#2D31AC",
    marginTop: 30,
    marginHorizontal: 40,
    marginBottom: 30,
    borderRadius: 30,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
});
