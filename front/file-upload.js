import { chunkUpload, lastChunkUpload } from "./request";

export default class {

  static cursor;
  static fileSize;
  static file;
  static chunkSize = 1024 * 256;

  static getProcessedPercent() {
    return this.cursor / this.file.size * 100;
  }

  static doFileUpload(config) {
    const { file } = config;
    const session = `${Date.now()}_${btoa(file.name)}`;
    this.sliceFile(
      file,
      (chunk, step) => chunkUpload(chunk, session).then(_ => step()) || config.onProgress(this.getProcessedPercent()),
      chunk => lastChunkUpload(chunk, session, file.name).then(({ data }) => config.onSuccess(data.uid))
    )
  }

  static sliceFile(file, onChunk, onLastChunk) {
    this.cursor = 0;
    this.fileSize = file.size;
    this.file = file;
    this.readChunk(onChunk, onLastChunk);
  }

  static readChunk(onChunk, onLastChunk) {
    const start = this.cursor;
    const last = this.chunkSize + this.cursor > this.fileSize;
    const end = (last ? this.fileSize - this.cursor: this.chunkSize) + start;
    const fileSlice = this.file.slice(start, end);
    if (last) {
      onLastChunk(fileSlice);
    } else {
      onChunk(fileSlice, retry => {
        this.cursor = retry ? this.cursor: this.cursor + this.chunkSize;
        this.readChunk(onChunk, onLastChunk);
      });
    }
  }
}
