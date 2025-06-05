import { useMemo } from 'react';
import { axiosInstance } from './apiServices';

export const useFiles = () => {
    const filesService = useMemo(() => ({
        getDataFiles: async (name) => {
            const response = await axiosInstance.get('/api/files/data', {
                params: name ? { fileName: name } : {},
            });
            return response.data;
        }
    }), []);

    return filesService;
};
