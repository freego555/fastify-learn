import { FastifyRequest } from 'fastify';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import firebase from './firebase';
import { User } from '../types/user';

const USERS = process.env.USERS ? JSON.parse(process.env.USERS) : [];

const checkAuth = async (request: FastifyRequest) => {
  let token;
  const headerAuthorization = request.headers.authorization;
  if (headerAuthorization?.startsWith('Bearer')) {
    token = headerAuthorization.split(' ')[1];
  }

  if (!token) {
    throw new Error('You are not signed in! Please, sign in to get access.');
  }

  // Verify and decode idToken
  let decodedToken: DecodedIdToken;
  try {
    decodedToken = await firebase.auth().verifyIdToken(token);
  } catch (e) {
    throw new Error('Token is invalid! Please, sign in to get access.');
  }

  // Check if token has email property
  if (!decodedToken.email || !decodedToken.uid) {
    throw new Error('API does not support your sign in method.');
  }

  // Check if user with provided email exists
  const user = getUser(decodedToken.email);
  if (!user) {
    throw new Error(
      'User with provided email does not exist! Please, contact support to get access.',
    );
  }

  return user;
};

const getUser = (email: string) => {
  const user = USERS.find((element: User) => element.email === email);
  return user;
};

export { checkAuth };
