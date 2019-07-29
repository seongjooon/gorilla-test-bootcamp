import lifecycleEventsMixin from './utils/lifecycleEventsMixin';
import GorillaError from './utils/GorillaError';
import View from './View';
import SUPPORTED_DOM_EVENTS from './utils/supportedDOMEvents';

// TODO: Complete the constructor function
function Component(template, context, children) {
  // Your code here..
  this._view = new View(template, { context, children });
  this._publish = lifecycleEventsMixin(this);
  this._element = null;

  for (let props in context) {
    if (context.hasOwnProperty(props)) {
      Object.defineProperty(this, props, {
        get: function () {
          return context[props];
        },
        set: function (value) {
          context[props] = value,
          this.render();
        },
        enumerable: true
      });
    }
  }
}

Component.prototype._initializeDOMEvents = function () {
  const elementEventsMap = findElementsWithGorillaAttr(this._element);

  function findElementsWithGorillaAttr (element) {
    let result = [];
    const attrs = element.attributes;
    const reg = new RegExp('^gorilla-');

    for (let i = 0; i < attrs.length; i++) {
      if (reg.test(attrs[i].nodeName)) {
        const eventType = attrs[i].nodeName.split('-')[1];

        if (SUPPORTED_DOM_EVENTS.indexOf(eventType) === -1) {
          throw new GorillaError(`Unsupported event type: ${eventType}`);
        }

        result.push({
          element,
          eventType,
          eventHandler: attrs[i].nodeValue
        });

        break;
      }
    }

    if (element.children.length > 0) {
      for (let j = 0; j < element.children.length; j++) {
        if (!element.children[j].dataset.gorillaComponent) {
          result = result.concat(findElementsWithGorillaAttr(element.children[j]));
        }
      }
    }

    return result;
  }

  elementEventsMap.forEach(eventRegistrationData => {
    const eventType = eventRegistrationData.eventType;
    const targetElement = eventRegistrationData.element;
    const eventHandler = this[eventRegistrationData.eventHandler];

    if (typeof eventHandler !== 'function') {
      throw new GorillaError(`Cannot find method "${eventRegistrationData.eventHandler}" from the instance`);
    }

    targetElement.addEventListener(eventType, eventHandler);
  });
};

Component.prototype.render = function () {
  this._publish("BEFORE_RENDER");
  this._element = this._view.render();
  this._initializeDOMEvents();

  setTimeout(() => {
    this._publish("AFTER_RENDER");
  }, 0);

  return this._element;
};

Component.prototype.destroy = function () {
  this._publish("BEFORE_DESTROY");
  this._view.destroy();

  setTimeout(() => {
    this._publish("AFTER_DESTROY");
  }, 0);

  this._element = null;
};

export default Component;
