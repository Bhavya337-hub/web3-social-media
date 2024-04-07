// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract SocialMedia {

    struct User {
        string username;
        string bio;
        string profilePictureHash;
        uint timestamp;
        uint[] posts;
    }

    struct Post {
        address user;
        string content;
        string mediaHash;
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

    uint public postCount;

    event UserCreated(string username, string bio, string profilePictureHash, uint timestamp);
    event PostCreated(string content, string mediaHash, uint timestamp);
    event PostLiked(address user, uint timestamp);
    event CommentCreated(address user, string content, uint timestamp);
    event Followed(address follower, address followee, uint timestamp);
    event Unfollowed(address follower, address followee, uint timestamp);

    modifier userExists() {
        require(bytes(users[msg.sender].username).length > 0, "User does not exist");
        _;
    }

    function createUser(string memory _username, string memory _bio, string memory _profilePictureHash) public {
        require(bytes(_username).length > 0, "Username is required");
        require(bytes(_bio).length > 0, "Bio is required");
        require(bytes(_profilePictureHash).length > 0, "Profile picture hash is required");

        users[msg.sender] = User(_username, _bio, _profilePictureHash, block.timestamp, new uint[](0));

        emit UserCreated(_username, _bio, _profilePictureHash, block.timestamp);
    }

    function createPost(string memory _content, string memory _mediaHash) public userExists {
        require(bytes(_content).length > 0 || bytes(_mediaHash).length > 0, "Content or media hash is required");

        posts[postCount] = Post(msg.sender, _content, _mediaHash, block.timestamp, 0, 0);
        users[msg.sender].posts.push(postCount);
        postCount++;

        emit PostCreated(_content, _mediaHash, block.timestamp);
    }

    function likePost(uint _postId) public userExists {
        require(_postId < postCount, "Post does not exist");
        require(!postLikes[_postId][msg.sender], "Post already liked");

        postLikes[_postId][msg.sender] = true;
        posts[_postId].likes++;
        emit PostLiked(msg.sender, block.timestamp);
    }

    function unlikePost(uint _postId) public userExists {
        require(_postId < postCount, "Post does not exist");
        require(postLikes[_postId][msg.sender], "Post not liked");

        postLikes[_postId][msg.sender] = false;
        posts[_postId].likes--;
        emit PostLiked(msg.sender, block.timestamp);
    }

    function commentOnPost(uint _postId, string memory _content) public userExists {
        require(_postId < postCount, "Post does not exist");
        require(bytes(_content).length > 0, "Comment content is required");

        postComments[_postId][posts[_postId].comments] = Comment(msg.sender, _content, block.timestamp);
        posts[_postId].comments++;
        emit CommentCreated(msg.sender, _content, block.timestamp);
    }

    function getPost(uint _postId) public view returns (Post memory) {
        return posts[_postId];
    }

    function getUserPosts(address _user) public view returns (uint[] memory) {
        return users[_user].posts;
    }

    function getPostComments(uint _postId) public view returns (Comment[] memory) {
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

        emit Followed(msg.sender, _user, block.timestamp);
    }

    function unfollowUser(address _user) public userExists {
        require(_user != msg.sender, "Cannot unfollow yourself");
        require(followers[_user][msg.sender], "Not following user");

        followers[_user][msg.sender] = false;

        emit Unfollowed(msg.sender, _user, block.timestamp);
    }

    function getFollowers(address _user) public view returns (address[] memory) {
        address[] memory _followers = new address[](followersArray[_user].length);

        uint count = 0;
        for (uint i = 0; i < followersArray[_user].length; i++) {
            if (followers[_user][followersArray[_user][i]]) {
                _followers[count] = followersArray[_user][i];
                count++;
            }
        }

        assembly {
            mstore(_followers, count)
        }

        return _followers;
    }
}