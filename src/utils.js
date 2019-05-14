export function subscribe(node, listeners) {
  let subscriptions = listen(node, listeners);

  return {
    update(listeners) {
      unsubscribe(subscriptions);
      subscriptions = listen(node, listeners);
    },
    destroy() {
      unsubscribe(subscriptions);
    }
  };
}

function listen(node, listeners) {
  if (!listeners) return [];

  return Object.keys(listeners).map(event => {
    const handler = listeners[event];

    node.addEventListener(event, handler);
    return () => node.removeEventListener(event, handler);
  });
}

function unsubscribe(subscriptions) {
  return subscriptions.forEach(unsubscribe => unsubscribe());
}

export function optional(node, attributes) {
  set(node, attributes);

  return {
    update(attributes) {
      set(node, attributes);
    }
  };
}

function set(node, attributes) {
  Object.keys(attributes).forEach(name => {
    const value = attribute[name];
    if (value != null) {
      node.setAttribute(name, value);
    } else {
      node.removeAttribute(name);
    }
  });
}
