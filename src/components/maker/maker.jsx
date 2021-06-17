import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ FileInput,authService, cardRepository }) => {
    const historyState = useHistory().state;
    const [cards, setCards] = useState({});
    const [userId , setUserId] = useState(historyState && historyState.id);

    const history = useHistory();

    const onLogOut = () => {
        authService.logout();
    };

    //업데이트관련 useEffect
    useEffect(()=>{
        if(!userId){
            return;
        }
        const stopSync = cardRepository.syncCards(userId,cards => {
            setCards(cards);
        });
        return () => {
            stopSync();
        }
    }, [userId]);

    // 로그인 관련 useEffect
    useEffect(() => {
        authService.onAuthChange(user => {
            if (user) {
                setUserId(user.uid);
            }else{
                history.push('/');
            }
        })
    })
    // 카드 수정 및 추가
    const createOrUpdateCard = card => {
        //이렇게 해도되지만 cards가 다른 사용자의 의해서 이미 값이 변경 되었을 수 도 있다,
        // 때문에 이런 문제를 해결하기위해 2번 방식으로 업데이트를 한다.
        // <<<< 1번방식 >>>>>
        // const updated = {...cards};
        // updated[card.id] = card;
        // setCards(updated)
        // <<<< 2번방식 >>>>>
        setCards(cards => {
            const updated = { ...cards };
            updated[card.id] = card;
            return updated;
        });

        cardRepository.saveCard(userId, card);
    };
    // 카드 삭제
    const deleteCard = card => {
        setCards(cards => {
            const updated = { ...cards };
            delete updated[card.id];
            return updated;
        });
        cardRepository.removeCard(userId,card);
    }

    return (
        <section className={styles.maker}>
            <Header onLogOut={onLogOut} />
            <div className={styles.container}>
                <Editor 
                    FileInput = {FileInput}
                    cards={cards} 
                    addCard={createOrUpdateCard} 
                    updateCard={createOrUpdateCard} 
                    deleteCard={deleteCard} />
                <Preview cards={cards} />
            </div>
            <Footer />
        </section>
    )
};

export default Maker;