// // // const { v4: uuidv4 } = require('uuid');
// // // const fs = require('fs').promises;
// // // const { Storage } = require("@google-cloud/storage");
// // // const multer = require("multer");
// // // const { PDFDocument, rgb } = require('pdf-lib');
// // // const sharp = require('sharp');

// // // const storage = new Storage({
// // //     keyFilename: "./key.json",
// // // });
// // // const bucket = storage.bucket("alx_portfolio_image_to_pdf_converter");

// // // const upload = multer({
// // //     storage: multer.memoryStorage(),
// // //     limits: {
// // //         fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
// // //     },
// // // });

// // // class FilesControllers {

// // //     static async uploadFile(request, response) {
// // //         upload.array('images', 10)(request, response, async (err) => {
// // //             if (err) {
// // //                 return response.status(500).json({ error: err.message });
// // //             }
// // //             const { img_per_page } = request.body;
// // //             if (!img_per_page) return response.status(400).json({ error: "Missing Max image per page" });

// // //             const files = request.files;
// // //             if (files?.length === 0) {
// // //                 return response.status(400).json({ error: 'No files in request' });
// // //             }

// // //             try {
// // //                 const pdfDoc = await PDFDocument.create();
// // //                 const imagesPerPage = parseInt(img_per_page, 10);
// // //                 const pageWidth = 595.28; // A4 size width in points
// // //                 const pageHeight = 841.89; // A4 size height in points
// // //                 const margin = 50;
// // //                 const imageWidth = (pageWidth - margin * 2) / (imagesPerPage === 2 ? 1 : 2);
// // //                 const imageHeight = (pageHeight - margin * 2) / Math.ceil(imagesPerPage / 2);

// // //                 for (let i = 0; i < files.length; i++) {
// // //                     if (i % imagesPerPage === 0) {
// // //                         pdfDoc.addPage([pageWidth, pageHeight]);
// // //                     }
// // //                     const page = pdfDoc.getPages()[Math.floor(i / imagesPerPage)];
// // //                     const imageBuffer = await sharp(files[i].buffer).jpeg().toBuffer();
// // //                     const img = await pdfDoc.embedJpg(imageBuffer);
// // //                     const x = margin + (i % 2) * imageWidth;
// // //                     const y = page.getHeight() - margin - Math.floor((i % imagesPerPage) / 2) * imageHeight - imageHeight;
                    
// // //                     // Draw image
// // //                     page.drawImage(img, {
// // //                         x,
// // //                         y,
// // //                         width: imageWidth,
// // //                         height: imageHeight,
// // //                     });

// // //                     // Draw dotted border
// // //                     page.drawRectangle({
// // //                         x,
// // //                         y,
// // //                         width: imageWidth,
// // //                         height: imageHeight,
// // //                         borderColor: rgb(0, 0, 0),
// // //                         borderWidth: 1,
// // //                         borderDashArray: [5],
// // //                     });
// // //                 }

// // //                 const pdfBytes = await pdfDoc.save();
// // //                 const blob = bucket.file(`uploaded_${uuidv4()}.pdf`);
// // //                 const blobStream = blob.createWriteStream();

// // //                 blobStream.on('error', (err) => {
// // //                     console.error(err);
// // //                     return response.status(500).json({ error: err.message });
// // //                 });

// // //                 blobStream.on('finish', () => {
// // //                     response.status(200).json({ message: "PDF uploaded successfully" });
// // //                 });

// // //                 blobStream.end(pdfBytes);
// // //             } catch (error) {
// // //                 console.error(error);
// // //                 response.status(500).json({ error: error.message });
// // //             }
// // //         });
// // //     }

// // //     static async getFile(request, response) {
// // //         console.log(request, response, 'the response and request');
// // //     }
// // // }

// // // module.exports = FilesControllers;
// // const { v4: uuidv4 } = require('uuid');
// // const { Storage } = require("@google-cloud/storage");
// // const multer = require("multer");
// // const { PDFDocument, rgb } = require('pdf-lib');
// // const sharp = require('sharp');

// // const storage = new Storage({
// //     keyFilename: "./key.json",
// // });
// // const bucket = storage.bucket("alx_portfolio_image_to_pdf_converter");

// // const upload = multer({
// //     storage: multer.memoryStorage(),
// //     limits: {
// //         fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
// //     },
// // });

// // class FilesControllers {

// //     static async uploadFile(request, response) {
// //         upload.array('images', 10)(request, response, async (err) => {
// //             if (err) {
// //                 return response.status(500).json({ error: err.message });
// //             }
// //             const { img_per_page } = request.body;
// //             if (!img_per_page) return response.status(400).json({ error: "Missing Max image per page" });

// //             const files = request.files;
// //             if (files?.length === 0) {
// //                 return response.status(400).json({ error: 'No files in request' });
// //             }

// //             try {
// //                 const pdfDoc = await PDFDocument.create();
// //                 const imagesPerPage = parseInt(img_per_page, 10);
// //                 const pageWidth = 595.28; // A4 size width in points
// //                 const pageHeight = 841.89; // A4 size height in points
// //                 const margin = 50;
// //                 const cellWidth = (pageWidth - margin * 2) / (imagesPerPage === 2 ? 1 : 2);
// //                 const cellHeight = (pageHeight - margin * 2) / Math.ceil(imagesPerPage / 2);

// //                 for (let i = 0; i < files.length; i++) {
// //                     if (i % imagesPerPage === 0) {
// //                         pdfDoc.addPage([pageWidth, pageHeight]);
// //                     }
// //                     const page = pdfDoc.getPages()[Math.floor(i / imagesPerPage)];
// //                     const imageBuffer = await sharp(files[i].buffer).jpeg().toBuffer();
// //                     const img = await pdfDoc.embedJpg(imageBuffer);
                    
// //                     const imgWidth = img.width;
// //                     const imgHeight = img.height;
// //                     const aspectRatio = imgWidth / imgHeight;

// //                     let displayWidth, displayHeight;
// //                     if (cellWidth / aspectRatio <= cellHeight) {
// //                         displayWidth = cellWidth;
// //                         displayHeight = cellWidth / aspectRatio;
// //                     } else {
// //                         displayWidth = cellHeight * aspectRatio;
// //                         displayHeight = cellHeight;
// //                     }

// //                     const x = margin + ((i % 2) * cellWidth) + (cellWidth - displayWidth) / 2;
// //                     const y = page.getHeight() - margin - Math.floor((i % imagesPerPage) / 2) * cellHeight - displayHeight - (cellHeight - displayHeight) / 2;
                    
// //                     // Draw image
// //                     page.drawImage(img, {
// //                         x,
// //                         y,
// //                         width: displayWidth,
// //                         height: displayHeight,
// //                     });

// //                     // Draw dotted border
// //                     page.drawRectangle({
// //                         x: margin + ((i % 2) * cellWidth),
// //                         y: page.getHeight() - margin - Math.floor((i % imagesPerPage) / 2) * cellHeight - cellHeight,
// //                         width: cellWidth,
// //                         height: cellHeight,
// //                         borderColor: rgb(0, 0, 0),
// //                         borderWidth: 1,
// //                         borderDashArray: [5],
// //                     });
// //                 }

// //                 const pdfBytes = await pdfDoc.save();
// //                 const blob = bucket.file(`uploaded_${uuidv4()}.pdf`);
// //                 const blobStream = blob.createWriteStream();

// //                 blobStream.on('error', (err) => {
// //                     console.error(err);
// //                     return response.status(500).json({ error: err.message });
// //                 });

// //                 blobStream.on('finish', () => {
// //                     response.status(200).json({ message: "PDF uploaded successfully" });
// //                 });

// //                 blobStream.end(pdfBytes);
// //             } catch (error) {
// //                 console.error(error);
// //                 response.status(500).json({ error: error.message });
// //             }
// //         });
// //     }

// //     static async getFile(request, response) {
// //         console.log(request, response, 'the response and request');
// //     }
// // }

// // module.exports = FilesControllers;

// const { v4: uuidv4 } = require('uuid');
// const { Storage } = require("@google-cloud/storage");
// const multer = require("multer");
// const { PDFDocument, rgb } = require('pdf-lib');
// const sharp = require('sharp');

// const storage = new Storage({
//     keyFilename: "./key.json",
// });
// const bucket = storage.bucket("alx_portfolio_image_to_pdf_converter");

// const upload = multer({
//     storage: multer.memoryStorage(),
//     limits: {
//         fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
//     },
// });

// class FilesControllers {

//     static async uploadFile(request, response) {
//         upload.array('images', 10)(request, response, async (err) => {
//             if (err) {
//                 return response.status(500).json({ error: err.message });
//             }
//             const { img_per_page } = request.body;
//             if (!img_per_page) return response.status(400).json({ error: "Missing Max image per page" });

//             const files = request.files;
//             if (files?.length === 0) {
//                 return response.status(400).json({ error: 'No files in request' });
//             }

//             try {
//                 const pdfDoc = await PDFDocument.create();
//                 const imagesPerPage = parseInt(img_per_page, 10);
//                 const pageWidth = 595.28; // A4 size width in points
//                 const pageHeight = 841.89; // A4 size height in points
//                 const margin = 50;
//                 const cellWidth = (pageWidth - margin * 2) / (imagesPerPage === 2 ? 1 : 2);
//                 const cellHeight = (pageHeight - margin * 2) / Math.ceil(imagesPerPage / 2);

//                 for (let i = 0; i < files.length; i++) {
//                     if (i % imagesPerPage === 0) {
//                         pdfDoc.addPage([pageWidth, pageHeight]);
//                     }
//                     const page = pdfDoc.getPages()[Math.floor(i / imagesPerPage)];
//                     const imageBuffer = await sharp(files[i].buffer).jpeg().toBuffer();
//                     const img = await pdfDoc.embedJpg(imageBuffer);
                    
//                     const imgWidth = img.width;
//                     const imgHeight = img.height;
//                     const aspectRatio = imgWidth / imgHeight;

//                     let displayWidth, displayHeight;
//                     if (cellWidth / aspectRatio <= cellHeight) {
//                         displayWidth = cellWidth;
//                         displayHeight = cellWidth / aspectRatio;
//                     } else {
//                         displayWidth = cellHeight * aspectRatio;
//                         displayHeight = cellHeight;
//                     }

//                     const x = margin + ((i % 2) * cellWidth) + (cellWidth - displayWidth) / 2;
//                     const y = page.getHeight() - margin - Math.floor((i % imagesPerPage) / 2) * cellHeight - displayHeight - (cellHeight - displayHeight) / 2;
                    
//                     // Draw image
//                     page.drawImage(img, {
//                         x,
//                         y,
//                         width: displayWidth,
//                         height: displayHeight,
//                     });

//                     // Draw dotted border
//                     page.drawRectangle({
//                         x: margin + ((i % 2) * cellWidth),
//                         y: page.getHeight() - margin - Math.floor((i % imagesPerPage) / 2) * cellHeight - cellHeight,
//                         width: cellWidth,
//                         height: cellHeight,
//                         borderColor: rgb(0, 0, 0),
//                         borderWidth: 1,
//                         borderDashArray: [5],
//                     });
//                 }

//                 const pdfBytes = await pdfDoc.save();
//                 const pdfFileName = `uploaded_${uuidv4()}.pdf`;
//                 const blob = bucket.file(pdfFileName);
//                 const blobStream = blob.createWriteStream();

//                 blobStream.on('error', (err) => {
//                     console.error(err);
//                     return response.status(500).json({ error: err.message });
//                 });

//                 blobStream.on('finish', () => {
//                     response.status(200).json({ message: "PDF uploaded successfully", fileName: pdfFileName });
//                 });

//                 blobStream.end(pdfBytes);
//             } catch (error) {
//                 console.error(error);
//                 response.status(500).json({ error: error.message });
//             }
//         });
//     }

//     static async getFile(request, response) {
//         const { fileName } = request.params;
//         if (!fileName) {
//             return response.status(400).json({ error: "Missing file name" });
//         }

//         try {
//             const file = bucket.file(fileName);
//             const exists = await file.exists();
//             if (!exists[0]) {
//                 return response.status(404).json({ error: "File not found" });
//             }

//             response.setHeader('Content-Type', 'application/pdf');
//             response.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
//             file.createReadStream().pipe(response);
//         } catch (error) {
//             console.error(error);
//             response.status(500).json({ error: error.message });
//         }
//     }
// }

// module.exports = FilesControllers;
const { v4: uuidv4 } = require('uuid');
const { Storage } = require("@google-cloud/storage");
const multer = require("multer");
const { PDFDocument, rgb } = require('pdf-lib');
const sharp = require('sharp');

const storage = new Storage({
    keyFilename: "./key.json",
});
const bucket = storage.bucket("alx_portfolio_image_to_pdf_converter");

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
    },
});

class FilesControllers {

    static async uploadFile(request, response) {
        upload.array('images', 10)(request, response, async (err) => {
            if (err) {
                return response.status(500).json({ error: err.message });
            }
            const { img_per_page } = request.body;
            if (!img_per_page) return response.status(400).json({ error: "Missing Max image per page" });

            const files = request.files;
            if (files?.length === 0) {
                return response.status(400).json({ error: 'No files in request' });
            }

            try {
                const pdfDoc = await PDFDocument.create();
                const imagesPerPage = parseInt(img_per_page, 10);
                const pageWidth = 595.28; // A4 size width in points
                const pageHeight = 841.89; // A4 size height in points
                const margin = 50;

                let cellWidth, cellHeight;
                if (imagesPerPage === 2) {
                    cellWidth = pageWidth - 2 * margin;
                    cellHeight = (pageHeight - 2 * margin) / 2;
                } else {
                    cellWidth = (pageWidth - 2 * margin) / 2;
                    cellHeight = (pageHeight - 2 * margin) / 2;
                }

                for (let i = 0; i < files.length; i++) {
                    if (i % imagesPerPage === 0) {
                        pdfDoc.addPage([pageWidth, pageHeight]);
                    }
                    const page = pdfDoc.getPages()[Math.floor(i / imagesPerPage)];
                    const imageBuffer = await sharp(files[i].buffer).jpeg().toBuffer();
                    const img = await pdfDoc.embedJpg(imageBuffer);

                    const imgWidth = img.width;
                    const imgHeight = img.height;
                    const aspectRatio = imgWidth / imgHeight;

                    let displayWidth, displayHeight;
                    if (cellWidth / aspectRatio <= cellHeight) {
                        displayWidth = cellWidth;
                        displayHeight = cellWidth / aspectRatio;
                    } else {
                        displayWidth = cellHeight * aspectRatio;
                        displayHeight = cellHeight;
                    }

                    let x, y;
                    if (imagesPerPage === 2) {
                        x = margin + (cellWidth - displayWidth) / 2;
                        y = page.getHeight() - margin - (i % 2) * cellHeight - displayHeight - (cellHeight - displayHeight) / 2;
                    } else {
                        x = margin + (i % 2) * cellWidth + (cellWidth - displayWidth) / 2;
                        y = page.getHeight() - margin - Math.floor((i % imagesPerPage) / 2) * cellHeight - displayHeight - (cellHeight - displayHeight) / 2;
                    }

                    // Draw image
                    page.drawImage(img, {
                        x,
                        y,
                        width: displayWidth,
                        height: displayHeight,
                    });

                    // Draw dotted border
                    page.drawRectangle({
                        x: imagesPerPage === 2 ? margin : margin + (i % 2) * cellWidth,
                        y: imagesPerPage === 2 ? page.getHeight() - margin - Math.floor((i % imagesPerPage) / 2) * cellHeight - cellHeight : page.getHeight() - margin - Math.floor((i % imagesPerPage) / 2) * cellHeight - cellHeight,
                        width: cellWidth,
                        height: cellHeight,
                        borderColor: rgb(0, 0, 0),
                        borderWidth: 1,
                        borderDashArray: [5],
                    });
                }

                const pdfBytes = await pdfDoc.save();
                const pdfFileName = `uploaded_${uuidv4()}.pdf`;
                const blob = bucket.file(pdfFileName);
                const blobStream = blob.createWriteStream();

                blobStream.on('error', (err) => {
                    console.error(err);
                    return response.status(500).json({ error: err.message });
                });

                blobStream.on('finish', () => {
                    response.status(200).json({ message: "PDF uploaded successfully", fileName: pdfFileName });
                });

                blobStream.end(pdfBytes);
            } catch (error) {
                console.error(error);
                response.status(500).json({ error: error.message });
            }
        });
    }

    static async getFile(request, response) {
        const { fileName } = request.params;
        if (!fileName) {
            return response.status(400).json({ error: "Missing file name" });
        }

        try {
            const file = bucket.file(fileName);
            const exists = await file.exists();
            if (!exists[0]) {
                return response.status(404).json({ error: "File not found" });
            }

            response.setHeader('Content-Type', 'application/pdf');
            response.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
            file.createReadStream().pipe(response);
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        }
    }
}

module.exports = FilesControllers;
