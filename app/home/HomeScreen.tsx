import { Button, StyleSheet, Text, View } from "react-native";

function HomeScreen({ navigation }): React.JSX.Element {
  return (
    <View style={styles.view}>
      <Text>Home Screen</Text>
      <Button
        title="Avatar Scene"
        onPress={() => navigation.navigate("AvatarScene")}
      />
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
