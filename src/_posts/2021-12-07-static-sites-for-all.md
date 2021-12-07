---
layout: post
title:  "Static Site Generators, mark down the solution.."
date:  2021-12-07 09:10:49 +1100
categories: jea
# https://stackedit.io/app#
# https://www.hawkins.io/article/using-the-ruby-logger/
---
<sl-format-date date="{{page.date}}" month="long" day="numeric" year="numeric"></sl-format-date>

So you have and idea, or a brand, maybe yourself.. and you want to make a website ? We that very sentance lead me to be here typing away for you. I had no idea what to do, and this was well before I had written my first line of code. Not to give away my age but there were plenty of actually free services out there in `Web1.0`. Anglefire, Geocities, AOL, would all let you upload your `html` and `css` files via good old `ftp` and away you would go, instant site deloyed as soon as your last file hit the server.

So you might ask "what was wrong with that process ?", well things in Webland got complicated quickly, sites soon needs `Javascript` ( this static site has a Javascript bundler but we'll get to that later), and the general person in the street who needed a website had nowhere to go, there was a gap in the market and well it got filled... initially by [*Wordpress*]().

Arrg.. ick.. *Wordpress* well don't knock it, almost 40% of all hosted sites on the web come from this `php` bohemuf, because Wordpress and products like ( [Wix](), [Square Space](), [Creative Carbon]()) open up the web to non-coders, because `code` can be scarey, trust me. Ok, so we'll all use *Wordpres* then, we'll put the coders out of business and everyone will be happy.. well, No. One of the biggest issues with pre-rolled solutions is that becomes very easy to gain an attack vector as your codes as:

<ol type="a">
  <li>it's self-hosted</li>
  <li>and that code is everywhere</li>
  <li>totally everywhere all over the internets</li>
</ol>

So the chances of you getting *p0wn3d* and waking up to a *h4x0red* site was a fairly regular occurance in my time maintaining them, so there has to be alternatives our there, and well there are.

### the generator that we need

In the first age of web-middle-earth Static Site Generators ( SSG's ), sucked, as someone who tried a few to ween myself of *Wordpress* they were not a great experience. Those same generators a few years down the track are a very different story, easy to setup, and more importantly `deploy`. So let's dig into just SSG's work


  <img class="fit-picture" src="https://res.cloudinary.com/oeelsafe/image/upload/f_auto,q_auto/v1638866891/ssg-flow_kyvddj.png"  alt="Static Site Flow" >


