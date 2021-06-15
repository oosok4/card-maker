import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({authService}) => {
    const [cards, setCards] = useState([
        {
            id : '1',
            name : 'Ellie',
            company : 'samsung',
            theme : 'dark',
            title : 'software Engineer',
            email : 'oosok4@naver.com',
            message : 'go for it',
            fileName : 'oosok4',
            fileURL : 'oosok4.png'
        },
        {
            id : '2',
            name : 'Ellie2',
            company : 'samsung',
            theme : 'light',
            title : 'software Engineer',
            email : 'oosok4@naver.com',
            message : 'go for it',
            fileName : 'oosok4',
            fileURL : 'oosok4.png'
        },
        {
            id : '3',
            name : 'Ellie3',
            company : 'samsung',
            theme : 'colorful',
            title : 'software Engineer',
            email : 'oosok4@naver.com',
            message : 'go for it',
            fileName : 'oosok4',
            fileURL : null
        }
    ])

    const history = useHistory();

    const onLogOut = () =>{
        authService.logout();
    };

    useEffect(()=>{
        authService.onAuthChange(user => {
            if(!user){
                history.push('/');
            }

        })
    })

    const addCard = card => {
        const updated = [...cards,card]; // 기존의 카드's를 불러온 후 새로 만든 카드를 추가시킨다.
        setCards(updated);
    }

    return (
        <section className = {styles.maker}>
            <Header onLogOut={onLogOut}/>
                <div className={styles.container}>
                    <Editor cards = {cards} addCard = {addCard}/>
                    <Preview cards = {cards}/>
                </div>
            <Footer/>
        </section>
    )
};

export default Maker;