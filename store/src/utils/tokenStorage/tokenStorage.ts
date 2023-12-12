class TokenStorage {
  private token: string | null;
  private lsKey: string = 'userLoginToken';

  constructor() {
    this.token = localStorage.getItem(this.lsKey);
  }

  public getToken(): string | null {
    return this.token;
  }

  public setToken(newToken: string): void {
    localStorage.setItem(this.lsKey, newToken);
    this.token = newToken;
    console.log('ping2', this.token, localStorage.getItem(this.lsKey));
  }

  public clearToken(): void {
    localStorage.removeItem(this.lsKey);
    this.token = null;
  }

  public hasToken(): boolean {
    return !!this.token;
  }
}

const tokenStorageInstance = new TokenStorage();

export default tokenStorageInstance;
