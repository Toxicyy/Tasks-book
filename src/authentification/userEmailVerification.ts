import { api } from "../shared/api";

export default async function userEmailVerification(email: string) {
    const response = await api.user.getUserByEmail(email);
    if(response.length > 0){
        return false
    }
    return true
}