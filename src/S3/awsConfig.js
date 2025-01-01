import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import "dotenv/config.js";


// Define multer storage
const upload = multer({ storage: multer.memoryStorage() });
 
export default upload;

export const command = (uniqueFileName,file,bucketName)=> new PutObjectCommand({
        Bucket: bucketName,
        Key: uniqueFileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        Grants: [
          {
            Grantee: {
              Type: "Group",
              URI: "http://acs.amazonaws.com/groups/global/AllUsers",
            },
            Permission: "READ",
          },
        ], // Grant public read access
      });



// Create an S3 client service object
export const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });