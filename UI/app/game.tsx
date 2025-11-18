//use ContextAPI to prop drill states between cells and grid components

import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import userCellData from "../Grid Mock Data/userCellData";

import { pcCellData, pcIndex } from "../Grid Mock Data/pcCellData";
import { current, randomPcGridFill } from "../logic/randomNumberGeneration";
import Cell from "../Components/Grid/Cell";

import { useGameEngine } from "@/hooks/useGameEngine";

// pcChecker
interface CellProps {
  index: number;
  x: number;
  y: number;
  color: string;
  cellValue: number;
  handlePress(cellValue: number, index: number): void;
}

export default function GameScreen() {
  const {
    counter,
    filledStatus,
    gameStatus,
    turn,
    handlePress,
    handleConfirmPress,
    nextPlayerTurn,  
    winner,
  } = useGameEngine();

  // console.log(unmarked);
  randomPcGridFill(pcCellData, pcIndex, counter);

  if (!turn) {
    setTimeout(() => {
      nextPlayerTurn(current);
    }, 2000);
  }

  return (
    <View style={styles.mainContainer}>
      <Modal visible={!!winner} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.winnerText}>{winner} Wins!</Text>
          </View>
        </View>
      </Modal>
      {!filledStatus ? (
        <>
          <Text style={styles.headerTitle}>Press cell to fill number</Text>
          <Text style={styles.headerTitle}>Number:</Text>
          <Text style={styles.headerTitle}>{counter}</Text>
        </>
      ) : gameStatus ? (
        <>
          {!turn ? (
            <Text style={[styles.title, { color: "blue" }]}>
              PC Chose: {current}
            </Text>
          ) : (
            <Text style={[styles.title, { color: "#000000" }]}>Your Turn!</Text>
          )}
        </>
      ) : (
        <>
          <Text style={styles.headerTitle}>Lets Begin</Text>
          <Pressable onPress={handleConfirmPress} style={styles.confirmButton}>
            <Text style={styles.buttonText}>Confirm</Text>
          </Pressable>
        </>
      )}

      {/* <FlatList
        contentContainerStyle={styles.flatList}
        style={styles.flatlistContainer}
        data={pcCellData}
        renderItem={({ item, index }) => (
          <PcCell
          index={index}
          x={item.x}
          y={item.y}
          cellValue={item.value}
          color={item.color}
          handlePress={handlePress}
          />
          )}
          keyExtractor={(cell) => cell.x + "," + cell.y}
          numColumns={5}
          /> */}
      <View style={styles.flatList}>
        <FlatList
          style={styles.flatlistContainer}
          data={userCellData}
          renderItem={({ item, index }) => (
            <Cell
              index={index}
              x={item.x}
              y={item.y}
              cellValue={item.value}
              color={item.color}
              handlePress={handlePress}
            />
          )}
          keyExtractor={(cell) => cell.x + "," + cell.y}
          numColumns={5}
        />
      </View>
      <Text style={styles.bingoText}>B I N G O</Text>
      {/* </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#90ee90",
  },

  flatList: {
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 1,
    shadowOffset: { width: 2, height: 4 },
    shadowColor: "#2a3439",
    shadowRadius: 4,
    // marginLeft:20,
    // marginRight:20,
  },
  flatlistContainer: {
    borderWidth: 10,
    borderRadius: 30,
    borderColor: "#f0fff0",
    flexGrow: 0,
    marginBottom: 50,
    marginTop: 20,
    // marginHorizontal: 50,
    padding: 5,
    backgroundColor: "#1fa1d2",
    opacity: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: "PixelifySans",
    // marginHorizontal:50,
    marginBottom: 20,
    // marginTop: 0,
  },
  title: {
    fontSize: 32,
    color: "#ffffff",
  },
  bingoText: {
    fontSize: 32,
    fontFamily: "PixelifySans",
  },
  confirmButton: {
    shadowOpacity: 1,
    shadowOffset: { width: 2, height: 4 },
    shadowColor: "#2a3439",
    shadowRadius: 4,
    margin: 10,
    borderRadius: 20,
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1fa1d2",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "PixelifySans",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  winnerText: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
