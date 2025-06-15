console.log('babel running');

import app  from '~/app'
import config from './src/configs/environment'

const PORT = config.app.port




const server = app.listen(PORT, () => { 
  console.log(`Blog backend start with port ${PORT}`);
})


process.on('SIGINT', () => {
  server.close( () => {
    console.log('Exit server');
  })
})

