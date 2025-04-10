import { api } from "../shared/api";

export default async function usernameVerification(name: string) {
    const response = await api.user.getUserByName(name);
    if(response.length > 0){
        return false
    }
    return true
}