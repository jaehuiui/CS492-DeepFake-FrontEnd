import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import colors from "../app/config/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import firebase from "firebase";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

async function Down(uid, rid, name) {
  const path = "/users/" + uid + "/" + rid + "/result/out.mp4";
  const url = await firebase.storage().ref(path).getDownloadURL();
  FileSystem.downloadAsync(url, FileSystem.documentDirectory + name)
    .then(async ({ uri }) => {
      MediaLibrary.saveToLibraryAsync(uri);
      await firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("rid")
        .doc(rid)
        .delete()
        .then(() => {
          console.log("storage delete success!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
      await firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("history")
        .doc(rid)
        .set({ name: name, rid: rid, uid: uid })
        .then(() => {
          console.log("storage add success!");
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
      alert("Download Finished, Check the gallery");
    })
    .catch((error) => {
      console.error(error);
    });
}

export default OngoingList = ({ list }) => {
  if (list.status === "done") {
    return (
      <View style={[styles.listContainer, { backgroundColor: list.color }]}>
        <View style={styles.first}>
          <Text style={styles.listTitle} numberOfLines={1}>
            {list.name}
          </Text>
        </View>
        <View style={styles.second}>
          <Text style={styles.count}>Converted</Text>
        </View>
        <View style={styles.third}>
          <Text style={styles.subtitle}>Check the Result</Text>
        </View>
        <View style={styles.fourth}>
          <TouchableOpacity
            style={styles.downloadbutton}
            onPress={() => {
              Down(list.uid, list.rid, list.name);
            }}
          >
            <AntDesign name="clouddownloado" size={28} color="white" />
            <Text style={styles.downloadtext}>Download</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={[styles.listContainer, { backgroundColor: list.color }]}>
        <View style={styles.first}>
          <Text style={styles.listTitle} numberOfLines={1}>
            {list.name}
          </Text>
        </View>
        <View style={styles.second}>
          <Text style={styles.count}>On Going</Text>
        </View>
        <View style={styles.third}>
          <Text style={styles.subtitle}>Converting...</Text>
        </View>
        <View style={styles.fourth}></View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  first: {
    flex: 2,
    alignItems: "center",
  },
  second: {
    flex: 2,
    alignItems: "center",
  },
  third: {
    flex: 1,
    alignItems: "center",
  },
  fourth: {
    flex: 1,
    alignItems: "center",
  },
  listContainer: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 230,
  },
  listTitle: {
    fontSize: 25,
    color: colors.white,
    marginBottom: 10,
  },
  count: {
    fontSize: 40,
    marginBottom: 20,
    color: colors.white,
  },
  subtitle: {
    fontSize: 18,
    color: colors.white,
  },
  downloadbutton: {
    marginVertical: 5,
    width: 150,
    borderWidth: 1,
    padding: 2,
    borderColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  downloadtext: {
    margin: 5,
    color: colors.white,
  },
});
