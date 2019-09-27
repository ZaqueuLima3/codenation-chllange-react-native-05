import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  AsyncStorage,
  ActivityIndicator
} from "react-native";

import AccelerationItem from "../components/AccelerationItem";

import accelerations from "./data";

export default function Acceleration({ navigation }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let profile;
    async function loadData() {
      profile = await AsyncStorage.getItem("user");

      if (!profile) {
        navigation.navigate("Login");
      }

      setUser(profile);
      setLoading(false);
      console.log("PERFIL", profile);
    }

    loadData();
  });

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.header}>
            <Image
              className="header-image"
              style={styles.headerImage}
              source={{
                uri:
                  "https://forum.codenation.com.br/uploads/default/original/2X/2/2d2d2a9469f0171e7df2c4ee97f70c555e431e76.png"
              }}
            />
            <Image
              className="profile-image"
              style={styles.headerImage}
              source={{
                uri: user.picture
              }}
            />
          </View>
          <Text style={styles.title}>Acelerações</Text>
          <FlatList
            data={accelerations}
            keyExtractor={item => item.slug}
            renderItem={({ item, index }) => <AccelerationItem item={item} />}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "#7800ff",
    borderBottomWidth: 2,
    padding: 16,
    paddingTop: 55
  },
  headerImage: {
    height: 45,
    width: 250
  },
  title: {
    color: "#7800ff",
    fontSize: 30,
    padding: 16
  }
});
