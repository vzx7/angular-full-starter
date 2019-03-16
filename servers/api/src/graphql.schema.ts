/* tslint:disable */
export class CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    roleName?: string;
}

export class UpdateUseInput {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    roleName: string;
}

export abstract class IMutation {
    abstract createRole(name: string): Role | Promise<Role>;

    abstract updateRole(id: string, name: string): Role | Promise<Role>;

    abstract deleteRole(id: string): boolean | Promise<boolean>;

    abstract signIn(login: string, password: string): Token | Promise<Token>;

    abstract signUp(firstName: string, lastName: string, email: string, username: string, password: string): Token | Promise<Token>;

    abstract createUser(createUserInput?: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput?: UpdateUseInput): User | Promise<User>;

    abstract deleteUser(id: string): boolean | Promise<boolean>;
}

export abstract class IQuery {
    abstract roles(): Role[] | Promise<Role[]>;

    abstract role(id: string): Role | Promise<Role>;

    abstract users(): User[] | Promise<User[]>;

    abstract user(id: string): User | Promise<User>;

    abstract me(): User | Promise<User>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class Role {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export class Token {
    token: string;
}

export class User {
    id: string;
    firstName: string;
    lastName: string;
    username?: string;
    email: string;
    role: Role;
    createdAt: string;
    updatedAt: string;
}
