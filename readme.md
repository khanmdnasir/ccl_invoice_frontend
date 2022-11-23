<p align="center"><a href="https://qoruminvoice.asl.aero" target="_blank"><img src="https://avatars.githubusercontent.com/u/25360261?v=4" width="200"></a></p>


# Qorum Invoice Module

Qorum Invoice Module is an invoicing application that can use to manage your all of clients invoice and sent automatically email to the client. 


## Tech Stack

- React
- Node JS 16
- Docker



## Installation

Clone github repository

``` git
https://github.com/devs-asl/ccl_invoice_frontend.git
```
Generate **.env** file form **.env.example**
```bash
  cd ccl_invoice_frontend
  cp .env.example .env
```
 ***Environment Variables***

To run this project, you will need to add the following environment variables value to your .env file

* `REACT_APP_API_URL` 

 ***NB: All of environment value has been assignemd by default from .env.example file. when you want to deploy on live in that case you need to just change [ENVIRONMENT]() value from development to production***


Build docker image and run container
``` docker
    docker-compose ..env-file .env build
    docker-compose ..env-file .env up
```
    
## API Documentation

[Documentation](https://go.postman.co/workspace/gulp-bkk~05de5bfc-8f34-4cd0-a2f4-90e68f6fb262/collection/12750391-832473b0-4270-45f6-be48-13b07774427a?action=share&creator=12750391)


## Contributors

- [MD. Mehedi Hasan](https://www.github.com/shuvo-asl)
- [Ismail Hasan Sarker](https://www.github.com/ismail-asl)
- [Nasir Khan](https://github.com/NasirASL)

