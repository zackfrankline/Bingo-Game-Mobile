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
          cellValue > 0 ? { color: "black" } : { color: "white" },
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
          cellValue > 0 ? { color: "black" } : { color: "white" },
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
        backgroundColor: "white",
        padding: 20,
        marginVertical: 3,
        marginHorizontal: 3,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "black",
        paddingHorizontal: 4,
        paddingVertical: 4,
        height: 65,
        width: 65,
      },
      cell: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
      },
      title: {
        fontSize: 32,
        color: "#ffffff",
      },
})