let db = require('app/lib/mongodb');

exports.currentStatus = async function (req, res) {
  // check connection to database
  if (db.readyState === 1) {
    res.status(200).send({
      status: 'OK'
    })
    return;
  }

  // get current state
  let response = "FAILED TO CONNECT";
  switch(db.readyState) {
    case 0: response = "DISCONNECTED"; break;
    case 2: response = "CONNECTING"; break;
    case 3: response = "DISCONNECTING"; break;
  };

  // throw error
  res.status(500).send({
    status: response
  })
}
