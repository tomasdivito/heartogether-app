import { useState } from "react";
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";

const LANGUAGES = [
  { name: 'ESP', icon: require('../../images/CountryFlags/ar.png') },
  { name: 'ING', icon: require('../../images/CountryFlags/us.png') },
];

function LanguageSelector({}) {
  const [language, setLanguage] = useState(LANGUAGES[0]);
  return (
    <View style={styles.container}>
      <Pressable onPress={() => setLanguage(language => language.name === 'ESP' ? LANGUAGES[1] : LANGUAGES[0])}>
        <View>
          <ImageBackground style={styles.countryFlagIcon} source={language.icon}>
            <View style={styles.background}>
              <Text style={styles.languageText}>{language.name}</Text>
            </View>
          </ImageBackground>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  background: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryFlagIcon: {
    width: 100,
    height: 50,
    resizeMode: 'cover'
  },
  languageText: {
    color: 'white',
  }
});

export default LanguageSelector;
