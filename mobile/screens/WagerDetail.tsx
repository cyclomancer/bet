import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  WagerDetailScreenNavigationProp,
  WagerDetailScreenRouteProp,
} from "../AppNavigator";

type WagerDetailProps = {
  navigation: WagerDetailScreenNavigationProp;
  route: WagerDetailScreenRouteProp;
};

const WagerDetail: React.FC<WagerDetailProps> = ({ navigation, route }) => {
  const wager = route.params.wager;

  const markAsResolved = () => {
    // Implement logic to mark the wager as resolved
  };

  const markAsPaid = () => {
    // Implement logic to mark the wager as paid
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wager Details</Text>
      <Text style={styles.label}>Race: {wager.race}</Text>
      {/* Add more details about the wager as necessary */}

      <TouchableOpacity style={styles.button} onPress={markAsResolved}>
        <Text style={styles.buttonText}>Mark as Resolved</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={markAsPaid}>
        <Text style={styles.buttonText}>Mark as Paid</Text>
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
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#6f42c1",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default WagerDetail;
