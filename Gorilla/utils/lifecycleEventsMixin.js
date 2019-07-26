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
    throw new Error();
  }

  target.on = function (event, callback) {
    if (COMPONENT_LIFECYCLE_EVENTS.indexOf(event) === -1) {
      throw new Error();
    }

    if (!eventMap[event]) {
      eventMap[event] = [];
      eventMap[event].push(callback);
    } else {
      eventMap[event].push(callback);
    }

    return;
  }

  return function () {
    const eventMapValues = Object.values(eventMap);
    eventMapValues[0].forEach(callback => {
      callback();
    });
  }
}
