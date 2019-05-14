export function listen(node, listeners) {
  let subscriptions = subscribe(node, listeners);

  return {
    update(listeners) {
      unsubscribe(subscriptions);
      subscriptions = subscribe(node, listeners);
    },
    destroy() {
      unsubscribe(subscriptions);
    }
  };
}

function subscribe(node, listeners) {
  return Object.keys(listeners).map(event => {
    const handler = listeners[event];

    node.addEventListener(event, handler);
    return () => node.removeEventListener(event, handler);
  });
}

function unsubscribe(subscriptions) {
  return subscriptions.forEach(unsubscribe => unsubscribe());
}
