import { firebaseKeys } from "./config";
import firebase from "firebase";

class Fire {
  constructor() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseKeys);
    }
  }

  addPost = async ({ text, localUri }) => {
    const remoteUri =
      localUri &&
      (await this.uploadPhotoAsync(
        localUri,
        `photos/${this.uid}/${Date.now()}`
      ));

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

  uploadPhotoAsync = async (uri, filename) => {
    return new Promise(async (res, rej) => {
      try {
        const response = await fetch(uri);
        const file = await response.blob();

        let upload = firebase.storage().ref(filename).put(file);

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

  createUser = async (user) => {
    let remoteUri = null;

    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);

      let db = this.firestore.collection("users").doc(this.uid);

      db.set({
        name: user.name,
        email: user.email,
        avatar: null,
      });

      if (user.avatar) {
        remoteUri = await this.uploadPhotoAsync(
          user.avatar,
          `avatars/${this.uid}`
        );

        db.set({ avatar: remoteUri }, { merge: true });
      }
    } catch (error) {
      alert("Error: ", error);
    }
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
