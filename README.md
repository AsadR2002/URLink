# URLink

## About the project
URLink is a multi-purpose, one-click extension tool that keeps track of websites you want to store temporarily, such as when you are researching for a project, applying to many jobs at once, or online shopping. Users can add as many sites as they want to the extension, and are able to access them regardless of how many (or how few) tabs they have open. When a user clicks on one of the sites they added to the extension, their current tab will automatically redirect to the URL associated with that site. In this way, URLink allows the user to reduce the amount of time spent switching between tasks, so they can spend more time on what really matters.

## Inspiration
As we've begun our university education throughout the past year, we've realized how chaotic, stressful, and tedious online work can be. We wanted to create a multi-purpose resource that would reduce clutter within our workspace, promoting simplicity, efficiency, and ease of access. 

## What it does
Once a user pins URLink to their browser, they are free to start browsing the web. Once they find a site they think might be useful, they can click on the extension, type in a nickname for the site, and click 'Add'. This adds the site to a list of sites stored inside the extension - it will remain there even if the user navigates to a different site, changes tabs, or reopens the browser. The user is free to click on the "Go" button beside that site name, which will automatically redirect the current tab to its URL. In this way, the user can easily access multiple sites of interest without the clutter of having several tabs open at once. Finally, if the user wants to remove any sites from their list, they can easily delete it by clicking the "X" button.

## How we built it
We got started with a Chrome extension template, and figured out how to install and view it in our browsers. After learning about the react-bootstrap library, we realized such components would make creating the user interface much easier. Additionally, by using these components we would have more flexibility to code the backend logic behind the frontend.

To retrieve the URL of the current tab the user was on, we initially tried to use window.location.href. However, this resulted in sending back the URL for the chrome extension itself. Therefore after researching into this area further, we learned that we could use the chrome.tabs API to fetch all of the data of their current tab. Furthermore, after adjustments to the chrome.tabs.query function and how it was implemented into the SourceList React component, we were able to store the URL of the user’s current tab and make the list component clickable onto a new tab.

Finally, we were able to brush up on our HTML and CSS skills to add UI-styling to each component to match the theme of our chrome extension.

## Challenges we ran into
One of our biggest challenges was simply getting started on the implementation of our project. We were able to think of an idea for our project quite easily, but the real challenge was figuring out whether it was feasible and could be built within the 36-hour timeframe. For this reason, much of our Friday night was spent watching videos and tutorials in order to improve our understanding of various frameworks and tools we could use.

## Accomplishments that we're proud of
We're proud that we were able to create a finished product during midterm season :) we also really like the useful idea and minimalist design - we'll definitely be using this next time we have to do a bigger research project for school.

## What we learned
We learned more about how Chrome extensions work, as well as how the various JavaScript, HTML, CSS, and React-Bootstrap files interact in order to merge the front-end and back-end. We also used VSCode live sharing for the first time!

## What's next for URLink
One feature we would like to implement in the future is the ability for the user to add categories and add sites to separate categories. For example, if someone was shopping on multiple sites online, they could make categories for various price ranges, or categories for names if they are buying gifts for more than one person. That would allow our extension to promote organization even further. 



