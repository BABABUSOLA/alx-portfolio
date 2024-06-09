const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
// const { ObjectID } = require('mongodb');
// const mime = require('mime-types');
// const dbClient = require('../utils/db');


class FilesControllers {

    static async uploadFile(request, response) {
        const user = await FilesController.getUser(request);
        if (!user) {
            return response.status(401).json({ error: 'Unauthorized' });
        }
        const { name } = request.body;
        const { type } = request.body;
        const { parentId } = request.body;
        const isPublic = request.body.isPublic || false;
        const { data } = request.body;
        if (!name) {
            return response.status(400).json({ error: 'Missing name' });
        }
        if (!type) {
            return response.status(400).json({ error: 'Missing type' });
        }
        if (type !== 'folder' && !data) {
            return response.status(400).json({ error: 'Missing data' });
        }

        // const files = dbClient.db.collection('files');
        // if (parentId) {
        //     const idObject = new ObjectID(parentId);
        //     const file = await files.findOne({ _id: idObject, userId: user._id });
        //     if (!file) {
        //         return response.status(400).json({ error: 'Parent not found' });
        //     }
        //     if (file.type !== 'folder') {
        //         return response.status(400).json({ error: 'Parent is not a folder' });
        //     }
        // }
        // if (type === 'folder') {
        //     files.insertOne(
        //         {
        //             userId: user._id,
        //             name,
        //             type,
        //             parentId: parentId || 0,
        //             isPublic,
        //         },
        //     ).then((result) => response.status(201).json({
        //         id: result.insertedId,
        //         userId: user._id,
        //         name,
        //         type,
        //         isPublic,
        //         parentId: parentId || 0,
        //     })).catch((error) => {
        //         console.log(error);
        //     });
        // } else {
        //     const filePath = process.env.FOLDER_PATH || '/tmp/files_manager';
        //     const fileName = `${filePath}/${uuidv4()}`;
        //     const buff = Buffer.from(data, 'base64');
        //     // const storeThis = buff.toString('utf-8');
        //     try {
        //         try {
        //             await fs.mkdir(filePath);
        //         } catch (error) {
        //             // pass. Error raised when file already exists
        //         }
        //         await fs.writeFile(fileName, buff, 'utf-8');
        //     } catch (error) {
        //         console.log(error);
        //     }
        //     files.insertOne(
        //         {
        //             userId: user._id,
        //             name,
        //             type,
        //             isPublic,
        //             parentId: parentId || 0,
        //             localPath: fileName,
        //         },
        //     ).then((result) => {
        //         response.status(201).json(
        //             {
        //                 id: result.insertedId,
        //                 userId: user._id,
        //                 name,
        //                 type,
        //                 isPublic,
        //                 parentId: parentId || 0,
        //             },
        //         );
        //         if (type === 'image') {
        //             fileQueue.add(
        //                 {
        //                     userId: user._id,
        //                     fileId: result.insertedId,
        //                 },
        //             );
        //         }
        //     }).catch((error) => console.log(error));
        // }
        return true;
    }

    static async getFile(request, response) {
        console.log(request, response,'the response and request')
        // const { id } = request.params;
        // const files = dbClient.db.collection('files');
        // const idObject = new ObjectID(id);
        // files.findOne({ _id: idObject }, async (err, file) => {
        //     if (!file) {
        //         return response.status(404).json({ error: 'Not found' });
        //     }
        //     console.log(file.localPath);
        //     if (file.isPublic) {
        //         if (file.type === 'folder') {
        //             return response.status(400).json({ error: "A folder doesn't have content" });
        //         }
        //         try {
        //             let fileName = file.localPath;
        //             const size = request.param('size');
        //             if (size) {
        //                 fileName = `${file.localPath}_${size}`;
        //             }
        //             const data = await fs.readFile(fileName);
        //             const contentType = mime.contentType(file.name);
        //             return response.header('Content-Type', contentType).status(200).send(data);
        //         } catch (error) {
        //             console.log(error);
        //             return response.status(404).json({ error: 'Not found' });
        //         }
        //     } else {
        //         const user = await FilesController.getUser(request);
        //         if (!user) {
        //             return response.status(404).json({ error: 'Not found' });
        //         }
        //         if (file.userId.toString() === user._id.toString()) {
        //             if (file.type === 'folder') {
        //                 return response.status(400).json({ error: "A folder doesn't have content" });
        //             }
        //             try {
        //                 let fileName = file.localPath;
        //                 const size = request.param('size');
        //                 if (size) {
        //                     fileName = `${file.localPath}_${size}`;
        //                 }
        //                 const contentType = mime.contentType(file.name);
        //                 return response.header('Content-Type', contentType).status(200).sendFile(fileName);
        //             } catch (error) {
        //                 console.log(error);
        //                 return response.status(404).json({ error: 'Not found' });
        //             }
        //         } else {
        //             console.log(`Wrong user: file.userId=${file.userId}; userId=${user._id}`);
        //             return response.status(404).json({ error: 'Not found' });
        //         }
        //     }
        // });
    }
}

module.exports = FilesControllers;
