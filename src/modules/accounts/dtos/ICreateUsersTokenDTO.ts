export default interface ICreateUsersTokenDTO {
   userId: string;
   expiresDate: Date;
   refreshToken: string;
}