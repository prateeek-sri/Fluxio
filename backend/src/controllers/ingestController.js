const axios = require('axios');

exports.ingestTarget = async (req, res) => {
    const { swaggerUrl } = req.body;
    if (!swaggerUrl) {
        return res.status(400).json({ error: "Missing swaggerUrl in request body" });
    }
    
    try {
        // [YOU] Fetching the external Swagger data
        const response = await axios.get(swaggerUrl);
        const swaggerData = response.data;
        
        if (!swaggerData.paths) {
            return res.status(400).json({ error: "Invalid Swagger/OpenAPI structure" });
        }

        // [YOU] Parsing the paths into basic city blueprints
        const routes = [];
        Object.keys(swaggerData.paths).forEach(path => {
            Object.keys(swaggerData.paths[path]).forEach(method => {
                routes.push({
                    path: path,
                    method: method.toLowerCase(),
                    node_id: `${method}-${path.replace(/\//g, '-')}`
                });
            });
        });

        return res.json({ routes });
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch or parse the target spec", details: error.message });
    }
};