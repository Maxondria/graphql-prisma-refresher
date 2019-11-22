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
  },

  comment: {
    subscribe(_parent, { postId }, { pubsub, db }, _info) {
      const post = db.posts.find(post => post.id == postId && post.published);
      if (!post) throw new Error("POST NOT FOUND");
      return pubsub.asyncIterator(`comment ${postId}`);
    }
  }
};
