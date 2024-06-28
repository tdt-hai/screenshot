var screenshotgrafana = require('../controllers/screenshot.grafana.controller.js');
var graylog = require('../controllers/screenshot.graylog.controller.js');
var graylogStream = require('../controllers/screenshot.graylogStream.controller.js');
var elasticsearch = require('../controllers/screenshot.elasticsearch.controller.js');
var express = require('express');
var router = express.Router();
const validate = require('../middleware/validates.js')
const schemas = require('../schemas/screenshot.json')
const schemasGraylogStream = require('../schemas/screenshot-graylogstream.json')
/**
 * @swagger
 * /api/screenshot/grafana:
 *   post:
 *     security:  []
 *     tags: [API]
 *     summary: Api screenshot grafana
 *     description: Api screenshot grafana
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - base_url
 *               - width
 *               - height
 *               - username
 *               - password
 *               - urls
 *             properties:
 *               base_url:
 *                 type: string
 *                 example: https://localhost
 *               width:
 *                 type: integer
 *                 example: 1800
 *               height:
 *                 type: integer
 *                 example: 1390
 *               username:
 *                 type: string
 *                 example: test
 *               password:
 *                 type: string
 *                 example: 123
 *               urls:
 *                 type: array
 *                 items: 
 *                   type: object
 *                   properties:
 *                    name:
 *                      type: string
 *                      example: "grafana"
 *                    url:
 *                      type: string
 *                      example: d/f75f80cc-54f0-4064-9fa9-a50fa1645c13/overviews?orgId=1&refresh=30s
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *               message:
 *                 type: string
 *                 example: success
 *               images:
 *                 type: array
 *                 items: 
 *                   type: object
 *                   properties:
 *                    name:
 *                      type: string
 *                      example: grafana
 *                    url:
 *                      type: string
 *                      example: http://<ip>:<port>/images/1719541944786_grafana.jpg
 *               status:
 *                  type: string
 *                  example: "1"
 *       404:
 *         description: Router not found
 *       500:
 *         description: Something broke !
 */
router.post('/screenshot/grafana',validate(schemas),screenshotgrafana.postScreenShot);
/**
 * @swagger
 * /api/screenshot/elasticsearch:
 *   post:
 *     security:  []
 *     tags: [API]
 *     summary: Api screenshot elasticsearch
 *     description: Api screenshot elasticsearch
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - base_url
 *               - width
 *               - height
 *               - username
 *               - password
 *               - urls
 *             properties:
 *               base_url:
 *                 type: string
 *                 example: http://localhost:5001
 *               width:
 *                 type: integer
 *                 example: 1200
 *               height:
 *                 type: integer
 *                 example: 540
 *               username:
 *                 type: string
 *                 example: test
 *               password:
 *                 type: string
 *                 example: 123
 *               urls:
 *                 type: array
 *                 items: 
 *                   type: object
 *                   properties:
 *                    name:
 *                      type: string
 *                      example: elastisearch
 *                    url:
 *                      type: string
 *                      example: \#/overview?host=http:%2F%2Flocalhost:9200
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *               message:
 *                 type: string
 *                 example: success
 *               images:
 *                 type: array
 *                 items: 
 *                   type: object
 *                   properties:
 *                    name:
 *                      type: string
 *                      example: elastisearch
 *                    url:
 *                      type: string
 *                      example: http://<ip>:<port>/image/1719545087479_elastisearch.jpg
 *               status:
 *                  type: string
 *                  example: "1"
 *       404:
 *         description: Router not found
 *       500:
 *         description: Something broke !
 */
router.post('/screenshot/elasticsearch',validate(schemas),elasticsearch.postScreenShot);
/**
 * @swagger
 * /api/screenshot/graylog:
 *   post:
 *     security:  []
 *     tags: [API]
 *     summary: Api screenshot graylog
 *     description: Api screenshot graylog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - base_url
 *               - width
 *               - height
 *               - username
 *               - password
 *               - urls
 *             properties:
 *               base_url:
 *                 type: string
 *                 example: http://localhost:9000
 *               width:
 *                 type: integer
 *                 example: 1800
 *               height:
 *                 type: integer
 *                 example: 1390
 *               username:
 *                 type: string
 *                 example: test
 *               password:
 *                 type: string
 *                 example: 123
 *               urls:
 *                 type: array
 *                 items: 
 *                   type: object
 *                   properties:
 *                    name:
 *                      type: string
 *                      example: graylog
 *                    url:
 *                      type: string
 *                      example: search?saved=603c8956eb5af804974e91bf&width=1920
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *               message:
 *                 type: string
 *                 example: success
 *               images:
 *                 type: array
 *                 items: 
 *                   type: object
 *                   properties:
 *                    name:
 *                      type: string
 *                      example: graylog
 *                    url:
 *                      type: string
 *                      example: http://<ip>:<port>/image/1719545087479_graylog.jpg
 *               status:
 *                  type: string
 *                  example: "1"
 *       404:
 *         description: Router not found
 *       500:
 *         description: Something broke !
 */
router.post('/screenshot/graylog',validate(schemas),graylog.postScreenShot);
/**
 * @swagger
 * /api/screenshot/graylogStream:
 *   post:
 *     security:  []
 *     tags: [API]
 *     summary: Api screenshot graylog stream
 *     description: Api screenshot graylog stream
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - base_url
 *               - width
 *               - height
 *               - username
 *               - password
 *               - element
 *               - urls
 *             properties:
 *               base_url:
 *                 type: string
 *                 example: https://localhost
 *               width:
 *                 type: integer
 *                 example: 1800
 *               height:
 *                 type: integer
 *                 example: 1390
 *               username:
 *                 type: string
 *                 example: test
 *               password:
 *                 type: string
 *                 example: 123
 *               element:
 *                 type: string
 *                 example: div.sc-hjzFXw.dZbdTl
 *               urls:
 *                 type: array
 *                 items: 
 *                   type: object
 *                   properties:
 *                    name:
 *                      type: string
 *                      example: graylog
 *                    url:
 *                      type: string
 *                      example: search/6655830eb56b2e68bcd6fc9c
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *               message:
 *                 type: string
 *                 example: success
 *               images:
 *                 type: array
 *                 items: 
 *                   type: object
 *                   properties:
 *                    name:
 *                      type: string
 *                      example: graylog
 *                    url:
 *                      type: string
 *                      example: http://<ip>:<port>/image/1719545087479_graylog.jpg
 *               status:
 *                  type: string
 *                  example: "1"
 *       404:
 *         description: Router not found
 *       500:
 *         description: Something broke !
 */
router.post('/screenshot/graylogStream',validate(schemasGraylogStream),graylogStream.postScreenShot);
module.exports= router;
