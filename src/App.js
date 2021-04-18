import React, {useEffect, useState} from 'react';

import Bet from './Bet';
import Roulette from './Roulete'; 

import './App.css';

const numbers = [
  {number: 3, color:'red'},
  {number: 26, color:'black'},
  {number: 0, color:'green'},
  {number: 32, color:'red'},
  {number: 15, color:'black'},
  {number: 19, color:'red'},
  {number: 4, color:'black'},
  {number: 21, color:'red'},
  {number: 2, color:'black'},
  {number: 25, color:'red'},
  {number: 17, color:'black'},
  {number: 34, color:'red'},
  {number: 6, color:'black'},
  {number: 27, color:'red'},
  {number: 13, color:'black'},
  {number: 36, color:'red'},
  {number: 11, color:'black'},
  {number: 30, color:'red'},
  {number: 8, color:'black'},
  {number: 23, color:'red'},
  {number: 10, color:'black'},
  {number: 5, color:'red'},
  {number: 24, color:'black'},
  {number: 16, color:'red'},
  {number: 33, color:'black'},
  {number: 1, color:'red'},
  {number: 20, color:'black'},
  {number: 14, color:'red'},
  {number: 31, color:'black'},
  {number: 9, color:'red'},
  {number: 22, color:'black'},
  {number: 18, color:'red'},
  {number: 29, color:'black'},
  {number: 7, color:'red'},
  {number: 28, color:'black'},
  {number: 12, color:'red'},
  {number: 35, color:'black'},
  {number: 3, color:'red'},
  {number: 26, color:'black'},
  {number: 0, color:'green'},
  {number: 32, color:'red'},
  {number: 15, color:'black'},
];


let winRatio = 0;


const App =() => {

  const [winIndex, setWinIndex] = useState(2)
  const [roulette, setRoulette] = useState([
    numbers[0],
    numbers[1], 
    numbers[winIndex], 
    numbers[3], 
    numbers[4]
  ]);
  const [money, setMoney] = useState(500);
  const [win, setWin] = useState('');
  const [bet, setBet] = useState(0);
  const [choose, setChoose] = useState('')
  

  const handleStartGame = (bet, chooseColor, chooseNumber) => {
    setBet(bet)
    setChoose(chooseColor !== '' ? chooseColor : chooseNumber)
    setWin('')
    const newIndex = Math.floor(Math.random()*36 + 2)
    setWinIndex(newIndex)
    const timeEndAnimation = 70 * 37
    const time = timeEndAnimation + 70 * newIndex + 70;

    AnimationRoulette()
    setTimeout(() => {
      endRoulette(newIndex)
    }, timeEndAnimation);

    setTimeout(() => {
      CheckResult(chooseColor, chooseNumber, newIndex, bet)
    }, time);
  }



  const AnimationRoulette = () => {
    let i = 2
    const allAnimation = setInterval(() => {
      if(i === numbers.length - 3){
        i = numbers.length - 3
        clearInterval(allAnimation)
      }
      setRoulette([
        numbers[i - 2],
        numbers[i - 1],
        numbers[i],
        numbers[i + 1],
        numbers[i + 2],
      ])
      i = i + 1;
    }, 70);
  }



  const endRoulette = (newIndex) => {
    let i = 2;
    const endAnimation = setInterval(() => {
      if(i === newIndex){
        clearInterval(endAnimation);
      }
      setRoulette([
        numbers[i - 2],
        numbers[i - 1],
        numbers[i],
        numbers[i + 1],
        numbers[i + 2],
      ])
      i = i + 1;
    }, 70);
  }



  const CheckResult = (chooseColor, chooseNumber, newindex, bet) => {
    setRoulette([
      numbers[newindex - 2],
      numbers[newindex - 1],
      numbers[newindex],
      numbers[newindex + 1],
      numbers[newindex + 2],
    ])

    if(chooseColor){
      winRatio = 2;
      if(chooseColor === 'zielony'){
        winRatio = 50;
      }
    }else{
      winRatio = 35;
    }

    if(chooseColor === numbers[newindex].color || chooseNumber === numbers[newindex].number){
      setMoney((prev) => prev + bet * winRatio);
      setWin(true);
    }else{
      setMoney((prev) => prev - bet);
      setWin(false);
    }
  }



  return (
    <>
      <h1>Ruletka</h1>
      <Roulette roulette={roulette}/>
      <h2>Monety: <span className='money'>{money}</span></h2>
      <Bet startGame={handleStartGame} money={money} win={win} winRatio={winRatio} bet={bet} choose={choose}/>

    </>
  );
}

export default App;
