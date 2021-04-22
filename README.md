# Aquasight off line Coding Challenge 

Create an Application with User Interface (Front - end) and Back-end API. User Interface (FRONT-END) Requirements: 

# Tech Stack: 
1. Use any web framework is your preference (Preferable Angular) 
2. Responsive Web Pages and Components (required) 

# Views: 
1. Login page 
• Login Form fields Username (‘admin@example.com’) and Password (‘password’) • Login Button 
• Show Form Validations on login form (e.g.: Invalid email) 
• Login Animations 
2. After Successful Login,  
i) Simple Form 
(1) Fields are flow, Pressure (both are Numbers) 
(2) Submit Button form save in database (Integration). 
(3) Flow, Pressure values are greater zero. 
(4) Form Couldn’t submit Empty Values 
(5) Display Validation errors 
(6) Loading/submitting Animations. 
ii) After Submit Button(event),  
(1) Display Submit Data In table format, 
(a) Table Columns are Time stamp, Flow, Pressure. 
(b) All Columns are Sortable, Default sort by latest Time stamp. 
(c) Pagination enabled. Default 5 rows a page. 
(d) Collapsible Table shows with Smooth Transition. 
(2) Display Submit Data In line chart/bar chart (any preferable) 
(a) X-axis display Time Stamp, Y-axis show Flow, Pressure. 
(b) New Data Loading Animations. 
(c) Expand Chart on popup dialog. 
(d) Close Button Chart Expand

# Backend (API) Requirements: 
# Tech Stack: 
1. Use any API framework is your preference (e.g.: python/Django/Flask,  Java/Spring/Hibernate, Nodejs/Express/Socket.io)
2. Use Any Data Structure SQL or NoSQL (e.g.: MySQL, mongo, Cassandra, Redis) Database: 
1. Create a Table with Columns  
a. Id (autoincrement), 
b. Time_stamp (date time), 
c. Flow (double), 
d. Pressure (double) 
# API 
1) POST method 
a) Write a Row into Table 
b) Catch Error Handling (200, 400 and 500) 
2) Get Method 
a) Get the single row from table by id 
b) Filter by timestamp 
c) Get All records from Table.
