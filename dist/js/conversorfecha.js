
//El siguiente metodo permite regresar una fecha en formato númerico de milisegundos a formato legible por el ser humano
    function conversorfecha(fechaMili){

        var unixTimestamp = fechaMili
    var date = new Date(unixTimestamp*1000);

    return "Fecha: "+date.getDate()+
            "/"+(date.getMonth()+1)+
            "/"+date.getFullYear()+
            " "+date.getHours()+
            ":"+date.getMinutes()+
            ":"+date.getSeconds();

    }
export default conversorfecha;