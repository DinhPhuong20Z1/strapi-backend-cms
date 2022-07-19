"use strict";
const _ = require("lodash");

module.exports = {
  async uploadFileAndPersist(fileData) {
    const config = strapi.plugins.upload.config;
    const fileFormats = {};
    const {
      getDimensions,
      generateBase64,
      generateThumbnail,
      generateResponsiveFormats,
    } = strapi.plugins.upload.services["image-manipulation"];

    console.log("Volio upload fileData.mime: ", fileData.mime);
    console.log("Volio upload fileData.path: ", fileData.path);
    await strapi.plugins.upload.provider.upload(fileData);

    const base64 = await generateBase64(fileData);
    if (base64) {
      fileFormats["base64"] = [base64];
    }

    const thumbnailFile = await generateThumbnail(fileData);
    if (thumbnailFile) {
      console.log("Volio upload thumbnailFile.mime: ", thumbnailFile.mime);
      console.log("Volio upload thumbnailFile.path: ", thumbnailFile.path);

      await strapi.plugins.upload.provider.upload(thumbnailFile);
      delete thumbnailFile.buffer;
      fileFormats["thumbnail"] = [thumbnailFile];
    }

    const formats = await generateResponsiveFormats(fileData);
    if (
      Array.isArray(formats) &&
      formats.length > 0 &&
      format[0] !== undefined
    ) {
      for (const format of formats) {
        if (!format || !(Array.isArray(format) && format.length > 0)) continue;
        for (const { key, file } of format) {
          console.log("Volio upload key: ", key);
          console.log("Volio upload file.mime: ", file.mime);
          console.log("Volio upload file.path: ", file.path);

          await strapi.plugins.upload.provider.upload(file);
          delete file.buffer;

          // "key" is here as "small", "medium", "large"...
          if (!(key in fileFormats)) {
            fileFormats[key] = [];
          }

          // "file" is created format. "png", "jpeg", "webp"...
          fileFormats[key].push(file);
        }
      }
    }

    // Format generation of all size's has done.
    _.set(fileData, ["formats"], fileFormats);

    const { width, height } = await getDimensions(fileData.buffer);
    delete fileData.buffer;
    _.assign(fileData, {
      provider: config.provider,
      width,
      height,
    });
    return this.add(fileData);
  },

  async remove(file) {
    const config = strapi.plugins.upload.config;

    // execute delete function of the provider
    if (file.provider === config.provider) {
      console.log("Volio delete file.mime: ", file.ext);
      console.log("Volio delete file.path: ", file.path);
      console.log("Volio delete file.hash: ", file.hash);

      await strapi.plugins.upload.provider.delete(file);

      const formats = file.formats;
      if (formats) {
        const promises = [];
        const formatKeys = Object.keys(formats).filter(
          (key) => key !== "base64"
        );

        for (const key of formatKeys) {
          const images = formats[key];
          const shouldSkip = !(Array.isArray(images) && images.length > 0);
          if (shouldSkip) continue;

          for (const image of images) {
            console.log("Volio delete image.mime: ", image.ext);
            console.log("Volio delete image.path: ", image.path);
            console.log("Volio delete image.hash: ", image.hash);

            promises.push(strapi.plugins.upload.provider.delete(image));
          }
        }

        await Promise.all(promises);
      }
    }

    const media = await strapi.query("file", "upload").findOne({
      id: file.id,
    });

    strapi.eventHub.emit("media.delete", { media });

    return strapi.query("file", "upload").delete({ id: file.id });
  },
};
