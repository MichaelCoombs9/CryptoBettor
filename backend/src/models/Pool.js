const mongoose = require('mongoose');

const PoolSchema = new mongoose.Schema({
    leagueId: {
        type: String,
        required: true,
    },
    betAmount: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Pool', PoolSchema);
