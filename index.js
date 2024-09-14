const fetchImagesWithFilters = require("./imageFilterHandler");

const args = process.argv.slice(2); 
const tagColorWithOrientation = args.join(" ");

fetchImagesWithFilters(tagColorWithOrientation);
