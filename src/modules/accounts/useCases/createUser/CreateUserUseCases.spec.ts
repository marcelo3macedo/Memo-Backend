import ICreateUsersDTO from "@modules/accounts/dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import MailSchedulerRepositoryInMemory from "@modules/validation/repositories/in-memory/MailSchedulerRepositoryInMemory";
import CreateUserUseCases from "./CreateUserUseCases";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let mailSchedulerRepositoryInMemory: MailSchedulerRepositoryInMemory;
let createUserUseCases: CreateUserUseCases;

describe("Create an User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        mailSchedulerRepositoryInMemory = new MailSchedulerRepositoryInMemory();
        createUserUseCases = new CreateUserUseCases(usersRepositoryInMemory, mailSchedulerRepositoryInMemory);
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