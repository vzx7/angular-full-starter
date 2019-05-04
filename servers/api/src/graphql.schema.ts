/* tslint:disable */
export class CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    login: string;
    password: string;
}

export class UpdateUserInput {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    login: string;
}

export class UpdateUserPhotoInput {
    userId: string;
    fileId: string;
    fileName: string;
}

export class File {
    id: string;
    fileId: string;
    path: string;
    filename: string;
    mimetype: string;
}

export abstract class IMutation {
    abstract singleUpload(file: Upload): File | Promise<File>;

    abstract multipleUpload(files: Upload[]): File[] | Promise<File[]>;

    abstract createRole(name: string): Role | Promise<Role>;

    abstract updateRole(id: string, name: string): Role | Promise<Role>;

    abstract deleteRole(id: string): boolean | Promise<boolean>;

    abstract signIn(login: string, password: string): Token | Promise<Token>;

    abstract signUp(firstName: string, lastName: string, email: string, login: string, password: string): Token | Promise<Token>;

    abstract createUser(createUserInput?: CreateUserInput): User | Promise<User>;

    abstract updateUser(updateUserInput?: UpdateUserInput): User | Promise<User>;

    abstract updateUserPhoto(updateUserPhotoInput?: UpdateUserPhotoInput): User | Promise<User>;

    abstract deleteUsers(ids: string[]): boolean | Promise<boolean>;

    abstract deleteUser(id: string): boolean | Promise<boolean>;
}

export abstract class IQuery {
    abstract uploads(): File[] | Promise<File[]>;

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
    login?: string;
    email: string;
    photo?: UserPhoto;
}

export class UserPhoto {
    id: string;
    fileId?: string;
    fileName?: string;
}

export type Upload = any;
