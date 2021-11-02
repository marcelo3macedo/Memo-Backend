import ICreateUsersDTO from "@modules/accounts/dtos/ICreateUsersDTO";
import CreateUserUseCases from "../createUser/CreateUserUseCases";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import ProfileUserUseCases from "./ProfileUserUseCases";

let createUserUseCases: CreateUserUseCases;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let profileUserUseCases: ProfileUserUseCases;

describe("Recover User Profile", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        profileUserUseCases = new ProfileUserUseCases(usersRepositoryInMemory);
        createUserUseCases = new CreateUserUseCases(usersRepositoryInMemory);
    });

    it("Should be able to recover user profile", async () => {
        const user: ICreateUsersDTO = {
            name: "Test",
            email: "user@test.com",
            password: "1234"
        };

        await createUserUseCases.execute(user);

        const findUser = await usersRepositoryInMemory.findByEmail(user.email);

        const profile = await profileUserUseCases.execute({ id: findUser.id });

        expect(profile).not.toBeNull();
    });
});