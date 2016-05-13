import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

if(Meteor.isServer) {
  Meteor.publish('users', function usersPublication() {
    return Meteor.users.find({});
  });
}
