# Automated-Classified-Ad-Poster
This project is an automated solution for posting classified ads across multiple websites using Electron and Puppeteer. The app provides a user-friendly UI to fill out ad details and then automates the posting process across different platforms.

**Features**

_User Interface_: Built using Electron, the app provides an easy-to-use form to input ad details like title, description, category, country, city, address, website link, phone number, and keywords.

_Text Formatting_: The description field supports text formatting such as bold and hyperlinking.

_Automated Posting_: The app uses Puppeteer to automate logging in and posting ads on various classified websites.

_Supports Multiple Websites_: The script can post ads on several websites

**Prerequisites**
- Node.js: Ensure you have Node.js installed on your system.
- Electron: The app is built using Electron, so you'll need to install the Electron package.
  
**Install dependencies:** - npm install

**Run the application:** - npm start

**Usage**

_Fill out the form:_

Select a sub-category for your ad.

Enter the title, description, and other required details.

Use the  href attribute to hyperlink selected text in the description field.

**Submit the form:**
Once all the details are filled out, click on the "**Publish**" button.

The app will automatically log in to the specified websites and post your ad.

**Check console logs:**

The console will display logs for each action performed by the script, such as login success, form submission, and any errors encountered.

**Customization**

_Adding New Websites:_ You can add new websites to the script by modifying the websites array in main.js.

_Updating User Data Directory:_ The userDataDir in the Puppeteer launch options points to the Chrome profile used by Puppeteer. Update this path according to your setup.
