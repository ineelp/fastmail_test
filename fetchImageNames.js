const axios = require('axios');
const logger = require('./logger');

async function fetchImageNames(tagColors = "") {
  try {
    const response = await axios.get(
      "http://frontendtest.jobs.fastmail.com.user.fm/data.json"
    );

    if (response.status === 200) {
      const data = response.data;

      if (data.images && data.images.length > 0) {
        const tagcolorsArray = tagColors.split(/\s+/).map(color => color.toLowerCase());

        const filteredImages = data.images.filter((image) =>
            tagcolorsArray.every(color => image.tags.includes(color))
        );
        const imageNames = filteredImages.map((image) => image.name);

        logger.info("Filtered Image Names:", imageNames);

        if (imageNames.length === filteredImages.length) {
          logger.info("All images matching the color tags have been fetched successfully.");
        } else {
          logger.error(
            `Mismatch in image count: Expected ${filteredImages.length}, but only fetched ${imageNames.length}`
          );
        }
      } else {
        logger.info("The images array is either missing or empty.");
      }
    } else {
      logger.error("Failed to fetch data. Status code:", response.status);
    }
  } catch (error) {
    logger.error("Error fetching:", error);
  }
}

module.exports = fetchImageNames;
