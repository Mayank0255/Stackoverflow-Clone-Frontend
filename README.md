# StackOverflowClone

As the name suggests, this project is a clone of a famous Q/A website for professional and enthusiast programmers built solely by me using a completely different stack.

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

## Guidelines to setup

### Prerequisites
* NPM should be installed: `NPM version > 6.8.5`
* NODE should be installed: `NODE LTS version > 10.12.8`
* MySQL should be installed: `MYSQL version > 8.0.10`

### Steps
1. Create a `.env` file and the format should be as given in `.env.example`.
2. Run these commands then - 
    ```
    npm run installDep (To install all the dependencies)
    
    npm run auditDep (Run this to audit fix all the vulnerabilities)
    ```
3. Run `databaseConfig.sql` file in the mysql client
    ```
    source <file path>/databaseConfig.sql
    ```
4. Start the servers
    ```
    Option 1 (for running both the servers simultaneously):
    
    npm run dev
    
    Option 2 (for running both the servers individually):
    
    npm run server (for backend server only)
    
    npm run client (for frontend server only)
    ```
_NOTE: Might take sometime to start as there will be 2 servers running._


## DEMO

#### VIDEO - [Watch the video](https://drive.google.com/file/d/1cHrg2RAwvrHHQ8LKGj0elstjhsV5DZYl/view?usp=sharing)
![Watch the video](/demo/video/StackOverflow CLONE - Dem0 Video.mp4 "Demo Video")
  
#### IMAGES
<img src="/demo/images/1.png" width=340px /><img src="/demo/images/5.png" width=340px />
<img src="/demo/images/3.png" width=340px /><img src="/demo/images/10.png" width=340px />
<img src="/demo/images/7.png" width=340px /><img src="/demo/images/9.png" width=340px />

