// 이 service는 어플리케이션에서 사용자가 로그인하거나 로그아웃하거나
// 하는 모든 유저정보를 담아내는 authentication(인증)관련된
// 서비스를 도맡아서 하는 서비스이다.

import {firebaseAuth, githubProvider, googleProvider} from './firebase';

class AuthService {
    login(providerName){
        const authProvider = this.getProvider(providerName);
        return firebaseAuth.signInWithPopup(authProvider);
    }

    logout(){
        firebaseAuth.signOut();
    }

    onAuthChange(onUserChanged){
        firebaseAuth.onAuthStateChanged(user =>{
            onUserChanged(user);
        })
    }

    getProvider(providerName){
        switch(providerName){
            case 'Google': 
                return googleProvider;
            case 'Github' : 
                return githubProvider;
            default : 
            throw new Error(`not supported provider ${providerName}`);
        }
    }
}

export default AuthService;