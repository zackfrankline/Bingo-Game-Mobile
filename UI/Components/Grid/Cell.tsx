import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";

interface CellProps {
  index: number;
  x: number;
  y: number;
  color: string;
  cellValue: number;
  handlePress(cellValue: number, index: number): void;
}

const Cell = ({ index, x, y, cellValue, handlePress, color }: CellProps) => (
  <Pressable
    onPress={() => handlePress(cellValue, index)}
    style={styles.cellContainer}
  >
    <View style={[styles.cell, { backgroundColor: `${color}` }]}>
      <Text
        style={[
          styles.title,
          cellValue > 0 ? { color: "white" } : { color: "black" },
        ]}
      >
        {cellValue}
      </Text>
    </View>
  </Pressable>
);

const PcCell = ({ index, x, y, cellValue, handlePress, color }: CellProps) => (
  <Pressable style={styles.cellContainer}>
    <View style={[styles.cell, { backgroundColor: `${color}` }]}>
      <Text
        style={[
          styles.title,
          cellValue > 0 ? { color: "white" } : { color: "black" },
        ]}
      >
        {cellValue}
      </Text>
    </View>
  </Pressable>
);

export default Cell;

const styles = StyleSheet.create({
  cellContainer: {
    justifyContent: "center",
    backgroundColor: "#F0FFF0",
    padding: 20,
    marginVertical: 3,
    marginHorizontal: 3,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#563C5C",
    paddingHorizontal: 4,
    paddingVertical: 4,
    height: 65,
    width: 65,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#2a3439",
    shadowRadius: 1.2,
  },
  cell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "#1FA1D2",
    opacity: 1,
  },
  title: {
    fontSize: 32,
    fontFamily: "PixelifySans",
    color: "#ffffff",
  },
});
