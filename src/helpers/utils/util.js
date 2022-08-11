
const validationEmail = (email) => {
    const response =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return response.test(String(email).toLocaleLowerCase());
}


const validationPassword = (password) => {
    const response =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-.]).{8,}$/;
    return response.test(String(password));
}

module.exports = {
    validationEmail,
    validationPassword
}












/*const jwt = require("jsonwebtoken");

const validationEmail = (email) => {
    const reponse = 
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reponse.test(String(email).toLocaleLowerCase());
}

const validationPassword = (password) => {
    const reponse = 
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    return reponse.test(String(password));
}

const createToken = (id, email) => {
    return jwt.sign({id, email}, process.env.JWT_SECRET, {expiresIn: "id"});
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

const setError = (code, message) => {
    const error = new Error();
    error.code = code;
    error.message = message;
    return error;
}

module.exports = {
    validationEmail,
    validationPassword,
    createToken,
    verifyToken,
    setError
}*/