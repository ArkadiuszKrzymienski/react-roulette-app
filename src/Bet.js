import React, { useState } from 'react';
import Resultat from './Resultat'


const Bet = ({startGame, money, win, winRatio, bet, choose}) => {
    const [inputNumberValue, setInputNumberValue] = useState('');
    const [errorNumber, setErrorNumber] = useState(true)
    const [errorMoney, setErrorMoney] = useState(true)
    const [inputBetValue, setInputBetValue] = useState('');
    const [activeButton, setActiveButton] = useState('')
    

    const handleStartGame = () => {
        if(!errorNumber && !errorMoney){
            startGame(inputBetValue, activeButton, inputNumberValue);
        }
        setInputBetValue('');
        setInputNumberValue('');
        setActiveButton('');
        setErrorNumber(true);
        setErrorMoney(true);
    }

    const handleColorBet = (e) => {
        setInputNumberValue('')
        setErrorNumber(false)
        let color = e.target.className;
        setActiveButton(color)
    }

    const handleChange = (e) => {
        if(e.target.id === 'number'){
            if(e.target.value < 0 || e.target.value > 36 || e.target.value === ''){
                setErrorNumber(true)
                setInputNumberValue('')
                setActiveButton('')
            }else{
                setErrorNumber(false)
                setInputNumberValue(Math.round(e.target.value))
                setActiveButton('')
            }
        }
        if(e.target.id === 'bet'){
            if(e.target.value < 0 || e.target.value > money || e.target.value === ''){
                setErrorMoney(true)
                setInputBetValue('')
            }else{
                setErrorMoney(false)
                setInputBetValue(Math.round(e.target.value))
            }
        }
    }

    return ( 
        <>  <div className='chooseDiv'>
                <div className='chooseColor'>
                <div className='rules'>
                    <p>x2</p>
                    <p>x50</p>
                    <p>x2</p>
                </div>
                    <button onClick={handleColorBet} style={activeButton === 'black' ? {border: '2px solid yellow'} : null} className='black'>Czarne</button>
                    <button onClick={handleColorBet} style={activeButton === 'green' ? {border: '2px solid yellow'} : null} className='green'>Zielone</button>
                    <button onClick={handleColorBet} style={activeButton === 'red' ? {border: '2px solid yellow'} : null} className='red'>Czerwone</button>
                </div>
                <div className='chooseNumber'>
                    <div className="rules">
                        <p>x35</p>
                    </div>
                    <input placeholder='Wpisz liczbę...' type="number" onChange={handleChange} value={inputNumberValue} id='number'/>
                    {errorNumber ? <span className='error'>! Liczba od 0 do 36 !</span> : null}
                </div>
            </div>   
            <div className='moneyBet rules'>
                <p>Stawka</p>
                <input type="number" placeholder='Wpisz stawkę...' value={inputBetValue} onChange={handleChange} id='bet'/>
                    {errorMoney ? <span className='error'>Nie masz tyle na koncie</span> : null}
                <button onClick={handleStartGame}>Zakręć ruletką</button>
                {money !== 0 && (activeButton === '' && inputNumberValue === '') ? <span className='error'>Wybierz kolor lub wpisz liczbę na którą stawiasz aby zagrać</span> : null}
                {(money === 0) ? <span className='error'>Nie masz środków do gry</span> : null}
            </div>
            <Resultat win={win} winRatio={winRatio} bet={bet} choose={choose}/>
        </>
     );
}

export default Bet;