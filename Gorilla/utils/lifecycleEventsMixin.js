import Component from '../Component';

export const COMPONENT_LIFECYCLE_EVENTS = [
  'BEFORE_RENDER',
  'AFTER_RENDER',
  'BEFORE_DESTROY',
  'AFTER_DESTROY'
];
export const eventMap = {};

// TODO: Fill in the mixin function
export default function eventEmitterMixin(target) {
  // Your code here..
  if (!target instanceof Component) {
    throw GorillaError('Invalid target in Component.');
  }

  target.on = function (event, callback) {
    if (COMPONENT_LIFECYCLE_EVENTS.indexOf(event) === -1) {
      throw GorillaError(`Invalid ${event} event in Component.`);
    }
    if (!eventMap[event]) {
      eventMap[event] = [];
    }
    eventMap[event].push(callback);
    return;
  };

  return function (event) {
    if (!eventMap[event]) {
      throw GorillaError(`Invalid ${event} event in Component.`);
    }

    for (let i = 0; i < eventMap[event].length; i++) {
      eventMap[event][i]();
    }
  };
}
