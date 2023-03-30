import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import WagerList from "../components/WagerList";
import { fixtures } from "../types";
import {
  WagersScreenNavigationProp,
  WagersScreenRouteProp,
} from "../AppNavigator";

type WagersProps = {
  navigation: WagersScreenNavigationProp;
  route: WagersScreenRouteProp;
};

const Wagers = ({ navigation }: WagersProps) => {
  return (
    <View style={styles.container}>
      <WagerList wagers={fixtures} />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("NewWager")}
      >
        <Text style={styles.addButtonText}>Add Wager</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    backgroundColor: "#6f42c1",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Wagers
