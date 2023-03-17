const btnCryp = document.querySelector('#btnCryp');
const temp = document.querySelector('#temp');
const cryp = document.querySelector('#cryp');
const formulario = document.querySelector('#crip-form');
//cuadro divisas

const mxn = document.querySelector('#mxn');
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');

const USD = document.querySelector('#USD');
const MXN = document.querySelector('#MXN');
const EUR = document.querySelector('#EUR');

const cryptos =[];
const divisas = [
    "USD", "MXN", "EUR"
];
//const url = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,MXN,EUR';
// Crear un Promise que devuelve las criptomonedas
const obtenerCriptomonedas  = criptomonedas => new Promise( resolve => {
    resolve(criptomonedas);
});
document.addEventListener('DOMContentLoaded', () => {
	consultarCriptomonedas();

    //getSimbolos();
    
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

        cryptos.push(option.value);
    })
}
//Fin rellenar select

//Funciones para consumir API



const getDivisas = async () => {
    const moneda = cryp.value;
    const tempo = temp.value;
    MXN.innerHTML='';
    USD.innerHTML='';
    EUR.innerHTML='';
    divisas.forEach(async (divisa)=>{
        const response = await fetch('https://min-api.cryptocompare.com/data/v2/'+tempo+'?fsym='+moneda+'&tsym='+divisa+'&limit=10')
        const {Data} = await response.json();
        const data = Data.Data;
        console.log(data);

        if(divisa === "USD"){
            console.log("Datos obtenidos de:\n"+ response.url)
            const text = document.createTextNode(data[0].close)
            USD.appendChild(text);    
                   
        }else if (divisa === "MXN"){
            console.log("Datos obtenidos de:\n"+ response.url)
            const text = document.createTextNode(data[0].close)
            MXN.appendChild(text);            
        }else{
            console.log("Datos obtenidos de:\n"+ response.url)
            const text = document.createTextNode(data[0].close)
            EUR.appendChild(text);
        }
        $("#samedata-modal").modal("hide");
        formulario.reset();
    })
}

/*
const getSimbolos = async () => {
    const moneda = cryp.value;

    const response = await fetch('https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol='+moneda')
    const json = await response.json();

    console.log(json);
}
*/

