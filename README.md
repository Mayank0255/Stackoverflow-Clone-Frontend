# StackOverflowClone
> Copyright © 2020 Mayank Aggarwal

As the name suggests, this project is a clone of a famous Q/A website for professional and enthusiast programmers built solely by me on a completely different stack.

## My Tech Stack (MERN)

#### Front-end
* Front-end Framework: `React.js (with Redux)`
* Styling: `SASS` and `BOOTSTRAP`

#### Back-end
* For handling server requests: `Node.js with Express.js Framework`
* As Database: `MySQL`
* API tested using: `POSTMAN`

**NOTE: 3 servers will run concurrently<br/>**
&nbsp;&nbsp;**1.&nbsp;&nbsp;Front-end React.js Server<br/>**
&nbsp;&nbsp;**2.&nbsp;&nbsp;Back-end API Server<br/>**
&nbsp;&nbsp;**3.&nbsp;&nbsp;Mysql database server<br/>**

### Original Tech Stack
* For handling server requests: `C#`
* As Database: `Microsoft SQL Server`
* `.NET` as well

## Guidelines to setup

### Prerequisites
* NPM should be installed - `NPM version > 6.8.5`
* NODE should be installed - `NODE LTS version > 10.12.8`
* MySQL should be installed - `MYSQL version > 8.0.10`

### Steps to run
1. Create a `.env` file and the format should be as given in `.env.example`.
2. Run these commands then - 
    ```
    npm i
    
    cd client (Move to client directory)
    
    npm i
    
    npm audit fix (Run whenever it dhows that there are vulnerabilities)
    ```
3. Run `databaseConfig.sql` file in the mysql client
    ```
    source <file path>/databaseConfig.sql
    ```
4. Start the servers
    ```
    npm run dev (for running both the servers simultaneously)
    
    npm run server (for backend server only)
    
    npm run client (for frontend server only)
    ```

## DEMO

#### VIDEO - [Watch the video](https://drive.google.com/file/d/1cHrg2RAwvrHHQ8LKGj0elstjhsV5DZYl/view?usp=sharing)
  
#### IMAGES
<img src="/images/1.png" width=340px /><img src="/images/2.png" width=340px />
<img src="/images/3.png" width=340px /><img src="/images/4.png" width=340px />
<img src="/images/5.png" width=340px /><img src="/images/6.png" width=340px />
<img src="/images/7.png" width=340px /><img src="/images/8.png" width=340px />
<img src="/images/9.png" width=340px /><img src="/images/10.png" width=340px />
