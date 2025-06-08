console.log('babel running');

import app  from '~/app'
const PORT = process.env.PORT || 3000


const server = app.listen(PORT, () => { 
  console.log(`Blog backend start with port ${PORT}`);
})


process.on('SIGINT', () => {
  server.close( () => {
    console.log('Exit server');
  })
})

