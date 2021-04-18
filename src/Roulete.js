import React from 'react';

const Roulette = ({roulette}) => {
    const numbers = roulette.map(number => <div className={number.color} key={number.number}>{number.number}</div>)

    return ( 
            <div className='roulette'>
                {numbers}
            </div>
    );
}

export default Roulette;