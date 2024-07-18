import { hashSync, compareSync } from 'bcrypt';

/**
 * @name PasswordUtils
 * @description Password utilitary functions
 */
export const PasswordUtils = {
  /**
   * @description Encode password to hash
   * @param password - Password to encode
   * @returns Hashed password
   */
  encodePassword: (password: string): string => {
    return hashSync(password, 10);
  },
  /**
   * @description Compare password with hash
   * @param password - Password to compare
   * @param hash - Hashed password
   * @returns True if password is correct
   */
  comparePassword: (password: string, hash: string): boolean => {
    return compareSync(password, hash);
  },
};
