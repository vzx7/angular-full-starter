const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jayson = require('jayson');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const connect = require('connect');
const app = connect();
const SHA256 = require("crypto-js/sha256");

const transporter = nodemailer.createTransport({
  host: 'debugmail.io',
  port: 25,
  auth: {
    user: 'marvelokos@gmail.com',
    pass: '57c0eb70-fc59-11e8-a724-49f5a38ee8ee'
  }
});

const readTable = function(isSystem, first, count) {
  let res = {}
  if (!isSystem) {
    res['totalCount'] = db.dictionary_user_table.length;
    res['data'] = db.dictionary_user_table.slice(first, first + count)
  } else {
    res['totalCount'] = db.dictionary_system_table.length;
    res['data'] = db.dictionary_system_table.slice(first, first + count)
  }
  return res;
}

const getGroupTree = function (type) {
  switch (type) {
    case 'Substance':
      return db.group_substance;
    case 'Product':
      return db.group_substance;
    case 'NEI':
      return db.group_substance;
  }
}

const getSubGroupTree = function (type) {
  switch (type) {
    case 'Substance':
      return db.subgroup_substance;
    case 'Product':
      return db.subgroup_substance;
    case 'NEI':
      return db.subgroup_substance;
  }
}

const methods = {
  // Classifier editor (Structure element)
  'create_sub-group': function (args, callback) {
    const table = getClassifierTable(args[0].classId);
    table.push(args[0]);
    callback(null, true);
  },
  'delete_sub-group': function (args, callback) {
    const table = getClassifierTable(args[0].classId);
    callback(null, table.filter(el => args[0].id === el.id));
  },
  'update_sub-group': function (args, callback) {
    callback(null, true);
  },
  'read_sub-group': function (args, callback) {
    callback(null, true);
  },
  'list_sub-group': function (args, callback) {
    callback(null, db.subgroup_substance.filter(el => args[0] === el.parentId));
  },
  'list_indicator': function (args, callback) {
    callback(null, db.indicator_substance.filter(el => args[0] === el.parentId));
  },
  'list_group': function (args, callback) {
    callback(null, db.group_substance);
  },
  'lock_sub-group': function(args, callback) {
    callback(null, true);
  },
  // Dictionary
  'create_dictionary': function (args, callback) {
    const res = {
      id: db.dictionary_tree.length + 1,
      name: args[0].name.value,
      lang: args[0].name.lang,
      isSystem:false
    }
    db.dictionary_tree.push(res);
    callback(null, db.dictionary_tree.length);
  },
  'delete_dictionary': function (args, callback) {
    db.dictionary_tree = db.dictionary_tree.filter((item) => item.id != args[0] && item.isSystem);
    callback(null, {});
  },
  'list_dictionary': function (args, callback) {

    callback(null, db.dictionary_tree.filter((item) => {
      return item.parentId === args[0] && item.isSystem === args[1];
    }));
  },
  // Dictionary value
  'create_dictionary-value': function (args, callback) {
    callback(null, db.dictionary_table.length);
  },
  'update-deactivate_dictionary-value': function (args, callback) {
    callback(null, args[0]);
  },
  'delete_dictionary-value': function (args, callback) {
    if (args[0].isSystem) {
      db.dictionary_user_table = db.dictionary_user_table.filter((item) => item.id != args[0]);
    } else {
      db.dictionary_system_table = db.dictionary_system_table.filter((item) => item.id != args[0]);
    }
    callback(null, args[0]);
  },
  'update_dictionary-value': function (args, callback) {
    callback(null, args[0]);
  },
  'list_dictionary-value': function (args, callback) {
    let res = {};
    if (!args[0].name) {
      res = readTable(args[0].isSystem, 0, args[0].count);
    } else {
      if (args[0].isSystem) {
        const data = db.dictionary_user_table.filter((item) => item.name.includes(args[0].name));
        res['totalCount'] = data.length;
        res['data'] = data.slice(0, args[0].count);
      } else {
        const data = db.dictionary_system_table.filter((item) => item.name.includes(args[0].name));
        res['totalCount'] = data.length;
        res['data'] = data.slice(0, args[0].count);
      }
    }
    callback(null, readTable(args[0].isSystem, args[0].first, args[0].count));
  },
  'lock_dictionary-value': function (args, callback) {
    callback(null, true);
  },
  'read_dictionary-value': function (args, callback) {
    callback(null, args[0]);
  },
  // Attribute
  'list_classifier-group': function (args, callback) {
    callback(null, getGroupTree(args[0]));
  },
  'list_classifier-subgroup': function (args, callback) {
    callback(null, getSubGroupTree(args[0]));
  },
  'list_attribute': function (args, callback) {
    const res = {};
    res['totalCount'] = db.attr_table.length;
    res['data'] = db.attr_table.slice(0, args[0].count);
    callback(null, res);
  },
  // Structure
  'list_structure': function (args, callback) {
    callback(null, db.structure_table);
  }
};

const jaysonServer = jayson.server(methods);

const server = jsonServer.create()
const router = jsonServer.router('./database.json')
server.use(jsonServer.rewriter(JSON.parse(fs.readFileSync('./routes.json'))))

server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())


const createToken = (payload, rememberMe) => {
  if (rememberMe) {
    return jwt.sign(payload, 'secret');
  } else {
    return jwt.sign(payload, 'secret', { expiresIn: '24h' });
  }
};
const verifyToken = (token) => jwt.verify(token, 'SECRET_KEY');

const db = JSON.parse(fs.readFileSync('./database.json', 'UTF-8'));

const isAuthenticated = ({ login, password }) => {
  return db.users.findIndex(user => user.email === login && user.plainPassword === password) !== -1
}

const isRegistered = ({ email }) => {
  return db.users.findIndex(user => user.email === email) !== -1
}

const sendEmail = (options) => {
  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Почта отправлена: ' + info.response);
      fs.writeFile('./database.json', JSON.stringify(db, null, 2), 'UTF-8', (error) => { });
    }
  });
}

server.post('/login', (req, res) => {
  const {login, password, rememberMe} = req.body
  if (isAuthenticated({ login, password }) === false) {
    const status = 401
    const message = 'Пользователь с указанными данными не найден. Пожалуйста, проверьте введенные данные и повторите попытку.'
    res.status(status).json({ status, message })

    return;
  }
  const access_token = createToken({ login, password }, rememberMe)
  res.status(200).json({ access_token })
})

server.get('/read_user/:id', (req, res) => {
  const user = db.users.filter((user) => user.id === req.params.id)[0];
  res.status(200).json(user)
})

server.put('/update_user/:id', (req, res) => {
  let user = db.users.filter((user) => user.id === req.params.id)[0];
  const id = db.users.indexOf(user);
  db.users[id] = req.body;

  fs.writeFile('./database.json', JSON.stringify(db, null, 2), 'UTF-8', (error) => { });
  res.status(200).json(req.body)
})

server.put('/update_user_password/:id', (req, res) => {
  const user = db.users.filter((user) => user.id === req.params.id)[0];
  const id = db.users.indexOf(user);
  db.users[id].password = SHA256(req.body.newPassword).toString();

  fs.writeFile('./database.json', JSON.stringify(db, null, 2), 'UTF-8', (error) => { });
  res.status(200).json()
})

server.post('/register', (req, res) => {
  const { firstName, lastName, patronymic, email, password } = req.body

  if (isRegistered({ email })) {
    const status = 500;
    res.status(status).json('Пользователь уже зарегистрирован!');
    return;
  }
  db.users.push({
    id: db.users.length,
    firstName: firstName,
    lastName: lastName,
    patronymic: patronymic,
    email: email,
    password: password
  })
  var mailOptions = {
    from: 'bumblebee@gmail.com',
    to: email,
    subject: 'Подверждение регистрации.',
    text: 'http://localhost:4200/auth/confirm_email?code=' + createToken({ email, password }, false) +'&userId=user_id'
  };

  sendEmail(mailOptions);

  res.status(200).json({ })
})

server.post('/recovery', (req, res) => {
  const { email } = req.body;

  const user = db.users.find(user => user.email === email);
  if (!user) {
    const status = 500;
    res.status(status).json('Пользователь не найден!');

    return;
  }
  const recoveryKey = createToken({ email, password: '_' }, false);
  user['recovery_key'] = recoveryKey;

  var mailOptions = {
    from: 'bumblebee@gmail.com',
    to: email,
    subject: 'Сброс пароля.',
    text: 'http://localhost:4200/auth/sign_up?key=' + recoveryKey + '&id=user_id'
  };

  sendEmail(mailOptions);

  res.status(200).json({ })
})

server.post('/password_reset', (req, res) => {
  res.status(200).json({})
})

server.post('/confirm_register', (req, res) => {
  res.status(200).json({})
})

server.post('/confirm_password_reset', (req, res) => {
  res.status(200).json({})
})

server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  if (req.method === 'GET') {
    next();
  } else {
    if (req.headers.authorization === undefined ||
      req.headers.authorization.split(' ')[0] !== 'Bearer') {
      const status = 401
      res.status(status).json('Неккоректный заголовок авторизации!')
      return
    }
    try {
       verifyToken(req.headers.authorization.split(' ')[1])
       next()
    } catch (err) {
      const status = 401;
      res.status(status).json('Токен не валиден');
    }
  }
})

server.use(router)
server.listen(3333, () => {
  console.log('Server running...')
})

app.use(cors({ methods: ['POST'] }));
app.use(bodyParser.json());
app.use(jaysonServer.middleware());
app.listen(3332);
