export default interface ICreateDecksDTO {
   name: string;
   description?: string;
   userId: string;
   parentId: string;
   frequencyId: string;
   categoryId?: string;
   isPublic?: boolean;
   clonedBy?: string;
   themeId?: string;
}