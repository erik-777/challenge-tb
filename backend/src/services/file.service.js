import axios from 'axios'
import { API_BASE_URL, API_KEY } from '../config/constants.js';
//const axios = require("axios");
//const { API_BASE_URL, API_KEY } = require("../config/constants");

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
            return response.data || [];

        } catch (error) {

            throw new Error("Error fetching files list");
        }
    }
    async getFileContent(fileName) {
        try {
            const response = await this.client.get(`/file/${fileName}`);

            return response.data || {};

        } catch (error) {

            //console.error(`Error fetching file ${fileName}:`, error.message)

            return null

        }
    }

}
