const logger = require('../common/logger');
const servHelper = require('../helpers/services.helper');
const HttpError = require('../helpers/httpError');
const { CREATED, NO_CONTENT, OK } = require('../helpers/httpResponses');
const { INVALID_DATA, NOT_FOUND } = require('../helpers/errorCodes');

class Clients {
    getClientById(req) {
        return new Promise(async (resolve, reject) => {
            try {
                const { userId } = req.params;

                const data = await servHelper.getDatafromThirdAPI(process.env.CLIENT_URL);

                if (!data.clients.length) throw new HttpError(NOT_FOUND);

                const client = servHelper.findData(data.clients, 'id', userId);

                const label = !client ? NO_CONTENT : OK;

                resolve({
                    statusCode: label.statusCode,
                    message: label.message,
                    data: client
                });

            } catch (error) {
                logger.error(`Error in getClientById for: ${error.message}`);
                reject(servHelper.manageError(error));
            }
        });
    }
}

module.exports = new Clients();