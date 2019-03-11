var faker = require('faker');
faker.locale = "ru";

var SHA256 = require("crypto-js/sha256");

const db = {
  users: [{
    id: "0",
    firstName: '1',
    lastName: '1',
    patronymic: '1',
    email: 'admin@gmail.com',
    login: 'test',
    password: SHA256('12345').toString(),
  }],
  dictionary_tree: [],
  dictionary_system_table: [],
  dictionary_user_table: [],
  classifier_subgroup_substance: [
    {
      id: '0',
      name: 'Разложение в аэробных условиях',
      type: 'indicator',
      parentId: null,
      hasChildren: true
    },
    {
      id: '1',
      name: faker.lorem.word(),
      type: 'subgroup',
      parentId: null,
      parentId: '0',
      hasChildren: false
    },
    {
      id: '2',
      name: faker.lorem.word(),
      type: 'indicator',
      parentId: '0',
      hasChildren: false
    },
    {
      id: '3',
      name: 'Биоразлагаемость',
      type: 'indicator',
      parentId: null,
      hasChildren: false
    },
    {
      id: '4',
      name: 'Биоаккумуляция',
      type: 'subgroup',
      parentId: null,
      hasChildren: false
    }
  ],
  classifier_table_product: [
  ],
  classifier_table_nei: [
  ],
  group_substance: [
  ],
  subgroup_substance: [
  ],
  indicator_substance: [
  ],
  attr_table: [
  ],
  structure_table: [
  ]
};

const attrTypes = ['текст', 'число целое', 'число дробное', 'мультивыбор', 'диапазон', 'список', 'сложный атрибут', 'изображение'];

// Пользователи
for (let i=1; i<=10; i++) {
  const password = faker.internet.password();
  const email = faker.internet.email()
  db.users.push({
    id: String(i),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    patronymic: faker.name.lastName(),
    email: email,
    password: SHA256(password).toString(),
    login: faker.lorem.word()
  });
}

for (let i=1; i<=20; i++) {
  db.dictionary_system_table.push({
    id: String(i),
    name: { value: faker.lorem.word(), lang: 'ru' },
  })
  db.dictionary_user_table.push({
    id: String(i),
    name: { value: faker.lorem.word(), lang: 'ru' },
  })
}

for (let i = 1; i <= 11; i++) {
  db.dictionary_tree.push({
    id: String(i),
    name: { value: faker.lorem.word(), lang: 'ru' },
    isSystem: false,
    parentId: i === 1 ? null : "1",
    hasChildren: i === 1,
  })
}

for (let i = 12; i <= 20; i++) {
  db.dictionary_tree.push({
    id: String(i),
    name: { value: faker.lorem.word(), lang: 'ru' },
    isSystem: true,
    parentId: i === 12 ? null : "12",
    hasChildren: i === 12
  })
}

for (let i = 1; i <= 10; i++) {
  db.classifier_subgroup_substance.push({
    id: String(i),
    name: { value: faker.lorem.word(), lang: 'ru' },
    parentId: null
  })
}

for (let i = 1; i <= 10; i++) {
  db.group_substance.push({
    id: String(i),
    name: { value: faker.lorem.word(), lang: 'ru' },
    parentId: null
  })
}

for (let i = 1; i <= 10; i++) {
  db.subgroup_substance.push({
    id: String(i),
    name: { value: faker.lorem.word(), lang: 'ru' },
    parentId: i === 1 ? null : "1"
  })
}

for (let i = 1; i <= 10; i++) {
  db.indicator_substance.push({
    id: String(i),
    name: { value: faker.lorem.word(), lang: 'ru' },
    parentId: i === 1 ? null : "1"
  })
}

for (let i = 1; i <= 50; i++) {
  db.attr_table.push({
    id: String(i),
    name: { value: faker.lorem.word(), lang: 'ru' },
    type: attrTypes[faker.random.number(0, attrTypes.length)],
    dictionary: faker.lorem.word()
  })
}

for (let i = 1; i <= 50; i++) {
  db.structure_table.push({
    id: String(i),
    name: { value: faker.lorem.word(), lang: 'ru' },
    type: 'раздел'
  })
}

console.log(JSON.stringify(db, null, 2));
