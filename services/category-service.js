import {myAxios} from './helper'
export const getCategories = () => {
    return myAxios.get('/api/v1/categories/')
        .then(response => {
            console.log(response)
            return response.data
        } )
    
}