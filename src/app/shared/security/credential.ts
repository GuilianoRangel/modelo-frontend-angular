/* tslint:disable:variable-name no-redundant-jsdoc */
import { IConfig } from './config';
import { environment } from 'src/environments/environment';
import {User} from './User';


/**
 * Classe 'Credential'.
 *
 * @author Guiliano Rangel (UEG)
 */
export class Credential {

  private _user: User;

  /**
   * Construtor da classe.
   *
   * @param config
   */
  constructor(private config: IConfig) { }

  /**
   * Init credential.
   *
   * @param user
   */
  public init(user?: User): void {
    this._user = user;

    if (this._user) {
      const data = JSON.stringify(this._user);
      localStorage.setItem(this.securityStorage, btoa(data));
    } else {
      let data = localStorage.getItem(this.securityStorage);

      if (data) {
        data = atob(data);
        this._user = JSON.parse(data);
      }
    }
  }

  /**
   * Clean _user's credential.
   */
  public clean(): void {
    this._user = undefined;
    localStorage.removeItem(this.securityStorage);
  }

  /**
   * @returns user
   */
  public get user(): User {
    return this._user;
  }

  /**
   * @returns userName
   */
  public get userName(): string {
    return this._user ? this._user.name : undefined;
  }

  /**
   * @returns login
   */
  public get login(): string {
    return this._user ? this._user.login : undefined;
  }

  /**
   * @returns accessToken
   */
  public get accessToken(): string {
    return this._user ? this._user.accessToken : undefined;
  }

  /**
   * @returns refreshToken
   */
  public get refreshToken(): string {
    return this._user ? this._user.refreshToken : undefined;
  }

  /**
   * @returns nameStorage
   */
  private get securityStorage(): string {
    const env = environment.production ? 'prod' : 'dev';
    return `${this.config.nameStorage.trim()}_${env}`;
  }
}
