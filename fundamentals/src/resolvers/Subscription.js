export default {
  count: {
    subscribe(_parent, _args, { pubsub }, _info) {
      let count = 0;
      setInterval(() => {
        count++;
        pubsub.publish("COUNT", { count });
      }, 5000);
      return pubsub.asyncIterator("COUNT");
    }
  }
};
