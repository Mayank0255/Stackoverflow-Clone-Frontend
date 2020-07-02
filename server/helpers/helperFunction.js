const responseHandler = (success, code = 400, message = 'valid', data) => {
    return {
        success,
        code,
        message,
        data
    };
};

module.exports = helperFunction = {
    responseHandler
};