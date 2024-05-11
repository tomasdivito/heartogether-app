import { Button, StyleSheet, Text, View } from "react-native";

function TranscriptorScreen({ navigation }) {
  return (
    <View style={styles.view}>
      <Text>Transcriptor screen</Text>
      <Button
        title="Back home"
        onPress={() => navigation.navigate("Home")}
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

export default TranscriptorScreen;
