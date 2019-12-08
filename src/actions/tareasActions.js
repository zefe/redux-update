import axios from 'axios';
import { TRAER_TODAS, CARGANDO, ERROR } from '../types/tareasTypes';  // action type

export const traerTodas = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    })
    try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos');

        const tareas = {};
        respuesta.data.map((tar) => (
            //sacamos el id del usuario y se lo agregamos como propiedad al objeto tareas
            tareas[tar.userId] = {
                //destructuramos todas las tareas que le corresponden a ese id de usuario
                ...tareas[tar.userId],
                [tar.id]: {
                    ...tar
                }
            }
        ));

        dispatch({
            type: TRAER_TODAS,
            payload: tareas
        })
    } catch (error) {
        console.log('Error:', error.message);
        dispatch({
            type: ERROR,
            payload: 'Información de tarea no disponible, intente más tarde 👻'
        })
    }
}