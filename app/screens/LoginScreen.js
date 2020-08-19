import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";
import colors from "../config/colors";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "email",
      password: "password",
      error: "",
      loading: false,
    };
    this.handleChangeemail = this.handleChangeemail.bind(this);
    this.handleChangepassword = this.handleChangepassword.bind(this);
  }

  OnLoginPress() {
    this.setState({
      error: "",
      loading: true,
    });

    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({
          error: "",
          loading: false,
        });
        this.props.navigation.navigate("MainPage");
      })
      .catch((e) => {
        this.setState({
          error: e.message,
          loading: false,
        });
        if (e.code == "auth/user-not-found") {
          alert("User not found, Create new account");
          this.props.navigation.navigate("Create");
        } else {
          alert(e.message);
        }
      });
  }

  OnSignUpPress() {
    this.props.navigation.navigate("Create");
  }

  handleChangeemail(newText) {
    this.setState({
      email: newText,
    });
  }
  handleChangepassword(newText) {
    this.setState({
      password: newText,
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        //behavior="padding"
        enabled={true}
      >
        <ScrollView style={styles.background}>
          <View style={styles.Theme}>
            <Text style={styles.Title}>Let's Sign In</Text>
            <Text style={styles.SubTitle}>
              {" "}
              Welcome back, you've been missed!
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.inputinfo}>User Email</Text>
            <View style={styles.inputtogether}>
              <Fontisto
                style={{
                  flex: 1,
                  marginTop: 13,
                  marginLeft: 10,
                }}
                name="person"
                size={25}
                color="black"
              />
              <TextInput
                style={styles.tinput}
                autoCompleteType="email"
                placeholder=""
                onChangeText={this.handleChangeemail}
              ></TextInput>
            </View>
            <Text style={styles.inputinfo}>Password</Text>
            <View style={styles.inputtogether}>
              <Entypo
                style={{
                  flex: 1,
                  marginTop: 13,
                  marginLeft: 6,
                }}
                name="lock"
                size={28}
                color="black"
              />
              <TextInput
                style={styles.tinput}
                secureTextEntry
                placeholder=""
                onChangeText={this.handleChangepassword}
              ></TextInput>
            </View>
          </View>

          <View style={styles.bottom_layer}>
            <View style={styles.signup_button}>
              <TouchableOpacity
                onPress={() => {
                  this.OnLoginPress();
                }}
              >
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={["#cc2b5e", "#753a88"]}
                  style={styles.buttonL}
                >
                  <Text style={styles.signin}>Sign In</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.signup}>
              <Text>Don't have account? </Text>
              <TouchableOpacity
                style={styles.buttonS}
                onPress={() => {
                  this.OnSignUpPress();
                }}
              >
                <Text style={{ color: "#753a88", fontWeight: "bold" }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  //layer level 1
  background: {
    flex: 1,
    backgroundColor: "white",
  },

  //layer level 2
  Theme: {
    flex: 2.5,
    top: 80,
    marginTop: 30,
    marginBottom: 130,
    //position: "absolute",
  },
  form: {
    flex: 2,
    //top: 0,
    //position: "absolute",
  },

  bottom_layer: {
    flex: 3,
    //top: 0,
    //position: "absolute",
  },

  //layer level 3

  //level 3 - Theme

  Title: {
    color: "black",
    //fontWeight: "100",
    paddingTop: 20,
    marginLeft: 20,
    paddingBottom: 20,
    fontSize: 35,
  },
  SubTitle: {
    //paddingTop: 20,
    marginLeft: 18,
    paddingBottom: 20,
    fontSize: 15,
    color: "gray",
  },

  //level 3 - Form

  inputinfo: {
    color: "gray",
    marginLeft: 25,
    fontSize: 15,
  },

  inputtogether: {
    flex: 1,
    flexDirection: "row",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    backgroundColor: "white",
    marginVertical: 5,
    marginHorizontal: 20,
    padding: 1,
    alignSelf: "stretch",
    marginBottom: 30,
  },

  tinput: {
    flex: 6,
    marginVertical: 5,
    marginRight: 5,
    height: 40,
    color: "#719AFE",
    borderColor: colors.r1,
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },

  //level 3 - bottom layer

  signup: {
    flexDirection: "row",
    //position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },

  signin: {
    fontSize: 20,
    color: "white",
  },

  buttonL: {
    borderWidth: 1,
    height: 50,
    //borderColor: colors.c3,
    marginTop: 15,
    marginHorizontal: 40,
    marginBottom: 30,
    borderRadius: 30,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  buttonS: {
    height: 50,
    borderColor: colors.c3,
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
});
