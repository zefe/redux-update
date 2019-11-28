import axios from 'axios';
import { TRAER_TODOS, CARGANDO, ERROR } from '../types/usuariosTypes';  // action type

export const traerTodos = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    })
    try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');
        dispatch({
            type: TRAER_TODOS,
            payload: respuesta.data
        })
    } catch (error) {
        console.log('Error:', error.message);
        dispatch({
            type: ERROR,
            payload: 'Información de usuario no disponible, intente más tarde 👻'
        })
    }
}