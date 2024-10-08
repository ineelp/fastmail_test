const axios = require("axios");
const logger = require("./logger");

const api_end_point = "http://frontendtest.jobs.fastmail.com.user.fm/data.json";

// Fetch and log image names
async function fetchImagesWithFilters(filterString = "") {
  logger.info(`Received filter tags: ${filterString}`);

  const data = await fetchData();
  if (!data || !data.images || data.images.length === 0) {
    logger.info("The images array is either missing or empty.");
    return;
  }

  const filterGroups = parseFilters(filterString);
  const filteredImages = filterImages(data.images, filterGroups);
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
function parseFilters(filterString) {
  const filters = filterString
    .split(/\s+OR\s+/i)
    .map((filterGroup) => filterGroup.trim().toLowerCase());
  return filters.map((group) => {
   
    const colors = group
      .split(/\s+/)
      .filter((filter) => !filter.startsWith("is:"));
   
      const orientations = group
      .split(/\s+/)
      .filter((filter) => filter.startsWith("is:"))
      .map((keyword) => keyword.substring(3));
    return { colors, orientations };
  });
}

// Filter images based on multiple conditions
function filterImages(images, filterGroups) {
  return images.filter((image) =>
    filterGroups.some(({ colors, orientations }) => {
      const hasAllColors = colors.every((color) => image.tags.includes(color));
     
      const matchesOrientation =
        orientations.length === 0 ||
        (orientations.includes("portrait") && image.height > image.width) ||
        (orientations.includes("landscape") && image.width > image.height);
      return hasAllColors && matchesOrientation;
    })
  );
}

module.exports = fetchImagesWithFilters;
