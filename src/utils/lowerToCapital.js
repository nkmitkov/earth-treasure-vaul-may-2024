function lowerToCapital(data) {
    data = data.map((x) => {
        x.name = x.name.substring(0, 1).toUpperCase() + x.name.substring(1).toLowerCase()
        return x;
    });

    return data;
}

module.exports = lowerToCapital;