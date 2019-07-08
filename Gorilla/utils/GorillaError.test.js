import GorillaError from './GorillaError';

describe('1. GorillaError', () => {
  test('message 속성을 갖고 있다', () => {
    const source = new GorillaError();

    expect(source.hasOwnProperty('message')).toBe(true);
  });

  test('생성될 때 인자로 받은 message가 할당된다', () => {
    const message = 'unexpected error';
    const source = new GorillaError(message);

    expect(source.message).toBe(message);
  });

  describe('prototype chain', () => {
    const originMessage = Error.prototype.message;

    afterEach(() => {
      delete Error.prototype.dragon;
      Error.prototype.message = originMessage;
    });

    test('constructor', () => {
      const source = new GorillaError();

      expect(source.constructor).toEqual(GorillaError);
    });

    test('Error 프로토타입과 연결되어 있다', () => {
      Error.prototype.dragon = jest.fn(() => 'Drogon');

      const source = new GorillaError();

      expect(source.hasOwnProperty('dragon')).toBe(false)
      expect(GorillaError.prototype.hasOwnProperty('dragon')).toBe(false);

      expect('dragon' in source).toBe(true);
      expect(source.dragon()).toBe('Drogon');
    });


    test('GorillarError 프로토타입과 연결되어 있다', () => {
      GorillaError.prototype.dragon = jest.fn(() => 'Drogon');
      Error.prototype.dragon = jest.fn(() => 'Viserion');

      const source = new GorillaError();

      expect(GorillaError.prototype.hasOwnProperty('dragon')).toBe(true);
      expect(Error.prototype.hasOwnProperty('dragon')).toBe(true);

      expect(source.dragon()).toBe('Drogon');
      expect(GorillaError.prototype.dragon).toHaveBeenCalled();
      expect(Error.prototype.dragon).not.toHaveBeenCalled();
    });

    test('Instance Level에서 처리할 수도 있다', () => {
      GorillaError.prototype.dragon = jest.fn(() => 'Drogon');
      Error.prototype.dragon = jest.fn(() => 'Viserion');

      const source = new GorillaError();
      source.dragon = jest.fn(() => 'Rhaegal');

      expect(source.dragon()).toBe('Rhaegal');
      expect(source.dragon).toHaveBeenCalled();
      expect(GorillaError.prototype.dragon).not.toHaveBeenCalled();
      expect(Error.prototype.dragon).not.toHaveBeenCalled();
    });
  });
});
