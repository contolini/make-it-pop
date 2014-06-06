# Make It Pop!

A Twitter visualization for the 2012 Brand New Conference afterparty in NYC.

![Make it pop!](http://contolini.net/img/make-it-pop/hero.jpg)

Logos are placed on a canvas element and manipulated by commands received via Twitter. JavaScript pulls and parses Twitter search results, using HTML5 local storage for DB needs.

## Deployment

Clone or download repo files to a server with PHP installed. Open index.php in a modern web browser (Chrome, Firefox, Opera).

## Usage

Tweet `#hashtag command` where `hashtag` is the string passed to the Tweets constructor in main.js and `command` is one of the ten strings below (pizzazz, timeless, etc.).

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

## License

Copyright (c) 2012 Chris Contolini <chris@contolini.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
