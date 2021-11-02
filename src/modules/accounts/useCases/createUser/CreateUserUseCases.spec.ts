import ICreateUsersDTO from "@modules/accounts/dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import CreateUserUseCases from "./CreateUserUseCases";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCases: CreateUserUseCases;

describe("Create an User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCases = new CreateUserUseCases(usersRepositoryInMemory);
    });

    it("Should be able to create an user", async () => {
        expect(async () => {
            const user: ICreateUsersDTO = {
                name: "Test",
                email: "user@test.com",
                password: "1234"
            };

            await createUserUseCases.execute(user);
        }).not.toThrow();
    });
});