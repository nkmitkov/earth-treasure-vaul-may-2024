const Stone = require("../models/Stone");

exports.getAllStones = () => Stone.find();

exports.getStoneById = (id) => Stone.findById(id);

exports.create = (stoneData) => Stone.create(stoneData);

exports.update = (id, stone) => Stone.findByIdAndUpdate(id, stone);

exports.del = (id) => Stone.findByIdAndDelete(id);

exports.search = (name) => {
    if (name) {
        return Stone.find({ name: name.toLowerCase() });
    } else {
        return Stone.find();
    }
};