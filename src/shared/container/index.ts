import { container } from 'tsyringe';
import './providers';

import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import UserRepository from "@modules/accounts/repositories/implementations/UserRepository";

import UserTokenRepository from '@modules/accounts/repositories/implementations/UserTokenRepository';
import IUsersTokenRepository from '@modules/accounts/repositories/IUsersTokenRepository';

import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import { DecksRepository } from '@modules/decks/repositories/implementations/DecksRepository';

import { ISessionsRepository } from '@modules/sessions/repositories/ISessionsRepository';
import { SessionsRepository } from '@modules/sessions/repositories/implementations/SessionsRepository';

import { IFeaturedTypeRepository } from '@modules/featured/repositories/IFeaturedTypeRepository';
import { FeaturedTypeRepository } from '@modules/featured/repositories/implementations/FeaturedTypeRepository';

import { IFeaturedDecksRepository } from '@modules/featured/repositories/IFeaturedDecksRepository';
import { FeaturedDecksRepository } from '@modules/featured/repositories/implementations/FeaturedDecksRepository';

container.registerSingleton<IDecksRepository>('DecksRepository', DecksRepository);
container.registerSingleton<IUsersRepository>("UserRepository", UserRepository);
container.registerSingleton<IUsersTokenRepository>("UserTokenRepository", UserTokenRepository);
container.registerSingleton<ISessionsRepository>("SessionsRepository", SessionsRepository);
container.registerSingleton<IFeaturedDecksRepository>("FeaturedDecksRepository", FeaturedDecksRepository);
container.registerSingleton<IFeaturedTypeRepository>("FeaturedTypeRepository", FeaturedTypeRepository);