import { container } from 'tsyringe';
import './providers';

import IUsersRepository from "../../modules/accounts/repositories/IUsersRepository";
import UserRepository from "../../modules/accounts/repositories/implementations/UserRepository";

import UserTokenRepository from '@modules/accounts/repositories/implementations/UserTokenRepository';
import IUsersTokenRepository from '@modules/accounts/repositories/IUsersTokenRepository';

import { IDecksRepository } from '../../modules/decks/repositories/IDecksRepository';
import { DecksRepository } from '../../modules/decks/repositories/implementations/DecksRepository';

import { ISessionsRepository } from '../../modules/sessions/repositories/ISessionsRepository';
import { SessionsRepository } from '../../modules/sessions/repositories/implementations/SessionsRepository';

import { ISessionsCardsRepository } from '../../modules/sessionsCards/repositories/ISessionsCardsRepository';
import { SessionsCardsRepository } from '../../modules/sessionsCards/repositories/implementations/SessionsCardsRepository';

import { IDifficultiesRepository } from '../../modules/difficulties/repositories/IDifficultiesRepository';
import { DifficultiesRepository } from '../../modules/difficulties/repositories/implementations/DifficultiesRepository';

import ICardsRepository from '../../modules/cards/repositories/ICardsRepository';
import { CardsRepository } from '../../modules/cards/repositories/implementations/CardsRepository';

container.registerSingleton<IDecksRepository>('DecksRepository', DecksRepository);
container.registerSingleton<IUsersRepository>("UserRepository", UserRepository);
container.registerSingleton<IUsersTokenRepository>("UserTokenRepository", UserTokenRepository);
container.registerSingleton<IDifficultiesRepository>("DifficultiesRepository", DifficultiesRepository);
container.registerSingleton<ICardsRepository>("CardsRepository", CardsRepository);
container.registerSingleton<ISessionsRepository>("SessionsRepository", SessionsRepository);
container.registerSingleton<ISessionsCardsRepository>("SessionsCardsRepository", SessionsCardsRepository);