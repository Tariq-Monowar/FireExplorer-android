import React, {createContext, useContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const FireStoreContext = createContext(null);

export const UseFireStoreContext = () => useContext(FireStoreContext);

export const FireStoreContextProvider = ({children}) => {
  const [uploadeLoading, setUploadeLoading] = useState(false);

  const [findData, setFindData] = useState(null);
  const [findDataLoading, setFindDataLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Posts')
      .onSnapshot(snapshot => {
        const postData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFindData(postData);
        setFindDataLoading(false);
      });

    return () => unsubscribe();
  }, []);

  
  const createData = async (image, title, desc) => {
    try {
      setUploadeLoading(true);
      const imageRef = storage().ref(`firestore/${Date.now()}.png`);
      await imageRef.putFile(image);

      const downloadURL = await imageRef.getDownloadURL();

      const res = await firestore().collection('Posts').add({
        title: title,
        description: desc,
        image: downloadURL,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      setUploadeLoading(false);
      console.log('successfull:', res.id);
      return res.id;
    } catch (error) {
      console.error(error);
      setUploadeLoading(false);
    }
  };

  const deletePost = async (id, imageURL) => {
    setFindDataLoading(true);
    try {
      // Delete the image from Firebase Storage
      await storage().refFromURL(imageURL).delete();
      console.log('Image deleted successfully');

      // Delete the post from Firestore
      await firestore().collection('Posts').doc(id).delete();
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
    console.log(id);
    setFindDataLoading(true);
    try {
      if (image && prevImage) {
        // Delete previous image from storage
        try {
          await storage().refFromURL(prevImage).delete();
          console.log('Previous image deleted successfully');
        } catch (error) {
          // Handle error if the previous image doesn't exist
          console.error('Previous image not found:', error);
        }
  
        // Upload new image
        const imageRef = storage().ref(`firestore/${Date.now()}.png`);
        await imageRef.putFile(image);
        const downloadURL = await imageRef.getDownloadURL();
  
        // Update post in Firestore with new image
        await firestore().collection('Posts').doc(id).update({
          title,
          description,
          image: downloadURL,
        });
        setFindDataLoading(false);
        return { success: true, message: 'Post updated successfully' };
      } else {
        // Update post in Firestore without changing image
        await firestore().collection('Posts').doc(id).update({
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
    <FireStoreContext.Provider
      value={{
        createData,
        uploadeLoading,
        findData,
        findDataLoading,
        deletePost,
        updatePost
      }}>
      {children}
    </FireStoreContext.Provider>
  );
};
