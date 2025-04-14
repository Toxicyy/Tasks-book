import { newApi } from "../shared/api";

export default async function usernameVerification(name: string) {
    const response = await newApi.checkUsername(name);
    const data = await response.json();
    return !data.usernameTaken
}