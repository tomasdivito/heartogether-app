import { Button, StyleSheet, Text, View } from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.view}>
      <Text>Home Screen</Text>
      <Button
        title="Go to transcriptor" 
        onPress={() => navigation.navigate("Transcriptor")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
