import { api } from "../shared/api";

export default async function registration(name: string, email: string, password: string) {
    const response = await api.user.getUsers();
    const id = response.length + 1;
    if(response.find((user) => user.name === name) !== undefined){ 
        return -1
    }
    if(response.find((user) => user.email === email) !== undefined){
        return -2
    }
    return api.user.addUser({id: id, name, email, password, options: null});
}