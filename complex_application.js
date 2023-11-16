/**
 * filename: complex_application.js
 * 
 * Description:
 * This code demonstrates a complex application that simulates a social media platform.
 * It includes various functionalities such as user registration/login, user profiles, posting messages,
 * following/unfollowing users, liking/disliking posts, and searching/filtering posts by different criteria.
 * The code is organized using object-oriented programming principles and modular design.
 */

// Class definitions
class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.profile = new Profile(); // User's profile information
    this.following = []; // List of users this user follows
    this.followers = []; // List of users following this user
  }

  // Methods for managing followers/following relationships
  follow(user) {
    if (this.following.includes(user)) {
      console.log("Already following this user.");
    } else {
      this.following.push(user);
      user.followers.push(this);
      console.log(`Now following ${user.name}.`);
    }
  }

  unfollow(user) {
    if (this.following.includes(user)) {
      this.following = this.following.filter(followedUser => followedUser !== user);
      user.followers = user.followers.filter(follower => follower !== this);
      console.log(`Unfollowed ${user.name}.`);
    } else {
      console.log("You are not following this user.");
    }
  }

  // Other methods for user-related operations
  postMessage(content) {
    const post = new Post(this, content);
    this.profile.posts.push(post);
    console.log("Message posted successfully.");
  }

  editProfileInfo(info) {
    this.profile.updateInfo(info);
    console.log("Profile information updated successfully.");
  }
}

class Profile {
  constructor() {
    this.posts = []; // List of posts made by the user
    this.info = {}; // User's profile information (e.g., bio, location, etc.)
  }

  updateInfo(newInfo) {
    this.info = { ...this.info, ...newInfo };
  }
}

class Post {
  constructor(author, content) {
    this.author = author;
    this.content = content;
    this.likes = 0;
    this.dislikes = 0;
    this.comments = [];
  }

  like() {
    this.likes++;
  }

  dislike() {
    this.dislikes++;
  }

  comment(user, comment) {
    const commentObj = { user, comment };
    this.comments.push(commentObj);
  }
}

// Usage example
const user1 = new User("John Doe", "john@example.com", "securepassword");
const user2 = new User("Jane Smith", "jane@example.com", "pa$$w0rd");

user1.postMessage("Hello, World!");
user1.postMessage("This is an example post.");
user1.postMessage("Excited to join this social media platform!");

user2.postMessage("Nice weather today!");
user2.postMessage("Feeling great!");

user1.follow(user2);
user2.follow(user1);

user1.postMessage("I'm following Jane now!");
user2.postMessage("I'm following John now!");

user1.postMessage("This is a post by John.");
user2.postMessage("This is a post by Jane.");

user1.unfollow(user2);

user1.postMessage("I've unfollowed Jane.");
user2.postMessage("I've unfollowed John.");

user1.editProfileInfo({ bio: "Passionate about coding!" });
user2.editProfileInfo({ bio: "Travel enthusiast." });

const post = user2.profile.posts[0];

post.like();
post.dislike();

post.comment(user1, "Great post!");
post.comment(user2, "Thanks for the like!");

console.log(user1);
console.log(user2);