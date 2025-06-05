import axios from 'axios'
import { API_BASE_URL, API_KEY } from '../config/constants.js';

export default class FileService {
    constructor() {
        this.client = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                "Content-Type": "application/json",
                "Authorization": API_KEY,
            },
        });
    }

    async getFilesList() {

        try {
            const response = await this.client.get("/files");

            const { files } = response.data

            return files

        } catch (error) {
            console.log(error)

            throw new Error("Error fetching files list");
        }
    }
    async getFileContent(fileName) {
        try {
            const response = await this.client.get(`/file/${fileName}`);

            return response.data || {};

        } catch (error) {

            return null

        }
    }

}
