import IUserResponseDTO from "../dtos/IUserResponseDTO";
import Users from "../entities/Users";

class UserMap {
    static toDTO({
        email, name, id, createdAt,
    }:Users):IUserResponseDTO {
        const user = {
            email,
            name, 
            id,
            createdAt,
        };

        return user;
    }
}

export { UserMap }