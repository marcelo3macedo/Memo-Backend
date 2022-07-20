export default interface ICreateDecksDTO {
   name: string;
   path?: string;
   description?: string;
   userId: string;
   frequencyId: string;
   categoryId?: string;
   isPublic?: boolean;
   clonedBy?: string;
}