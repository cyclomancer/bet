import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { formatDa } from "@urbit/aura";
import { unixToDa } from "@urbit/api";
import useStore from "../store";
import { Offer } from "../types";

interface FormState {
  race: string;
  who: string;
  side: boolean;
  max: number;
}

const WagerForm = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormState>();

  const onSubmitForm = async ({ race, who, side, max }: FormState) => {
    const id = formatDa(unixToDa(Date.now()));
    const offer: Offer = {
      id,
      who,
      race,
      bitch: false,
      heat: null,
      pick: {
        side,
        max: parseInt(max, 10),
      },
      source: "sent",
    };
    console.log(offer);
    await useStore.getState().addOffer(offer);

    reset();
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Description of event being bet on:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="~hastuc-dibtux loses his fight to ~tondes-sitrym"
          />
        )}
        name="race"
        rules={{ required: "Description is required." }}
      />
      <Text style={styles.label}>Who are you betting?</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="~hodrex-hodlyr"
          />
        )}
        name="who"
        rules={{ required: "Counterparty is required." }}
      />

      <Text style={styles.label}>What side of the bet are you taking:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.switchContainer}>
            <Text>Happens</Text>
            <Switch value={value} onValueChange={onChange} />
            <Text>Does Not Happen</Text>
          </View>
        )}
        name="side"
        defaultValue={false}
      />

      <Text style={styles.label}>Maximum stakes:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Max stakes (e.g., 100)"
            keyboardType="numeric"
          />
        )}
        name="max"
        rules={{ required: "Max is required." }}
      />

      {/*<Text style={styles.label}>Odds (Favor / Against):</Text>
      <View style={styles.oddsContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.oddsInput}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Favor (e.g., 2)"
              keyboardType="numeric"
            />
          )}
          name="favor"
          rules={{ required: "Favor odds are required." }}
        />
        <Text>/</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.oddsInput}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Against (e.g., 3)"
              keyboardType="numeric"
            />
          )}
          name="against"
          rules={{ required: "Against odds are required." }}
        />
      </View>
      */}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmitForm)}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 20,
    width: "100%",
  },
  label: {
    marginTop: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  oddsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  oddsInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: "#6f42c1",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontStyle: "italic",
  },
});

export default WagerForm;
