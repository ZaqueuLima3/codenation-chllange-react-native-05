import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, AsyncStorage } from "react-native";
import api from "./api";

import styles from "./stylesLogin";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("false");

  useEffect(() => {
    async function loadData() {
      const profile = await AsyncStorage.getItem("user");

      if (profile) {
        // navigation.navigate("Acceleration");
      }
    }

    loadData();
  });

  async function handleSubmit() {
    setLoading(true);
    try {
      const response = await api.post("user/auth", {
        email,
        password
      });

      const user = response.data;

      AsyncStorage.setItem("user", JSON.stringify(user));

      navigation.navigate("Acceleration");
    } catch (err) {
      etLoading(false);
      console.log(err);
    }
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
