import { UserRepositoryContract } from "./user.types";
import { PRISMA_CLIENT } from "../config/client";

export const UserRepository: UserRepositoryContract = {
    async createUser(email, password, name) {
        try {
            const existingUser = await PRISMA_CLIENT.user.findUnique({
                where: { email }
            });
            if (existingUser) {
                return 'duplicate';
            }
            //const user = await PRISMA_CLIENT.user.create({
            //    
            //});
            return 'created';
        } catch (error) {
            console.error(error);
            return null;
        }
    },
}