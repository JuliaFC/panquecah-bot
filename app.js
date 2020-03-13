const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');

dotenv.config();

const TOKEN = process.env.TOKEN;

const options = {
	webHook: {
		port: process.env.PORT
	}
}

const url = process.env.APP_URL || 'https://panquecah-bot.herokuapp.com:433';

const bot = new TelegramBot(TOKEN, {polling: true});
//const bot = new TelegramBot(TOKEN, options);

const handlers = require('./message_handlers/handlers');
const error_handlers = require('./error_handlers/handlers');

handlers.set_bot(bot);
error_handlers.set_bot(bot);
