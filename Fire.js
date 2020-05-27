import { firebaseKeys } from "./config";
import firebase from "firebase";

class Fire {
  constructor() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseKeys);
    }
  }

  addPost = async ({ text, localUri }) => {
    const remoteUri = localUri && (await this.uploadPhotoAsync(localUri));

    return new Promise((res, rej) => {
      this.firestore
        .collection("posts")
        .add({
          text,
          uid: this.uid,
          timestamp: this.timeStamp,
          image: remoteUri,
        })
        .then(res)
        .catch(rej);
    });
  };

  uploadPhotoAsync = async (uri) => {
    const path = `photos/${this.uid}/${Date.now()}.jpg`;

    return new Promise(async (res, rej) => {
      try {
        const response = await fetch(uri);
        const file = await response.blob();

        let upload = firebase.storage().ref(path).put(file);

        upload.on(
          "state_changed",
          () => {},
          rej,
          async () => {
            const url = await upload.snapshot.ref.getDownloadURL();
            res(url);
          }
        );
      } catch (error) {
        rej(error);
      }
    });
  };

  get firestore() {
    return firebase.firestore();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timeStamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();

export default Fire;
