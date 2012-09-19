# Make It Pop!

A Twitter visualization for the 2012 Brand New Conference afterparty in NYC.

Logos are placed on a canvas element and manipulated by commands received via Twitter. JavaScript pulls and parses Twitter search results, using HTML5 local storage for DB needs.

## Deployment

Clone or download repo files to a server with PHP installed. Open index.php in a modern web browser (Chrome, Firefox, Opera).

## Usage

Tweet `#_hashtag_ _command_` where _hashtag_ is the string passed to the Tweets constructor in main.js and _command_ is one of the ten strings below (pizzazz, timeless, etc.).

The app will query Twitter every five seconds looking for public tweets with the aforementioned hashtag. If the hashtag is found followed by one of the below commands, an appropriate effect is applied to the logo on the canvas.

## Commands and their effects

### pizzazz/pizzaz
* sparkle
* flames
* sunbeam
* cat-star
* icp
      
### timeless
* frame
* loading
* mustache
* roses
      
### jazz it up
* neon
* rainbow-smoke
* unicorn
* unicorn2
* hearts
* star
* bow
      
### futuristic
* galaxy
* alien
* sharpen
      
### friendly
* blur
* cat
* cat2
* balloons
* grandparents
      
### eco
* grass
* paper
* recycle
* dolphins
      
### hip
* white-on-rainbow
* tile-logo
* shapes
* noise
      
### slick
* rotate45
* glare
* gold
* bling
    
### artsy
* splatter
* splatter2
* distressed
* eagle
      
### in your face
* burst
* eagle
* illusion
* shadow