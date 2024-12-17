import {myAxios} from './helper'
export const getCategories = () => {
    return myAxios.get('/categories/')
        .then(response => {
            console.log(response)
            return response.data
        } )
    
}