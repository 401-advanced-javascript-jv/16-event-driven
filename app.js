'use strict';

const fs = require('fs').promises;
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

const eventNames = {
  READ: 'READ',
  CONVERT: 'CONVERT',
  TO_BUFFER: 'TO_BUFFER',
  WRITE: 'WRITE',
  ERROR: 'ERROR',
};

const pRead = (file) => {
  return fs.readFile(file).catch((error) => {
    throw error;
  });
};

const sConvert = (fileBuffer) => {
  return fileBuffer.toString().toUpperCase();
};

const bCreateBuffer = (string) => {
  return Buffer.from(string);
};

const pWrite = (file, buffer) => {
  return fs.writeFile(file, buffer).catch((error) => {
    throw error;
  });
};

const alterFile = (file) => {
  pRead(file)
    .then((buffer) => {
      // event here
      let text = sConvert(buffer);
      return pWrite(file, bCreateBuffer(text)); // emit next event
    })
    .then(() => {
      // event here
      console.log(`${file} saved`); // emit console log event
    })
    .catch((error) => {
      throw error;
    });
};

let file = process.argv.slice(2).shift();
alterFile(file);

eventEmitter.on(eventNames.READ, file => pRead(file));
eventEmitter.on(eventNames.CONVERT, buffer => sConvert(buffer));
eventEmitter.on(eventNames.TO_BUFFER, string => bCreateBuffer(string));
eventEmitter.on(eventNames.WRITE, (file, buffer) => pWrite(file, buffer));

eventEmitter.on(eventNames.ERROR, (error) => {
  throw error;
});

