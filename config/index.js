const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser")



module.exports = (app) => {
    //app.set("trust proxy", 1);

    app.use(cors ({
        //credentials: true,
        origin: '*'
    }))
    
    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false}));
    app.use(cookieParser());
};
