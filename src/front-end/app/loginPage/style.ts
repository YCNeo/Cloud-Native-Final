import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#F57C00",
    marginTop: 50,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeIconContainer: {
    position: "absolute",
    right: 15,
  },
  eyeIcon: {
    fontSize: 18,
    color: "#ccc",
  },
  optionsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  optionText: {
    fontSize: 14,
    color: "#F57C00",
  },
  forgotPassword: {
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#F57C00",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#000000",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  createButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  socialContainer: {
    width: "100%",
    alignItems: "center",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerText: {
    color: "#999",
    fontSize: 14,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
  },
  socialIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  createAccount: {
    color: "#F57C00",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  welcomeIcon: {
    width: "40%",
    height: "60%",
  },
});

export default styles;
