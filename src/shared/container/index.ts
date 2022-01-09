import { container } from 'tsyringe';
import './providers';

import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import UserRepository from "@modules/accounts/repositories/implementations/UserRepository";

import UserTokenRepository from '@modules/accounts/repositories/implementations/UserTokenRepository';
import IUsersTokenRepository from '@modules/accounts/repositories/IUsersTokenRepository';

import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import { DecksRepository } from '@modules/decks/repositories/implementations/DecksRepository';

import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import { CardsRepository } from '@modules/cards/repositories/implementations/CardsRepository';

import { ISessionsRepository } from '@modules/sessions/repositories/ISessionsRepository';
import { SessionsRepository } from '@modules/sessions/repositories/implementations/SessionsRepository';

import { IFeaturedTypeRepository } from '@modules/featured/repositories/IFeaturedTypeRepository';
import { FeaturedTypeRepository } from '@modules/featured/repositories/implementations/FeaturedTypeRepository';

import { IFeaturedDecksRepository } from '@modules/featured/repositories/IFeaturedDecksRepository';
import { FeaturedDecksRepository } from '@modules/featured/repositories/implementations/FeaturedDecksRepository';

import { IDifficultiesRepository } from '@modules/difficulties/repositories/IDifficultiesRepository';
import { DifficultiesRepository } from '@modules/difficulties/repositories/implementations/DifficultiesRepository';

import { ISessionsCardsRepository } from '@modules/sessionsCards/repositories/ISessionsCardsRepository';
import { SessionsCardsRepository } from '@modules/sessionsCards/repositories/implementations/SessionsCardsRepository';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@modules/categories/repositories/implementations/CategoriesRepository';

import IFrequenciesRepository from "@modules/frequencies/repositories/IFrequenciesRepository";
import { FrequenciesRepository } from "@modules/frequencies/repositories/implementations/FrequenciesRepository";

container.registerSingleton<IDecksRepository>('DecksRepository', DecksRepository);
container.registerSingleton<ICardsRepository>('CardsRepository', CardsRepository);
container.registerSingleton<IUsersRepository>("UserRepository", UserRepository);
container.registerSingleton<IUsersTokenRepository>("UserTokenRepository", UserTokenRepository);
container.registerSingleton<ISessionsRepository>("SessionsRepository", SessionsRepository);
container.registerSingleton<ISessionsCardsRepository>("SessionsCardsRepository", SessionsCardsRepository);
container.registerSingleton<IFeaturedDecksRepository>("FeaturedDecksRepository", FeaturedDecksRepository);
container.registerSingleton<IFeaturedTypeRepository>("FeaturedTypeRepository", FeaturedTypeRepository);
container.registerSingleton<IDifficultiesRepository>("DifficultiesRepository", DifficultiesRepository);
container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepository);
container.registerSingleton<IFrequenciesRepository>("FrequenciesRepository", FrequenciesRepository);