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

import {Styles} from '../Constants/ContentStyles.js'


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
      <View>
        <Text style={Styles.titleText}>Welcome to</Text>
      </View>

      <View>
        <Link href="/join-game-screen" asChild>
          <Pressable style={Styles.playButton}>
            <Text style={Styles.btnText}>Join a Game</Text>
          </Pressable>
        </Link>
        <Pressable style={[Styles.playButton, { backgroundColor: "#F5853F" }]}>
          <Text style={[Styles.btnText, { color: "black" }]}>
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
  
});
