const Stone = require("../models/Stone");

exports.getAllStones = () => Stone.find();

exports.create = (stoneData) => Stone.create(stoneData);