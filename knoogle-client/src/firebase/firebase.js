import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./config";

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    auths() {
        return this.auth;
    }

    //Login
    async login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }
    // sign out
    async logout() {
        await this.auth.signOut();
    }

    async signUp(email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password);
    }
}

const firebase = new Firebase();
export default firebase;
