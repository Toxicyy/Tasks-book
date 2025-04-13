import { newApi } from "../shared/api";

export default async function login(email: string, password: string) {
    return await newApi.login(email, password);
}
