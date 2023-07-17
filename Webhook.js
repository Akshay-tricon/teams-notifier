const {request} = require('https');

/** @class Webhook */
const Webhook = (function() {
    /** 
     * @private
     * @param {string|URL} url
     * @param {any} data
    */
    const sendDataToWebhookServer = function(url, data) {
        return new Promise(function(resolve, reject) {
            const body = JSON.stringify(data);
            const req = request(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': body.length
                }
            }, (res) => {
                res.setEncoding('utf8');
                let data = '';
                res.on('data', function(chunk) {
                    data += chunk;
                });
                res.on('end', function() {
                    resolve(JSON.parse(data));
                });
                res.on('error', function(err) {
                    reject(err);
                })
            })
            req.on('error', function(err) {
                reject(err);
            })
            req.write(body);
            req.end();
        });
    }

    /**
     * @constructor
     * @param {string|URL} url
     */
    function Webhook(url) {
        /** @type {string|URL} */
        this.url = url;
    }

    Webhook.prototype.send = async function(data) {
        return sendDataToWebhookServer(this.url, data);
    }

    return Webhook;
})();

module.exports = {Webhook};