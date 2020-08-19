import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";
import clr from "../config/clr";
import OngoingList from "../../components/OngoingList";
import firebase from "firebase";

export default class OngoingScreen extends React.Component {
  constructor(props) {
    super(props);
    var user = firebase.auth().currentUser;
    this.getd = this.getd.bind(this);
    this.state = {
      datalist: [],
      uid: user.uid,
    };
  }
  async componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      "focus",
      async () => {
        await this.getd();
      }
    );
  }
  async getd() {
    const dbh = firebase.firestore();
    var arr = [];
    dbh
      .collection("users")
      .doc(this.state.uid)
      .collection("rid")
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
          <View style={{ flexDirection: "row" }}>
            <View style={styles.divider} />
            <Text style={styles.title}>
              Ongoing List
              <Text> </Text>
              <Text style={{ fontWeight: "100", color: colors.blue }}></Text>
            </Text>
            <View style={styles.divider} />
          </View>
        </View>

        <View style={styles.middlelayer}>
          <View style={styles.ongoingbox}>
            <FlatList
              data={this.state.datalist}
              keyExtractor={(item) => item.name}
              horizontal={true}
              extraData={this.state.datalist}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <OngoingList list={item} />}
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
    //alignItems: "center",
  },
  toplayer: {
    flex: 3,
    paddingTop: 30,
    alignItems: "flex-end",
    alignContent: "center",
  },
  middlelayer: {
    flex: 4,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  bottomlayer: {
    flex: 1.5,
    alignItems: "center",
  },

  ////////////////////////////////////////
  title: {
    marginTop: 130,
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    paddingHorizontal: 20,
  },
  divider: {
    marginTop: 130,
    backgroundColor: "#2D31AC",
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  ongoingbox: {
    height: "100%",
    paddingLeft: 30,
    marginBottom: 50,
  },

  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
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
  signin: {
    fontSize: 20,
    color: "white",
  },
});
