# CPSC473 Blackmail Website
Website is designed for the users to play funny blackmail games with other registered users by uploading incriminating photos of them and raising a list of demands.


IMPORTANT: don't use browser-sync, just put this address: http://localhost:2403/
For now, tested on Google Chrome. 

Adding in the database , should only need to do this initially

1. move the '473' outside the current directory
```
mv 473Blackmail/ ../
```

2. create your own dpd
```
dpd create 473Blackmail
```

3. Copy in the files from the '473' folder you moved out to your newly created dpd '473' folder (this should include the .gitignore file)
```
cp -r ../473Blackmail/ 473Blackmail/
```

4. Delete the '473' folder you moved out
```
rm -r ../473Blackmail/
```

5. Add in dpd-fileupload
```
cd 473Blackmail
npm install dpd-fileupload --save
```
6. To run the project on localhost:2403
```
dpd -d
```

7. To open deployd to manage data visit localhost:2403/dashboard/



Potential Features & Requirements:
1. Make it public to everyone in the site by the Uploader (Blackmailer)
2. User Registration / Login
3. Default page is home.
4. Default page loads with tabs for basic steps to start with application, public blackmails, contact us and Login functionality.
5. List for all blackmails on home page without any user logged in
6. Image view to show up the image uploaded to blackmail
7. Developers information in contact us tab
8. Post login:
      * User’s name visible at top right corner with logout.
      * A section having tabs for default options with “Upload a blackmail” and “Blackmails against me”.
      * User name is a link navigates to page having information about all blackmails user has posted.
9. Home page displays steps to start only
10. Blackmails against me:
      * Image view section
      * Uploader’s Information & List of demands on right side of image
      * Label as ‘Blackmails towards me’
      * All blackmails to registered user are visible at the bottom
      * Show button to display in image section with respective uploader information and demands
      * Short size image visible for each blackmail
11. Upload a blackmail:
      * Drop down list to select any of the registered users
      * File Upload section to upload image to blackmail other user
      * Default one section for first demand
      * Add sign to add more demands
12. Public Blackmails
      * Blackmail cases visible which made public from the uploader
      * Image view section for blackmail picture
      * A section on the right of image to display uploader’s information & demands
      * List of all the blackmails with image thumbnails
      * Show button to display image in above section with respective blackmail details
13. User Name on top right corner of page (Hyperlink)
      * Blackmails posted by logged in user to others
      * Image view section
      * Uploader’s information & demands on the right side of image
      * Three buttons above each thumbnail image to ‘Show’, ‘Make it Public’ or ‘Delete’
      * If ‘Make it Public’ is hit by uploader
      * A message should appear right to Show button as ‘this is made public’
      * Delete button is disappeared
