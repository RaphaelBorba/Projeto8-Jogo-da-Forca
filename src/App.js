
/* IMPORTS */

import palavras from './Palavras';
import forca0 from './assets/forca0.png'
import React from 'react';
/* import forca1 from './assets/forca1.png'
import forca2 from './assets/forca2.png'
import forca3 from './assets/forca3.png'
import forca4 from './assets/forca4.png'
import forca5 from './assets/forca5.png'
import forca6 from './assets/forca6.png' */

/* LETTERS TO CREATE THE KEYBOARD */

const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h",
 "i", "j", "k", "l", "m", "n", "o", "p", "q", "r",
  "s", "t",  "u", "v", "w", "x", "y", "z"]

/* FUNCTION APP */

export default function App(){
    
    /* CONST STATES */
    
    const [classFooter, setClassFooter] = React.useState('inputs isDisable')
    const [classKeyboard, setClassKeyboard] = React.useState('keyboard isDisable')
    const [word, setWord] = React.useState('')
    const [wordGame, setWordGame] = React.useState([])
    const [mistakes, setMistakes] = React.useState(0)
    
    /* JSX */

    return(
        <>
            <Hangman/>
            <Keyboard/>
            <Inputs/>
        </>
    );

    /* COMPONENT HANGMAN, SHOW THE IMAGE, BUTTOM AND WORDGAME */

    function Hangman (){
        return(
            <div className='firstDiv'>
                <img src={forca0} alt={forca0}/>
                <div className='firstDiv-right'>
                    <button onClick={startGame}>Escolher Palavra</button>
                    <article>{wordGame}</article>
                </div>
            </div>
        );
    }

    /* FUNCTION THAT START THE GAME, SET ALL THINGS TO START FROM ZERO */
    
    function startGame (){
        
        let chosenWord = palavras[Math.floor(Math.random()*palavras.length)];
    
        setWord(chosenWord.split(''));
        
        ableDivs();

        createGame(chosenWord.split(''));
        
    } 

    /* FUNCTION TO REMOVE THE CLASS 'isDisable' FROM THE DIVS THAT HAVE IT */

    function ableDivs(){

        setClassFooter('inputs');
        setClassKeyboard('keyboard');
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
                    {alfabeto.map((letter, index)=><li key={index} onClick={()=>checkLetter(letter)} className='keys'>{letter.toUpperCase()}</li>)}
                </ul>
            </div>
        );
    }

    /* FUNCTION TO CHECK IF THE LETTER CLICKED IS ON THE CORRECT WORD ARRAY */

    function checkLetter(letter){
        
        const newWordGame = [...wordGame]

        for (let i =0; i<word.length; i++){

            if(word[i] === letter){

                newWordGame.splice(i,1,letter)

            }
        }
        if (checkMistake(newWordGame)){
            alert('Errou')
        }

        setWordGame(newWordGame)
        
    }

    /* FUNCTION TO CHECK IF THE ARRAYS ARE THE SAME OR NOT */

    function checkMistake(newWordGame){
        if( newWordGame.toString() === wordGame.toString()){
            return true
        }
    }    
    
    /* COMPONENT CREATE AND SHOW THE FOOTER OF THE PAGE */
    
    function Inputs(){
        return(
            <div className={classFooter}>
                <span>Já sei a palavra!</span>
                <input type='text'></input>
                <button>Chutar</button>
            </div>
        );
    }
}