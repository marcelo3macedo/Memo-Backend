import { AppError } from "@shared/errors/AppError";
import ICreateUsersDTO from "@modules/accounts/dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import CreateUserUseCases from "../createUser/CreateUserUseCases";
import AuthenticateUserUseCases from "./AuthenticateUserUseCases";
import { UsersTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory";
import { DaysDateProvider } from "@shared/container/providers/DateProvider/implementations/DaysDateProvider";

let authenticateUserUseCases: AuthenticateUserUseCases;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let createUserUseCases: CreateUserUseCases;
let daysDateProvider: DaysDateProvider;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
        daysDateProvider = new DaysDateProvider();
        authenticateUserUseCases = new AuthenticateUserUseCases(usersRepositoryInMemory, usersTokenRepositoryInMemory, daysDateProvider);
        createUserUseCases = new CreateUserUseCases(usersRepositoryInMemory);
    });

    it("Should be able to authenticate an user", async () => {
        const user: ICreateUsersDTO = {
            name: "Test",
            email: "user@test.com",
            password: "1234"
        };

        await createUserUseCases.execute(user);

        const result = await authenticateUserUseCases.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

    it("Should not be able to authenticate a nonexistent user", () => {
        expect(async () => {
            await authenticateUserUseCases.execute({
                email: "false@email.com",
                password: "1234"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to authenticate with incorret password", () => {
        expect(async () => {
            const user: ICreateUsersDTO = {
                name: "Test",
                email: "user@user.com",
                password: "1234"
            };

            await createUserUseCases.execute(user);

            await authenticateUserUseCases.execute({
                email: "user@user.com",
                password: "incorrectPassword"
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});