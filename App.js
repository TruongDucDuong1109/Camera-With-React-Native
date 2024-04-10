// import React, { useState, useEffect, useRef } from "react";
// import { StyleSheet, Text, View, Image } from "react-native";
// import { CameraType, Camera } from "expo-camera";
// import * as MediaLibrary from "expo-media-library";
// import Button from "./src/components/Button";
// import AsyncStorage from '@react-native-async-storage/async-storage';


// export default function App() {
//   const [hasCameraPermission, setHasCameraPermission] =
//     useState(null);
//   const [image, setImage] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);
//   const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
//   const cameraRef = React.useRef(null);

//   useEffect(() => {
//     (async () => {
//       MediaLibrary.requestPermissionsAsync();
//       const cameraStatus = await Camera.getCameraPermissionsAsync();
//       setHasCameraPermission(cameraStatus.status === "granted");
//     })();
//   }, []);

//   const takePicture = async () => {
//     if (cameraRef) {
//       try {
//         const data = await cameraRef.current.takePictureAsync();
//         console.log(data);
//         const fileName = data.uri.split("/").pop();
//         console.log(fileName);
//         setImage(data.uri);
        
//       } catch (error) {
//         console.log("Error taking picture: ", error);
//       }
//     }
//   };

//   const saveImage = async () => {
//     if (image) {
//       try {
//         await MediaLibrary.createAssetAsync(image);
//         alert("Image saved to library");
//         setImage(null);

//       } catch (error) {
//         console.log("Error saving image: ", error);
//       }
//     }
//   };


//   if (hasCameraPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       {!image ? (
//         <Camera
//           style={styles.camera}
//           type={type}
//           flashMode={flash}
//           ref={cameraRef}
//         >
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//               paddingHorizontal: 30,
//               marginTop: 50,
//             }}
//           >
//             <Button
//               icon={"retweet"}
//               onPress={() => {
//                 setType(
//                   type === CameraType.back
//                     ? CameraType.front
//                     : CameraType.back
//                 );
//               }}
//             />
//             <Button
//               icon={"flash"}
//               onPress={() => {
//                 setFlash(
//                   flash === Camera.Constants.FlashMode.off
//                     ? Camera.Constants.FlashMode.on
//                     : Camera.Constants.FlashMode.off
//                 );
//               }}
//             />
//           </View>
//         </Camera>
//       ) : (
//         <Image source={{ uri: image }} style={styles.camera} />
//       )}
//       <View style={{ marginTop: 10 }}>
//         {image ? (
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//               paddingHorizontal: 50,
//             }}
//           >
//             <Button
//               title={"Re-take"}
//               icon="retweet"
//               onPress={() => setImage(null)}
//             />
//             <Button title={"Save"} icon="save" onPress={saveImage} />
//           </View>
//         ) : (
//           <Button
//             title={"Take a picture"}
//             icon="camera"
//             onPress={takePicture}
//           />
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//     justifyContent: "center",
//     paddingBottom: 20,
//   },
//   camera: {
//     flex: 1,
//     borderRadius: 20,
//   },
// });





import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, Platform } from "react-native";
import { CameraType, Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Button from "./src/components/Button";
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.getCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        
        img = data.uri;
        
        setImage(data.uri);
        
        sendImageToComputer(img)
      } catch (error) {
        console.log("Error taking picture: ", error);
      }
    }
  };

  const sendImageToComputer = async (image) => {
    
    if (image) {
      console.log(image);
      try {
        // Đọc tệp ảnh từ đường dẫn và chuyển đổi thành dạng base64
        const base64Image = await FileSystem.readAsStringAsync(image, { encoding: FileSystem.EncodingType.Base64 });
  
        // Gửi dữ liệu ảnh dưới dạng base64 qua yêu cầu POST
        const response = await axios.post('http://10.3.4.46:8000/upload', {
          image: base64Image,
        });
  
        console.log('Image sent successfully');
        setImage(null); // Xóa ảnh sau khi gửi
        alert('Image sent successfully');
      } catch (error) {
        console.error('Error sending image: ', error);
        alert('Error sending image');
      }
    } else {
      alert('No image to send');
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
              marginTop: 50,
            }}
          >
            <Button
              icon={"retweet"}
              onPress={() => {
                setType(
                  type === CameraType.back
                    ? CameraType.front
                    : CameraType.back
                );
              }}
            />
            <Button
              icon={"flash"}
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                );
              }}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      <View style={{ marginTop: 10 }}>
        {image ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 50,
            }}
          >
            <Button
              title={"Re-take"}
              icon="retweet"
              onPress={() => setImage(null)}
            />
            <Button title={"Send"} icon="retweet" onPress={sendImageToComputer} />
          </View>
        ) : (
          <Button
            title={"Take a picture"}
            icon="camera"
            onPress={takePicture}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    paddingBottom: 20,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  },
});
