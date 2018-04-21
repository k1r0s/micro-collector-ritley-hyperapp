import axios from "axios";

export const chunkUpload = (data, session) => axios.post("/service/upload", data, {
  headers: { session }
});

export const lastChunkUpload = (data, session, filename) => axios.post("/service/upload", data, {
  headers: { session, filename }
});

export const dataUpload = (uid, { file, ...data }) => axios.post("/service/user-data", data, {
  params: { uid }
});
