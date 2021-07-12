const mongoose = require("mongoose");
const defaultBio = "Use the command '<!profile.bio> <bio>' to change your bio.";
const defaultGithub = "Use the command '<!profile.github> <url>' to change your github url.";
const defaultPortfolio = "Use the command '<!profile.portfolio> <url>' to change your portfolio url.";
const defaultLinkedIn = "Use the command '<!profile.linkedIn> <url>' to change your linkedIn url.";
const defaultLanguages = ["JavaScript", "C#", "Java", "C++", "Python"];

const profileSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    thumbnail: { type: String, required: true },
    bio: { type: String, required: true, default: defaultBio },
    github: { type: String, required: true, default: defaultGithub },
    portfolio: { type: String, required: true, default: defaultPortfolio },
    linkedIn: { type: String, required: true, default: defaultLinkedIn },
    languages: { type: Array, required: true, default: defaultLanguages }
});

const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;