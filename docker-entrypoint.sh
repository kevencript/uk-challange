#!/bin/bash

cd lib/sequelize
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm run dev