if (process.env.NODE_ENV === 'production') {
    module.exports = require('./keys_prod');
} else
    if (process.env.NODE_ENV === 'test') {
        console.log('TEST ENV')
        module.exports = require('./keys_test');
    }
    else {
        module.exports = require('./keys_dev');
    }