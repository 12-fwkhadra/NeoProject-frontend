This is the frontend source code of the NEO Technology Challenge

1. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.11.

2. In the terminal, run `ng serve` to open the project using the link provided in the terminal to be redirected to the login page `http://localhost:4200/login`

3. In the log-in box, insert the following admin credentials to access the portal: 
    username: john@example.com
    password: 123
   
   ![image](https://github.com/user-attachments/assets/edbd873e-a2db-41d0-a3c0-50dd0127c2dd)

  A successful login, will add a JWT token in the application's local storage and redirect to the dashboard page. All portal features are accessible and authorized to users of admin role. (JWT bearer token is used for achieving authorized secured access)

4. The application includes only DASHBOARD page that displays the clients. The admin can:
   - export all clients' data in an excel workbook
   - filter clients' table by name, email or id with a refresh button to remove filters
   - filter country column to fetch clients of a specific country
   - the clients' table shows each client's data, total number of transactions, total sum of buys and total sum of sells
   - view transactions of each client
   - add a transaction for a specific client. The admin can't add unless the following fields are inserted: type, date, amount (only numbers allowed), currency.
   - delete a transaction for a specific client
   - logout from the portal which makes the token blacklisted
    * all tables are paginated

   ![image](https://github.com/user-attachments/assets/f4047f8d-67b6-4dd9-929a-481cefcf8a9f)


This is a demo video of the application: https://www.loom.com/share/20ebcda89d4e4e12a04275c243e1bf34?sid=e4486d7f-a9fd-4c68-a886-4773b3cbadea 







