export default {
  comment: {
    subscribe(_parent, { postId }, { pubsub, db }, _info) {
      const post = db.posts.find(post => post.id == postId && post.published);
      if (!post) throw new Error("POST NOT FOUND");
      return pubsub.asyncIterator(`comment_${postId}`);
    }
  },

  post: {
    subscribe(_parent, _args, { pubsub }, _info) {
      return pubsub.asyncIterator('post');
    }
  }
};
