import certificateModel from "../model/certificateModel.js";
import { s3Client } from "../S3/awsConfig.js";
import { command } from "../S3/awsConfig.js";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config.js";

// Add certificate
const addCertificate = async (req, res) => {
  const file = req.file;
  try {
    
    const folderName = "certificates/"; // Folder name
    const bucketName = process.env.S3_BUCKET_NAME;

    const { certificateName } = req.body;

    if (!req.file || req.file.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }

    const uniqueFileName = `${folderName}${uuidv4()}-${file.originalname}`;

    // Execute the S3 command
    await s3Client.send(command(uniqueFileName, file, bucketName));

    // Construct the public URL for the uploaded file
    const fileUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;
    let uploadedUrls = fileUrl;

    // Save URLs to MongoDB
    const Certificates = await certificateModel.create({
      urls: uploadedUrls,
      certificateName: certificateName,
    });

    res
      .status(201)
      .json({ success: true, Certificates, message: "Uploaded successfully" });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};

export default addCertificate;
