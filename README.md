# book-club-server

## Dev locally 
- set the node version to v16.x.x
- Run `npm install` to install all the dependencies and dev-dependencies 
- Run `npm run start:dev` to start the application with nodemon

## Testing

### Unit Testing
This project uses Jest as a test runner and every unit test file has .spec.js format and lives within the same folder as the file it is testing.

- Run `npm run test:watch` for the interactive test runner 
- Run `npm run test` to run the tests only once 
- Run `npm run coverage` to see the unit test coverage 

## Deployments
Once code is merged into the main branch it will be deployed to AWS Elastic Beanstalk
