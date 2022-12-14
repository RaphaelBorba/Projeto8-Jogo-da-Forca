
/* IMPORTS */

import palavras from './Palavras';
import React from 'react';
import forca0 from './assets/forca0.png'
import forca1 from './assets/forca1.png'
import forca2 from './assets/forca2.png'
import forca3 from './assets/forca3.png'
import forca4 from './assets/forca4.png'
import forca5 from './assets/forca5.png'
import forca6 from './assets/forca6.png'

/* LETTERS TO CREATE THE KEYBOARD */

const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h",
 "i", "j", "k", "l", "m", "n", "o", "p", "q", "r",
  "s", "t",  "u", "v", "w", "x", "y", "z"]

/* FUNCTION APP */

export default function App(){
    
    /* CONST STATES */
    const [lettersChosen, setLettersChosen] = React.useState([])
    const [imgForca, setImgForca] = React.useState(forca0)
    const [classFooter, setClassFooter] = React.useState('inputs isDisable')
    const [classKeyboard, setClassKeyboard] = React.useState('keyboard isDisable')
    const [classCorretWrong, setClassCorretWrong] = React.useState('')
    const [word, setWord] = React.useState('')
    const [wordGame, setWordGame] = React.useState([])
    let [mistakes, setMistakes] = React.useState(0)
    const [correctTryWord, setCorrectTryWord] = React.useState('')
    const [tryWord, setTryWord] = React.useState('')
    
    /* JSX */

    return(
        <>
            <Hangman/>
            <Keyboard/>
            <div className={classFooter}>
                <span>Já sei a palavra!</span>
                <input type='text' value={tryWord} onChange={e =>setTryWord(e.target.value)}></input>
                <button onClick={checkInput}>Chutar</button>
            </div>
        </>
    );

    /* COMPONENT HANGMAN, SHOW THE IMAGE, BUTTOM AND WORDGAME */

    function Hangman (){
        return(
            <div className='firstDiv'>
                <img src={imgForca} alt={imgForca}/>
                <div className='firstDiv-right'>
                    <button onClick={startGame}>Escolher Palavra</button>
                    <article className={classCorretWrong}>{wordGame}</article>
                </div>
            </div>
        );
    }

    /* FUNCTION THAT START THE GAME, SET ALL THINGS TO START FROM ZERO */
    
    function startGame (){

        setClassCorretWrong('')
        setLettersChosen([])
        setImgForca(forca0);
        setMistakes(0)
        
        let chosenWord = palavras[Math.floor(Math.random()*palavras.length)];

        console.log(chosenWord)
        
        setCorrectTryWord(chosenWord)
    
        setWord(chosenWord.split(''));
        
        ableDivs();

        createGame(chosenWord.split(''));
        
    } 

    /* FUNCTION TO REMOVE THE CLASS 'isDisable' FROM THE DIVS THAT HAVE IT */

    function ableDivs(){

        setClassFooter('inputs');
        setClassKeyboard('keyboard');
    }

    /* FUNCTION TO ADD THE CLASS 'isDisable' */

    function disableDivs(){

        setClassFooter('inputs isDisable');
        setClassKeyboard('keyboard isDisable');
    }

    /* FUNCTION TO CREATE THE WORDGAME AND SHOW ON THE SCREEN */

    function createGame (chosenWord){

        let wordGame  = chosenWord.map(()=>' _ ')

        setWordGame(wordGame);
    }


    /* COMPONENT CREATE AND SHOW THE KEYBOARD */
    
    function Keyboard(){
        
        return(
            <div>
                <ul className={classKeyboard}>
                    {alfabeto.map((letter, index)=><li key={index} onClick={()=>checkLetter(letter)} className={(lettersChosen.includes(letter)) ? 'keys isDisable' : 'keys'}>{letter.toUpperCase()}</li>)}
                </ul>
            </div>
        );
    }

    /* FUNCTION TO CHECK IF THE LETTER CLICKED IS ON THE CORRECT WORD ARRAY AND CHANGES THE ARRAY */

    function checkLetter(letter){

        const accents = ['á', 'à', 'ã' ,'â' ,'é', 'ê', 'í', 'ó', 'ô', 'õ', 'ú','ç' ]

        console.log(letter)

        setLettersChosen([...lettersChosen, letter])

        const newWordGame = [...wordGame]

        for (let i =0; i<word.length; i++){


            if((letter===word[i].normalize('NFD').replace(/[\u0300-\u036f]/g, "")) && accents.includes(word[i])){
                
                newWordGame.splice(i,1,word[i])

            }else if(word[i] === letter){

                newWordGame.splice(i,1,letter)

            }
        }
        checkMistake(newWordGame)
        
        setWordGame(newWordGame)
    }

    /* FUNCTION TO CHECK IF THE ARRAYS ARE THE SAME OR NOT */

    function checkMistake(newWordGame){

        let error = mistakes

        if( newWordGame.toString() === wordGame.toString()){

            error++;
            setMistakes(error)
            changeImage(error)
           
        }
        finishGame(error, newWordGame)
    }   

    /* FUNCTION TO CHANGE THE IMAGE WHEN THE USER GIVES A WRONG ANSWER */

    function changeImage(error){

        if(error ===1){
            setImgForca(forca1)

        }else if(error ===2){
            setImgForca(forca2)

        }else if(error ===3){
            setImgForca(forca3)

        }else if(error ===4){
            setImgForca(forca4)

        }else if(error ===5){
            setImgForca(forca5)

        }else if(error ===6){
            setImgForca(forca6)
        }
    }

    /* FUNCTION TO FINISH THE GAME, DISABLING THE BUTTONS AND CHANGING THE COLOR OF THE WORD */

    function finishGame(error, newWordGame){
        
        if (error === 6){
            setClassCorretWrong('incorrect')
            disableDivs()
        }else if(newWordGame.toString()=== word.toString()){
            setClassCorretWrong('correct')
            disableDivs()
        }
    }
    
    /* FUNCTION THAT CHECKS IF THE INPUT VALUE IS IQUAL TO THE WORD */

    function checkInput(){
        
        if (tryWord !== correctTryWord){
            setClassCorretWrong('incorrect')
            disableDivs()
            setWordGame(tryWord)
            setImgForca(forca6)

        }else if(tryWord === correctTryWord){
            setClassCorretWrong('correct')
            disableDivs()
            setWordGame(tryWord)
        }

        setTryWord('')
    }
}


//Falta consfigurar para que ele possa ler palavras com acentos, fazer deploy e ...