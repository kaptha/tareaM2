const fecha_hora = document.querySelector("#fecha_hora")
document.addEventListener('DOMContentLoaded', () =>{

obten_fecha_hora();   
 

})

function obten_fecha_hora(){
    momentoActual = new Date()
    const dia =momentoActual.getDate();
    
    const mes =momentoActual.getMonth()+1;
    const año=momentoActual.getFullYear();
    const hora = momentoActual.getHours()
    const minuto = momentoActual.getMinutes()
    const segundo = momentoActual.getSeconds()
    fecha_hora.innerHTML=""
    const horat=document.createTextNode("Fecha: " +dia+ "/"+mes +"/"+ año+" " + hora + " : " + minuto + " : " + segundo)
    fecha_hora.append( horat);
    setTimeout("obten_fecha_hora()",1000)
}
