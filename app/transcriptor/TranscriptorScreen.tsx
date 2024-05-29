import { useState } from "react";
import { Button, PermissionsAndroid, Platform, StyleSheet, Text, View } from "react-native";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import RNFetchBlob from "rn-fetch-blob";
import Config from "react-native-config";

const audioRecordPlayer = new AudioRecorderPlayer();

function TranscriptorScreen({ navigation }) {
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [text, setText] = useState('');
  const [buttonText, setButtonText] = useState('TRANSCRIBIR');

  const dirs = RNFetchBlob.fs.dirs;
  const uri = Platform.select({
    ios: 'hello.mp4',
    android: `${dirs.CacheDir}/hello.mp3`,
  });

  const sendAudio = async (uri) => {
    const form = new FormData();
    form.append('audio', {
      //uri: RNFetchBlob.wrap(uri),
      uri: 'file://'+uri,
      type: 'audio/mpeg',
      name: 'audio.mp3',
    });
    try {
      const response = await fetch(`${Config.API_URL}/transcribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: form
      });
      const json = await response.text();
      console.log('response:', json);
      setText(json);

    } catch(err) {
      console.log('got error:',err);
    }
  }

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
    setText('');
    setButtonText('GRABANDO');
    try {
      const result = await audioRecordPlayer.stopRecorder();
      console.log('result from stopping recorder:', result);
      startPlaying();
    } catch (error) {
      console.log('error stopping recording:', error);
    }

    audioRecordPlayer.removeRecordBackListener();
    setRecording(false);
  };

  const startPlaying = async () => {
    console.log('trying to play uri:', uri);

    try {
      const result = await audioRecordPlayer.startPlayer(uri);
      console.log('result from playing:', result);
      sendAudio(uri);
      setPlaying(true);
      setButtonText('DETENER')
      setTimeout(() => {
        //this is a hack, we should check the time and stop correctly.
        stopPlaying();
      }, 30_000);
    } catch (error) {
      console.log('error playing audio:', error);
    }
  }

  const stopPlaying = async () => {
    try {
      setButtonText('TRANSCRIBIR')
      const result = await audioRecordPlayer.stopPlayer();
      console.log('result from stoping playing:', result); 
      setPlaying(false);
    } catch (error) {
      console.log('error stop playing', error);
    }
  }

  return (
    <View style={styles.view}>
      <Button
        title={recording ? 'Detener' : 'Iniciar grabacion'}
        onPress={recording ? stopRecording : startRecording}
      />
      <Text style={{ color: 'black', fontWeight: 500 }}>
        {text}
      </Text>
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
