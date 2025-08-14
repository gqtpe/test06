import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        // Собираем URL исходного API
        const url = `http://109.73.206.144:6969${req.url?.replace('/api/proxy', '')}`;

        // Делаем запрос к HTTP API
        const response = await axios({
            method: req.method as any,
            url,
            headers: req.headers,
            data: req.body,
            params: req.query,
        });

        res.status(200).json(response.data);
    } catch (error: any) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
}
