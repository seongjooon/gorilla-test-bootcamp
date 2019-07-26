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
  const eventArr = [];
  let flag = false;

  if (!target instanceof Component) {
    throw new Error();
  }

  target.on = function (event, callback) {
    for (let i = 0; i < COMPONENT_LIFECYCLE_EVENTS.length; i++) {
      if (event === COMPONENT_LIFECYCLE_EVENTS[i]) {
        flag = true;
      }
    }

    if (flag === false) {
      throw new Error();
    } else if (flag === true) {
      eventArr.push(callback);
    }
  };

  return function () {
    for (let i = 0; i < eventArr.length; i++) {
      eventArr[i]();
    }
  };
}
