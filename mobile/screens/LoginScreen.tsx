import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import {
  LoginScreenNavigationProp,
  LoginScreenRouteProp,
} from "../AppNavigator";
import { Credentials } from "../types";
import useStore from "../store";

type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

async function getCredentials(): Promise<Credentials | undefined> {
  const [url, ship, code] = await Promise.all([
    SecureStore.getItemAsync("url"),
    SecureStore.getItemAsync("ship"),
    SecureStore.getItemAsync("code"),
  ] as const);
  if (!url || url.length === 0) {
    return undefined;
  }
  return { url, ship, code };
}

async function saveCredentials(cred: Credentials) {
  await Promise.all([
    SecureStore.setItemAsync("url", cred.url),
    SecureStore.setItemAsync("ship", cred.ship),
    SecureStore.setItemAsync("code", cred.code),
  ]);
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [url, setUrl] = useState("");
  const [ship, setShip] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const fetchCredentials = async () => {
      const credentials = await getCredentials();

      if (credentials) {
        setUrl(credentials.url);
        setCode(credentials.code);
        setShip(credentials.ship);
        // Attempt to login with the saved credentials
      }
    };

    fetchCredentials();
  }, []);

  const handleLogin = async () => {
    await useStore.getState().login({ ship, url, code });
    // Implement your authentication logic here
    //
    await saveCredentials({ ship, url, code });

    await useStore.getState().initialize();

    navigation.replace("Wagers");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="URL"
        onChangeText={setUrl}
        value={url}
      />
      <TextInput
        style={styles.input}
        placeholder="Ship"
        onChangeText={setShip}
        value={ship}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setCode}
        value={code}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#6f42c1",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default LoginScreen;
