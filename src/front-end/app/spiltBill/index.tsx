import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter, Link } from "expo-router";
import axios from "axios";
import { apiServer } from "@/constants/url";

const Accounting = () => {
  const frontendRouter = useRouter();
  const [records, setRecords] = useState([
    { text: "香蕉", amount: "145" },
    { text: "陶朱隱園", amount: "-$5,000,000,000" }, // 可以添加更多記錄
  ]); // 存放記錄數據
  const [loading, setLoading] = useState(true); // 加載狀態
  const [groupName, setgName] = useState("Group1");
  useEffect(() => {
    const fetchRecords = async () => {
      console.log("fetchRecords");
      try {
        console.log("fetchRecords");
        const response = await axios.post(`${apiServer}/split`);
        console.log("Res", response);
        setRecords(response.data); // 假設後端返回一個記錄數組
      } catch (error) {
        console.error("Error fetching records:", error);
      } finally {
        setLoading(true);
      }
    };

    fetchRecords();
  }, []);

  const getComponent = () => {
    // 茶資料庫
    let amount = 0;
    for (let _ = 0; _ < records.length; _ += 1) {
      if (records[_] && records[_].amount) {
        amount += parseFloat(records[_].amount.replace(/[^\d.-]/g, "")) || 0; // 清除非數字字符
      }
    }
    console.log(records[0].amount);

    return <Text style={styles.amount}>{amount.toLocaleString()}</Text>;
  };

  const getIncome = () => {
    // 茶資料庫
    const amount = 0; // 金額變數

    return <Text style={styles.amount}>${amount.toLocaleString()}</Text>;
  };

  const generateRecordItem = (text, amount) => {
    return (
      <View style={styles.recordItem}>
        <Text style={styles.recordText}>{text}</Text>
        <Text style={styles.recordAmount}>{amount}</Text>
      </View>
    );
  };

  const RecordComponent = () => {
    // 查詢並append 到 records
    // const records = [
    //   {  text: "香蕉", amount: "-$5,000,000,000" },
    //   {  text: "陶朱隱園", amount: "-$5,000,000,000" },
    //   // 可以添加更多記錄
    // ];

    return (
      <ScrollView style={styles.recordContainer}>
        <Text style={styles.recordHeader}>Record</Text>
        {records.map((record, i) =>
          generateRecordItem(`${record.text} ${i + 1}`, record.amount)
        )}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="orange" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Accounting</Text>
      </View> */}

      {/* Group Name and Channel Name */}
      <Text style={styles.groupName}>{groupName}</Text>

      {/* Income and Expense Summary */}
      <View style={styles.summaryContainer}>
        <TouchableOpacity style={styles.summaryBox}>
          <Text style={styles.expenseLabel}>Expence</Text>
          {getComponent()}
        </TouchableOpacity>

        <TouchableOpacity style={styles.startSplit}>
          {/* 串接splitbill 的演算法 */}
          StartSPLIT!!
          {/* <Link href={'/spiltBill/add'}>StartSplit!</Link> */}
        </TouchableOpacity>

        <TouchableOpacity style={styles.summaryBox}>
          <Text style={styles.incomeLabel}>Income</Text>
          {getIncome()}
        </TouchableOpacity>
      </View>

      {/* Balance */}
      {/* <View style={styles.balanceContainer}>
        <View style={styles.circle}>
          <Text style={styles.balanceLabel}>Balance</Text>
          <Text style={styles.balanceAmount}>-$5,000,000,000</Text>
        </View>
      </View> */}

      {/* Record List */}
      <ScrollView style={styles.recordContainer}>
        <Text style={styles.recordHeader}>Record</Text>
        {RecordComponent()}

        {/* <View style={styles.recordItem}>
          <Ionicons name="home" size={24} color="orange" style={styles.recordIcon} />
          <Text style={styles.recordText}>陶朱隱園點擊查看...</Text>
          <Text style={styles.recordAmount}>-$5,000,000,000</Text>
        </View>
        <View style={styles.recordItem}>
          <Ionicons name="home" size={24} color="orange" style={styles.recordIcon} />
          <Text style={styles.recordText}>陶朱隱園點擊查看...</Text>
          <Text style={styles.recordAmount}>-$5,000,000,000</Text>
        </View> */}
      </ScrollView>

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton}>
        <Link href={"/spiltBill/add"}>Add</Link>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  groupName: {
    textAlign: "center",
    marginVertical: 8,
    fontSize: 14,
    color: "#888",
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  summaryBox: {
    alignItems: "center",
  },
  expenseLabel: {
    color: "orange",
    fontSize: 16,
    fontWeight: "bold",
  },
  incomeLabel: {
    color: "orange",
    fontSize: 16,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
  },
  balanceContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#FDEFD4",
    justifyContent: "center",
    alignItems: "center",
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#888",
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginTop: 8,
  },
  recordContainer: {
    backgroundColor: "#444",
    borderRadius: 8,
    marginHorizontal: 16,
    padding: 16,
    flex: 1,
  },
  recordHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "orange",
    marginBottom: 8,
  },
  recordItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },
  recordIcon: {
    marginRight: 8,
  },
  recordText: {
    flex: 1,
    color: "white",
  },
  recordAmount: {
    color: "white",
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  startSplit: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#ffdd99",
    alignItems: "center",
  },
});

export default Accounting;
