# Pybot Express API


This is the PyBot Server API.

It uses Express to create a server on the 8080 port.

## Setup

Call "npm install"
to install on node modules required

## Run

Call "npm start" to run the server which will set up, by default, on localhost:8080.

It exposes the following endpoints:

======================================================================

Before any endpoints can be accessed, a succesful server login must be performed, this can accessed via the login endpoint.
By default, credentails are "admin" "admin". This will return a JWT token, This token must be retained and passed along with all future requests to verify them

http:/[YOUR ADDRESS]:[YOUR PORT]/activated/login - POST
Logins in to the server and returns a valid JWT token for future requests
  - username
  - password

======================================================================

The following endpoints all require a valid JWT to be passed in
'x-access-token' in the requests header

http:/[YOUR ADDRESS]:[YOUR PORT]/activated/Init - POST
Sets up the activated variable so the system can be turned on and off remotely

http:/[YOUR ADDRESS]:[YOUR PORT]/intheroom/Init - POST
Sets up the the Person data so the room data can be used

http:/[YOUR ADDRESS]:[YOUR PORT]/intheroom/Create - POST
Creates a new person for the system to track

http:/[YOUR ADDRESS]:[YOUR PORT]/intheroom/View - GET 
Returns all the data of the people the room is tracking

http:/[YOUR ADDRESS]:[YOUR PORT]/intheroom/Update - PUT
Update the data on a given person

http:/[YOUR ADDRESS]:[YOUR PORT]/intheroom/Delete - DELETE
Delete the data of a given person

http:/[YOUR ADDRESS]:[YOUR PORT]/intheroom/Present - GET
Returns all the people currently present in the room

http:/[YOUR ADDRESS]:[YOUR PORT]/intheroom/IsPresent - PUT
Marks a given user a present in the room

http:/[YOUR ADDRESS]:[YOUR PORT]/intheroom/HasLeft - PUT
Marks a given user as having left the room

http:/[YOUR ADDRESS]:[YOUR PORT]/intheroom/Activate - PUT
Activate the server so that new users will be recorded

http:/[YOUR ADDRESS]:[YOUR PORT]/intheroom/Deactivate - PUT
Deactivate the server so that new users will not be recorded

http:/[YOUR ADDRESS]:[YOUR PORT]/intheroom/isActivated - GET
Returns whether the server is currently activated to be receiving updates

http:/[YOUR ADDRESS]:[YOUR PORT]/intheroom/setFrame - PUT
Update the Frame currently beiing displayed on the web portal

http:/[YOUR ADDRESS]:[YOUR PORT]/intheroom/getFrame - GET
Returns the BASE64 encoded image of the current frame






