import { UserMap } from "../mapper/UserMap";

export default interface ITokenResponseDTO {
    token: string;
    refreshToken: string;
    user: UserMap
 }