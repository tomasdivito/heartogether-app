import { useState } from "react";
import { Button, PermissionsAndroid, Platform, StyleSheet, Text, View } from "react-native";
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSourceAndroidType } from "react-native-audio-recorder-player";
import RNFetchBlob from "rn-fetch-blob";

const audioRecordPlayer = new AudioRecorderPlayer();

function TranscriptorScreen({ navigation }) {
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);

  const dirs = RNFetchBlob.fs.dirs;
  const uri = Platform.select({
    ios: 'hello.mp4',
    android: `${dirs.CacheDir}/hello.mp3`,
  });
  const startRecording = async () => {
    // handle permissions
    // TODO: move this to work only when need it
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
    
        console.log('write external stroage', grants);
    
        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissions granted');
        } else {
          console.log('All required permissions not granted');
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    setRecording(true);
    console.log('permission requested...');
    try {
      const result = await audioRecordPlayer.startRecorder(uri);
      console.log('result from playing recorder:', result);
    } catch (error) {
      console.log('error recording:', error);
    }
    audioRecordPlayer.addRecordBackListener(event => {
      console.log(event);
    });
  } 

  const stopRecording = async () => {
    try {
      const result = await audioRecordPlayer.stopRecorder();
      console.log('result from stopping recorder:', result);
    } catch (error) {
      console.log('error stopping recording:', error);
    }

    audioRecordPlayer.removeRecordBackListener();
    setRecording(false);
  };

  const startPlaying = async () => {
    try {
      const result = await audioRecordPlayer.startPlayer(uri);
      console.log('result from playing:', result);
      setPlaying(true);
    } catch (error) {
      console.log('error playing audio:', error);
    }
  }

  const stopPlaying = async () => {
    try {
      const result = await audioRecordPlayer.stopPlayer();
      console.log('result from stoping playing:', result); 
      setPlaying(false);
    } catch (error) {
      console.log('error stop playing', error);
    }
  }

  return (
    <View style={styles.view}>
      <Text>Transcriptor screen</Text>
      <Button
        title={recording ? 'Parar grabacion' : 'Iniciar grabacion'}
        onPress={recording ? stopRecording : startRecording}
      />
      <Button
        title={playing ? 'Detener reproduccion' : 'Reproducir'}
        onPress={playing ? stopPlaying : startPlaying}
      />
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
