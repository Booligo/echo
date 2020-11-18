const express = require('express');
const router = express.Router();
const {donate} = require('../storage/add_donate_into_db');
const validator = require('express-joi-validation').createValidator({});
const Joi = require('joi');
const schemas = Joi.object({
    donater: Joi.string(),
    amount: Joi.number(),
    currency: Joi.string(),
    streamer: Joi.string()
});
interface body{
    donater: string;
    amount: number;
    currency: string;
    streamer: string;
    message: string;
}
router.post(
    '/donate',
    validator.query(schemas),
    async (req, res) => {
        const {donater, amount, currency, streamer, message}: body = req.body;
        try {
            res.send(await donate(donater, amount, currency, streamer, message));
        }catch (err) {
            if (err) {
                //res.status(500);
                res.send(err);
            }
        }
    });
module.exports = router;