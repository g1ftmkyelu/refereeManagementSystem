module.exports = {
  fullname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: [
      "administrator",
      "assessor",
      "matchcommissioner",
      "allocationofficer",
      "referee",
    ],
    required: true,
  },
  Image: {
    type: String,
    default:
      "https://www.seekpng.com/png/small/143-1435868_headshot-silhouette-person-placeholder.png",
    required: false,
  },
};
