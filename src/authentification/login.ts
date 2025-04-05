import { api } from "../shared/api";
export default async function login(email: string, password: string) {
    const response = await api.user.getUsers();
    const user = response.find((user) => user.email === email && user.password === password);
    if(user){
        return user;
    }
    else{
        return false;
    }
}
