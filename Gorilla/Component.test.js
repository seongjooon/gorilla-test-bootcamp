import Component from './Component';
import lifecycleEventsMixin from './utils/lifecycleEventsMixin';
import View from './View';

describe('3. Component', () => {
  test('should be constructed with a instance of Component', () => {
    const source = new Component();

    expect(source).toBeInstanceOf(Component);
  });

  describe('parameter', () => {
    let mockContext, mockTemplate;

    beforeEach(() => {
      mockContext = {
        Targaryen: 'Fire and Blood',
        Stark: 'Winter Is Coming',
        Lannister: 'Hear Me Roar!'
      };

      mockTemplate = jest.fn();
      mockTemplate.mockReturnValue('<div>mocking</div>');
    });

    test('template', () => {
      const source = new Component(mockTemplate);

      expect(source._view.toString()).toEqual(new View(mockTemplate).toString());
    });

    test('children', () => {
      const otherSon = new Component();
      const son = new Component();
      const parent = new Component(mockTemplate, mockContext, { son, otherSon });

      expect(parent._view.toString()).toEqual(new View(mockTemplate, { context: mockContext, children: { son, otherSon }}).toString());
    });

    describe('context', () => {
      test('should be constructed with a context', () => {
        const prop = 'name';
        const val = 'KEN';
        mockContext = {
          [prop]: val
        };
        const component = new Component(mockTemplate, mockContext);

        expect(component).toHaveProperty(prop);
        expect(component[prop]).toBe(val);
      });

      test('own props', () => {
        Object.prototype.Baratheon = 'Ours is the Fury';

        expect(mockContext.Baratheon).toBe('Ours is the Fury');
        expect('Baratheon' in mockContext).toBe(true);
        expect(mockContext).toHaveProperty('Baratheon');
        expect(mockContext.hasOwnProperty('Baratheon')).toBe(false);

        const component = new Component(mockTemplate, mockContext);

        delete Object.prototype.Baratheon;

        expect('Baratheon' in component).toBe(false);
        expect(component).not.toHaveProperty('Baratheon');
      });

      test('getter', () => {
        const component = new Component(mockTemplate, mockContext);

        expect(component).toHaveProperty('Targaryen');
        expect(component).toHaveProperty('Lannister');
        expect(component).toHaveProperty('Stark');

        expect(component.Targaryen).toBe(mockContext.Targaryen);
        expect(component.Stark).toBe(mockContext.Stark);
        expect(component.Lannister).toBe(mockContext.Lannister);

        mockContext.Lannister = 'A Lannister Always Pays His Debts';

        expect(component.Lannister).toBe('A Lannister Always Pays His Debts');

        mockContext.Lannister = 'xoxo';

        expect(component.Lannister).toBe('xoxo');
      });

      test('setter', () => {
        Component.prototype.render = jest.fn();
        const component = new Component(mockTemplate, mockContext);

        expect(component.Targaryen).toBe(mockContext.Targaryen);
        expect(component.Stark).toBe(mockContext.Stark);
        expect(component.Lannister).toBe(mockContext.Lannister);

        expect(component.render).not.toHaveBeenCalled();
        expect(component._view.context.Targaryen).toBe('Fire and Blood');
        expect(component._view.context.Stark).toBe('Winter Is Coming');
        expect(component._view.context.Lannister).toBe('Hear Me Roar!');

        component.Lannister = 'A Lannister Always Pays His Debts';

        expect(component.render).toHaveBeenCalled();
        expect(component._view.context.Targaryen).toBe('Fire and Blood');
        expect(component._view.context.Stark).toBe('Winter Is Coming');
        expect(component._view.context.Lannister).toBe('A Lannister Always Pays His Debts');
      });

      test('enumerable', () => {
        const component = new Component(mockTemplate, mockContext);

        expect(component.propertyIsEnumerable('Stark')).toBe(true);
        expect(component.propertyIsEnumerable('Lannister')).toBe(true);
        expect(component.propertyIsEnumerable('Targaryen')).toBe(true);
      });
    });
  });

  describe('props', () => {
    test('_view', () => {
      const component = new Component();

      expect(component._view).toBeInstanceOf(View);
    });

    test('_publish', () => {
      const component = new Component();

      expect(component._publish).toBeInstanceOf(Function);
      expect(component.on).toBeInstanceOf(Function);
      expect(lifecycleEventsMixin(component).toString()).toEqual(component._publish.toString());

      expect(component).toHaveProperty('on');
    });

    test('_element', () => {
      const component = new Component();

      expect(component._element).toBe(null);
    });
  });
});
