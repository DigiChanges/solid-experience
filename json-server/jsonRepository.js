/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

function getDbData(cb)
{
    fs.readFile('./db.json', 'utf-8', (err, jsonData) =>
    {
        if (err)
{
 return cb(err);
}
        const data = JSON.parse(jsonData);
        cb(null, data);
    });
}
function saveDbData(data, cb)
{
    fs.writeFile('./db.json', JSON.stringify(data, null, 2), cb);
}

const jsonRepository = {
    saveRefreshToken(refreshToken)
    {
        getDbData((err, data) =>
        {
            if (err)
{
 return console.error('Error to read db.json');
}

            data['refresh-token'] = refreshToken;

            saveDbData(data, (err) =>
            {
                if (err)
{
 return console.error('Error to save refresh-token');
}
            });
        });
    },
    removeRefreshToken(cb)
    {
        getDbData((err, data) =>
        {
            delete data['refresh-token'];

            if (err)
{
 return console.error('Error to read db.json');
}

            saveDbData(data, (err) =>
            {
                if (err)
{
 return console.error('Error to save refresh-token');
}
                cb();
            });
        });
    }
};

module.exports = jsonRepository;
