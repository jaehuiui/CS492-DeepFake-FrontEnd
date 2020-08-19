import React from "react";
import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import colors from "../config/colors";
import firebase from "firebase";
import { TextInput } from "react-native-gesture-handler";
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";

export default class CreateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "email",
      password: "password",
      passwordconfirm: "confirm password",
    };
    this.handleChangeemail = this.handleChangeemail.bind(this);
    this.handleChangepassword = this.handleChangepassword.bind(this);
    this.handleChangePasswordConfirm = this.handleChangePasswordConfirm.bind(
      this
    );
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
  handleChangePasswordConfirm(newText) {
    this.setState({
      passwordconfirm: newText,
    });
  }
  async OnSignUpPress() {
    this.setState({
      error: "",
      loading: true,
    });

    if (!(this.state.password === this.state.passwordconfirm)) {
      alert("Password confirm failed!!");
      await this.setState({
        password: "",
        passwordconfirm: "",
      });
      return;
    }

    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({
          error: "",
          loading: false,
        });
        this.props.navigation.navigate("Login");
      })
      .catch(() => {
        this.setState({
          error: "Authentification failed",
          loading: false,
        });
        alert(this.state.error);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          //behavior="padding"
          enabled={true}
        >
          <ScrollView style={styles.background}>
            <View style={styles.Theme}>
              <Text style={styles.Title}>Let's Sign Up</Text>
              <Text style={styles.SubTitle}>
                {" "}
                Register Our Service, Enjoy FaceSwap!
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
                    marginLeft: 10,
                  }}
                  name="lock"
                  size={25}
                  color="black"
                />
                <TextInput
                  style={styles.tinput}
                  secureTextEntry
                  placeholder=""
                  onChangeText={this.handleChangepassword}
                ></TextInput>
              </View>
              <Text style={styles.inputinfo}>Confirm Password</Text>
              <View style={styles.inputtogether}>
                <Entypo
                  style={{
                    flex: 1,
                    marginTop: 13,
                    marginLeft: 10,
                  }}
                  name="lock"
                  size={25}
                  color="black"
                />
                <TextInput
                  style={styles.tinput}
                  secureTextEntry
                  placeholder=""
                  onChangeText={this.handleChangePasswordConfirm}
                ></TextInput>
              </View>
              <View style={styles.signup_button}>
                <TouchableOpacity
                  onPress={() => {
                    this.OnSignUpPress();
                  }}
                >
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={["#cc2b5e", "#753a88"]}
                    style={styles.buttonL}
                  >
                    <Text style={styles.signin}>Sign Up</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Title: {
    color: "black",
    //fontWeight: "100",
    paddingTop: 20,
    marginTop: 20,
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
    marginBottom: 80,
  },
  Theme: {
    flex: 1.5,
    top: 70,
    //alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  backbutton: {
    marginTop: 30,
    flex: 1,
    position: "absolute",
    top: 20,
    left: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignContent: "center",
    justifyContent: "space-evenly",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  text: {
    color: "#161924",
    fontSize: 20,
    fontWeight: "500",
  },
  inputinfo: {
    color: "gray",
    marginLeft: 25,
    fontSize: 15,
  },
  button: {
    marginTop: 32,
    backgroundColor: "#FFF",
    paddingVertical: 12,
    width: 250,
    borderRadius: 12,
    alignItems: "center",
  },
  inputtogether: {
    flexDirection: "row",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    backgroundColor: "white",
    marginHorizontal: 20,
    padding: 1,
    alignSelf: "stretch",
    marginBottom: 30,
  },
  form: {
    flex: 15,
    justifyContent: "center",
  },
  tinput: {
    flex: 6,
    marginVertical: 5,
    marginLeft: 10,
    height: 40,
    color: "#719AFE",
    borderColor: colors.r1,
    padding: 3,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  signin: {
    fontSize: 20,
    color: "white",
  },
  buttonS: {
    height: 50,
    borderWidth: 1,
    marginTop: 30,
    marginHorizontal: 20,
    borderColor: colors.c3,
    borderRadius: 30,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
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
});
