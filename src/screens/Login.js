import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, AsyncStorage } from "react-native";
import axios from "axios";
import api from "./api";

import styles from "./stylesLogin";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("false");
  const [user, setUser] = useState("false");

  AsyncStorage.getItem("user").then(value => setUser(value));

  useEffect(() => {
    async function loadData() {
      if (user) {
        navigation.navigate("Acceleration");
      }
    }

    loadData();
  });

  function handleSubmit() {
    axios
      .post("https://api.codenation.dev/v1/user/auth", {
        email,
        password
      })
      .then(response => {
        AsyncStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch(err => {
        console.log(err);
      });
    setLoading(true);

    navigation.navigate("Acceleration");
  }

  function handleEmailValidate(email) {
    const valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return valid.test(String(email).toLowerCase());
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        className="email-input"
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Email"
        autoCompleteType="email"
        keyboardType="email-address"
        style={styles.input}
        value={email}
        onChangeText={value => setEmail(value)}
        returnKeyType="next"
      />

      <TextInput
        className="password-input"
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Password"
        autoCompleteType="password"
        secureTextEntry={true}
        textContentType="password"
        style={styles.input}
        value={password}
        onChangeText={value => setPassword(value)}
        returnKeyType="send"
      />

      <Button
        className="submit-login"
        title="Entrar"
        color="#7800ff"
        disabled={
          (handleEmailValidate(email) && password.length) < 1 ||
          loading === true
        }
        onPress={handleSubmit}
      ></Button>
    </View>
  );
}
