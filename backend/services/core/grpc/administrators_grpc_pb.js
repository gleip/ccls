// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var administrators_pb = require('./administrators_pb.js');

function serialize_AdministratorMessage(arg) {
  if (!(arg instanceof administrators_pb.AdministratorMessage)) {
    throw new Error('Expected argument of type AdministratorMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AdministratorMessage(buffer_arg) {
  return administrators_pb.AdministratorMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AdministratorsResponse(arg) {
  if (!(arg instanceof administrators_pb.AdministratorsResponse)) {
    throw new Error('Expected argument of type AdministratorsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AdministratorsResponse(buffer_arg) {
  return administrators_pb.AdministratorsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AuthResponse(arg) {
  if (!(arg instanceof administrators_pb.AuthResponse)) {
    throw new Error('Expected argument of type AuthResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AuthResponse(buffer_arg) {
  return administrators_pb.AuthResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CreateRequest(arg) {
  if (!(arg instanceof administrators_pb.CreateRequest)) {
    throw new Error('Expected argument of type CreateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CreateRequest(buffer_arg) {
  return administrators_pb.CreateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_DeleteRequest(arg) {
  if (!(arg instanceof administrators_pb.DeleteRequest)) {
    throw new Error('Expected argument of type DeleteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_DeleteRequest(buffer_arg) {
  return administrators_pb.DeleteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Empty(arg) {
  if (!(arg instanceof administrators_pb.Empty)) {
    throw new Error('Expected argument of type Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Empty(buffer_arg) {
  return administrators_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_RefreshTokenRequest(arg) {
  if (!(arg instanceof administrators_pb.RefreshTokenRequest)) {
    throw new Error('Expected argument of type RefreshTokenRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_RefreshTokenRequest(buffer_arg) {
  return administrators_pb.RefreshTokenRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_SetPasswordRequest(arg) {
  if (!(arg instanceof administrators_pb.SetPasswordRequest)) {
    throw new Error('Expected argument of type SetPasswordRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_SetPasswordRequest(buffer_arg) {
  return administrators_pb.SetPasswordRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_SignInRequest(arg) {
  if (!(arg instanceof administrators_pb.SignInRequest)) {
    throw new Error('Expected argument of type SignInRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_SignInRequest(buffer_arg) {
  return administrators_pb.SignInRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var AdministratorsService = exports.AdministratorsService = {
  signIn: {
    path: '/Administrators/SignIn',
    requestStream: false,
    responseStream: false,
    requestType: administrators_pb.SignInRequest,
    responseType: administrators_pb.AuthResponse,
    requestSerialize: serialize_SignInRequest,
    requestDeserialize: deserialize_SignInRequest,
    responseSerialize: serialize_AuthResponse,
    responseDeserialize: deserialize_AuthResponse,
  },
  refreshToken: {
    path: '/Administrators/RefreshToken',
    requestStream: false,
    responseStream: false,
    requestType: administrators_pb.RefreshTokenRequest,
    responseType: administrators_pb.AuthResponse,
    requestSerialize: serialize_RefreshTokenRequest,
    requestDeserialize: deserialize_RefreshTokenRequest,
    responseSerialize: serialize_AuthResponse,
    responseDeserialize: deserialize_AuthResponse,
  },
  create: {
    path: '/Administrators/Create',
    requestStream: false,
    responseStream: false,
    requestType: administrators_pb.CreateRequest,
    responseType: administrators_pb.AdministratorMessage,
    requestSerialize: serialize_CreateRequest,
    requestDeserialize: deserialize_CreateRequest,
    responseSerialize: serialize_AdministratorMessage,
    responseDeserialize: deserialize_AdministratorMessage,
  },
  update: {
    path: '/Administrators/Update',
    requestStream: false,
    responseStream: false,
    requestType: administrators_pb.AdministratorMessage,
    responseType: administrators_pb.AdministratorMessage,
    requestSerialize: serialize_AdministratorMessage,
    requestDeserialize: deserialize_AdministratorMessage,
    responseSerialize: serialize_AdministratorMessage,
    responseDeserialize: deserialize_AdministratorMessage,
  },
  delete: {
    path: '/Administrators/Delete',
    requestStream: false,
    responseStream: false,
    requestType: administrators_pb.DeleteRequest,
    responseType: administrators_pb.Empty,
    requestSerialize: serialize_DeleteRequest,
    requestDeserialize: deserialize_DeleteRequest,
    responseSerialize: serialize_Empty,
    responseDeserialize: deserialize_Empty,
  },
  getList: {
    path: '/Administrators/GetList',
    requestStream: false,
    responseStream: false,
    requestType: administrators_pb.Empty,
    responseType: administrators_pb.AdministratorsResponse,
    requestSerialize: serialize_Empty,
    requestDeserialize: deserialize_Empty,
    responseSerialize: serialize_AdministratorsResponse,
    responseDeserialize: deserialize_AdministratorsResponse,
  },
  setPassword: {
    path: '/Administrators/SetPassword',
    requestStream: false,
    responseStream: false,
    requestType: administrators_pb.SetPasswordRequest,
    responseType: administrators_pb.Empty,
    requestSerialize: serialize_SetPasswordRequest,
    requestDeserialize: deserialize_SetPasswordRequest,
    responseSerialize: serialize_Empty,
    responseDeserialize: deserialize_Empty,
  },
};

exports.AdministratorsClient = grpc.makeGenericClientConstructor(AdministratorsService);
