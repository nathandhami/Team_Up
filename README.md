# Website Startup

After vagrant up, the web app can be accessed on http://localhost:8080/
It might take time to load, so if you get 502 bad gateway, maybe wait for a few minutes and then try to reload the page.


# Features

* Users can login and register through his credentials or using google, twitter or facebook api
* Users can search nearby parks using Google Maps api and create an event on that location
* Users can set a maximum number of players to join their events
* Other users can join the events from a map and chat with each other
* Users can see each others status in chatroom


# Limitation

In the 'Create Sports Event' tab, the Google Maps locates parks and not locations for sports.
Not all sports can be played in a park. Some parks might only have a soccer field and not a basketball court.
For this to work, we would need Google Maps to provide us the specific locations for sports
OR search up all the locations and input them manually, which is a very long process.
Otherwise, everything else is working as wanted.
