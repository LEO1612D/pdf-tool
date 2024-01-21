const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');

const VALID_EXT = ['jpg', 'png', 'gif', 'tiff'];
const MAX_FILE_SIZE = 50000; // bytes

async function run() {
  const folderPath = './files/';
  try {
    const files = await fsp.readdir(folderPath);
    const hasValidFiles = await validateFiles(folderPath, files);
    if(hasValidFiles) {
        console.log("Has Valid Files");
    }
    else {
        console.log(`Invalid Files, Files must have valid extension from ${VALID_EXT.join(',')} and File size should not exceed > ${MAX_FILE_SIZE/1000} kb`);
    }
  } catch (error) {
    
  }
}

async function validateFiles(folderPath, files) {
    try {
        for (const file of files) {
          const filePath = path.join(folderPath, file);
          const stats = await fsp.stat(filePath);
          const fileExt = file.split('.')[1];

          if(!VALID_EXT.includes(fileExt) || stats.size > MAX_FILE_SIZE) {
            
            console.log(file, stats.size);
            return false;
          }
          console.log(`${file}: ${stats.size} bytes`);
        }
        return true;
      } catch (err) {
        console.error('Error reading directory:', err);
      }
}

run();