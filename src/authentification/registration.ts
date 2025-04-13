import { newApi } from "../shared/api";

export default async function registration(username: string, email: string, password: string) {
    return await newApi.register(username, email, password);
}
