'use strict';

module.exports = {
	db: {
		//uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/mean',
		uri: 'mongodb://md_admin:Swbv123abc()@ds031551.mongolab.com:31551/mean-test',
		options: {
			user: 'admin',
			pass: '!QAZxsw2'
		}
	},
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'combined',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			stream: 'access.log'
		}
	},
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.min.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
			],
			js: [
				'public/lib/angular/angular.min.js',
				'public/lib/angular-resource/angular-resource.min.js',
				'public/lib/angular-animate/angular-animate.min.js',
				'public/lib/angular-ui-router/release/angular-ui-router.min.js',
				'public/lib/angular-ui-utils/ui-utils.min.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
				'public/lib/ng-parallax/angular-parallax.js',
				'public/lib/angular-scroll/angular-scroll.js',
				'public/lib/angular-re-captcha/angular-re-captcha.js'
			]
		},
		css: 'public/dist/application.min.css',
		js: 'public/dist/application.min.js'
	},
	facebook: {
		//clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientID: '1538753983060354',
		//clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		clientSecret: '88aebdb311df7e2baba6a4b8f1c05def',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		//clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientID: 'Q6jmr4uvLbDEAgG9zAyxu20yF',
		//clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		clientSecret: 'RFLlKNdqbOu0a8IhUxC8Obn5xBV0iPWeLTkwSrcnQfcHgVjB92',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		//clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientID: '475852206826-1atqqohgpbrt9svvsf70uqeu9q14hdch.apps.googleusercontent.com',
		//clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		clientSecret: 'yJ1PddSyVe5wkkVkJUDN7ahi',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		//clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientID: '78yo23ei5bt0pg',
		//clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		clientSecret: 'TfmzfaCtmozvTl1W',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		//clientID: '5818694066c48541221b',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		//clientSecret: 'd1fbaca577f0315f7ed04331bbd7ffd2defaac01'
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
