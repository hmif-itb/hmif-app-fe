import fs from 'fs';
import path from 'path';

function deleteSourceMaps(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stat) => {
        if (err) throw err;

        if (stat.isDirectory()) {
          deleteSourceMaps(filePath);
        } else if (filePath.endsWith('.map')) {
          fs.unlink(filePath, (err) => {
            if (err) throw err;
            console.log(`Deleted: ${filePath}`);
          });
        }
      });
    });
  });
}

deleteSourceMaps('./dist');
