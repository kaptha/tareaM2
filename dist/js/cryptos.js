const btnCryp = document.querySelector('#btnCryp');
const temp = document.querySelector('#temp');
const cryp = document.querySelector('#cryp');
//cuadro divisas
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');

//const url = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,MXN,EUR';
// Crear un Promise que devuelve las criptomonedas
const obtenerCriptomonedas  = criptomonedas => new Promise( resolve => {
    resolve(criptomonedas);
});
document.addEventListener('DOMContentLoaded', () => {
	consultarCriptomonedas();
    
    btnCryp.addEventListener('click', (e) =>{
              
        getDivisas();        
    }) 
});
//Rellenar select de criptomonedas
function consultarCriptomonedas() {
    const urlcryp = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=15&tsym=USD';
    fetch(urlcryp)
        .then( respuesta => respuesta.json() ) 
        .then( resultado => obtenerCriptomonedas(resultado.Data))
        .then( criptomonedas => selectCriptomonedas(criptomonedas) )
}

function selectCriptomonedas(criptomonedas) {
    criptomonedas.forEach( cripto => {
        const { FullName, Name } = cripto.CoinInfo;
        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        cryp.appendChild(option);
    })
}
//Fin rellenar select

//Funciones para consumir API
const getDivisas = async () => {
    const moneda = cryp.value;
    const tempo = temp.value;
    const urlconsulta = 'https://min-api.cryptocompare.com/data/v2/'+tempo+'?fsym='+moneda+'&tsym=USD&limit=10';
    const response = await fetch(urlconsulta);
    const json = await response.json();
    
    console.log(json);    
}
