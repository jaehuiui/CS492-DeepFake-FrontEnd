import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Button,
  Modal,
  Image,
  Animated,
  TouchableHighlight,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import colors from "../config/colors";
import Entypo from "react-native-vector-icons/Entypo";
import { Video } from "expo-av";
import firebase from "firebase";
import "firebase/firestore";
import Constants from "expo-constants";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { LinearGradient } from "expo-linear-gradient";
import { getFreeDiskStorageAsync } from "expo-file-system";
import { DarkTheme } from "@react-navigation/native";

export default class SelectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: null,
      uid: null,
      rrid: null,
      srcVidsource: null,
      dstVidsource: null,
      selectscreen: true,
      srcVidcheck: null,
      dstVidcheck: null,
      srcok: false,
      dstok: false,
      sendok: false,
      srccanselect: true,
      dstcanselect: false,
      srcbuttontext: "Select Video for Face",
      dstbuttontext: "Select Video for Body",
      check: "",
      isVisible1: false,
      isVisible2: false,
      modalVisible1: false,
      modalVisible2: false,
      pornsrc: null,
    };

    this.handleoutputname = this.handleoutputname.bind(this);
  }

  handleoutputname(newText) {
    this.setState({
      output: newText,
    });
  }

  async componentDidMount() {
    this.getPermissionAsync();
    this.focusListener = this.props.navigation.addListener(
      "focus",
      async () => {
        var user = firebase.auth().currentUser;
        if (user != null) {
          await this.setState({
            uid: user.uid,
          });
        }
        await this.getrid();
        console.log(this.state.uid);
        console.log(this.state.rrid);
      }
    );
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  uploadsrcVidAsync = async (uri) => {
    const path =
      "users/" + this.state.uid + "/" + this.state.rrid + "/src/src.mp4";
    const response = await fetch(uri);
    const blobb = await response.blob();
    this.setState({
      srccanselect: false,
      //srcbuttontext: "Uploading Video to Server",
    });
    console.log("blob finished");
    await firebase.storage().ref(path).put(blobb);
    return;
  };

  uploaddstVidAsync = async (uri) => {
    const path =
      "users/" + this.state.uid + "/" + this.state.rrid + "/dst/dst.mp4";
    const response = await fetch(uri);
    const blobb = await response.blob();

    await firebase.storage().ref(path).put(blobb);
    this.setState({
      dstcanselect: false,
      //dstbuttontext: "Uploading Video to Server",
    });
    return;
  };

  _picksrcVid = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({
          srcVidsource: result.uri,
          srccanselect: false,
          dstcanselect: false,
          srcbuttontext: "Checking your Video's Safety",
        });
        console.log("upload started");
        await this.uploadsrcVidAsync(this.state.srcVidsource);
        axios({
          method: "post",
          url: "http://5aa8bdd6cbb1.ngrok.io/upload/",
          data: {
            uid: this.state.uid,
            rid: this.state.rrid,
            type: "src",
            filename: "src.mp4",
          },
        })
          .then(async (response) => {
            this.setState({
              srcVidcheck: response.data,
              dstcanselect: true,
            });
            console.log(this.state.rrid);
            if (response.data.status === "Safe") {
              this.setState({
                srcok: true,
                srcbuttontext: "Your Video is Safe!",
                srccanselect: false,
                dstcanselect: true,
              });
            } else {
              this.setState({
                srcok: false,
                srcbuttontext: "Your Video is Unsafe, choose other Video",
                srccanselect: true,
                dstcanselect: false,
                check: "Why My Video is Porn?",
                isVisible1: true,
              });
              var path =
                "/users/" +
                this.state.uid +
                "/" +
                this.state.rrid +
                "/nsfw.jpg";
              const url = await firebase.storage().ref(path).getDownloadURL();
              console.log("downloaduri: ", url);
              FileSystem.downloadAsync(
                url,
                FileSystem.documentDirectory + "nsfw.jpg"
              )
                .then(async ({ uri }) => {
                  this.setState({
                    pornsrc: uri,
                  });
                  console.log("uuuuuuuuuuuri:", this.state.pornsrc);
                })
                .catch((error) => {
                  console.error(error);
                });
            }
            if (this.state.srcok) {
              this.setState({
                //srccanselect: false,
                srcbuttontext: "Your Video is Safe!",
              });
            }
            if (this.state.srcok && this.state.dstok) {
              this.setState({
                sendok: true,
              });
            }
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  _pickdstVid = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({
          dstVidsource: result.uri,
          srccanselect: false,
          dstcanselect: false,
          dstbuttontext: "Checking your Video's Safety",
        });
        await this.uploaddstVidAsync(this.state.dstVidsource);
        axios({
          method: "post",
          url: "http://5aa8bdd6cbb1.ngrok.io/upload/",
          data: {
            uid: this.state.uid,
            rid: this.state.rrid,
            type: "dst",
            filename: "dst.mp4",
          },
        })
          .then(async (response) => {
            this.setState({
              dstVidcheck: response.data,
              isVisible1: false,
            });
            if (response.data.status === "Safe") {
              this.setState({
                dstok: true,
                dstbuttontext: "Your Video is Safe!",
                dstcanselect: false,
              });
            } else {
              this.setState({
                dstok: false,
                dstbuttontext: "Your Video is Unsafe, choose other Video",
                dstcanselect: true,
                check: "Why My Video is Porn?",
                isVisible2: true,
              });
              var path =
                "/users/" +
                this.state.uid +
                "/" +
                this.state.rrid +
                "/nsfw.jpg";
              const url = await firebase.storage().ref(path).getDownloadURL();
              console.log("downloaduri: ", url);
              FileSystem.downloadAsync(
                url,
                FileSystem.documentDirectory + "nsfw.jpg"
              )
                .then(async ({ uri }) => {
                  this.setState({
                    pornsrc: uri,
                  });
                  console.log("uuuuuuuuuuuri:", this.state.pornsrc);
                })
                .catch((error) => {
                  console.error(error);
                });
            }
            if (!this.state.srcok) {
              this.setState({
                srccanselect: true,
              });
            }
            if (this.state.dstok) {
              this.setState({
                dstcanselect: false,
                dstbuttontext: "Your Video is Safe!",
              });
            }
            if (this.state.srcok && this.state.dstok) {
              this.setState({
                sendok: true,
              });
            }
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  async firedbsetting() {
    var path = this.state.uid;
    const dbh = firebase.firestore();
    dbh
      .collection("users")
      .doc(this.state.uid)
      .collection("rid")
      .doc(this.state.rrid)
      .set({
        name: this.state.output,
      })
      .then(() => {
        console.log("success!");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getrid() {
    axios({
      method: "post",
      url: "http://5aa8bdd6cbb1.ngrok.io/users/",
      data: {
        uid: this.state.uid,
      },
    })
      .then((response) => {
        this.setState({
          rrid: response.data.rid,
        });
        console.log(this.state.rrid);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async conNsub() {
    await axios({
      method: "post",
      url: "http://5aa8bdd6cbb1.ngrok.io/media/",
      data: {
        uid: this.state.uid,
        rid: this.state.rrid,
        name: this.state.output,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.props.navigation.navigate("MainPage");
    //this.getd();
  }

  async CheckPorn() {
    if (this.state.srcVidcheck != null && this.state.dstVidcheck != null) {
      if (
        this.state.srcVidcheck.status == "Safe" &&
        this.state.srcVidcheck.status == "Safe"
      ) {
        alert("contents safe ready to convert");
      } else {
        this.setState({
          selectscreen: false,
        });
      }
    } else {
      alert("Please Select the source and destination video");
    }
  }

  viewModal1() {
    this.setState({
      modalVisible1: true,
    });
  }
  viewModal2() {
    this.setState({
      modalVisible2: true,
    });
  }
  closeModal1() {
    this.setState({
      modalVisible1: false,
    });
  }
  closeModal2() {
    this.setState({
      modalVisible2: false,
    });
  }

  render() {
    if (this.state.selectscreen) {
      return (
        <View style={styles.container}>
          <Modal
            animationType="slide"
            animationDuration={200}
            animationTension={40}
            closeOnTouchOutside={true}
            modalStyle={{
              borderRadius: 2,
              margin: 20,
              padding: 10,
              backgroundColor: "white",
              flex: 0.8,
            }}
            visible={this.state.modalVisible1}
          >
            <View style={styles.modalfirst}>
              <Text style={styles.ModalTitle}>Porn Video Detected!</Text>
              <Text style={styles.ModalSubTitle}>
                Highest Probability Frame is shown below.{"\n"} We recommend
                choosing another video.
              </Text>
            </View>
            <View style={styles.modalsecond}>
              <Image
                source={{ uri: this.state.pornsrc }}
                style={{
                  width: "80%",
                  height: "60%",
                  marginHorizontal: 30,
                  marginBottom: 10,
                }}
              />
            </View>
            <View style={styles.modalthird}>
              <TouchableOpacity
                onPress={() => {
                  this.closeModal1();
                }}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            animationDuration={200}
            animationTension={40}
            closeOnTouchOutside={true}
            modalStyle={{
              borderRadius: 2,
              margin: 20,
              padding: 10,
              backgroundColor: "#F4F5F6",
              flex: 0.8,
            }}
            visible={this.state.modalVisible2}
          >
            <View style={styles.modalfirst}>
              <Text style={styles.ModalTitle}>Porn Video Detected!</Text>
              <Text style={styles.ModalSubTitle}>
                Highest Probability Frame is shown below.{"\n"} We recommend
                choosing another video.
              </Text>
            </View>
            <View style={styles.modalsecond}>
              <Image
                source={{ uri: this.state.pornsrc }}
                style={{
                  width: "80%",
                  height: "60%",
                  marginHorizontal: 30,
                  marginBottom: 10,
                }}
              />
            </View>
            <View style={styles.modalthird}>
              <TouchableOpacity
                onPress={() => {
                  this.closeModal2();
                }}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <View style={[styles.section, styles.select]}>
            <Video
              source={{ uri: this.state.srcVidsource }}
              rate={1.0}
              volume={1.0}
              isMuted={true}
              resizeMode="cover"
              shouldPlay
              isLooping
              style={{
                width: "80%",
                height: 200,
                marginHorizontal: 30,
                marginBottom: 10,
              }}
            />

            <Button
              title={this.state.srcbuttontext}
              disabled={!this.state.srccanselect}
              color="#2D31AC"
              onPress={() => {
                this._picksrcVid();
                //<NineCubesLoader />;
              }}
            ></Button>
          </View>
          <View style={[styles.section, styles.select]}>
            <Video
              source={{ uri: this.state.dstVidsource }}
              rate={1.0}
              volume={1.0}
              isMuted={true}
              resizeMode="cover"
              shouldPlay
              isLooping
              style={{
                width: "80%",
                height: 200,
                marginHorizontal: 30,
                marginBottom: 10,
              }}
            />
            <Button
              title={this.state.dstbuttontext}
              disabled={!this.state.dstcanselect}
              color="#2D31AC"
              onPress={() => {
                this._pickdstVid();
              }}
            ></Button>
          </View>
          <View
            style={[
              styles.section,
              {
                flex: 1,
                justifyContent: "center",
                marginHorizontal: 20,
                alignSelf: "center",
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                this.state.isVisible2 ? this.viewModal2() : null;
                this.state.isVisible1 ? this.viewModal1() : null;
              }}
            >
              <Text style={styles.porn}>{this.state.check}</Text>
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView style={[styles.section, styles.footer]}>
            <TextInput
              style={[styles.input, { borderColor: this.state.color }]}
              onChangeText={this.handleoutputname}
              placeholder="Example.mp4"
            />
            <Button
              title="Convert"
              disabled={!this.state.sendok}
              onPress={() => {
                this.conNsub();
              }}
            ></Button>
          </KeyboardAvoidingView>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              alignContent: "center",
              alignSelf: "center",
              marginTop: 15,
            }}
          >
            <Text>{this.state.check}</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "center",
              alignSelf: "stretch",
            }}
          >
            <View
              style={{
                marginHorizontal: 10,
                borderWidth: 1,
              }}
            >
              <Text>{this.state.srcVidcheck.status}</Text>
            </View>
            <View
              style={{
                marginHorizontal: 10,
                borderWidth: 1,
              }}
            >
              <Text>{this.state.dstVidcheck.status}</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              alignContent: "center",
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <Button
              title="ok"
              onPress={() => {
                this.setState({
                  selectscreen: true,
                });
              }}
            ></Button>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  text: {
    color: "#161924",
    fontSize: 20,
    fontWeight: "500",
  },

  select: {
    flex: 3,
    justifyContent: "flex-end",
    marginHorizontal: 20,
  },
  section: {
    alignSelf: "stretch",
  },
  input: {
    flex: 1,
    height: 48,
    width: "70%",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
    fontSize: 18,
  },
  footer: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    justifyContent: "center",
  },
  selectbutton: {
    flexDirection: "row",
    alignItems: "center",
    height: 30,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderWidth: 1,
    height: 48,
    borderColor: colors.blue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
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
  porn: {
    fontSize: 15,
    fontWeight: "bold",
    color: "red",
  },
  box: {
    marginTop: 100,
    borderRadius: 30,
    backgroundColor: "red",
    alignSelf: "stretch",
    marginHorizontal: 30,
    height: 500,
  },
  buttonText: {
    fontSize: 24,
    color: "#00479e",
    textAlign: "center",
  },
  ModalTitle: {
    marginTop: 60,
    textAlign: "center",
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    marginBottom: 15,
  },
  ModalSubTitle: {
    fontSize: 15,
    textAlign: "center",
  },
  modalfirst: {
    flex: 1,
    paddingVertical: 30,
  },
  modalsecond: {
    flex: 3,
  },
  modalthird: {
    flex: 1,
  },
});
