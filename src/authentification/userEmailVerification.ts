import { newApi } from "../shared/api";

export default async function userEmailVerification(email: string) {
    const response = await newApi.checkEmail(email);
    const data = await response.json();
    console.log(data)
    return !data.emailTaken
}