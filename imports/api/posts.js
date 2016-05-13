import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

if(Meteor.isServer) {
  Meteor.publish('posts', function postsPublication() {
    return Posts.find({});
  });
}

Meteor.methods({
  'posts.insert'(title, description) {

    check(title, String);
    check(description, String);

    // make sure user is logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Posts.insert({
      owner: this.userId,
      title,
      description,
      dateTime: new Date()
    });

    console.log("inserting post");
  },
  'posts.update'(postId, title, description){
    check(postId, String);
    check(title, String);
    check(description, String);
    const post = Posts.findOne(postId);

    // make sure only post owner can make changes
    if(post.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Posts.update(postId, { $set: {
      title: title,
      description: description,
      dateTime: new Date(),
    } });
  },
  'posts.remove'(postId){
    check(postId, String);
    const post = Posts.findOne(postId);

    // make sure only post owner can delete it
    if(post.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Posts.remove(postId);
  },
});
