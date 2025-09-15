import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, basename as _basename, join } from 'path';
import { Sequelize, DataTypes } from 'sequelize';

// Получаем __filename и __dirname для ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = _basename(__filename);

// Динамически импортируем конфиг (JSON файл)
const configPath = join(__dirname, '..', 'config', 'db.js');
const configData = await import(configPath);
const config = configData.default;

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    storage: dbConfig.storage,
    logging: console.log
  }
);

const db = {};

// Читаем все файлы моделей
const modelFiles = readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  });

// Динамически импортируем и добавляем модели
for (const file of modelFiles) {
  const modelModule = await import(join(__dirname, file));
  const model = modelModule.default(sequelize, DataTypes);
  // console.log(model.name)
  db[model.name] = model;
}

// Устанавливаем ассоциации
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;