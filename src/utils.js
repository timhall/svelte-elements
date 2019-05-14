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
