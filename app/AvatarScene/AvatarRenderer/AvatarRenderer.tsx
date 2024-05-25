import { StyleSheet, View } from "react-native";
import { Canvas } from '@react-three/fiber/native';
import { Environment } from '@react-three/drei/native';
import Avatar from './Avatar';
import { Suspense } from "react";

const onCanvasCreated = (state: any) => {
  // state.camera.lookAt(0, 0, -10);
  const _camera = state.camera, _size = state.size;
  _camera.aspect = _size.width/_size.height;
  _camera.updateProjectionMatrix();
  const _gl = state.gl.getContext();
  _gl.gammaFactor = 2.2;
  const pixelStorei = _gl.pixelStorei.bind(_gl);
  _gl.pixelStorei = function(...args: any) {
    const [parameter] = args;
    switch (parameter) {
      case _gl.UNPACK_FLIP_Y_WEBGL:
        return pixelStorei(...args);
    }
  };
};

function AvatarRenderer({}) {
  return (
    <View style={styles.container}>
      <Canvas
        onCreated={onCanvasCreated}
        camera={{ position: [-6, 0, 16], fov: 36 }}
      >
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <Avatar />
        </Suspense>
        <Environment preset="studio" background />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    minHeight: 400, // hardcoded for testing
  }
});

export default AvatarRenderer;
