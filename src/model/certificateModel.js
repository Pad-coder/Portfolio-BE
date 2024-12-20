import mongoose from "../mondoDb/DbClient.js";

const CertificateSchema = new mongoose.Schema({
    urls: [String], // Array to store multiple image URLs
    programName: String,
    
  });
  
  export default new mongoose.model("Image", CertificateSchema);

  