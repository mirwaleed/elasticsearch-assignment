please do these steps in order to run the project successfully

Extract and cd to the project directory and run the following commands

sudo docker build . -t assignment-1
sudo docker-compose up

if you get an error relevant to db then please create a db-named assignment by using the Postgres gui by using these credentials
hostname: 127.0.0.1
port: 5433
username: postgres
password: postgres

Now run this command

sudo docker-compose down && sudo docker-compose up

the server will be up now

Now for data generation in the db please hit this URL in the browser (it will take around 5 10 mins to complete because the rows are 100K)
http://localhost:3000/api/search/add

Now hit this URL in the browser http://localhost:3000/  the webpage will be open 

Now search the text in the box and you will get suggestions

If you face any difficulty in running this project please let me know