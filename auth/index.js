//isLoggedIn
export const isLoggedIn = () => {
    let data = sessionStorage.getItem("data")
    if (data !== null)
        return true
   return false 
}

//store token into session/localstorage
export const doLogin = (data,next) => {
    sessionStorage.setItem("data", JSON.stringify(data))
    next()
}
//logout
export const doLogout = (next) => {
    sessionStorage.removeItem("data")
    next()
}
//get current username
export const getCurrentUserDetails = () => {
    if (isLoggedIn()) {
        return JSON.parse(sessionStorage.getItem("data")).user
    }
    else
        return undefined
}

//get token
export const getToken = () => {
    if (isLoggedIn()) {
        return JSON.parse(sessionStorage.getItem("data")).token
    }
    else
        return null
}




