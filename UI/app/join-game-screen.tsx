import { Styles } from "@/Constants/ContentStyles";
import { useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function JoinGameScreen() {
  const [gameCode, setGameCode] = useState<string>("");

  const handleTextChange = (text: string) => {
    setGameCode(text);
  };

  return (
    <ImageBackground
      resizeMode="stretch"
      style={styles.mainContainer}
      source={require("../assets/images/BingoBackground.png")}
    >
      {/* <View className="main-container" style={styles.mainContainer}> */}
        <View className="join-game-container" style={styles.joinGameContainer}>
          <View className="text-container">
            <Text style={[Styles.titleText,{fontSize:28}]}>Enter Code to Join the Game</Text>
          </View>
          <View className="input-container" style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={gameCode}
              onChangeText={handleTextChange}
              placeholder="Ex. #SDKENV"
              keyboardType="default"
            ></TextInput>
          </View>
          <View className="button-container">
            <Pressable style={[Styles.playButton,{backgroundColor:'#F5853F'}]}>
              <Text style = {[Styles.btnText,{color:'#fff'}]}>Join Game</Text>
            </Pressable>
          </View>
        </View>
      {/* </View> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  joinGameContainer: {
    width: windowWidth * 0.9,
    // height:windowHeight * 0.8,
    borderBlockColor: "black",
    borderRadius: windowWidth * 0.04,
    backgroundColor: "#90ee90",
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "space-evenly",
    // opacity:0.8
  },
  title: {
    fontSize: 28,
    color: "black",
    // fontWeight: '100',
    textAlign: "center",
    fontFamily: "PixelifySans",
  },
  inputContainer: {
    width: "90%",
    height: "20%",
    borderRadius: windowWidth * 0.04,
    // borderBlockColor:'white',
    alignItems: "center",
    justifyContent: "center",
    // borderWidth:3
  },
  textInput: {
    // width: ,
    paddingHorizontal: 10,
    // borderBlockColor: "red",
    borderRadius: windowWidth * 0.04,
    borderWidth: 2,
    width: "100%",
    height: "100%",
    backgroundColor: "#ffff",
  },
  
});
