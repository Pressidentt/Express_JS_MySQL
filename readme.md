# Expressjs + Sequelize + Mysql
# Test task

## Important Notes
1. No validation, schemas, dtos. No Typescript.
2. No best-practises, not the securest way, no personal auth for file system, not the proper way dealing with tokens (i.e better not to use db for that, Redis could be used for blacklisting tokens)
3. Etc and etc... Reasons for all of that is, it is just **test raw example**.

## To run
1. Add env file and set DB, USER, PASSWORD, HOST, SECRET, REFRESH_SECRET and add uploads folder.
2. npm i
3. node index.js