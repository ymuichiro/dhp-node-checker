import * as firebase from "firebase/app";
import { auth as uiAuth } from "firebaseui-ja";
import "firebaseui-ja/dist/firebaseui.css";
import "firebase/auth";
import "firebase/analytics";

// 初期化処理
firebase.default.initializeApp({});

// Emulaterの設定を行う
// firebase.default.auth().useEmulator("http://localhost:9099");
// firebase.default.functions().useEmulator("localhost", 5001);
// 認証画面設定
firebase.default.auth().useDeviceLanguage();
firebase.default.auth().setPersistence(firebase.default.auth.Auth.Persistence.LOCAL);
firebase.default.analytics().setAnalyticsCollectionEnabled(true);
const ui = new uiAuth.AuthUI(firebase.default.auth());

export { ui };
export default firebase;