# TypescriptTest
## Instalation
* Install ZMQ binaries (https://www.npmjs.com/package/zmq#installing-on-unixposix-and-osx)
* Run `npm install` and you are good to go

## Running an app
Run `npm start APP` where APP is app you want to start.
All spawned services for that app will have their output redirected to dist/SERVICE/[console|err].log

Currently, only `npm start base` is supported