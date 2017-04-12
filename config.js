exports.DATABASE_URL =                        
                        (process.env.NODE_ENV === 'production' ?
                            'mongodb://test:test@ds027825.mlab.com:27825/shopping-list':
                            'mongodb://localhost:27017/shopping-list');
exports.PORT = process.env.PORT || 8080;