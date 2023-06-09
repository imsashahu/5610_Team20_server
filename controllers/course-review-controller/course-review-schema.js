import mongoose from "mongoose";

export const reviewSchema = new mongoose.Schema(
  {
    courseNumber: {
      type: Number,
      required: true,
    },
    professor: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    easiness: {
      type: Number,
      required: true,
    },
    usefulness: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    yearTaken: {
      type: Number,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    upvoters: {
      type: [String],
      default: [],
    },
    downvoters: {
      type: [String],
      default: [],
    },
    postedBy: {
      type: String,
      required: true,
    },
    datePosted: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "reviews",
  }
);

const courseSchema = new mongoose.Schema(
  {
    courseNumber: {
      type: String,
      index: true,
      unique: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    averageRate: {
      type: Number,
      default: 0,
    },
    easiness: {
      type: Number,
      default: 0,
    },
    usefulness: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    creditHour: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "No description yet.",
    },
    bannerImage: {
      type: String,
      default: "polyglot.png",
    },
    professors: {
      type: [String],
      default: [],
    },
    locations: {
      type: [String],
      default: [],
    },
    instructionalMethods: {
      type: [String],
      default: [],
    },
    reviews: [reviewSchema],
    youtubeVideoIds: {
      type: [String],
      default: [],
    },
  },
  { collection: "courses" }
);

export default courseSchema;
