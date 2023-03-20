//Grafica
const chartCryptos = document.getElementById("line-chart")

const btnCryp = document.querySelector('#btnCryp');
const temp = document.querySelector('#temp');
const cryp = document.querySelector('#cryp');
const formulario = document.querySelector('#crip-form');
//cuadro divisas

const cad = document.querySelector('#cad');
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');

const USD = document.querySelector('#USD');
const CAD = document.querySelector('#CAD');
const EUR = document.querySelector('#EUR');
const CRY = document.querySelector('#criptoselect');
const CRY2 = document.querySelector('#criptoselectabr');

const logoCryp = document.querySelector('.LogoCryp')
const logoCAD = document.querySelector('.logoCAD')
const logoUSD = document.querySelector('.LogoUSD')
const logoEUR = document.querySelector('.LogoEUR')
var moneda="BTC"
const cryptos =[];
const divisas = [
    "USD", "CAD", "EUR"
];

// Crear un Promise que devuelve las criptomonedas
const obtenerCriptomonedas  = criptomonedas => new Promise( resolve => {
    resolve(criptomonedas);
});
document.addEventListener('DOMContentLoaded', () => {
	consultarCriptomonedas();
    getSimbolos();
    getCritpo();
    cargarGrafico();
    datos_tiempo_real();
    
    btnCryp.addEventListener('click', (e) =>{
        cadData=[]
        usdData=[]
        eurData=[]
        getDivisas()
        getSimbolos();
        getCritpo();
    }) 
});
//Función 
function datos_tiempo_real(){
cargarPrecios();
setTimeout("datos_tiempo_real()",1000)

}
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
     moneda = cryp.value;
    const tempo = temp.value;
    CAD.innerHTML='';
    USD.innerHTML='';
    EUR.innerHTML='';

    var eurDataConfirm=false;
    var cadDataConfirm=false;
    var usdDataConfirm=false;

    divisas.forEach(async (divisa)=>{
        const response = await fetch('https://min-api.cryptocompare.com/data/v2/'+tempo+'?fsym='+moneda+'&tsym='+divisa+'&limit=40')
        const {Data} = await response.json();
        const data = Data.Data;
        console.log(data);
        
        if(divisa === "USD"){
            console.log("Datos obtenidos de:\n"+ response.url)
            const text = document.createTextNode(Intl.NumberFormat('en-IN', {style: 'currency',currency: 'USD', minimumFractionDigits: 2}).format(data[0].close))
            USD.appendChild(text);
            usdData =data.map(i => i.close);
            usdDataConfirm=true;
        }else if (divisa === "CAD"){
            console.log("Datos obtenidos de:\n"+ response.url)
            const text = document.createTextNode(Intl.NumberFormat('en-IN', {style: 'currency', currency: 'CAD',minimumFractionDigits: 2}).format(data[0].close))
            CAD.appendChild(text);
            cadData =data.map(i => i.close);
            cadDataConfirm=true;
        }else{
            console.log("Datos obtenidos de:\n"+ response.url)
            const text = document.createTextNode(Intl.NumberFormat('en-DE', {style: 'currency', currency: 'EUR',minimumFractionDigits: 2}).format(data[0].close))
            EUR.appendChild(text);
            eurData =data.map(i => i.close);
            eurDataConfirm=true;
        }
        if(eurDataConfirm&&cadDataConfirm&&usdDataConfirm){    
          
            chart(cadData,usdData, eurData, data);
        } 
        $("#samedata-modal").modal("hide");
        formulario.reset();
    })
}

const getCritpo = async () => {
    CRY.innerHTML='';
    CRY2.innerHTML='';
   //const moneda = cryp.value;
    const response = await fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=15&tsym=USD')
    const {Data} = await response.json();
    Data.forEach(async (mon_nam)=>{
        
     if(moneda===mon_nam.CoinInfo.Name)
        {
            const textc = document.createTextNode(mon_nam.CoinInfo.FullName)
            CRY.style.fontSize="18px"
            CRY.appendChild(textc);
            const textc2 = document.createTextNode(moneda)
            CRY2.style.fontSize="16px"
            CRY2.appendChild(textc2);
        }
    })
        
}

const getSimbolos = async () => {
    logoCryp.innerHTML='';
    CRY.innerHTML='';
    
   
    const response = await fetch('https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol='+moneda)
    const {Data} = await response.json();
    const logo = Data.LOGO_URL;
    console.log(logo);
    var logoCrypSrc =document.createElement('img');
    logoCrypSrc.src=logo;
    logoCrypSrc.style= "width: 50px;";
    logoCryp.appendChild(logoCrypSrc);


}
const cargarGrafico = async () => {
    
    const tempo = "histohour";
    CAD.innerHTML='';
    USD.innerHTML='';
    EUR.innerHTML='';
    var eurDataConfirm=false;
    var cadDataConfirm=false;
    var usdDataConfirm=false;
  
    divisas.forEach(async (divisa)=>{
        const response = await fetch('https://min-api.cryptocompare.com/data/v2/'+tempo+'?fsym='+moneda+'&tsym='+divisa+'&limit=40')
        const {Data} = await response.json();
        const data = Data.Data;
        console.log(data);

        if(divisa === "USD"){
            console.log("Datos obtenidos de:\n"+ response.url)
            const text = document.createTextNode(Intl.NumberFormat('en-IN', {style: 'currency',currency: 'USD', minimumFractionDigits: 2}).format(data[0].close))
            USD.appendChild(text);
            usdData =data.map(i => i.close);
            usdDataConfirm=true;
        }else if (divisa === "CAD"){
            console.log("Datos obtenidos de:\n"+ response.url)
            const text = document.createTextNode(Intl.NumberFormat('en-IN', {style: 'currency', currency: 'CAD',minimumFractionDigits: 2}).format(data[0].close))
            CAD.appendChild(text);
            cadData =data.map(i => i.close);
            cadDataConfirm=true;
        }else{
            console.log("Datos obtenidos de:\n"+ response.url)
            const text = document.createTextNode(Intl.NumberFormat('en-DE', {style: 'currency', currency: 'EUR',minimumFractionDigits: 2}).format(data[0].close))
            EUR.appendChild(text);
            eurData =data.map(i => i.close);
            eurDataConfirm=true;
        }
        if(eurDataConfirm&&cadDataConfirm&&usdDataConfirm){
            chart(cadData,usdData, eurData, data);
        } 
    })
    $("#samedata-modal").modal("hide");
        formulario.reset();
   }

const cargarPrecios = async () => {  
    
    
    divisas.forEach(async (divisa)=>{
       
        const response = await fetch('https://data-api.cryptocompare.com/index/cc/v1/latest/tick?market=ccix&instruments=BTC-'+divisa)
        const {Data} = await response.json();
        const datos = await Data['BTC-'+divisa].VALUE;
       
     console.log(datos);
        if(divisa === "USD"){
             USD.innerHTML= Intl.NumberFormat('en-IN', {style: 'currency',currency: 'usd', minimumFractionDigits: 2}).format(datos)
        }else if (divisa === "CAD"){
            CAD.innerHTML= Intl.NumberFormat('en-IN', {style: 'currency',currency: 'usd', minimumFractionDigits: 2}).format(datos)
        }else{
            if (divisa === "EUR"){
            EUR.innerHTML= Intl.NumberFormat('en-IN', {style: 'currency',currency: 'usd', minimumFractionDigits: 2}).format(datos)
            }
        }
    })
  //  $("#samedata-modal").modal("hide");
   //     formulario.reset();
   }

 //Código del grafico
function chart (cadData,usdData, eurData /*, data */){
    console.log("Hay cadData:");
    console.log(cadData);
    console.log("Hay usdData:");
    console.log(usdData);
    console.log("Hay eurData:");
    console.log(eurData);

    Grafica.destroy();


   
    const chartConfig ={
        type: "line",
        data: {
            labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],
            //labels: data.map(i => i.time),
            datasets: [
            {
                data: cadData.map(i=>i),
                label: "Dolar Canadiense",
              //  borderColor: "#3e95cd",
                borderColor: "#FF0000",
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
                        fontSize: 15,
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

