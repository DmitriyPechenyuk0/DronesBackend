/* 
import { sign, verify } from "jsonwebtoken";
import { env } from "../config/env";

export const userService: UserServiceContract = {
  async login(email, password) {
    const user = await UserRepository.login(email, password);

    if (!user) {
      return "not found";
    } else {
      return sign({ userId: user.id }, env.SECRET_KEY, {
        expiresIn: "7d",
      });
    }
  },
  async register(body) {
    const user = await UserRepository.register(body);

    if (user) {
      throw new Error("USER_EXISTS");
    }
    if (typeof user === "number") {
      return sign({ userId: user }, env.SECRET_KEY, { expiresIn: "7d" });
    }
    return user;
  },
  async me(userId) {
    try {
      return await UserRepository.me(userId);
    } catch (error) {
      console.log(error);
      return "error";
    }
  },
};
*/

import bcrypt from "bcryptjs";
import { sign, verify, JwtPayload, JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { UserRepository } from "./user.repository";
import  { UserContract } from './user.types';
import { env } from "../config/env";


export function verifyAndDecodeJwt(token: string): JwtPayload | null {
  try {
    const decoded = verify(token, env.SECRET_KEY) as JwtPayload;
    return decoded;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      console.error('token was expired');
    } else if (error instanceof JsonWebTokenError) {
      console.error('Envalid token');
    } else {
      console.error('verify error JWT:', error);
    }
    return null;
  }
}
export const userService: UserContract = {
  async login(email, password) {
    try {
      const user = await UserRepository.getByEmail(email);
      let isMatch = bcrypt.compare(password, user.password)
      
      if (!user) {
        return { success: false, message: "Invalid credentials" };
      } else {
        return {
          success: true,
          data: {jwt: sign({ userId: user.id }, env.SECRET_KEY, {
            expiresIn: "7d",
          })}
        }
      }
      return { success: false, message: 'Unhandled error' }
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Unhandled error' }
    }
  },
  async register(body) {
    const { password, email, name } = body
    try {
      const user = await UserRepository.createUser(email, password, name);
      if(!user){
        return { success: false, message: "" };
      }
      if(user === 'created'){
        return { success: true, data: {} };
  
      } else if (user === 'duplicate'){
        
        return { success: false, message: 'Integrity error' }
      }
      return { success: false, message: 'Unhandled error' }
    } catch (error) {
      console.log(error)
      return { success: false, message: 'Unhandled error' }
    }

  },
  async me(jwt) {
    try {
      let decoded = verifyAndDecodeJwt(jwt)
      if (decoded !== null){
        decoded = decoded.userId
        const userData = await UserRepository.getUserData(decoded)
        if (!(userData !== null)){
          return {
            success: true,
            data: userData
          }
        } else{
          return {
            success: false,
            message: "User not found"
          }
        }
      } else{
        return {
          success: false,
          message: "invalid JWT"
        }
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: 'Unhandled error'
      }
    }
  },
  async recovery()
};