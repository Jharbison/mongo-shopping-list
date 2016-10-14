exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://jeffharbison:21seymour@ds027825.mlab.com:27825/shopping-list';
exports.PORT = process.env.PORT || 8080;