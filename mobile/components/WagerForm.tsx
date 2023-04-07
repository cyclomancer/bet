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

const WagerForm = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitForm = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Race:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Team A vs Team B"
          />
        )}
        name="race"
        rules={{ required: "Race is required." }}
      />

      <Text style={styles.label}>When:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Timestamp (e.g., 1648598400)"
            keyboardType="numeric"
          />
        )}
        name="when"
        rules={{ required: "Timestamp is required." }}
      />

      <Text style={styles.label}>Side:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.switchContainer}>
            <Text>Against</Text>
            <Switch value={value} onValueChange={onChange} />
            <Text>For</Text>
          </View>
        )}
        name="side"
        defaultValue={false}
      />

      <Text style={styles.label}>Max:</Text>
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

      <Text style={styles.label}>Odds (Favor / Against):</Text>
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
