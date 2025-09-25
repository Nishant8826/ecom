const express = require('express');
const { isEmailExist } = require('../../controllers/common/emailExist');
const emailExistRoute = express.Router();

emailExistRoute.post('/is-email-exist', isEmailExist);

module.exports = emailExistRoute;
