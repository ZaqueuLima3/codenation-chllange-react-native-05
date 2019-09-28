import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import api from "./api";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);

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
        navigation.navigate("Acceleration");
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
    setLoading(true);
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

      <TouchableOpacity
        style={styles.btn}
        className="submit-login"
        title="Entrar"
        disabled={
          (handleEmailValidate(email) && password.length) < 1 ||
          loading === true
        }
        onPress={handleSubmit}
      >
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20
  },
  title: {
    color: "#7800ff",
    fontSize: 30,
    padding: 16
  },
  input: {
    width: "100%",
    height: 43,
    marginBottom: 10,
    fontSize: 14,
    paddingLeft: 10,
    marginHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa"
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 43,
    marginTop: 5,
    backgroundColor: "#7800ff",
    borderRadius: 4
  },
  btnText: {
    fontWeight: "bold",
    color: "#fff"
  }
});
