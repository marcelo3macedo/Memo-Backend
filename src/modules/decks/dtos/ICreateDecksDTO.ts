export default interface ICreateDecksDTO {
   name: string;
   userId: string;
   parentId: string;
   isPublic?: boolean;
   clonedBy?: string;
}