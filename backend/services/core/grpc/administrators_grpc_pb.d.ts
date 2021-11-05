// package: 
// file: administrators.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as administrators_pb from "./administrators_pb";

interface IAdministratorsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    signIn: IAdministratorsService_ISignIn;
    refreshToken: IAdministratorsService_IRefreshToken;
    create: IAdministratorsService_ICreate;
    update: IAdministratorsService_IUpdate;
    delete: IAdministratorsService_IDelete;
    getList: IAdministratorsService_IGetList;
    setPassword: IAdministratorsService_ISetPassword;
}

interface IAdministratorsService_ISignIn extends grpc.MethodDefinition<administrators_pb.SignInRequest, administrators_pb.AuthResponse> {
    path: "/Administrators/SignIn";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<administrators_pb.SignInRequest>;
    requestDeserialize: grpc.deserialize<administrators_pb.SignInRequest>;
    responseSerialize: grpc.serialize<administrators_pb.AuthResponse>;
    responseDeserialize: grpc.deserialize<administrators_pb.AuthResponse>;
}
interface IAdministratorsService_IRefreshToken extends grpc.MethodDefinition<administrators_pb.RefreshTokenRequest, administrators_pb.AuthResponse> {
    path: "/Administrators/RefreshToken";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<administrators_pb.RefreshTokenRequest>;
    requestDeserialize: grpc.deserialize<administrators_pb.RefreshTokenRequest>;
    responseSerialize: grpc.serialize<administrators_pb.AuthResponse>;
    responseDeserialize: grpc.deserialize<administrators_pb.AuthResponse>;
}
interface IAdministratorsService_ICreate extends grpc.MethodDefinition<administrators_pb.CreateRequest, administrators_pb.AdministratorMessage> {
    path: "/Administrators/Create";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<administrators_pb.CreateRequest>;
    requestDeserialize: grpc.deserialize<administrators_pb.CreateRequest>;
    responseSerialize: grpc.serialize<administrators_pb.AdministratorMessage>;
    responseDeserialize: grpc.deserialize<administrators_pb.AdministratorMessage>;
}
interface IAdministratorsService_IUpdate extends grpc.MethodDefinition<administrators_pb.AdministratorMessage, administrators_pb.AdministratorMessage> {
    path: "/Administrators/Update";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<administrators_pb.AdministratorMessage>;
    requestDeserialize: grpc.deserialize<administrators_pb.AdministratorMessage>;
    responseSerialize: grpc.serialize<administrators_pb.AdministratorMessage>;
    responseDeserialize: grpc.deserialize<administrators_pb.AdministratorMessage>;
}
interface IAdministratorsService_IDelete extends grpc.MethodDefinition<administrators_pb.DeleteRequest, administrators_pb.Empty> {
    path: "/Administrators/Delete";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<administrators_pb.DeleteRequest>;
    requestDeserialize: grpc.deserialize<administrators_pb.DeleteRequest>;
    responseSerialize: grpc.serialize<administrators_pb.Empty>;
    responseDeserialize: grpc.deserialize<administrators_pb.Empty>;
}
interface IAdministratorsService_IGetList extends grpc.MethodDefinition<administrators_pb.Empty, administrators_pb.AdministratorsResponse> {
    path: "/Administrators/GetList";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<administrators_pb.Empty>;
    requestDeserialize: grpc.deserialize<administrators_pb.Empty>;
    responseSerialize: grpc.serialize<administrators_pb.AdministratorsResponse>;
    responseDeserialize: grpc.deserialize<administrators_pb.AdministratorsResponse>;
}
interface IAdministratorsService_ISetPassword extends grpc.MethodDefinition<administrators_pb.SetPasswordRequest, administrators_pb.Empty> {
    path: "/Administrators/SetPassword";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<administrators_pb.SetPasswordRequest>;
    requestDeserialize: grpc.deserialize<administrators_pb.SetPasswordRequest>;
    responseSerialize: grpc.serialize<administrators_pb.Empty>;
    responseDeserialize: grpc.deserialize<administrators_pb.Empty>;
}

export const AdministratorsService: IAdministratorsService;

export interface IAdministratorsServer extends grpc.UntypedServiceImplementation {
    signIn: grpc.handleUnaryCall<administrators_pb.SignInRequest, administrators_pb.AuthResponse>;
    refreshToken: grpc.handleUnaryCall<administrators_pb.RefreshTokenRequest, administrators_pb.AuthResponse>;
    create: grpc.handleUnaryCall<administrators_pb.CreateRequest, administrators_pb.AdministratorMessage>;
    update: grpc.handleUnaryCall<administrators_pb.AdministratorMessage, administrators_pb.AdministratorMessage>;
    delete: grpc.handleUnaryCall<administrators_pb.DeleteRequest, administrators_pb.Empty>;
    getList: grpc.handleUnaryCall<administrators_pb.Empty, administrators_pb.AdministratorsResponse>;
    setPassword: grpc.handleUnaryCall<administrators_pb.SetPasswordRequest, administrators_pb.Empty>;
}

export interface IAdministratorsClient {
    signIn(request: administrators_pb.SignInRequest, callback: (error: grpc.ServiceError | null, response: administrators_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    signIn(request: administrators_pb.SignInRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: administrators_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    signIn(request: administrators_pb.SignInRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: administrators_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    refreshToken(request: administrators_pb.RefreshTokenRequest, callback: (error: grpc.ServiceError | null, response: administrators_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    refreshToken(request: administrators_pb.RefreshTokenRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: administrators_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    refreshToken(request: administrators_pb.RefreshTokenRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: administrators_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    create(request: administrators_pb.CreateRequest, callback: (error: grpc.ServiceError | null, response: administrators_pb.AdministratorMessage) => void): grpc.ClientUnaryCall;
    create(request: administrators_pb.CreateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: administrators_pb.AdministratorMessage) => void): grpc.ClientUnaryCall;
    create(request: administrators_pb.CreateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: administrators_pb.AdministratorMessage) => void): grpc.ClientUnaryCall;
    update(request: administrators_pb.AdministratorMessage, callback: (error: grpc.ServiceError | null, response: administrators_pb.AdministratorMessage) => void): grpc.ClientUnaryCall;
    update(request: administrators_pb.AdministratorMessage, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: administrators_pb.AdministratorMessage) => void): grpc.ClientUnaryCall;
    update(request: administrators_pb.AdministratorMessage, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: administrators_pb.AdministratorMessage) => void): grpc.ClientUnaryCall;
    delete(request: administrators_pb.DeleteRequest, callback: (error: grpc.ServiceError | null, response: administrators_pb.Empty) => void): grpc.ClientUnaryCall;
    delete(request: administrators_pb.DeleteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: administrators_pb.Empty) => void): grpc.ClientUnaryCall;
    delete(request: administrators_pb.DeleteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: administrators_pb.Empty) => void): grpc.ClientUnaryCall;
    getList(request: administrators_pb.Empty, callback: (error: grpc.ServiceError | null, response: administrators_pb.AdministratorsResponse) => void): grpc.ClientUnaryCall;
    getList(request: administrators_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: administrators_pb.AdministratorsResponse) => void): grpc.ClientUnaryCall;
    getList(request: administrators_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: administrators_pb.AdministratorsResponse) => void): grpc.ClientUnaryCall;
    setPassword(request: administrators_pb.SetPasswordRequest, callback: (error: grpc.ServiceError | null, response: administrators_pb.Empty) => void): grpc.ClientUnaryCall;
    setPassword(request: administrators_pb.SetPasswordRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: administrators_pb.Empty) => void): grpc.ClientUnaryCall;
    setPassword(request: administrators_pb.SetPasswordRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: administrators_pb.Empty) => void): grpc.ClientUnaryCall;
}

export class AdministratorsClient extends grpc.Client implements IAdministratorsClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public signIn(request: administrators_pb.SignInRequest, callback: (error: grpc.ServiceError | null, response: administrators_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    public signIn(request: administrators_pb.SignInRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: administrators_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    public signIn(request: administrators_pb.SignInRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: administrators_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    public refreshToken(request: administrators_pb.RefreshTokenRequest, callback: (error: grpc.ServiceError | null, response: administrators_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    public refreshToken(request: administrators_pb.RefreshTokenRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: administrators_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    public refreshToken(request: administrators_pb.RefreshTokenRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: administrators_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    public create(request: administrators_pb.CreateRequest, callback: (error: grpc.ServiceError | null, response: administrators_pb.AdministratorMessage) => void): grpc.ClientUnaryCall;
    public create(request: administrators_pb.CreateRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: administrators_pb.AdministratorMessage) => void): grpc.ClientUnaryCall;
    public create(request: administrators_pb.CreateRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: administrators_pb.AdministratorMessage) => void): grpc.ClientUnaryCall;
    public update(request: administrators_pb.AdministratorMessage, callback: (error: grpc.ServiceError | null, response: administrators_pb.AdministratorMessage) => void): grpc.ClientUnaryCall;
    public update(request: administrators_pb.AdministratorMessage, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: administrators_pb.AdministratorMessage) => void): grpc.ClientUnaryCall;
    public update(request: administrators_pb.AdministratorMessage, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: administrators_pb.AdministratorMessage) => void): grpc.ClientUnaryCall;
    public delete(request: administrators_pb.DeleteRequest, callback: (error: grpc.ServiceError | null, response: administrators_pb.Empty) => void): grpc.ClientUnaryCall;
    public delete(request: administrators_pb.DeleteRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: administrators_pb.Empty) => void): grpc.ClientUnaryCall;
    public delete(request: administrators_pb.DeleteRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: administrators_pb.Empty) => void): grpc.ClientUnaryCall;
    public getList(request: administrators_pb.Empty, callback: (error: grpc.ServiceError | null, response: administrators_pb.AdministratorsResponse) => void): grpc.ClientUnaryCall;
    public getList(request: administrators_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: administrators_pb.AdministratorsResponse) => void): grpc.ClientUnaryCall;
    public getList(request: administrators_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: administrators_pb.AdministratorsResponse) => void): grpc.ClientUnaryCall;
    public setPassword(request: administrators_pb.SetPasswordRequest, callback: (error: grpc.ServiceError | null, response: administrators_pb.Empty) => void): grpc.ClientUnaryCall;
    public setPassword(request: administrators_pb.SetPasswordRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: administrators_pb.Empty) => void): grpc.ClientUnaryCall;
    public setPassword(request: administrators_pb.SetPasswordRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: administrators_pb.Empty) => void): grpc.ClientUnaryCall;
}
