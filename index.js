const fetchImageNames = require("./fetchImageNames");

const args = process.argv.slice(2); 
const tagColorWithOrientation = args.join(" ");

fetchImageNames(tagColorWithOrientation);
