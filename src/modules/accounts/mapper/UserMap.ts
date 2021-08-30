import { classToClass } from "class-transformer"; 
import IUserResponseDTO from "../dtos/IUserResponseDTO";
import Users from "../entities/Users";

class UserMap {
    static toDTO({
        email, name, id, avatar, avatarUrl,
    }:Users):IUserResponseDTO {
        const user = classToClass({
            email,
            name, 
            id,
            avatar,
            avatarUrl
        });

        return user;
    }
}

export { UserMap }