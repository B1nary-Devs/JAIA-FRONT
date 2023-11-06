import axios from 'axios'

export async function signIn(email: string, password: string){

    try {
        const login = {
            email: email,
            senha: password
        }

        const response = await axios.post('http://localhost:8080/auth/login', login);
        const token = response.data.jwt;
        const acesso = response.data.user.authorities[0].authority;
        const userId = response.data.user.usuarioId;
        localStorage.setItem('token', token);
        localStorage.setItem('acesso', acesso);
        localStorage.setItem('user', userId);

    } catch (error) {
        console.log(error)
    }
}

export function signOut(){
    localStorage.removeItem('token')
    localStorage.removeItem('acesso')
}

// export async function user(){

//     try {
//         const userId = localStorage.getItem('user');
//         const response = await axios.get(`http://localhost:8080/usuario/id/${userId}`)
//         const userName = response.data.nome

// puxar o nome do prestador atraves do usuarioId
//     } catch (error) {
        
//     }
// }

export function verifyTokenAcesso(){
    const token = localStorage.getItem('token');
    const acesso = localStorage.getItem('acesso');

    if(!token){
        return false;
    }else if(token && acesso === 'ADMIN'){
        console.log(acesso)
        return true;
    }else{
        console.log(acesso)
        return false;
    }
}

export function verifyTokenEspecial(){
    const token = localStorage.getItem('token');
    const acesso = localStorage.getItem('acesso');

    if(!token){
        return false;
    }else if(token && acesso === 'USER'){
        console.log(acesso)
        return true;
    }else{
        console.log(acesso)
        return false;
    }
}


