const mongoose = require('mongoose');
const Review = mongoose.model('Review');

exports.addReview = async (req, res) => {
    req.body.author = req.user._id;
    req.body.store = req.params.id;

    const review = new Review(req.body);
    await review.save();

    const redirectUrl = req.get('Referrer');
    req.flash('success', 'Review added successfully!');
    res.redirect(redirectUrl);
};