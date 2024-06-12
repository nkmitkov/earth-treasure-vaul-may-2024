const Stone = require("../models/Stone");

exports.getAllStones = () => Stone.find();

exports.getStoneById = (id) => Stone.findById(id);

exports.create = (stoneData) => Stone.create(stoneData);