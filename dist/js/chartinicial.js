      cadData=[]
        usdData=[]
        eurData=[]
        timeData=[]
        

document.addEventListener('DOMContentLoaded',async () => {
  dattta= await RenderGraph("USD")
  //console.log(dattta)
for (i=0; i<dattta.lenght();)
  console.log(dattta[3])
})

const RenderGraph = async (divisa) => {

  CAD.innerHTML='';
  USD.innerHTML='';
  EUR.innerHTML='';
  var eurDataConfirm=false;
  var cadDataConfirm=false;
  var usdDataConfirm=false;
  
      const response = await fetch('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym='+divisa+'&limit=40')
      const {Data} = await response.json();
      const data = Data.Data;
      console.log(data);

      if(divisa === "USD"){
          console.log("Datos obtenidos de:\n"+ response.url)
          const text = document.createTextNode(Intl.NumberFormat('en-IN', {style: 'currency',currency: 'USD', minimumFractionDigits: 2}).format(data[0].close))
          USD.appendChild(text);
          usdData =data.map(i => i.close);
         
      }else if (divisa === "CAD"){
          console.log("Datos obtenidos de:\n"+ response.url)
          const text = document.createTextNode(Intl.NumberFormat('en-IN', {style: 'currency', currency: 'CAD',minimumFractionDigits: 2}).format(data[0].close))
          CAD.appendChild(text);
         cadData =data.map(i => i.close);
         timeData=data.map(j=>j.time)
         
      }
      else if (divisa === "EUR"){
          console.log("Datos obtenidos de:\n"+ response.url)
          const text = document.createTextNode(Intl.NumberFormat('en-DE', {style: 'currency', currency: 'EUR',minimumFractionDigits: 2}).format(data[0].close))
          EUR.appendChild(text);
          eurData =data.map(i => i.close);
         
      }
     

 }

var  chartCryptos =document.createElement('canvas');
chartCryptos.style="height: 150px"
chartCryptos.id="line-chart";
graphics.appendChild(chartCryptos)

const Graph =new  Chart(chartCryptos, {
  type: "line",
  data: {
   // labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],
   labels: timeData.map(i=>i),
   datasets: [
      {
        
        data: cadData.map(i=>i),
       // label: "Peso",
        label: "Dolar Canadiense",
       // borderColor: "#3e95cd",
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
});









/*
const cargarGrafico = async () => {

  CAD.innerHTML='';
  USD.innerHTML='';
  EUR.innerHTML='';
  var eurDataConfirm=false;
  var cadDataConfirm=false;
  var usdDataConfirm=false;
  
  divisas.forEach(async (divisa)=>{
      const response = await fetch('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym='+divisa+'&limit=40')
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
        chart(cadData,usdData, eurData,data);
      
          //charti(cadData,usdData, eurData, data);
          //const Grafica =new chart( cadData,usdData, eurData,data);
          var doubles = times.map(function(x) {  esta funcion que al igual la siguiente que usa funcion flecha hacen lo mismo
       return conversorfecha(x)
           })*/ /*
         var doubles = times.map(x=>conversorfecha(x))
          const Grafica =new chart(document.getElementById("line-chart"), { 
            type: "line",
           
            data: {
                  labels: doubles,
            
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
              
            }


          });
          
      } 
  })

  
 }
*/
 

//export default chartini