import { z } from "zod";
import { User } from "../types/userType";

const baseUrl = "http://localhost:5000";

const UserDtoSchema = z.object({
  id: z.any(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export const api = {
  user: {
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
    getUserByEmail: (email: string) => {
      return fetch(`${baseUrl}/users?email=${email}`)
        .then((response) => response.json())
        .then((res) => {
          return UserDtoSchema.array().parse(res);
        });
    },
    getUserByName: (name: string) => {
      return fetch(`${baseUrl}/users?name=${name}`)
        .then((response) => response.json())
        .then((res) => {
          return UserDtoSchema.array().parse(res);
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
    updateUser: (user: User, userId: number) => {
      return fetch(`${baseUrl}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((response) => response.json());
    },
  },
  userData: {
    getUserData: (userId: string) => {
      return fetch(`${baseUrl}/userData/${userId}`)
        .then((response) => response.json())
        .then((res) => {
          return res;
        });
    },
    addUserData: (userData: any) => {
      return fetch(`${baseUrl}/userData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }).then((response) => response.json());
    },
    updateUserData: (userData: any) => {
      return fetch(`${baseUrl}/userData`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }).then((response) => response.json());
    },
    deleteUserData: (userId: string) => {
      return fetch(`${baseUrl}/userData/${userId}`, {
        method: "DELETE",
      }).then((response) => response.json());
    },
  },
  factOfTheDay: {
    getFactOfTheDay: () => {
      return fetch(`${baseUrl}/FactOfTheDay`)
        .then((response) => response.json())
        .then((res) => {
          return res;
        });
    },
  },
};

export const newApi = {
  login: (email: string, password: string) => {
    return fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
  },
  register: (username: string, email: string, password: string) => {
    return fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
  },
  getUserByToken: (token: string) => {
    return fetch(`${baseUrl}/api/get/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  },

  checkUsername: (username: string) => {
    return fetch(`${baseUrl}/check-username/${username}`)
  },
  
  checkEmail: (email: string) => {
    return fetch(`${baseUrl}/check-email/${email}`)
  },
  ValidateToken: (token: string) => {
    return fetch(`${baseUrl}/api/checkToken`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  },
  user: {
    getUser: (username: string) => {
      return fetch(`${baseUrl}/user/username/${username}`)
        .then((response) => response.json())
        .then((res) => {
          return res;
        });
    },
  },
};
