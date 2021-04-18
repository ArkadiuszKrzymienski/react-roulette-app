import React, {} from 'react';

const Resultat = ({win, bet, winRatio, choose}) => {
    const notSee = win !== '';

        switch (choose) {
    case 'red':
        choose = 'czerwony';
        break;
    case 'green':
        choose = 'zielony';
        break;
    case 'black':
        choose = 'czarny';
        break;
    default:
        break;
    }

    return (
        <div className='Resultat'>
            <h3>{notSee && 'Rezultat'}</h3>
            <h2>{notSee ? (win ? 'Wygrałeś :' : 'Przegrałeś :') : null}  {notSee ? (win ? (bet * winRatio) + ' monety' : bet + ' monety') : null } </h2>
            <p>{notSee ? 'Obstawiono ' + bet + ' monety na ' + choose : null}</p>
        </div>
        
     );
}

export default Resultat;