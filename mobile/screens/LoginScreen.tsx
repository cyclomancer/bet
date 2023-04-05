import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Keychain from "react-native-keychain";
import * as SecureStore from "expo-secure-store";
import {
  LoginScreenNavigationProp,
  LoginScreenRouteProp,
} from "./AppNavigator";

type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

interface Credentials {
  username: string;
  ship: string;
  password: string;
}

async function getCredentials(): Credentials | undefined {
  const [username, ship, password] = await Promise.all([
    SecureStore.getItemAsync("username"),
    SecureStore.getItemAsync("ship"),
    SecureStore.getItemAsync("password"),
  ] as const);
  if (username.length === 0) {
    return undefined;
  }
  return { username, ship, password };
}

async function saveCredentials(cred: Credentials) {
  await Promise.all([
    SecureStore.setItemAsync("username", cred.username),
    SecureStore.setItemAsync("ship", cred.ship),
    SecureStore.setItemAsync("password", cred.password),
  ]);
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [ship, setShip] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchCredentials = async () => {
      const credentials = await getCredentials();

      if (credentials) {
        setUsername(credentials.username);
        setPassword(credentials.password);
        setShip(credentials.ship);
        // Attempt to login with the saved credentials
        handleLogin();
      }
    };

    fetchCredentials();
  }, []);

  const handleLogin = async () => {
    // Implement your authentication logic here
    //
    await saveCredentials({ ship, username, password });

    navigation.replace("Wagers");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
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
        onChangeText={setPassword}
        value={password}
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
