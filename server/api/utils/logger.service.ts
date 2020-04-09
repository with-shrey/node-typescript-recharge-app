import bunyan from 'bunyan';
import Logger from 'bunyan';


let logger: Logger;

if (process.env.NODE_ENV === 'production') {
    logger = bunyan.createLogger({name: 'axom'});
} else {
    const PrettyStream = require('bunyan-prettystream');

    const stream = new PrettyStream();
    stream.pipe(process.stdout);

    logger = bunyan.createLogger({
        name: 'axom', streams: [{
            stream,
        }]
    });
}


export default logger;
