// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SocialMedia {
    struct User {
        address user;
        string username;
        string bio;
        string profilePictureHash;
        uint timestamp;
        uint[] posts;
        uint followers;
        uint following;
    }

    struct Post {
        uint id;
        address user;
        string content;
        string mediaHash;
        string mediaType;
        uint timestamp;
        uint likes;
        uint comments;
    }

    struct Comment {
        address user;
        string content;
        uint timestamp;
    }

    mapping(address => User) public users;
    mapping(uint256 => Post) public posts;
    mapping(uint256 => mapping(address => bool)) public postLikes;
    mapping(uint256 => mapping(uint256 => Comment)) public postComments;
    mapping(address => mapping(address => bool)) public followers;
    mapping(address => address[]) public followersArray;

    address[] public usersArray;

    uint public postCount;

    event UserCreated(
        string username,
        string bio,
        string profilePictureHash,
        uint timestamp
    );
    event PostCreated(string content, string mediaHash, uint timestamp);
    event PostLikedUnliked(address user, uint timestamp);
    event CommentCreated(address user, string content, uint timestamp);
    event Followed(address follower, address followee, uint timestamp);
    event Unfollowed(address follower, address followee, uint timestamp);

    modifier userExists() {
        require(
            bytes(users[msg.sender].username).length > 0,
            "User does not exist"
        );
        _;
    }

    function createUser(
        string memory _username,
        string memory _bio,
        string memory _profilePictureHash
    ) public {
        console.log(msg.sender);
        require(bytes(_username).length > 0, "Username is required");
        require(bytes(_bio).length > 0, "Bio is required");
        require(
            bytes(_profilePictureHash).length > 0,
            "Profile picture hash is required"
        );
        require(
            bytes(users[msg.sender].username).length == 0,
            "User already exists"
        );

        users[msg.sender] = User(
            msg.sender,
            _username,
            _bio,
            _profilePictureHash,
            block.timestamp,
            new uint[](0),
            0,
            0
        );

        usersArray.push(msg.sender);

        emit UserCreated(_username, _bio, _profilePictureHash, block.timestamp);
    }

    function isUser(address _user) public view returns (bool) {
        return bytes(users[_user].username).length > 0;
    }

    function getUser(address _user) public view returns (User memory) {
        return users[_user];
    }

    function getUnfollowedUsers() public view returns (User[] memory) {
        User[] memory unfollowedUsers = new User[](usersArray.length);
        uint count = 0;
        for (uint i = 0; i < usersArray.length; i++) {
            if (
                !followers[usersArray[i]][msg.sender] &&
                usersArray[i] != msg.sender
            ) {
                unfollowedUsers[count] = users[usersArray[i]];
                count++;
            }
        }

        assembly {
            mstore(unfollowedUsers, count)
        }

        return unfollowedUsers;
    }

    function createPost(
        string memory _content,
        string memory _mediaHash,
        string memory _mediaType
    ) public userExists {
        require(
            bytes(_content).length > 0 || bytes(_mediaHash).length > 0,
            "Content or media hash is required"
        );

        posts[postCount] = Post(
            postCount,
            msg.sender,
            _content,
            _mediaHash,
            _mediaType,
            block.timestamp,
            0,
            0
        );
        users[msg.sender].posts.push(postCount);
        postCount++;

        emit PostCreated(_content, _mediaHash, block.timestamp);
    }

    function getNextPostId() public view returns (uint) {
        return postCount;
    }

    function likeUnlikePost(uint _postId) public userExists {
        require(_postId < postCount, "Post does not exist");

        if (postLikes[_postId][msg.sender]) {
            postLikes[_postId][msg.sender] = false;
            posts[_postId].likes--;
        } else {
            postLikes[_postId][msg.sender] = true;
            posts[_postId].likes++;
        }

        emit PostLikedUnliked(msg.sender, block.timestamp);
    }

    function commentOnPost(
        uint _postId,
        string memory _content
    ) public userExists {
        require(_postId < postCount, "Post does not exist");
        require(bytes(_content).length > 0, "Comment content is required");

        postComments[_postId][posts[_postId].comments] = Comment(
            msg.sender,
            _content,
            block.timestamp
        );
        posts[_postId].comments++;
        emit CommentCreated(msg.sender, _content, block.timestamp);
    }

    function getPost(uint _postId) public view returns (Post memory) {
        return posts[_postId];
    }

    function getUserPosts(address _user) public view returns (Post[] memory) {

        Post[] memory userPosts = new Post[](users[_user].posts.length);
        for (uint i = 0; i < users[_user].posts.length; i++) {
            userPosts[i] = posts[users[_user].posts[i]];
        }

        return userPosts;
    }

    function getPostComments(
        uint _postId
    ) public view returns (Comment[] memory) {
        Comment[] memory comments = new Comment[](posts[_postId].comments);
        for (uint i = 0; i < posts[_postId].comments; i++) {
            comments[i] = postComments[_postId][i];
        }
        return comments;
    }

    function followUser(address _user) public userExists {
        require(_user != msg.sender, "Cannot follow yourself");
        require(!followers[_user][msg.sender], "Already following user");

        followers[_user][msg.sender] = true;
        followersArray[_user].push(msg.sender);

        users[_user].followers++;
        users[msg.sender].following++;

        emit Followed(msg.sender, _user, block.timestamp);
    }

    function unfollowUser(address _user) public userExists {
        require(_user != msg.sender, "Cannot unfollow yourself");
        require(followers[_user][msg.sender], "Not following user");

        followers[_user][msg.sender] = false;

        users[_user].followers--;
        users[msg.sender].following--;

        emit Unfollowed(msg.sender, _user, block.timestamp);
    }

    function getFollowers(address _user) public view returns (User[] memory) {
        User[] memory _followers = new User[](followersArray[_user].length);

        uint count = 0;
        for (uint i = 0; i < followersArray[_user].length; i++) {
            if (followers[_user][followersArray[_user][i]]) {
                _followers[count] = users[followersArray[_user][i]];
                count++;
            }
        }

        assembly {
            mstore(_followers, count)
        }

        return _followers;
    }

    function getFollowersCount(address _user) public view returns (uint) {
        return followersArray[_user].length;
    }

    function getFollowing(address _user) public view returns (User[] memory) {
        User[] memory following = new User[](usersArray.length);

        uint count = 0;
        for (uint i = 0; i < usersArray.length; i++) {
            if (followers[usersArray[i]][_user] && usersArray[i] != _user) {
                following[count] = users[usersArray[i]];
                count++;
            }
        }

        assembly {
            mstore(following, count)
        }

        return following;
    }

    function getFollowingUsersPosts() public view returns (Post[] memory) {
        Post[] memory followingPosts = new Post[](postCount);
        uint count = 0;
        for (uint i = 0; i < usersArray.length; i++) {
            if (followers[usersArray[i]][msg.sender]) {
                for (uint j = 0; j < users[usersArray[i]].posts.length; j++) {
                    followingPosts[count] = posts[users[usersArray[i]].posts[j]];
                    count++;
                }
            }
        }

        assembly {
            mstore(followingPosts, count)
        }

        return followingPosts;
    }
}
