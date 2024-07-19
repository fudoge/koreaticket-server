const User = require('./User');
const ReviewPost = require('./ReviewPost');
const ReviewComment = require('./ReviewComment');
const ReviewImage = require('./ReviewImage');
const Ticket = require('./Ticket');
const Match = require('./Match');
const Team = require('./Team');
const Stadium = require('./Stadium');
const InquiryPost = require('./InquiryPost');
const InquiryReply = require('./InquiryReply');

// relationshop connection

// User - ReviewPost
User.hasMany(ReviewPost, { foreignKey: 'writtenBy' , onDelete: 'CASCADE'});
ReviewPost.belongsTo(User, { foreignKey: 'writtenBy' });

// User - ReviewComment
User.hasMany(ReviewComment, { foreignKey: 'writtenBy', onDelete: 'CASCADE' });
ReviewComment.belongsTo(User, { foreignKey: 'writtenBy' });

// ReviewPost - ReviewComment
ReviewPost.hasMany(ReviewComment, { foreignKey: 'postId', onDelete: 'CASCADE' });
ReviewComment.belongsTo(ReviewPost, { foreignKey: 'postId' });

// ReviewPost - ReviewImage
ReviewPost.hasMany(ReviewImage, { foreignKey: 'postId', onDelete: 'CASCADE' });
ReviewImage.belongsTo(ReviewPost, { foreignKey: 'postId' });

// User - InquiryPost
User.hasMany(InquiryPost, { foreignKey: 'writtenBy' });
InquiryPost.belongsTo(User, { foreignKey: 'writtenby' });

// InquiryPost - InquiryReplies
InquiryPost.hasOne(InquiryReply, { foreignKey: 'postId' });
InquiryReply.belongsTo(InquiryPost, { foreignKey: 'postId' });

// Stadium - Team
Stadium.hasOne(Team, { foreignKey: 'stadiumId' });
Team.belongsTo(Stadium, { foreignKey: 'stadiumId' });

// Stadium - Match
Stadium.hasMany(Match, { foreignKey: 'stadiumId' });
Match.belongsTo(Stadium, { foreignKey: 'stadiumId' });

// Stadium - Ticket
Stadium.hasMany(Ticket, { foreignKey: 'stadiumId' });
Ticket.belongsTo(Stadium, { foreignKey: 'stadiumId' });

// Team - Match
Team.hasMany(Match, { foreignKey: 'homeId' });
Team.hasMany(Match, { foreignKey: 'awayId' });
Match.belongsTo(Team, { foreignKey: 'homeId' });
Match.belongsTo(Team, {foreignKey: 'awayId' });

// Match - Ticket
Match.hasMany(Ticket, { foreignKey: 'matchId' });
Ticket.belongsTo(Match, { foreignKey: 'matchId' });

// User - Ticket
User.hasMany(Ticket, { foreignKey: 'ownedBy' });
Ticket.belongsTo(User, { foreignKey: 'ownedBy' });


module.exports = {
    User,
    ReviewPost,
    ReviewComment,
    ReviewImage,
    Ticket,
    Match,
    Team,
    Stadium,
    InquiryPost,
    InquiryReply
}