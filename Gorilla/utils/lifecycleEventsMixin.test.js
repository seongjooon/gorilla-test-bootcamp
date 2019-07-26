import lifecycleEventsMixin, { eventMap, COMPONENT_LIFECYCLE_EVENTS } from './lifecycleEventsMixin';
import Component from '../Component';

describe('2. lifecycleEventsMixin',  () => {
  let component;

  beforeEach(() => {
    component = new Component();
  });

  test('target parameter', () => {
    expect(() => {
      lifecycleEventsMixin('fake Component');
    }).toThrow();

    expect(component).toBeInstanceOf(Component);
    expect(() => {
      lifecycleEventsMixin(component);
    }).not.toThrow();
  });

  test('return value', () => {
    const returnValue = lifecycleEventsMixin(component);

    expect(typeof returnValue).toBe('function');
  });

  describe('on', () => {
    test('인자에 on 프로퍼티와 함수를 할당해준다', () => {
      component.on = undefined;

      expect(component.on).toBe(undefined);

      lifecycleEventsMixin(component);

      expect(typeof component.on).toBe('function');
    });

    test('프로토타입 체인으로 접근할 수 없다', () => {
      lifecycleEventsMixin(component);

      expect(Component.prototype).not.toHaveProperty('on');
      expect(component).toHaveProperty('on');
    });

    test('on 프로퍼티가 참조한 함수의 리턴값은 undefined이다', () => {
      const cb = jest.fn();

      lifecycleEventsMixin(component);

      expect(component.on(COMPONENT_LIFECYCLE_EVENTS[0], cb)).toBe(undefined);
    });

    test('지원하지 않는 이벤트는 에러를 발생시킨다', () => {
      const unsupportedEvent = 'DRACARYS';

      lifecycleEventsMixin(component);

      expect(() => {
        component.on(unsupportedEvent, () => 'dragon fire!');
      }).toThrow();
    });

    test('두번째 인자로 넣어준 함수가 실행된다', () => {
      const cb = jest.fn();
      const source = lifecycleEventsMixin(component);

      component.on(COMPONENT_LIFECYCLE_EVENTS[0], cb);

      expect(cb).not.toHaveBeenCalled();

      source(COMPONENT_LIFECYCLE_EVENTS[0]);

      expect(cb).toHaveBeenCalled();
    });

    test('콜백은 여러개 등록되고 차례로 실행된다', () => {
      const dragons = [];
      const source = lifecycleEventsMixin(component);

      const firstCallback = jest.fn(() => dragons.push('Drogon'));
      const secondCallback = jest.fn(() => dragons.push('Rhaegal'));
      const thirdCallback = jest.fn(() => dragons.push('Viserion'));

      component.on(COMPONENT_LIFECYCLE_EVENTS[0], firstCallback);
      component.on(COMPONENT_LIFECYCLE_EVENTS[0], secondCallback);
      component.on(COMPONENT_LIFECYCLE_EVENTS[0], thirdCallback);

      source(COMPONENT_LIFECYCLE_EVENTS[0]);

      expect(dragons).toEqual(['Drogon', 'Rhaegal', 'Viserion']);
    });
  });
});
