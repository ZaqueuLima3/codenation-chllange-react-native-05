import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

import AccelerationItem from "../components/AccelerationItem";

// import accelerations from "./data";

export default class Acceleration extends Component {
  state = {
    user: {},
    loading: true,
    accelerations: null
  };

  componentWillMount() {
    AsyncStorage.getItem("user").then(value => {
      const userParser = JSON.parse(value);
      this.setState({ user: userParser });
    });
  }

  componentDidMount() {
    const { user } = this.state;
    const { navigation } = this.props;

    if (!user) {
      return navigation.navigate("Login");
    }

    console.log("TEEEST", user);
    axios
      .get("https://api.codenation.dev/v1/acceleration")
      .then(response => {
        this.setState({ accelerations: response.data, loading: false });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { accelerations, loading, user } = this.state;
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
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Profile")}
              >
                <Image
                  className="profile-image"
                  style={styles.profileImage}
                  source={{
                    uri: user.picture
                  }}
                />
              </TouchableOpacity>
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
  },
  profileImage: {
    borderRadius: 22,
    height: 45,
    width: 45
  }
});
