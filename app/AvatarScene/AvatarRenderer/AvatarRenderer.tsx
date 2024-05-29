import { Button, StyleSheet, View } from "react-native";
import { Canvas, useFrame, useThree } from '@react-three/fiber/native';
import Avatar from './Avatar';
import { Suspense, useEffect, useRef, useState } from "react";
import { Camera } from "three";
import { Environment, Sky } from "@react-three/drei/native";
import { suspend } from "suspend-react";



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

const UpdateCamera = ({ positionX, positionY, positionZ}) => {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(positionX, positionY, positionZ);
    camera.updateProjectionMatrix();
  }, [positionX, positionY, positionZ]);
  return null;
};

function AvatarRenderer({}) {
  const [positionX, setPositionX] = useState(-2);
  const [positionY, setPositionY] = useState(3);
  const [positionZ, setPositionZ] = useState(4);
  const cameraRef = useRef<Camera>();

  useEffect(() => {
    console.log(positionX,'-',positionY,'-',positionZ);
  }, [positionX, positionY, positionZ])

  return (
    <View style={styles.container}>
      <Canvas
        onCreated={state => {
          cameraRef.current = state.camera; 
          onCanvasCreated(state);
        }}
        camera={{ position: [positionX, positionY, positionZ], fov: 36 }}
      >
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <Avatar />
        </Suspense>
        <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
        <UpdateCamera positionX={positionX} positionY={positionY} positionZ={positionZ} />
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

/*
<View>
          <Button
            title=""
            onPress={() => setPositionX(prev => prev + 1)}
          />
          <Button
            title=""
            onPress={() => setPositionX(prev => prev - 1)}
          />
          <Button
            title=""
            onPress={() => setPositionY(prev => prev + 1)}
          />
          <Button
            title=""
            onPress={() => setPositionY(prev => prev - 1)}
          />
          <Button
            title=""
            onPress={() => setPositionZ(prev => prev + 1)}
          />
          <Button
            title=""
            onPress={() => setPositionZ(prev => prev - 1)}
          />
        </View>
        */
export default AvatarRenderer;
