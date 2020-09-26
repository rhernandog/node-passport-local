# Node Passport Auth

### Description
Simple application using a Node/Express server with Passport's local strategy to authenticate users, with a MongoDB database.

### Usage
Clone the repo or download the ZIP file with all the content and unzip it in your local folder.

Create your MongoDB instance either in your local environment, Mongo Atlas or your preferred provider. Then go to the `db/index.js` file and replace the mongo URI with the one you have for your instance.
Then create a `.env` file in your project root folder and add the password for the authorized user for the MongoDB instance. the `.env` file should look like this:
```
MONGO_PASSWORD=your_pass_here
```

Then open your terminal in the folder and run:
```bash
$ npm install
```

To open the application run in development mode:
```bash
$ npm run dev
```

### Issues
To report a problem just create an issue [here]().

### License
MIT

### Author
- Rodrigo Hernando
- Twitter: [@websnapcl](https://twitter.com/websnapcl/)
