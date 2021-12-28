import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Void: any;
};

export type Auth = {
  __typename?: 'Auth';
  expired: Scalars['Date'];
  refreshToken: Scalars['String'];
  token: Scalars['String'];
};

export type Card = {
  __typename?: 'Card';
  assignedBy?: Maybe<Scalars['String']>;
  assignedDate?: Maybe<Scalars['Date']>;
  created: Scalars['Date'];
  description: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  name: Scalars['String'];
  power: Scalars['Int'];
  rarity: RarityType;
  space?: Maybe<Scalars['String']>;
};

export type ChangeEmailCommand = {
  email: Scalars['String'];
  verificationCode: Scalars['String'];
};

export type ChangePasswordCommand = {
  password: Scalars['String'];
  verificationCode: Scalars['String'];
};

export type ChangeUserActivityCommand = {
  active: Scalars['Boolean'];
  id: Scalars['ID'];
};

export type ChangeUserRoleCommand = {
  id: Scalars['ID'];
  roleId: Scalars['ID'];
};

export type ChangeUserSpaceCommand = {
  id: Scalars['ID'];
  spaceId: Scalars['ID'];
};

export type Deck = {
  __typename?: 'Deck';
  cards: Array<Maybe<Card>>;
  count: Scalars['Int'];
  power: Scalars['Int'];
};

export enum ErrorCodes {
  BadRequest = 'BAD_REQUEST'
}

export type ErrorResponse = {
  __typename?: 'ErrorResponse';
  code: ErrorCodes;
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeUserActivity?: Maybe<Scalars['Void']>;
  changeUserEmail?: Maybe<Scalars['Void']>;
  changeUserPassword?: Maybe<Scalars['Void']>;
  changeUserRole?: Maybe<Scalars['Void']>;
  changeUserSpace?: Maybe<Scalars['Void']>;
  putCard?: Maybe<Scalars['Void']>;
  putLegendaryCard?: Maybe<Scalars['Void']>;
  refreshUserAuth: Auth;
  register: Auth;
  sendVerificationCode?: Maybe<Scalars['Void']>;
  signIn: Auth;
  updateUser: User;
};


export type MutationChangeUserActivityArgs = {
  changeUserActivityCommand: ChangeUserActivityCommand;
};


export type MutationChangeUserEmailArgs = {
  changeEmailCommand: ChangeEmailCommand;
};


export type MutationChangeUserPasswordArgs = {
  changePasswordCommand: ChangePasswordCommand;
};


export type MutationChangeUserRoleArgs = {
  changeUserRoleCommand: ChangeUserRoleCommand;
};


export type MutationChangeUserSpaceArgs = {
  changeUserSpaceCommand: ChangeUserSpaceCommand;
};


export type MutationPutCardArgs = {
  putCardCommand: PutCardCommand;
};


export type MutationPutLegendaryCardArgs = {
  putLegendaryCardCommand: PutLegendaryCardCommand;
};


export type MutationRegisterArgs = {
  registerUserCommand: RegisterUserCommand;
};


export type MutationSignInArgs = {
  signInCommand: SignInCommand;
};


export type MutationUpdateUserArgs = {
  updateUserCommand: UpdateUserCommand;
};

export type PutCardCommand = {
  description: Scalars['String'];
  name: Scalars['String'];
  power: Scalars['Int'];
  spaceFromId: Scalars['ID'];
  userFromId: Scalars['ID'];
  userToId: Scalars['ID'];
};

export type PutLegendaryCardCommand = {
  idLegendaryCard: Scalars['ID'];
  spaceFromId: Scalars['ID'];
  userFromId: Scalars['ID'];
  userToId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  getRoleList: Array<Maybe<Role>>;
  getSpaceList: Array<Maybe<Space>>;
  getUser: User;
  getUserList: Array<Maybe<User>>;
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};


export type QueryGetUserListArgs = {
  spaceId?: InputMaybe<Scalars['ID']>;
};

export enum RarityType {
  Common = 'COMMON',
  Legendary = 'LEGENDARY',
  Rare = 'RARE'
}

export type RegisterUserCommand = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  patronymic: Scalars['String'];
  phone: Scalars['String'];
  spaceId?: InputMaybe<Scalars['ID']>;
  surname: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  dust: Wallet;
  id: Scalars['ID'];
  name: Scalars['String'];
  type: RoleType;
};

export enum RoleType {
  Administrator = 'ADMINISTRATOR',
  Employee = 'EMPLOYEE',
  Manager = 'MANAGER'
}

export type SignInCommand = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Space = {
  __typename?: 'Space';
  active: Scalars['Boolean'];
  dust: Wallet;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UpdateUserCommand = {
  avatar?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  patronymic?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  surname?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  active: Scalars['Boolean'];
  avatar?: Maybe<Scalars['String']>;
  coins: Wallet;
  created: Scalars['Date'];
  deck: Deck;
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  patronymic: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  role: Role;
  space: Space;
  surname: Scalars['String'];
  updated: Scalars['Date'];
};

export type Wallet = {
  __typename?: 'Wallet';
  amount: Scalars['Int'];
  updated: Scalars['Date'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Auth: ResolverTypeWrapper<Auth>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Card: ResolverTypeWrapper<Card>;
  ChangeEmailCommand: ChangeEmailCommand;
  ChangePasswordCommand: ChangePasswordCommand;
  ChangeUserActivityCommand: ChangeUserActivityCommand;
  ChangeUserRoleCommand: ChangeUserRoleCommand;
  ChangeUserSpaceCommand: ChangeUserSpaceCommand;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Deck: ResolverTypeWrapper<Deck>;
  ErrorCodes: ErrorCodes;
  ErrorResponse: ResolverTypeWrapper<ErrorResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  PutCardCommand: PutCardCommand;
  PutLegendaryCardCommand: PutLegendaryCardCommand;
  Query: ResolverTypeWrapper<{}>;
  RarityType: RarityType;
  RegisterUserCommand: RegisterUserCommand;
  Role: ResolverTypeWrapper<Role>;
  RoleType: RoleType;
  SignInCommand: SignInCommand;
  Space: ResolverTypeWrapper<Space>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateUserCommand: UpdateUserCommand;
  User: ResolverTypeWrapper<User>;
  Void: ResolverTypeWrapper<Scalars['Void']>;
  Wallet: ResolverTypeWrapper<Wallet>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Auth: Auth;
  Boolean: Scalars['Boolean'];
  Card: Card;
  ChangeEmailCommand: ChangeEmailCommand;
  ChangePasswordCommand: ChangePasswordCommand;
  ChangeUserActivityCommand: ChangeUserActivityCommand;
  ChangeUserRoleCommand: ChangeUserRoleCommand;
  ChangeUserSpaceCommand: ChangeUserSpaceCommand;
  Date: Scalars['Date'];
  Deck: Deck;
  ErrorResponse: ErrorResponse;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  PutCardCommand: PutCardCommand;
  PutLegendaryCardCommand: PutLegendaryCardCommand;
  Query: {};
  RegisterUserCommand: RegisterUserCommand;
  Role: Role;
  SignInCommand: SignInCommand;
  Space: Space;
  String: Scalars['String'];
  UpdateUserCommand: UpdateUserCommand;
  User: User;
  Void: Scalars['Void'];
  Wallet: Wallet;
};

export type AuthResolvers<ContextType = any, ParentType extends ResolversParentTypes['Auth'] = ResolversParentTypes['Auth']> = {
  expired?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Card'] = ResolversParentTypes['Card']> = {
  assignedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  assignedDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  created?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  power?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rarity?: Resolver<ResolversTypes['RarityType'], ParentType, ContextType>;
  space?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DeckResolvers<ContextType = any, ParentType extends ResolversParentTypes['Deck'] = ResolversParentTypes['Deck']> = {
  cards?: Resolver<Array<Maybe<ResolversTypes['Card']>>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  power?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ErrorResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ErrorResponse'] = ResolversParentTypes['ErrorResponse']> = {
  code?: Resolver<ResolversTypes['ErrorCodes'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  changeUserActivity?: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationChangeUserActivityArgs, 'changeUserActivityCommand'>>;
  changeUserEmail?: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationChangeUserEmailArgs, 'changeEmailCommand'>>;
  changeUserPassword?: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationChangeUserPasswordArgs, 'changePasswordCommand'>>;
  changeUserRole?: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationChangeUserRoleArgs, 'changeUserRoleCommand'>>;
  changeUserSpace?: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationChangeUserSpaceArgs, 'changeUserSpaceCommand'>>;
  putCard?: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationPutCardArgs, 'putCardCommand'>>;
  putLegendaryCard?: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType, RequireFields<MutationPutLegendaryCardArgs, 'putLegendaryCardCommand'>>;
  refreshUserAuth?: Resolver<ResolversTypes['Auth'], ParentType, ContextType>;
  register?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'registerUserCommand'>>;
  sendVerificationCode?: Resolver<Maybe<ResolversTypes['Void']>, ParentType, ContextType>;
  signIn?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<MutationSignInArgs, 'signInCommand'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'updateUserCommand'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getRoleList?: Resolver<Array<Maybe<ResolversTypes['Role']>>, ParentType, ContextType>;
  getSpaceList?: Resolver<Array<Maybe<ResolversTypes['Space']>>, ParentType, ContextType>;
  getUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
  getUserList?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType, RequireFields<QueryGetUserListArgs, never>>;
};

export type RoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = {
  dust?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['RoleType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SpaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Space'] = ResolversParentTypes['Space']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  dust?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coins?: Resolver<ResolversTypes['Wallet'], ParentType, ContextType>;
  created?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  deck?: Resolver<ResolversTypes['Deck'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  patronymic?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  space?: Resolver<ResolversTypes['Space'], ParentType, ContextType>;
  surname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type WalletResolvers<ContextType = any, ParentType extends ResolversParentTypes['Wallet'] = ResolversParentTypes['Wallet']> = {
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updated?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Auth?: AuthResolvers<ContextType>;
  Card?: CardResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Deck?: DeckResolvers<ContextType>;
  ErrorResponse?: ErrorResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  Space?: SpaceResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Void?: GraphQLScalarType;
  Wallet?: WalletResolvers<ContextType>;
};

