import { getDatabase } from 'firebase/database'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD0RNz18qDZU15HTEcUizHFBZq6xjJIX6U',
  authDomain: 'armbrydning-news.firebaseapp.com',
  databaseURL: 'https://armbrydning-news-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'armbrydning-news',
  storageBucket: 'armbrydning-news.firebasestorage.app',
  messagingSenderId: '75932863597',
  appId: '1:75932863597:web:a116ec0e95cb2a989a4364',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
if (import.meta.env.DEV) {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true
}

initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider('6LcYhR4uAAAAAMAklT25xgermrIUhm3fw3czqfSs'),
  isTokenAutoRefreshEnabled: true,
})

export const database = getDatabase(app)
