const responseHandler = (success, code = 400, message = 'valid', data) => ({
  success,
  code,
  message,
  data,
});

export default {
  responseHandler,
};
