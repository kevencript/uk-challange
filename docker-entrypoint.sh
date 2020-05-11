#!/bin/bash

cd lib/sequelize
npx sequelize-cli db:migrate
npm run dev