const User = require('./User');
const ReviewPost = require('./ReviewPost');
const ReviewComment = require('./ReviewComment');
const ReviewImage = require('./ReviewImage');
const Ticket = require('./Ticket');
const Match = require('./Match');
const Team = require('./Team');
const Stadium = require('./Stadium');
const StadiumArea = require('./StadiumArea');
const InquiryPost = require('./InquiryPost');
const InquiryReply = require('./InquiryReply');

// relationshop connection

// User - ReviewPost
User.hasMany(ReviewPost, { foreignkey: 'writtenBy' });
ReviewPost.belongsTo(User, { foreignkey: 'writtenBy' });

// User - ReviewComment
User.hasMany(ReviewComment, { foreignkey: 'writtenBy' });
ReviewComment.belongsTo(User, { foreignkey: 'writtenBy' });

// ReviewPost - ReviewComment
ReviewPost.hasMany(ReviewComment, { foreignkey: 'postId' });
ReviewComment.belongsTo(ReviewPost, { foreignkey: 'postId' });

// ReviewPost - ReviewImage
ReviewPost.hasMany(ReviewImage, { foreignkey: 'postId' });
ReviewImage.belongsTo(ReviewPost, { foreignkey: 'postId' });

// User - InquiryPost
User.hasMany(InquiryPost, { foreignkey: 'writtenBy' });
InquiryPost.belongsTo(User, { foreignkey: 'writtenby' });

// InquiryPost - InquiryReplies
InquiryPost.hasOne(InquiryReply, { foreignkey: 'postId' });
InquiryReply.belongsTo(InquiryPost, { foreignkey: 'postId' });

// Stadium - Team
Stadium.hasOne(Team, { foreignkey: 'stadiumId' });
Team.belongsTo(Stadium, { foreignkey: 'stadiumId' });

// Stadium - StadiumArea
Stadium.hasMany(StadiumArea, { foreignkey: 'stadiumId' });
StadiumArea.belongsTo(Stadium, { foreignkey: 'stadiumId' });

// Stadium - Match
Stadium.hasMany(Match, { foreignkey: 'stadiumId' });
Match.belongsTo(Stadium, { foreignkey: 'stadiumId' });

// Stadium - Ticket
Stadium.hasMany(Ticket, { foreignkey: 'stadiumId' });
Ticket.belongsTo(Stadium, { foreignkey: 'stadiumId' });

// Team - Match
Team.hasMany(Match, { foreignkey: 'homeId' });
Match.belongsTo(Team, { foreignkey: 'homeId' });

// Match - StadiumArea
Match.hasMany(StadiumArea, { foreignkey: 'matchId' });
StadiumArea.belongsTo(Match, { foreignkey: 'matchId' });

// Match - Ticket
Match.hasMany(Ticket, { foreignkey: 'matchId' });
Ticket.belongsTo(Match, { foreignkey: 'matchId' });

// StadiumArea - Ticket
StadiumArea.hasMany(Ticket, { foreignkey: 'areaId' });
Ticket.belongsTo(StadiumArea, { foreignkey: 'areaId' });

// User - Ticket
User.hasMany(Ticket, { foreignkey: 'ownedBy' });
Ticket.belongsTo(User, { foreignkey: 'ownedBy' });


module.exports = {
    User,
    ReviewPost,
    ReviewComment,
    ReviewImage,
    Ticket,
    Match,
    Team,
    Stadium,
    StadiumArea,
    InquiryPost,
    InquiryReply
}