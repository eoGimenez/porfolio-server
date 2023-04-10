const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser")


module.exports = (app) => {
    app.set("trust proxy", 1);

    const FRONTEND_URL = process.env.ORIGIN;
    const FRONTEDN_LOCAL = process.env.ORIGIN_LOCAL

    app.use(cors ({
        credentials: true,
        origin: [FRONTEND_URL, FRONTEDN_LOCAL]
    }))
    
    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false}));
    app.use(cookieParser());
};
