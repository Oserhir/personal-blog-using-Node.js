# My Blog Software Requirements

## Goals
Create a blog to be able to share and stories and knowledge with others

## User Stories

* As a viewer I want to see the list of blog post so that I can see the blog and topics for me to choose 
* As a viewer I want to view an individual blog post so that I can read all of it’s content
* As an admin I want to add a new blog post so that I can easily add a content to my blog 
* As an admin I want to delete or edit a blog post 

## User Flow
![image](https://user-images.githubusercontent.com/82850895/190915155-3d954bb4-6e63-41f9-b77c-bfdf61e2f827.png)
![image](https://user-images.githubusercontent.com/82850895/190915179-97ddc0d6-425c-4864-8749-cca3bc5840fd.png)

## Business Requirement
* Pages
    *	Home Page
    *	Individual Blog Post Page
    *	New Post Page

*	Home Page
     *	Display user Profile Image
     *	Display lists of blogs with Title,  Date, Content
     *	Limit the blog text to a certain height

*	Individual Blog Page
     *	Show the Cover Image Title,  Date, Content
     *	Allow the user go back to home page
     *	Allow  the admin to delete or edit a blog post


*	New Blog Page
     *	Allow admin to fill in Title , Content, and select cover Image 
     *	Store the added date
     *	Allow  the admin to delete or edit a blog post

##  Technical Requirement
  *	Front End using JavaScript
  *	Backend using Nodejs
       *	Rest API
  *	Database
       *	MongoDB
  * API Endpoints
    *	Get List of Blog Post
        * api/posts
    * Get Individual Blog Post
        *	api/posts/:post_id
    *	Post Blog Post
        *	api/posts 




<br/>
<br/>


![Home](https://user-images.githubusercontent.com/82850895/190914978-2161f935-fe22-4447-927c-f4fdae788e90.png)

<br/>
<br/>

![NewPost](https://user-images.githubusercontent.com/82850895/190914987-77d30c72-0b82-4ae0-94da-7d79d7a7be32.png)

<br/>
<br/>

![Post](https://user-images.githubusercontent.com/82850895/190914993-7eb5377b-4051-4fce-a601-f619d4e40a65.png)

<br/>
<br/>

![Update](https://user-images.githubusercontent.com/82850895/190914998-2ed32340-65d8-439b-989d-5c24d2d809c9.png)
