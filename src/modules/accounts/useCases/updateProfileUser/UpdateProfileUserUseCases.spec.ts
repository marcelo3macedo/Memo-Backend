import { v4 as uuid } from "uuid";
import UpdateProfileUserUseCases from "./UpdateProfileUserUseCases";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let updateProfileUserUseCases: UpdateProfileUserUseCases;

describe("Review Info", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        updateProfileUserUseCases = new UpdateProfileUserUseCases(usersRepositoryInMemory);
    });

    it("Should be able to review info", async () => {
        expect(async () => {
            const id = uuid();
            await updateProfileUserUseCases.execute({ id, name: 'teste' });
        }).not.toThrow()
    });
});