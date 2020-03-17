const TelegramBot = require('node-telegram-bot-api'),
	  dotenv = require('dotenv'),
	  mongoose = require('mongoose');

dotenv.config();

const { TOKEN, PORT, APP_URL} = process.env;

const options = {
	webHook: {
		port: PORT || 443
	}
}

const url = APP_URL || 'https://panquecah-bot.herokuapp.com:443';

const bot = new TelegramBot(TOKEN, {polling: true});
//const bot = new TelegramBot(TOKEN, options);

//bot.setWebHook(`${url}/bot${TOKEN}`);

const handlers = require('./message_handlers/handlers');
const error_handlers = require('./error_handlers/handlers');
const hp_handlers = require('./hp_handlers/handlers');

mongoose.connect('mongodb://localhost:27017/panquecahbot',
				 {useNewUrlParser: true}).catch(error => {
					console.log("erro ao conectar no db");
					console.log(error);
				 });

handlers.set_bot(bot);
hp_handlers.set_bot(bot);
error_handlers.set_bot(bot);
