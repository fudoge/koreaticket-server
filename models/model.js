const User = require('./User');
const ReviewPost = require('./ReviewPost');
const ReviewComment = require('./ReviewPost');

// relationshop connection

User.hasMany(ReviewPost, { foreignkey: 'writtenby' });
ReviewPost.belongsTo(User, { foreignkey: 'writtenby' });