![Stackoverflow-Clone](https://socialify.git.ci/Mayank0255/Stackoverflow-Clone/image?font=Source%20Code%20Pro&forks=1&issues=1&language=1&owner=1&pattern=Charlie%20Brown&pulls=1&stargazers=1&theme=Dark)

[![Version](https://img.shields.io/static/v1?label=version&message=2.0.0&color=blue)](https://shields.io/)
[![NPM](https://img.shields.io/static/v1?label=npm&message=6.8.5&color=blue)](https://shields.io/)
[![NODE](https://img.shields.io/static/v1?label=node&message=10.12.8&color=success)](https://shields.io/)
[![MYSQL](https://img.shields.io/static/v1?label=mysql&message=8.0.10&color=blueviolet)](https://shields.io/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://shields.io/)

__[Demo Video](https://www.youtube.com/watch?v=3jDIEf5vNp8)__

As the name suggests, this project is a clone of a famous Q/A website for professional and enthusiast programmers built solely by me using a completely different stack.

__:new: New Update:__ _newly added features are mentioned in issue([#15](https://github.com/Mayank0255/Stack-Overflow-Clone/issues/15))_

## My Tech Stack (MERN)

#### Front-end
* Front-end Framework: `React.js (with Redux)`
* Styling: `SASS` and `BOOTSTRAP`

#### Back-end
* For handling server requests: `Node.js with Express.js Framework`
* As Database: `MySQL`
* API tested using: `POSTMAN`

### Original Tech Stack
* For handling server requests: `C#`
* As Database: `Microsoft SQL Server`
* `.NET` as well

## Contributing
* Go to `Contributing.md`

## Guidelines to setup
1. Create a `.env` file and the format should be as given in `.env.example`.
2. Run these commands then - 
    ```
    npm run installDep (To install all the dependencies)
    
    npm run auditDep (Run this to audit fix all the vulnerabilities)
    ```
3. Run `databaseConfig.sql` file in the mysql client
    ```
    source <file path>/data/databaseConfig.sql
    ```
4. _(Optional)_ Run `seed.sql` file in the mysql client for seed data
    ```
    source <file path>/data/seed.sql
    ```
    _Note: Change the database name in `databaseConfig.sql` & `seed.sql` under `USE` command_
5. Start the servers
    ```
    Option 1 (for running both the servers simultaneously):
    
    npm run dev
    
    Option 2 (for running both the servers individually):
    
    npm run server (for backend server only)
    
    npm run client (for frontend server only)
    ```
_NOTE: Might take sometime to start as there will be 2 servers running._

## API Endpoints

#### Base Url - `http://localhost:5000/api`

#### Users
* `GET /auth`
* `POST /auth`
* `POST /users/:id`
* `GET /users`
* `GET /users/:id`

#### Posts
* `GET /posts`
* `GET /posts/top`
* `GET /posts/tag/:tagname`
* `GET /posts/:id`
* `POST /posts/`
* `DELETE /posts/:id`

#### Answers
* `GET /posts/answers/:id`
* `POST /posts/answers/:id`
* `DELETE /posts/answers/:id`

#### Comments
* `GET /posts/comments/:id`
* `POST /posts/comments/:id`
* `DELETE /posts/comments/:id`

#### Tags
* `GET /tags`
* `GET /tags/:tag_name`

## Future Scope
* Setup `Sequelize` with `MySQL` in the `API`.
* Deploy the database to cloud, API, and client-side.

## DEMO

#### VIDEO - [Watch the video](https://www.youtube.com/watch?v=3jDIEf5vNp8)
 _Video Last Updated on 22nd March, 2020_
  
#### IMAGES
<img src="/demo/images/1.png" width=340px /><img src="/demo/images/2.png" width=340px />
<img src="/demo/images/3.png" width=340px /><img src="/demo/images/4.png" width=340px />
<img src="/demo/images/5.png" width=340px /><img src="/demo/images/6.png" width=340px />
<img src="/demo/images/7.png" width=340px /><img src="/demo/images/8.png" width=340px />
<img src="/demo/images/9.png" width=340px /><img src="/demo/images/10.png" width=340px />
<img src="/demo/images/11.png" width=340px /><img src="/demo/images/12.png" width=340px />
