import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {UseRealtimeContext} from '../context/RealtimeDtabaseContext';

const CreateRealtimeData = ({onClose, onData, onUpdtedData}) => {
  const realTimeContext = UseRealtimeContext();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [updateImage, setUpdateImage] = useState(null)
  const [description, setDescription] = useState('');
  const [postDescHeight, setPostDescHeight] = useState(100);

  const selectImage = async () => {
    const result = await launchImageLibrary();
    setImage(result?.assets[0]?.uri);
    if(onData){
      setUpdateImage(result?.assets[0]?.uri)
    }
  };


  const handleTextChange = event => {
    const newHeight = Math.max(100, event.nativeEvent.contentSize.height);
    setPostDescHeight(newHeight);
  };
  
  useEffect(() => {
    if (onData) {
      setTitle(onData.title);
      setDescription(onData.description);
      setImage(onData.image);
    }
  }, [onData]);

  const createPost = async () => {
    try {
      const res = await realTimeContext.createPost(image, title, description);
      if (res) {
        onClose();
        setImage(null);
        setTitle('');
        setDescription('');
        setPostDescHeight(100);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const updataPost = async ()=>{
    try {
      const res = await realTimeContext.updatePost(onData.id, updateImage, title, description, onData.image)
      console.log(res)
      if(res){
        onUpdtedData(updateImage, title, description)
        onClose();
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <View>
        <Text
          style={{
            fontFamily: 'MeriendaBold',
            fontSize: 20,
            marginLeft: 12,
            marginBottom: 10,
          }}>
         {onData ? 'Update Your post' : 'What is you think'}
        </Text>
        <TextInput
          style={styles.postTitle}
          placeholder="Post title"
          onChangeText={e => setTitle(e)}
          value={title}
        />
        <TextInput
          style={[styles.postDesc, {height: postDescHeight}]}
          multiline
          placeholder="Write your post here"
          textAlignVertical="top"
          onContentSizeChange={handleTextChange}
          onChangeText={e => setDescription(e)}
          value={description}
        />
        {!image && (
          <TouchableOpacity
            style={styles.imagePickerButton}
            onPress={selectImage}>
            <Text style={styles.imagePickerButtonText}>Select Image</Text>
          </TouchableOpacity>
        )}

        {image && (
          <View style={styles.imagePreviewContainer}>
            <TouchableOpacity
              onPress={() => setImage(null)}
              style={styles.crosBtn}>
              <Text style={styles.crosTetx}>x</Text>
            </TouchableOpacity>
            <Image
              source={{uri: image}}
              style={{
                ...styles.imagePreview,
                marginBottom: image && title && description ? 0 : 50,
              }}
            />
          </View>
        )}
        {image && title && description && (
          <TouchableOpacity
          onPress={onData? updataPost: createPost}
            style={{
              ...styles.imagePickerButton,
              marginBottom: 50,
              padding: 6,
              paddingTop: 0,
            }}>
            <Text style={{...styles.imagePickerButtonText, fontSize: 20}}>
            {onData ? 'Update' : 'Submit'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default CreateRealtimeData;

const styles = StyleSheet.create({
  postTitle: {
    marginTop: 8,
    borderRadius: 10,
    fontSize: 17,
    lineHeight: 20,
    padding: 8,
    borderColor: '#0b958c',
    borderWidth: 1.5,
    marginHorizontal: 10,
    fontFamily: 'MeriendaBold',
  },
  postDesc: {
    borderColor: '#0b958c',
    borderWidth: 1.5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 17,
    padding: 8,
    paddingVertical: 0,
    marginTop: 20,
  },
  imagePickerButton: {
    backgroundColor: '#0b958c',
    borderRadius: 10,
    padding: 10,
    paddingTop: 5,
    marginTop: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  imagePickerButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'MeriendaBold',
  },
  imagePreviewContainer: {
    marginHorizontal: 13,
    position: 'relative',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  imagePreview: {
    width: '100%',
    aspectRatio: 0.8,
    marginTop: 10,
    borderRadius: 10,
  },
  crosBtn: {
    position: 'absolute',
    zIndex: 2,
    marginTop: 10,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
    textAlign: 'center',
  },
  crosTetx: {
    fontSize: 27,
    color: '#fff',
    marginTop: -7,
  },
});
