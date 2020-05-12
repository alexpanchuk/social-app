import React, { useEffect, useState } from "react";
import * as firebase from "firebase";

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (isLoading) setIsLoading(false);
      setIsLoggedIn(Boolean(user));
    });
  }, []);

  return [isLoading, isLoggedIn];
}
