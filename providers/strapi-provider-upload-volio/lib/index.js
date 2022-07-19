"use strict";

const _ = require("lodash");
const AWS = require("aws-sdk");

module.exports = {
  init(config) {
    const S3 = new AWS.S3({
      apiVersion: "2006-03-01",
      ...config,
    });

    const upload = (file, customParams = {}) =>
      new Promise((resolve, reject) => {
        // upload file on S3 bucket
        const path = file.path ? `${file.path}/` : "";
        S3.upload(
          {
            Key: `${path}${file.hash}${file.ext}`,
            Body: file.stream || Buffer.from(file.buffer, "binary"),
            ACL: "public-read",
            ContentType: file.mime,
            ...customParams,
          },
          (err, data) => {
            if (err) {
              return reject(err);
            }

            // set the bucket file url
            file.url = data.Location;

            resolve();
          }
        );
      });

    return {
      uploadStream(file, customParams = {}) {
        return upload(file, customParams);
      },
      upload(file, customParams = {}) {
        return upload(file, customParams);
      },
      delete(file, customParams = {}) {
        return new Promise((resolve, reject) => {
          // delete file on S3 bucket
          const path = file.path ? `${file.path}/` : "";
          S3.deleteObject(
            {
              Key: `${path}${file.hash}${file.ext}`,
              ...customParams,
            },
            (err, data) => {
              if (err) {
                return reject(err);
              }

              resolve();
            }
          );
        });
      },
    };
  },
};

// const _ = require("lodash");
// const AWS = require("aws-sdk");
// const sharp = require("sharp");

// const resizeTo = (buffer, options, format) =>
//   sharp(buffer)
//     .resize(options)
//     .toFormat(format)
//     .toBuffer()
//     .catch(() => null);

// module.exports = {
//   init(config) {
//     const S3 = new AWS.S3({
//       apiVersion: "2006-03-01",
//       ...config,
//     });

//     const upload = (file, customParams = {}) => {
//       console.log("Call upload");
//       return new Promise((resolve, reject) => {
//         return resizeTo(
//           file.stream || Buffer.from(file.buffer, "binary"),
//           {
//             width: file.width,
//             height: file.height,
//             fit: "inside",
//           },
//           "webp"
//         )
//           .then((buf) => {
//             console.log("buf of file: ", file.path);

//             // upload file on S3 bucket
//             const path = file.path ? `${file.path}/` : "";
//             S3.upload(
//               {
//                 Key: `${path}${file.hash}.webp`, // ${file.ext}
//                 Body: buf,
//                 ACL: "public-read",
//                 ContentType: `image/webp`, //  file.mime,
//                 ...customParams,
//               },
//               (err, data) => {
//                 if (err) {
//                   return reject(err);
//                 }

//                 // set the bucket file url
//                 file.url = data.Location;
//                 console.log("upload file res: ", data);
//                 resolve();
//               }
//             );
//           })
//           .catch((err) => {
//             return reject(err);
//           });
//       });
//     };

//     return {
//       uploadStream(file, customParams = {}) {
//         return upload(file, customParams);
//       },
//       upload(file, customParams = {}) {
//         return upload(file, customParams);
//       },
//       delete(file, customParams = {}) {
//         return new Promise((resolve, reject) => {
//           // delete file on S3 bucket
//           const path = file.path ? `${file.path}/` : "";
//           S3.deleteObject(
//             {
//               Key: `${path}${file.hash}${file.ext}`,
//               ...customParams,
//             },
//             (err, data) => {
//               if (err) {
//                 return reject(err);
//               }

//               resolve();
//             }
//           );
//         });
//       },
//     };
//   },
// };
