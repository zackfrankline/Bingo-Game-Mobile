import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  titleText: {
    fontSize: 34,
    color: "#130303",
    // fontWeight: '100',
    fontFamily: "PixelifySans",
  },
  playButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 20,
    backgroundColor: "#FFCDBC",
    margin: 10,
    shadowOpacity: 2,
    shadowOffset: { width: 1, height: 2 },
    shadowColor: "#2a3439",
    shadowRadius: 2,
  },
  btnText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "PixelifySans",
  },
});
