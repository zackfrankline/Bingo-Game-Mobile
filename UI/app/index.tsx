import { Link } from 'expo-router';
import { Dimensions, Image, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const index = () => {
  return (
    // <View style={styles.mainContainer}>
      <ImageBackground style={styles.mainContainer} resizeMode="stretch" source={require('../assets/images/BingoBackground.png')}>

      <View style={styles.titleTextContainer}>
        <Text style={styles.titleText}>Welcome to</Text>
      </View>
      {/* <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../assets/images/BingoLogo.png')}>
        </Image>
      </View> */}
      <View style={styles.btnContainer}>
        <Link href='/game' asChild>
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
      {/* <Link href="/game" asChild>
        <Pressable style={styles.playButton}>
        <Text style={styles.btnText}>Play!</Text>
        </Pressable>
        </Link> */}
        </ImageBackground>
    // </View>
  );
};

export default index;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: "center",
    backgroundColor: "#F0FFF0",
    paddingVertical:80,
  },
  titleTextContainer:{
    
  },
  titleText: {
    fontSize: 34,
    color: "#130303",
    // fontWeight: '100',
    fontFamily:'PixelifySans'
  },
  // imageContainer:{
  //   display:'flex',
  //   alignItems:'center',
  //   justifyContent:'center',
  //   height:100,
  //   width:100,
  // },

  // image:{

  // },
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
    fontFamily:'PixelifySans'
  },
});
