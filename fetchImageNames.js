const axios = require("axios");
const logger = require("./logger");

const api_end_point = "http://frontendtest.jobs.fastmail.com.user.fm/data.json";

// Fetch and log image names
async function fetchImageNames(tagColors = "") {
  const data = await fetchData();
  if (!data || !data.images || data.images.length === 0) {
    logger.info("The images array is either missing or empty.");
    return;
  }

  const filters = parseFilters(tagColors);
  const filteredImages = filterImages(data.images, filters);
  const imageNames = filteredImages.map((image) => image.name);

  logger.info("Filtered Image Names:", imageNames);

  if (imageNames.length === filteredImages.length) {
    logger.info(
      "All images matching the filters have been fetched successfully."
    );
  } else {
    logger.error(
      `Mismatch in image count: Expected ${filteredImages.length}, but only fetched ${imageNames.length}`
    );
  }
}

// Fetch data from the API
async function fetchData() {
  try {
    const response = await axios.get(api_end_point);
    if (response.status === 200) {
      return response.data;
    } else {
      logger.error("Failed to fetch data. Status code:", response.status);
      return null;
    }
  } catch (error) {
    logger.error("Error fetching data:", error);
    return null;
  }
}

// Parse filters into colors and orientation keywords
function parseFilters(tagColors) {
  const filters = tagColors.split(/\s+/).map((filter) => filter.toLowerCase());
  const tagColorArray = filters.filter((filter) => !filter.startsWith("is:"));
  const orientationKeywords = filters
    .filter((filter) => filter.startsWith("is:"))
    .map((keyword) => keyword.substring(3));
  return { tagColorArray, orientationKeywords };
}

// Filter images based on color tags and orientation keywords
function filterImages(images, { tagColorArray, orientationKeywords }) {
  return images.filter((image) => {
    const hasAllColors = tagColorArray.every((color) =>
      image.tags.includes(color)
    );
    const matchesOrientation =
      orientationKeywords.length === 0 ||
      (orientationKeywords.includes("portrait") &&
        image.height > image.width) ||
      (orientationKeywords.includes("landscape") && image.width > image.height);
    return hasAllColors && matchesOrientation;
  });
}

module.exports = fetchImageNames;
