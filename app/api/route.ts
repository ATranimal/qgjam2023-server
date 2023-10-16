// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { get, getDatabase, ref } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBOi0o_C-pW1MZmKuQwl_g_WqWajq0xTTA",
  authDomain: "qgjam2023.firebaseapp.com",
  projectId: "qgjam2023",
  storageBucket: "qgjam2023.appspot.com",
  messagingSenderId: "558643867226",
  appId: "1:558643867226:web:9e37c2bf13c76ff9bd3263",
  measurementId: "G-0BEKL214N0",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  let db;
  let app;

  try {
    app = initializeApp(firebaseConfig);
    db = getDatabase(app);
  } catch (error: any) {
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    if (!/already exists/u.test(error.message)) {
      // eslint-disable-next-line no-console
      console.error("Firebase admin initialization error");
    } else {  
      console.error("other RTDB error", error.message);
    }
  }

  if (!db) {
    Response.json({ name: "Error: Can't connect to DB", status: 500 });
    return;
  }

  if (!id) {
    Response.json({ name: "Error: No ID provided", status: 500 });
    return;
  }

  const mapRef = ref(db, id);
  const mapValue = await (await get(mapRef)).val();

  return Response.json({ name: mapValue });
}
