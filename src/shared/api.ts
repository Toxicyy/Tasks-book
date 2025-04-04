import { z } from "zod";
import { User } from "../types/userType";

const baseUrl = "http://localhost:3000";

const UserDtoSchema = z.object({
  id: z.any(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  options: z.any().nullable(),
});

export const api = {
  getUsers: () => {
    return fetch(`${baseUrl}/users`)
      .then((response) => response.json())
      .then((res) => {
        return UserDtoSchema.array().parse(res);
      });
  },
  getUser: (userId: string) => {
    return fetch(`${baseUrl}/users/${userId}`)
      .then((response) => response.json())
      .then((res) => {
        return UserDtoSchema.parse(res);
      });
  },
  deleteUser: (UserId: string) => {
    return fetch(`${baseUrl}/users/${UserId}`, {
      method: "DELETE",
    }).then((response) => response.json());
  },
  addUser: (user: User) => {
    return fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((res) => {
        return UserDtoSchema.parse({
          id: res.id,
          name: res.name,
          email: res.email,
          password: res.password,
        });
      });
  },
};
