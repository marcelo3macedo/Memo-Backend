export default interface ICreateDecksDTO {
   name: string;
   userId: string;
   parentId: string;
   frequencyId: string;
   isPublic?: boolean;
   clonedBy?: string;
}