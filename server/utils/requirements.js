const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const argon2 = require('argon2');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cryptr = require("cryptr");

module.exports = { dotenv, express, cors, argon2, mongoose, jwt, cookieParser, cryptr };
