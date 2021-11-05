// package: 
// file: administrators.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class SignInRequest extends jspb.Message { 
    getEmail(): string;
    setEmail(value: string): SignInRequest;

    getPassword(): string;
    setPassword(value: string): SignInRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SignInRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SignInRequest): SignInRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SignInRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SignInRequest;
    static deserializeBinaryFromReader(message: SignInRequest, reader: jspb.BinaryReader): SignInRequest;
}

export namespace SignInRequest {
    export type AsObject = {
        email: string,
        password: string,
    }
}

export class AuthResponse extends jspb.Message { 
    getToken(): string;
    setToken(value: string): AuthResponse;

    getRefreshtoken(): string;
    setRefreshtoken(value: string): AuthResponse;

    getExpired(): string;
    setExpired(value: string): AuthResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AuthResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AuthResponse): AuthResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AuthResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AuthResponse;
    static deserializeBinaryFromReader(message: AuthResponse, reader: jspb.BinaryReader): AuthResponse;
}

export namespace AuthResponse {
    export type AsObject = {
        token: string,
        refreshtoken: string,
        expired: string,
    }
}

export class RefreshTokenRequest extends jspb.Message { 
    getRefresh(): string;
    setRefresh(value: string): RefreshTokenRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RefreshTokenRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RefreshTokenRequest): RefreshTokenRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RefreshTokenRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RefreshTokenRequest;
    static deserializeBinaryFromReader(message: RefreshTokenRequest, reader: jspb.BinaryReader): RefreshTokenRequest;
}

export namespace RefreshTokenRequest {
    export type AsObject = {
        refresh: string,
    }
}

export class CreateRequest extends jspb.Message { 
    getEmail(): string;
    setEmail(value: string): CreateRequest;

    getName(): string;
    setName(value: string): CreateRequest;

    getSurname(): string;
    setSurname(value: string): CreateRequest;

    getPatronymic(): string;
    setPatronymic(value: string): CreateRequest;

    getPhone(): string;
    setPhone(value: string): CreateRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateRequest): CreateRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateRequest;
    static deserializeBinaryFromReader(message: CreateRequest, reader: jspb.BinaryReader): CreateRequest;
}

export namespace CreateRequest {
    export type AsObject = {
        email: string,
        name: string,
        surname: string,
        patronymic: string,
        phone: string,
    }
}

export class AdministratorMessage extends jspb.Message { 
    getEmail(): string;
    setEmail(value: string): AdministratorMessage;

    getName(): string;
    setName(value: string): AdministratorMessage;

    getSurname(): string;
    setSurname(value: string): AdministratorMessage;

    getPatronymic(): string;
    setPatronymic(value: string): AdministratorMessage;

    getPhone(): string;
    setPhone(value: string): AdministratorMessage;

    getId(): string;
    setId(value: string): AdministratorMessage;

    getActive(): boolean;
    setActive(value: boolean): AdministratorMessage;

    getRole(): string;
    setRole(value: string): AdministratorMessage;

    getAvatar(): string;
    setAvatar(value: string): AdministratorMessage;

    getCreated(): string;
    setCreated(value: string): AdministratorMessage;

    getUpdated(): string;
    setUpdated(value: string): AdministratorMessage;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AdministratorMessage.AsObject;
    static toObject(includeInstance: boolean, msg: AdministratorMessage): AdministratorMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AdministratorMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AdministratorMessage;
    static deserializeBinaryFromReader(message: AdministratorMessage, reader: jspb.BinaryReader): AdministratorMessage;
}

export namespace AdministratorMessage {
    export type AsObject = {
        email: string,
        name: string,
        surname: string,
        patronymic: string,
        phone: string,
        id: string,
        active: boolean,
        role: string,
        avatar: string,
        created: string,
        updated: string,
    }
}

export class AdministratorsResponse extends jspb.Message { 
    clearAdministratorsList(): void;
    getAdministratorsList(): Array<AdministratorMessage>;
    setAdministratorsList(value: Array<AdministratorMessage>): AdministratorsResponse;
    addAdministrators(value?: AdministratorMessage, index?: number): AdministratorMessage;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AdministratorsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AdministratorsResponse): AdministratorsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AdministratorsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AdministratorsResponse;
    static deserializeBinaryFromReader(message: AdministratorsResponse, reader: jspb.BinaryReader): AdministratorsResponse;
}

export namespace AdministratorsResponse {
    export type AsObject = {
        administratorsList: Array<AdministratorMessage.AsObject>,
    }
}

export class DeleteRequest extends jspb.Message { 
    getAdministratorid(): string;
    setAdministratorid(value: string): DeleteRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteRequest): DeleteRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteRequest;
    static deserializeBinaryFromReader(message: DeleteRequest, reader: jspb.BinaryReader): DeleteRequest;
}

export namespace DeleteRequest {
    export type AsObject = {
        administratorid: string,
    }
}

export class Empty extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Empty.AsObject;
    static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Empty;
    static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
    export type AsObject = {
    }
}

export class SetPasswordRequest extends jspb.Message { 
    getEmail(): string;
    setEmail(value: string): SetPasswordRequest;

    getVerificationcode(): string;
    setVerificationcode(value: string): SetPasswordRequest;

    getPassword(): string;
    setPassword(value: string): SetPasswordRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetPasswordRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SetPasswordRequest): SetPasswordRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetPasswordRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetPasswordRequest;
    static deserializeBinaryFromReader(message: SetPasswordRequest, reader: jspb.BinaryReader): SetPasswordRequest;
}

export namespace SetPasswordRequest {
    export type AsObject = {
        email: string,
        verificationcode: string,
        password: string,
    }
}
