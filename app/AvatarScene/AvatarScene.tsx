import { StyleSheet, View } from "react-native";
import MenuSection from "./MenuSection/MenuSection";
import AvatarRenderer from "./AvatarRenderer/AvatarRenderer";
import TranscriptorScreen from "../transcriptor/TranscriptorScreen";

function AvatarScene({ navigation }) {
  return (
    <View style={styles.container}>
      <AvatarRenderer />
      <MenuSection />
      <TranscriptorScreen navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AvatarScene;
