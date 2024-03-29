import { Sequelize } from 'sequelize';

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.SCHEMATOGO_URL
});


// const dbURI = process.env.dbURI || 'postgresql:///ratings';

async function connectToDB(dbURI) {
  console.log(`Connecting to DB: ${dbURI}`);

  const sequelize = new Sequelize(dbURI, {
    logging: console.log, // set logging: false to disable outputting SQL queries to console
    define: {
      underscored: true,
      timestamps: false,
    },
  });

  try {
    await sequelize.authenticate();
    console.log('Connected to DB successfully!');
  } catch (error) {
    console.error('Unable to connect to DB:', error);
  }

  return sequelize;
}

export const db = await connectToDB('postgres://diego:password1234@movies.cryq2ogyuscu.us-west-1.rds.amazonaws.com:5432/movies');
