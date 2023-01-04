# General
Should display your message in git contributions table.

# GitHub access
Create a new [FGPAT(Fine-grained personal access token)](https://github.com/settings/personal-access-tokens/new).  
**DON'T SHARE IT WITH ANYONE ELSE except this script.**
* Set it for a whole year to be able to display your full message.
* Set it as public to be seen from other people   (the contributions table updates corresponding to the sent commits to this repo.),  
*if left on **private** - only you will see the message or you will have to tweak the settings in github to show private contributions.*
* Restrict it to single separate repository you won't be using. *(**Repository access/Only select repositories**)*  
* Restrict the permissions to only be able to do commits *(**Repository permissions/Contents -> Access: Read and write**, leave **Metadata** as is.)*.

# Setup
* Sets up git credentials
* Sets message
* Sets data
* Sets start-date
* Calculates end-date
* Sets current-date
* Creates a preview

# Main (*old*)
* Reads 'data.txt' file exactly as is. (*it is possible to write custom msg or draw an image by manually editing this file. **READ BELOW***)
* Manages the api.
* Pushes commits.
* Updates current-date

# Main (*new*)
* No documentation yet.

# Fast (*new*)
* Sends commits until "API request limit reached" error.


# Automation (*old*)
**DO NOT FORGET TO RUN THIS SCRIPT *(main)* ONCE A DAY,**  
**otherwise you will encounter an error: "corrupted message"**
* Use Window's Task Scheduler
* Manually
* Window's Task Scheduler alternatives

# Automation (*new*)
* No documentation yet.

# Custom message / drawing (*old* **,** *not implemented yet*)
**To be able to create your own custom message/drawing you should create a file called 'data-is-custom.txt' and write 'TRUE' inside it.**  
Feel free to modify 'data.txt' file contents.
* This disables the validation if the current date has passed the end date. (*shows warning*)   
* Max column length is 52 (*inclusive 1-52*)  
* Max row length is 7 (*inclusive 1-7*)

# Needs refactoring (*required, hard to navigate*)
**Maybe split code into three separate entry points**
* **setup** - sets up message and credentials
* **main** - sends commit day by day
* **fast** - sends commits for all days until reaching 'API rate limit exceeded'* (*remembers progress*)

**setup** - properly working, may not need refactoring  
**main** and **fast** - working, both need refactoring  
**README.md** - should update the old documentation.
