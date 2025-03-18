import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const index = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>This is the Home Screen</Text>
      <Link href="/game" asChild>
        <Pressable>
          <Text>Play!</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
