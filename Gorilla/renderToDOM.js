import GorillaError from './utils/GorillaError';
import Component from './Component';

export default function renderToDOM (component, target) {
  if (!(component instanceof Component)) {
    throw new GorillaError('First argument must be an instance of `Gorilla.Component`');
  }

  if (!(target instanceof Element)) {
    throw new GorillaError('Second argument must be an instance of `Element`');
  }

  target.appendChild(component.render());
};
