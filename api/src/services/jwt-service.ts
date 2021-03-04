import {TokenObject} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {promisify} from 'util';
import {TokenServiceBindings, UserServiceBindings} from '../keys';
import {RefreshToken, RefreshTokenRelations} from '../models';
import {RefreshTokenRepository} from '../repositories';
import {MyUserService} from './user-service';
const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

export class JWTService {
  // @inject('authentication.jwt.secret')
  @inject(TokenServiceBindings.TOKEN_SECRET)
  public readonly jwtSecret: string;

  // @inject('authentication.jwt.expiresIn')
  @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
  public readonly expiresSecret: string;

  @inject(TokenServiceBindings.REFRESH_TOKEN_SECRET)
  public readonly refreshSecret: string;

  @inject(TokenServiceBindings.REFRESH_TOKEN_EXPIRES_IN)
  public readonly refreshExpiresIn: string;

  @inject(TokenServiceBindings.REFRESH_TOKEN_ISSURE)
  public readonly refreshIssure: string;

  constructor(
    @repository(RefreshTokenRepository)
    public refreshTokenRepository: RefreshTokenRepository,

    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
  ) { }

  async generateToken(userProfile: UserProfile): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized(
        'Error while generating token :userProfile is null'
      )
    }
    let token = '';
    try {
      token = await signAsync(userProfile, this.jwtSecret, {
        expiresIn: this.expiresSecret
      });
      return token;
    } catch (err) {
      throw new HttpErrors.Unauthorized(
        `error generating token ${err}`
      )
    }
  }

  async verifyToken(token: string): Promise<UserProfile> {

    if (!token) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token:'token' is null`
      )
    };

    let userProfile: UserProfile;
    try {
      const decryptedToken = await verifyAsync(token, this.jwtSecret);
      userProfile = Object.assign(
        {[securityId]: '', id: '', name: '', permissions: []},
        {
          [securityId]: decryptedToken.id,
          id: decryptedToken.id,
          name: decryptedToken.name,
          permissions: decryptedToken.permissions
        }
      );
    }
    catch (err) {
      throw new HttpErrors.Unauthorized(`Error verifying token:${err.message}`)
    }
    return userProfile;
  }

  async generateRefreshToken(userProfile: UserProfile, token: string): Promise<TokenObject> {
    const data = {
      userId: userProfile[securityId].toString()
    }

    const refreshToken = await signAsync(data, this.refreshSecret, {
      expiresIn: this.refreshExpiresIn,
      issuer: this.refreshIssure,
    });

    const result = {
      accessToken: token,
      refreshToken: refreshToken
    };

    const userRefreshData = await this.refreshTokenRepository.findOne({
      where: {
        userId: userProfile[securityId]
      }
    })

    if (userRefreshData) {
      userRefreshData.refreshToken = refreshToken;
      await this.refreshTokenRepository.update(userRefreshData);
    } else {
      await this.refreshTokenRepository.create({
        userId: userProfile[securityId],
        refreshToken: result.refreshToken,
      });
    }

    return result;
  }

  async refreshToken(refreshToken: string): Promise<TokenObject> {
    try {
      if (!refreshToken) {
        throw new HttpErrors.Unauthorized(`'refresh token' is null`);
      }
      const userRefreshData = await this.verifyRefreshToken(refreshToken);
      const user = await this.userService.findUserById(userRefreshData.userId.toString());
      const userWithPermissions = await this.userService.getUserPermissions(user);
      const userProfile = this.userService.convertToUserProfile(userWithPermissions);
      // create a JSON Web Token based on the user profile
      const token = await this.generateToken(userProfile);
      return {
        accessToken: token,
      };
    }
    catch (error) {
      throw new HttpErrors.Unauthorized(`Error verifying token : ${error.message}`);
    }
  }

  async revokeRefreshToken(refreshToken: string): Promise<void> {
    try {
      await this.refreshTokenRepository.deleteAll({refreshToken});
    }
    catch (e) {
      // ignore
    }
  }

  async verifyRefreshToken(refreshToken: string): Promise<RefreshToken & RefreshTokenRelations> {
    try {
      await verifyAsync(refreshToken, this.refreshSecret);
      const userRefreshData = await this.refreshTokenRepository.findOne({
        where: {refreshToken: refreshToken},
      });
      if (!userRefreshData) {
        throw new HttpErrors.Unauthorized(`Invalid Token`);
      }
      return userRefreshData;
    }
    catch (error) {
      throw new HttpErrors.Unauthorized(error.message);
    }
  }
}

