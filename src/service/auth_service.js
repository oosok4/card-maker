// 이 service는 어플리케이션에서 사용자가 로그인하거나 로그아웃하거나
// 하는 모든 유저정보를 담아내는 authentication(인증)관련된
// 서비스를 도맡아서 하는 서비스이다.

import firebase from 'firebase';
import firebaseApp from './firebase';

class AuthService {
    login(providerName){
        const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
        return firebaseApp.auth().signInWithPopup(authProvider);
    }

    logout(){
        firebase.auth().signOut();
    }

    onAuthChange(onUserChanged){
        firebase.auth().onAuthStateChanged(user =>{
            onUserChanged(user);
        })
    }


}

export default AuthService;