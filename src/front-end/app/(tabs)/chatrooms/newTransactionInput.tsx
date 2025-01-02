import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

export type { InputTransactionProps };

interface InputTransactionProps {
  datetime: string;
  title: string;
  payer: string;
  attendees_ids: string[];
  price: number;
  issplited: boolean;
}

const NewTransactionInput = ({
  onAddTransaction,
}: {
  onAddTransaction: (transaction: InputTransactionProps) => void;
}) => {
  const [datetime, setDatetime] = useState(new Date());
  const [title, setTitle] = useState("");
  const [payer, setPayer] = useState("");
  const [attendees, setAttendees] = useState("");
  const [price, setPrice] = useState("");

  const handleAddTransaction = () => {
    const newTransaction = {
      datetime: datetime.toISOString(),
      title,
      payer,
      attendees_ids: attendees.split(",").map((id) => id.trim()),
      price: parseFloat(price),
      issplited: false, // Default value, adjust as needed
    };
    onAddTransaction(newTransaction);
    clearInputs();
  };

  const clearInputs = () => {
    setDatetime(new Date());
    setTitle("");
    setPayer("");
    setAttendees("");
    setPrice("");
  };

  const isFormValid = () => {
    return (
      title.trim() !== "" &&
      payer.trim() !== "" &&
      attendees.trim() !== "" &&
      price.trim() !== ""
    );
  };

  return (
    <View style={[styles.inputContainer, { flexDirection: "row" }]}>
      {/* <DateTimePicker
        value={datetime}
        mode="datetime"
        display="default"
        onChange={(
          event: DateTimePickerEvent,
          selectedDate: Date | undefined
        ) => {
          const currentDate = selectedDate || datetime;
          setDatetime(currentDate);
        }}
        style={styles.input}
      /> */}
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={(text: string) => setTitle(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Payer"
        value={payer}
        onChangeText={(text: string) => setPayer(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Attendees (comma separated IDs)"
        value={attendees}
        onChangeText={(text: string) => setAttendees(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={(text: string) => setPrice(text)}
        keyboardType="numeric"
        style={styles.input}
      />
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isFormValid() ? "blue" : "grey" },
        ]}
        onPress={handleAddTransaction}
        disabled={!isFormValid()}
      >
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 42,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default NewTransactionInput;
