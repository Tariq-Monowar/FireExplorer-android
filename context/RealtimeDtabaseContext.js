import {createContext, useContext, useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';

export const RealtimeContext = createContext(null);

export const UseRealtimeContext = () => useContext(RealtimeContext);

export const RealtimeContextProvider = ({children}) => {
  const [uploadeLoading, setUploadeLoading] = useState(false);
  const [findData, setFindData] = useState([]);
  const [findDataLoading, setFindDataLoading] = useState(true);

  const createPost = async (image, title, description) => {
    try {
      setUploadeLoading(true);
      const imageRef = storage().ref(`Realtime/${Date.now()}.png`);
      await imageRef.putFile(image);

      const downloadURL = await imageRef.getDownloadURL();

      await database().ref(`/Posts/${uuid.v4()}`).set({
        title: title,
        description: description,
        image: downloadURL,
        createdAt: Date.now(),
      });
      setUploadeLoading(false);
      return {success: true};
    } catch (error) {
      console.log(error);
      setUploadeLoading(false);
    }
  };

  // useEffect(() => {
  //   const readData = async () => {
  //     try {
  //       const res = database()
  //       .ref('/Posts')
  //       .once('value')
  //       .then(snapshot => {
  //         console.log('User data: ', Object.values(snapshot.val()));
  //       });
  //       console.log(res);
  //       setFindDataLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //       setFindDataLoading(false);
  //     }
  //   };
  //   readData();
  // }, []);

  useEffect(() => {
    const readData = () => {
      const postsRef = database().ref('/Posts');
      
      // Set up listener for child added, child changed and child removed events
      postsRef.on('value', snapshot => {
        const data = snapshot.val() || {};
        const dataArray = Object.keys(data).map(id => ({
          id,
          ...data[id]
        }));
        setFindData(dataArray);
        setFindDataLoading(false);
      });

      return () => {
        // Clean up the listener when component unmounts
        postsRef.off();
      };
    };

    readData();
  }, []);
  

  const deletePost = async (id, imageURL) => {
    setFindDataLoading(true);
    try {
      // Delete the image from Firebase Storage
      await storage().refFromURL(imageURL).delete();
      console.log('Image deleted successfully');

      // Delete the post from Firestore
      await database().ref(`/Posts/${id}`).remove();
      console.log('Post deleted successfully');

      setFindDataLoading(false);
      return {success: true, message: 'Post deleted successfully'};
    } catch (error) {
      console.error(error);
      setFindDataLoading(false);
      throw error;
    }
  };



  const updatePost = async (id, image, title, description, prevImage) => {
    setFindDataLoading(true);
    try {
      if (image && prevImage) {
        // Delete previous image from storage
        try {
          await storage().refFromURL(prevImage).delete();
          console.log('prev image deleted success');
        } catch (error) {
          console.error('prev image not found:', error);
        }
  
        // Upload new image
        const imageRef = storage().ref(`firestore/${Date.now()}.png`);
        await imageRef.putFile(image);
        const downloadURL = await imageRef.getDownloadURL();
  
        // Update post in Firestore with new image
        await database().ref(`/Posts/${id}`).update({
          title,
          description,
          image: downloadURL,
        });
        setFindDataLoading(false);
        return { success: true, message: 'Post updated successfully' };
      } else {
        // Update post in Firestore without changing image
        await database().ref(`/Posts/${id}`).update({
          title,
          description,
        });
        setFindDataLoading(false);
        return { success: true, message: 'Post updated successfully' };
      }
    } catch (error) {
      console.error(error);
      setFindDataLoading(false);
      throw error;
    }
  };


  return (
    <RealtimeContext.Provider value={{createPost, uploadeLoading, findData, findDataLoading, deletePost, updatePost}}>
      {children}
    </RealtimeContext.Provider>
  );
};
