//Grafica
const chartCryptos = document.getElementById("line-chart")

const btnCryp = document.querySelector('#btnCryp');
const temp = document.querySelector('#temp');
const cryp = document.querySelector('#cryp');
const formulario = document.querySelector('#crip-form');
//cuadro divisas

const cad = document.querySelector('#cad');
//const mxn = document.querySelector('#mxn');
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');

const USD = document.querySelector('#USD');
//const MXN = document.querySelector('#MXN');
const CAD = document.querySelector('#CAD');
const EUR = document.querySelector('#EUR');
const CRY = document.querySelector('#criptoselect');

const logoCryp = document.querySelector('.LogoCryp')
//const logoMXN = document.querySelector('.logoMXN')
const logoCAD = document.querySelector('.logoCAD')
const logoUSD = document.querySelector('.LogoUSD')
const logoEUR = document.querySelector('.LogoEUR')

const cryptos =[];
const divisas = [
//    "USD", "MXN", "EUR"
    "USD", "CAD", "EUR"
];
//const url = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,MXN,EUR';
// Crear un Promise que devuelve las criptomonedas
const obtenerCriptomonedas  = criptomonedas => new Promise( resolve => {
    resolve(criptomonedas);
});
document.addEventListener('DOMContentLoaded', () => {
	consultarCriptomonedas();

    
    
    btnCryp.addEventListener('click', (e) =>{
     //   mxnData=[]        
        cadData=[]
        usdData=[]
        eurData=[]
        getDivisas()
        getSimbolos();
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
  //  MXN.innerHTML='';
    CAD.innerHTML=
    USD.innerHTML='';
    EUR.innerHTML='';

    var eurDataConfirm=false;
    var cadDataConfirm=false;
//    var mxnDataConfirm=false;
    var usdDataConfirm=false;

    divisas.forEach(async (divisa)=>{
        const response = await fetch('https://min-api.cryptocompare.com/data/v2/'+tempo+'?fsym='+moneda+'&tsym='+divisa+'&limit=9')
        const {Data} = await response.json();
        const data = Data.Data;
        console.log(data);
        
        if(divisa === "USD"){
            console.log("Datos obtenidos de:\n"+ response.url)
            const text = document.createTextNode("$"+data[0].close)
            USD.appendChild(text);
            usdData =data.map(i => i.close);
            usdDataConfirm=true;
//        }else if (divisa === "MXN"){
        }else if (divisa === "CAD"){
            console.log("Datos obtenidos de:\n"+ response.url)
            const text = document.createTextNode("$"+data[0].close)
//            MXN.appendChild(text);
            CAD.appendChild(text);
            cadData =data.map(i => i.close);
            cadDataConfirm=true;
//            mxnData =data.map(i => i.close);
//            mxnDataConfirm=true;
        }else{
            console.log("Datos obtenidos de:\n"+ response.url)
            const text = document.createTextNode("€"+data[0].close)
            EUR.appendChild(text);
            eurData =data.map(i => i.close);
            eurDataConfirm=true;
        }
        if(eurDataConfirm&&mxnDataConfirm&&usdDataConfirm){
            chart(mxnData,usdData, eurData, data);
        } 
        $("#samedata-modal").modal("hide");
        formulario.reset();
    })
}


const getSimbolos = async () => {
    logoCryp.innerHTML='';
    CRY.innerHTML='';
    const moneda = cryp.value;

    const response = await fetch('https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol='+moneda)
    const {Data} = await response.json();
    const logo = Data.LOGO_URL;
    console.log(logo);
    const textc = document.createTextNode(moneda)
    CRY.appendChild(textc);
    
    
    var logoCrypSrc =document.createElement('img');
    logoCrypSrc.src=logo;
    logoCrypSrc.style= "width: 50px;";
    logoCryp.appendChild(logoCrypSrc);


}
//function chart (mxnData,usdData, eurData /*, data */){
function chart (cadData,usdData, eurData /*, data */){
    console.log("Hay cadData:");
    console.log(cadData);
//    console.log("Hay mxnData:");
//    console.log(mxnData);
    console.log("Hay usdData:");
    console.log(usdData);
    console.log("Hay eurData:");
    console.log(eurData);

    Grafica.destroy();

    const chartConfig ={
        type: "line",
        data: {
            labels: [1,2,3,4,5,6,7,8,9,10],
            //labels: data.map(i => i.time),
            datasets: [
            {
//                data: mxnData.map(i=>i),
//                label: "Peso",
                data: cadData.map(i=>i),
                label: "Dolar Canadiense",
                borderColor: "#3e95cd",
                fill: false,
            },
            {
                data: eurData.map(i=>i),
                label: "Euro",
                borderColor: "#36a2eb",
                fill: false,
            },
            {
                data: usdData.map(i=>i),
                label: "Dolar",
                borderColor: "#07b107",
                fill: false,
            },        
            ],
        },
        options: {
            legend: {
                labels: {
                    fontColor: "#b2b9bf",
                },
            },
            title: {
                display: true,
                fontColor: "#b2b9bf",
                text: "Precios historicos crypto",
            },
            scales: {
                yAxes: [
                    {
                    ticks: {
                        fontColor: "#b2b9bf",
                        fontSize: 12,
                    },
                    },
                ],
                xAxes: [
                    {
                        ticks: {
                            fontColor: "#b2b9bf",
                            fontSize: 12,
                        },
                    },
                ],
            },
        },
    }
    new Chart(
        chartCryptos,
        chartConfig
    )
}

