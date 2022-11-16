import { auth } from "../Assets/data";


export const checkAuth = (data) => {
    const { email, password } = data;

    if (email === auth.USERNAME && password === auth.PASSWORD) {
        return {
            code: 1,
            user: {
                userName: auth.USERNAME
            },
            token: auth.FAKE_TOKEN
        }
    }
    return {
        code: 0,
    }
}

export const checkToken = () => {
    let token = localStorage.getItem('token')
     if(token && token === auth.FAKE_TOKEN){
        return true;
     } else {
        localStorage.clear(); 
        return false;
     }
}
