import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function TranscriptorScreen({ navigation }) {
  return (
    <SafeAreaView>
      <View>
        <Text>Transcriptor screen</Text>
        <Button
          title="Back home"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </SafeAreaView>
  )
}

export default TranscriptorScreen;
