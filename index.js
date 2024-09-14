const fetchImageNames = require("./fetchImageNames");

const args = process.argv.slice(2); 
const tagColors = args.join(" ");

fetchImageNames(tagColors);
