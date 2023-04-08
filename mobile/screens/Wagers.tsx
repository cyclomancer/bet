import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import WagerList from "../components/WagerList";
import OfferList from "../components/OfferList";
import { fixtures, Wager, Offer } from "../types";
import useStore from "../store";
import {
  WagersScreenNavigationProp,
  WagersScreenRouteProp,
} from "../AppNavigator";

type WagersProps = {
  navigation: WagersScreenNavigationProp;
  route: WagersScreenRouteProp;
};

const Wagers = ({ navigation }: WagersProps) => {
  const onWagerNav = (wager: Wager) => {
    navigation.navigate("WagerDetail", { wager });
  };
  const onOfferNav = (offer: Offer) => {
    navigation.navigate("OfferDetail", { offer });
  };

  const wagers = useStore((s) => Object.values(s.wagers));
  const offers = useStore((s) => Object.values(s.offers));
  return (
    <View style={styles.container}>
      <WagerList onNav={onWagerNav} wagers={wagers} />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("NewWager")}
      >
        <Text style={styles.addButtonText}>Add Wager</Text>
      </TouchableOpacity>
      <OfferList onNav={onOfferNav} offers={offers} />
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
