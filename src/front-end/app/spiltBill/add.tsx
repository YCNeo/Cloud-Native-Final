import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";

const AddExpense = ({ navigation }) => {
  const [payers, setPayers] = useState([""]); // 初始只有一位付款者
  const [splitters, setSplitters] = useState([""]); // 初始只有一位分帳者
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");

  const [groupName, setgName] = useState("Group1");
  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await axios.post("http://13.211.30.75:8000/split/add");
        console.log(response.data[0].channel_name);
        setgName(response.data[0].channel_name); // 假設後端返回一個記錄數組
      } catch (error) {
        console.error("Error fetching records:", error);
      } finally {
      }
    };
    fetchName();
  });

  const addPayer = () => setPayers([...payers, ""]);
  const addSplitter = () => setSplitters([...splitters, ""]);

  const updatePayer = (index, value) => {
    const updated = [...payers];
    updated[index] = value;
    setPayers(updated);
  };

  const updateSplitter = (index, value) => {
    const updated = [...splitters];
    updated[index] = value;
    setSplitters(updated);
  };

  const handleConfirm = async () => {
    // 假設資料需傳至後端
    const expenseData = {
      title,
      amount,
      payers,
      splitters,
      description,
      date: new Date().toISOString(),
    };
    console.log("提交資料:", expenseData);
    try {
      const response = await axios.post(
        "http://13.211.30.75:8000/split/addBill",
        expenseData
      );
      console.log(response);
    } catch (error) {
      console.error("Error Add Bill records:", error);
    } finally {
    }
    // 可用於跳轉回上一頁
    // navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.groupChannel}>{groupName}</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="$0"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <TextInput
          style={[styles.input, { flex: 2 }]}
          placeholder="帳務名稱"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.section}>
        <Text>Payer ({payers.length})</Text>
        {payers.map((payer, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder="新增付款者"
            value={payer}
            onChangeText={(value) => updatePayer(index, value)}
          />
        ))}
        {/* <TouchableOpacity style={styles.addButton} onPress={addPayer}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.section}>
        <Text>Splitter</Text>
        {splitters.map((splitter, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder="新增分帳者"
            value={splitter}
            onChangeText={(value) => updateSplitter(index, value)}
          />
        ))}
        <TouchableOpacity style={styles.addButton} onPress={addSplitter}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.section}>Description</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Tap here to write"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    padding: 16,
  },
  groupChannel: {
    textAlign: "center",
    color: "#aaa",
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    margin: 4,
  },
  dateText: {
    textAlign: "center",
    color: "#fff",
    marginBottom: 16,
  },
  section: {
    marginVertical: 16,
  },
  textArea: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    minHeight: 80,
  },
  addButton: {
    alignSelf: "center",
    marginVertical: 8,
    backgroundColor: "#ffa500",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
  },
  confirmButton: {
    marginTop: 16,
    backgroundColor: "#ffa500",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AddExpense;
