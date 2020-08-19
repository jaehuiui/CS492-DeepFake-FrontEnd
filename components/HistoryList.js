import React from "react";
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
  console.log(url);
  FileSystem.downloadAsync(url, FileSystem.documentDirectory + name)
    .then(async ({ uri }) => {
      MediaLibrary.saveToLibraryAsync(uri);
      alert("Download Finished, Check the gallery");
    })
    .catch((error) => {
      console.error(error);
    });
}

export default HistoryList = ({ list }) => {
  return (
    <View style={[styles.listContainer, { backgroundColor: list.color }]}>
      <View style={styles.first}>
        <Text style={styles.listTitle} numberOfLines={1}>
          {list.name}
        </Text>
      </View>
      <View style={styles.fourth}>
        <TouchableOpacity
          style={styles.downloadbutton}
          onPress={() => {
            Down(list.uid, list.rid, list.name);
          }}
        >
          <AntDesign name="clouddownloado" size={14} color="white" />
          <Text style={styles.downloadtext}>Download</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  first: {
    flex: 1,
    alignItems: "center",
  },
  second: {
    flex: 1,
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
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 80,
  },
  listTitle: {
    fontSize: 15,
    color: colors.white,
    marginBottom: 10,
  },
  count: {
    fontSize: 10,
    marginBottom: 20,
    color: colors.white,
  },
  subtitle: {
    fontSize: 18,
    color: colors.white,
  },
  downloadbutton: {
    marginVertical: 5,
    width: 70,
    borderWidth: 1,
    padding: 8,
    borderColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  downloadtext: {
    fontSize: 10,
    color: colors.white,
  },
});
