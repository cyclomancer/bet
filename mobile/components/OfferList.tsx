import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Offer } from "../types"; // Import the Offer type

type OfferListProps = {
  offers: Offer[];
  onNav: (o: Offer) => void;
  // Add navigation props if you want to navigate to an OfferDetail screen
};

const OfferList: React.FC<OfferListProps> = ({ offers, onNav }) => {
  const renderItem = ({ item }: { item: Offer }) => (
    <TouchableOpacity onPress={onNav} style={styles.listItem}>
      <Text style={styles.listItemText}>{item.race}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={offers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listItem: {
    backgroundColor: "#f8f8f8",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  listItemText: {
    fontSize: 18,
  },
});

export default OfferList;
