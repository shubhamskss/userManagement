const sendErrorResponse = (res, status, message) => {
    return res.status(status).send({ status: false, message });
};

module.exports = {
    sendErrorResponse
};