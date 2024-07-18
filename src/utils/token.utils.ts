import jwt from 'jsonwebtoken';
import { Env } from '../env';

/**
 * @name TokenUtils
 * @description Bearer Token utilitary functions
 */
export const TokenUtils = {
  /**
   * @description Encode email to JWT token
   * @param email - Email to encode
   * @returns Bearer token
   */
  encodeJWT: (email: string): string => {
    const token = jwt.sign({ email: email }, Env.SECRET, {
      expiresIn: '12h',
    });
    return `Bearer ${token}`;
  },
  /**
   * @description Decode JWT token
   * @param token - Bearer token
   * @returns email or null for invalid token
   */
  decodeJWT: (token: string): string | null => {
    try {
      const encodedJWT = token.split(' ')[1];
      const type = token.split(' ')[0];

      if (type !== 'Bearer') {
        throw new Error('Invalid token type');
      }

      const payload = jwt.verify(encodedJWT, Env.SECRET, {
        maxAge: '12h',
      });

      if (typeof payload === 'object') {
        const { email } = payload;
        return email;
      }

      throw new Error('Invalid payload');
    } catch (error) {
      return null;
    }
  },
};
