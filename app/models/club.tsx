
import mongoose from 'mongoose';

const officerSchema = new mongoose.Schema({
    name: String,
    position: String,
    email: String,
    chessUsername: String,
});

const advisorSchema = new mongoose.Schema({
    email: String,
    name: String,
    init: String,
    phone: String,
});

const socialsSchema = new mongoose.Schema({
    insta: String,
    discord: String,
});

const clubSchema = new mongoose.Schema({
    clubURL: String,
    clubName: String,
    clubRoom: String,
    clubFrequency: String,
    clubDay: String,
    clubDesc: String,
    clubImage: String,
    clubOfficers: [officerSchema],
    clubAdvisor: advisorSchema,
    socials: socialsSchema,
    clubCode: String,
    clubLongDesc: [String],
    clubCarousel: [String],
});

const Club = mongoose.model('Club', clubSchema);
export default Club;
