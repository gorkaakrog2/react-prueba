import { useState } from "react";

function Formulario({nuevoColor}){

    let [textoTemporal,setTextoTemporal] = useState("");
    let [error,setError] = useState(false);
    let [mensajeError,setMensajeError] = useState("");

    return (
        <form onSubmit={ evento => {
            evento.preventDefault()

            
            setMensajeError("El campo no puede estar en blanco");

            setError(false);

            let valido = /^([0-9]{1,3},){2}[0-9]{1,3}$/.test(textoTemporal);

            if(valido){
                
                let [r,g,b] = textoTemporal.split(',').map( n => Number(n) ); // Lo está desestructurarlo

                [r,g,b].forEach( n => valido = valido && n <= 255 );

                if(valido){
                    return fetch("https://api-bx2j.onrender.com/api-colores",{
                        method: "POST",
                        body : JSON.stringify({r,g,b}),
                        headers : {
                            "Content-type" : "application/json"
                        } 
                    })
                    .then( respuesta => respuesta.json() )
                    .then( respuesta => {
                        if(respuesta.id){ // Por si el servidor da un error
                            let {id} = respuesta;
                            nuevoColor({id,r,g,b});
                            return setTextoTemporal("");
                        }
                        setMensajeError("Ha ocurrido un eror");
                        setError(true);
                    } )
                }

                setMensajeError("deben ser numeros entre 0 y 255");

            }

            setError(true);


        } }>
            <input type="text" 
                placeholder="rrr,ggg,bbb" 
                value={textoTemporal}
                onChange={ evento => setTextoTemporal(evento.target.value) }
            />
            <p className={ `error ${ error ? "error-visible" : "" }` }>{ mensajeError }</p>
            <input type="submit" value="crear color" />
        </form>
    )
};

export default Formulario;