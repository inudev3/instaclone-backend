import AWS from "aws-sdk";
import * as process from "process";

AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET
    }

})


const Bucket = "mynstagramclone-s3uploads";
const bucketInstance = new AWS.S3();


export const uploadS3 = async (file, userId, folderName) => {
    const {filename, createReadStream} = await file;
    const readStrem = createReadStream();
    const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
    const {Location} = await bucketInstance.upload({
        Bucket,
        Key: objectName,
        ACL: "public-read",
        Body: readStrem
    }).promise()
    return Location
}

export const delPhotoS3 = async (fileUrl, folderName) => {
    const filePath = fileUrl.split("/uploads/")[1];
    const params = {
        Bucket: `${Bucket}/${folderName}`,
        Key: filePath,
    };
    await bucketInstance
        .deleteObject(params, (error, data) => {
            if (error) {
                console.log(error);
            }
        })
        .promise();
};
