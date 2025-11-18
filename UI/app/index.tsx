import { Link } from "expo-router";
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";


// export const WINDOW_WIDTH = windowWidht;
// export const WINDOW_HEIGHT = windowHeight;

const index = () => {
  return (
    // <View style={styles.mainContainer}>
    <ImageBackground
      style={styles.mainContainer}
      resizeMode="stretch"
      source={require("../assets/images/BingoBackground.png")}
    >
      <View style={styles.titleTextContainer}>
        <Text style={styles.titleText}>Welcome to</Text>
      </View>

      <View style={styles.btnContainer}>
        <Link href="/join-game-screen" asChild>
          <Pressable style={styles.playButton}>
            <Text style={styles.btnText}>Join a Game</Text>
          </Pressable>
        </Link>
        <Pressable style={[styles.playButton, { backgroundColor: "#F5853F" }]}>
          <Text style={[styles.btnText, { color: "black" }]}>
            Create Server
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default index;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F0FFF0",
    paddingVertical: 80,
  },
  titleTextContainer: {},
  titleText: {
    fontSize: 34,
    color: "#130303",
    // fontWeight: '100',
    fontFamily: "PixelifySans",
  },
  btnContainer: {},
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
