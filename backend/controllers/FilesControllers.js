// const { v4: uuidv4 } = require('uuid');
// const { Storage } = require("@google-cloud/storage");
// const multer = require("multer");
// const { PDFDocument, rgb } = require('pdf-lib');

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
//                 let page = null;
//                 let imagesPerPage = parseInt(img_per_page, 10);
//                 for (let i = 0; i < files.length; i++) {
//                     if (i % imagesPerPage === 0) {
//                         page = pdfDoc.addPage();
//                     }
//                     const img = await pdfDoc.embedJpg(files[i].buffer);
//                     const { width, height } = img.scale(0.5);
//                     page.drawImage(img, {
//                         x: 50,
//                         y: page.getHeight() - (i % imagesPerPage + 1) * height - 50,
//                         width,
//                         height,
//                     });
//                 }
//                 const pdfBytes = await pdfDoc.save();
//                 const blob = bucket.file(`uploaded_${uuidv4()}.pdf`);
//                 const blobStream = blob.createWriteStream();

//                 blobStream.on('error', (err) => {
//                     console.error(err);
//                     return response.status(500).json({ error: err.message });
//                 });

//                 blobStream.on('finish', () => {
//                     response.status(200).json({ message: "PDF uploaded successfully" });
//                 });

//                 blobStream.end(pdfBytes);
//             } catch (error) {
//                 console.error(error);
//                 response.status(500).json({ error: error.message });
//             }
//         });
//     }

//     static async getFile(request, response) {
//         console.log(request, response, 'the response and request');
//     }
// }

// module.exports = FilesControllers;


const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const { Storage } = require("@google-cloud/storage");
const multer = require("multer");
const { PDFDocument } = require('pdf-lib');
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
                let page = null;
                let imagesPerPage = parseInt(img_per_page, 10);

                for (let i = 0; i < files.length; i++) {
                    if (i % imagesPerPage === 0) {
                        page = pdfDoc.addPage();
                    }
                    const imageBuffer = await sharp(files[i].buffer).jpeg().toBuffer();
                    const img = await pdfDoc.embedJpg(imageBuffer);
                    const { width, height } = img.scale(0.5);
                    page.drawImage(img, {
                        x: 50,
                        y: page.getHeight() - (i % imagesPerPage + 1) * height - 50,
                        width,
                        height,
                    });
                }

                const pdfBytes = await pdfDoc.save();
                const blob = bucket.file(`uploaded_${uuidv4()}.pdf`);
                const blobStream = blob.createWriteStream();

                blobStream.on('error', (err) => {
                    console.error(err);
                    return response.status(500).json({ error: err.message });
                });

                blobStream.on('finish', () => {
                    response.status(200).json({ message: "PDF uploaded successfully" });
                });

                blobStream.end(pdfBytes);
            } catch (error) {
                console.error(error);
                response.status(500).json({ error: error.message });
            }
        });
    }

    static async getFile(request, response) {
        console.log(request, response, 'the response and request');
    }
}

module.exports = FilesControllers;
