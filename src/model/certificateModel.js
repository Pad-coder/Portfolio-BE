import mongoose from "../mondoDb/DbClient.js";

const CertificateSchema = new mongoose.Schema(
  {
    urls: {
      type: String,
      required: true,
    },
    certificateName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "Certificate",
  }
);

export default new mongoose.model("Certificate", CertificateSchema);
