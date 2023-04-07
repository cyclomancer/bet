import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import WagerList from "../components/WagerList";
import { fixtures, Wager } from "../types";
import {
  WagersScreenNavigationProp,
  WagersScreenRouteProp,
} from "../AppNavigator";

type WagersProps = {
  navigation: WagersScreenNavigationProp;
  route: WagersScreenRouteProp;
};

const Wagers = ({ navigation }: WagersProps) => {
  const onNav = (wager: Wager) => {
    navigation.navigate("WagerDetail", { wager });
  };
  const wagers = useStore(s => Object.values(s.wagers));
  return (
    <View style={styles.container}>
      <WagerList onNav={onNav} wagers={fixtures} />
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

export default Wagers;
