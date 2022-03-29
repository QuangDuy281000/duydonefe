export default function authHeader(){
    const user = JSON.parse(localStorage.getItem('user')); // Object.
    if(user && user.token){
        console.log(user.token)
        return {
            Authorization: user.token
        };
    }
        else{
            return {};
        }
}