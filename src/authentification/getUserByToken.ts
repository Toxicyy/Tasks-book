import { newApi } from "../shared/api";

export default async function getUserByToken(token: string) {
    return await newApi.getUserByToken(token);
}