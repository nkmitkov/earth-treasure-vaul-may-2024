const jwt = require("jsonwebtoken");
const util = require("util");

// function sign(payload, secretOrPrivateKey, options = {}) {
//     const promies = new Promise((resolve, reject) => {
//         jwt.sign(payload, secretOrPrivateKey, options, (err, token) => {
//             if (err) {
//                 return reject(err);
//             }

//             resolve(token);
//         })
//     });

//     return promies;
// }

const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

module.exports = {
    sign,
    verify
}