export default interface ICreateDecksDTO {
   name: string;
   userId: string;
   parentId: string;
   frequencyId: string;
   categoryId?: string;
   isPublic?: boolean;
   clonedBy?: string;
}