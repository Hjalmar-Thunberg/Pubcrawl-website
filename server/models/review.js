var mongoose = require('mongoose');

// Create review schema
let ReviewSchema = new mongoose.Schema({
    drinkQuality: { type: Number, min: 1, max: 5 },
    drinkPrice: { type: Number, min: 1, max: 5 },
    foodQuality: { type: Number, min: 1, max: 5 },
    atmosphere: { type: Number, min: 1, max: 5 },
    averageRating: { type: Number, default: 0 },
    comment: { type: String, maxlength: [140, 'Max allowed characters is 140'] },
    createdAt: { required: true, type: Date, default: Date.now },
    users: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    bars: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'bars' }
}, {
    versionKey: false // Skip mongoose-version-key
});

// Calculate average rating
ReviewSchema.pre('save', function(next) {
    var review = this;
    var divide = 0;
    var average = 0;

    if(review.drinkQuality) { divide++; average += review.drinkQuality; };
    if(review.drinkPrice) { divide++; average += review.drinkPrice; };
    if(review.foodQuality) { divide++; average += review.foodQuality; };
    if(review.atmosphere) { divide++; average += review.atmosphere; };

    average /= divide;
    review.averageRating = Number(average.toFixed(1)); // Stores 1 decimal
    next();
});

// Compile model from ReviewSchema
module.exports = mongoose.model('reviews', ReviewSchema);