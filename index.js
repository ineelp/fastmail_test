const axios = require("axios");
const logger = require("./logger");

async function fetchImageNames() {
  try {
    const response = await axios.get(
      "http://frontendtest.jobs.fastmail.com.user.fm/data.json"
    );

    if (response.status === 200) {
      const data = response.data;

      if (data.images && data.images.length > 0) {
        const imageNames = data.images.map((image) => image.name);
        logger.info("Image Names:", imageNames);

        if (imageNames.length === data.images.length) {
          logger.info("All images have been fetched successfully.");
        } else {
          logger.error(
            `Mismatch in image count: Expected ${data.images.length}, but only fetched ${imageNames.length}`
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
fetchImageNames();
