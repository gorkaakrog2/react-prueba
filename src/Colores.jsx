import { useState, useEffect } from "react"
import Formulario from "./Formulario.jsx"
import Item from "./Item.jsx"

function Colores(){

    let [colores,setColores] = useState([]);

    useEffect(() => {
        fetch("https://api-bx2j.onrender.com/api-colores")
        .then( respuesta => respuesta.json() )
        .then( colores => setColores(colores) )
    },[]); // [] al ponerlos asi es que se ejecute cuando se cargue la app

    function nuevoColor(color){
        setColores([...colores,color]); // Con react no se puede hacer un push, hay que enviar todos los valores, antifguos y el nuevo
    }

    function borrarColor(id){
        setColores(colores.filter(color => color.id != id));
    }

    return (
        <>
            <Formulario nuevoColor={nuevoColor}/>
            <ul>
                { colores.map( color => <Item key={color.id} 
                                              id={color.id}
                                              r={color.r}
                                              g={color.g}
                                              b={color.b} 
                                              borrarColor={borrarColor}/> ) }
            </ul>
        </>
    )
};

export default Colores;