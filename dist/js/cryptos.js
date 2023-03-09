const btnCryp = document.querySelector('#btnCryp');
const temp = document.querySelector('#temp');
const cryp = document.querySelector('#cryp');
 const url = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,MXN,EUR';

document.addEventListener('DOMContentLoaded', () => {
	btnCryp.addEventListener('click', (e) =>{
        //e.preventDefault();
        //const temporalidad = temp.value;
        //console.log(temporalidad);
       
        getCrypto();
    }) 
});

const getCrypto = async () => {
    const response = await fetch(url); // GET
    const json = await response.json();
    console.log(json);
}