import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView>
      <View>
        <Text>Home Screen</Text>
        <Button
          title="Go to transcriptor" 
          onPress={() => navigation.navigate("Transcriptor")}
        />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen;
