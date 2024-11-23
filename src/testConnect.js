const { createConnection } = require('typeorm');

async function testConnection() {
  try {
    const connection = await createConnection({
      type: 'postgres',
      url: 'postgresql://postgres:IUuqIr5gBj4Er6QF@damnably-appealing-adder.data-1.use1.tembo.io:5432/postgres',
      extra: {
        ssl: {
          rejectUnauthorized: false, // Це дозволяє з'єднання з сервером, навіть якщо SSL сертифікат не перевіряється.
        }
      },
      synchronize: true,
      logging: true,
    });

    console.log('Connection has been established successfully.');
    await connection.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();
