const logger = require('../common/logger');
const servHelper = require('../helpers/services.helper');
const HttpError = require('../helpers/httpError');
const { NO_CONTENT, OK } = require('../helpers/httpResponses');
const { NOT_FOUND } = require('../helpers/errorCodes');

class Clients {
    getClientById(req) {
        return new Promise(async (resolve, reject) => {
            try {
                const { user, params: { userId } } = req;

                if (user.role !== 'users' && user.role !== 'admin') throw new HttpError(AUTHORIZATION_FAILURE);

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

    getClientByName(req) {
        return new Promise(async (resolve, reject) => {
            try {
                const { user, query: { username } } = req;
                
                if (user.role !== 'users' && user.role !== 'admin') throw new HttpError(AUTHORIZATION_FAILURE);

                const data = await servHelper.getDatafromThirdAPI(process.env.CLIENT_URL);

                if (!data.clients.length) throw new HttpError(NOT_FOUND);

                const client = servHelper.findAllData(data.clients, 'email', username);

                const label = !client.length ? NO_CONTENT : OK;

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