import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({authService}) => {

    const history = useHistory();

    const onLogOut = () =>{
        authService.logout();
    };http://localhost:3000/

    useEffect(()=>{
        authService.onAuthChange(user => {
            if(!user){
                history.push('/');
            }

        })
    })

    return (
        <section className = {styles.maker}>
            <Header onLogOut={onLogOut}/>
                <div className={styles.container}>
                    <Editor/>
                    <Preview/>
                </div>
            <Footer/>
        </section>
    )
};

export default Maker;