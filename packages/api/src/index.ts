import config from "config";

import app from './app';
import logger from './utils/Logger';

const PORT = config.get('server.port');

app.listen(PORT, () => {
    logger.info(`${config.get('name')} Running on port ${PORT}`);
});

module.exports = app;