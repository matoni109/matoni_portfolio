---
layout: post
title:  "Static Site Generators, a flyby ( Part 1) "
date:  2021-12-07 09:10:49 +1100
categories: jea
# https://stackedit.io/app#
# https://www.hawkins.io/article/using-the-ruby-logger/
---
<sl-format-date  date="{{page.date}}"  month="long"  day="numeric"  year="numeric"></sl-format-date>
So you have and idea, or a brand, maybe yourself.. and you want to make a website ? We that very sentence lead me to be here typing away for you. I had no idea what to do, and this was well before I had written my first line of code. Not to give away my age but there were plenty of actually free services out there in `Web1.0`. Anglefire, Geocities, AOL, would all let you upload your `html` and `css` files via good old `ftp` and away you would go, instant site deployed as soon as your last file hit the server.

So you might ask "what was wrong with that process ?", well things in Web-land got complicated quickly, sites soon needs `Javascript` ( this static site has a Javascript bundler but we'll get to that later), and the general person in the street who needed a website had nowhere to go, there was a gap in the market and well it got filled... initially by [*Wordpress*](https://wordpress.com/).

Arrg.. ick.. *Wordpress* well don't knock it, almost 40% of all hosted sites on the web come from this `php` behemoth, because Wordpress and products like ( [Wix](https://www.wix.com/) & [Square Space](https://www.squarespace.com/) ) open up the web to non-coders, because `code` can be scary, trust me. Ok, so we'll all use *Wordpress* then, we'll put the coders out of business and everyone will be happy.. well, No. One of the biggest issues with pre-rolled solutions is that becomes very easy to gain an attack vector as your codes as:

<ol  type="a">
  <li>it's self-hosted</li>
  <li>and that code is everywhere</li>
  <li>totally everywhere all over the internets</li>
</ol>

So the chances of you getting *p0wn3d* and waking up to a *h4x0red* site was a fairly regular occurrence in my time maintaining them, so there has to be alternatives our there, and well there are.

### the generator that we need

In the first age of web-middle-earth Static Site Generators ( SSG's ), sucked, as someone who tried a few to ween myself of *Wordpress* they were not a great experience. Those same generators a few years down the track are a very different story, easy to setup, and more importantly `deploy`. So let's dig into just how SSG's work.


> At the core of all SSG's is the content, and the templates that deploy them into a complete bundled website that is ready to serve from a folder via a host. All done via a script call, like a magic pudding.

<img  class="fit-picture"  src="https://res.cloudinary.com/oeelsafe/image/upload/v1638866891/ssg-flow_kyvddj.png"  alt="Static Site Flow Diagram" >

So the major difference if we pick on our old friend *Wordpress* below happens:

1. a request comes in and hits the server
2. server combines templates and content
3. apply loops and logic / hits database
4. returns a page view


And if you have ever had a *Wordpress* site that gets popular the server will get absolutely hammered, and you'll end up paying your host major dollars to keep it all ticking along.

<img  class="fit-picture"  src="https://res.cloudinary.com/oeelsafe/image/upload/f_auto,q_auto/v1638923387/static-site-generator-vs-dynamic-content-management_mftpkt.png"  alt="Static Site Flow Diagram Build and Request" >

### Static Site Generator's to the rescue

SSG's 'serve' up websites in a way that give a far more performant result than the traditional web stack, let's run through these below:

1. bundled site is already on hosting ( this is pre-compiled )
2. server gets a page request
3. returns a page view


> SSG's architecture allows hardware to serve up large amounts of request without complex logic / or the data layer being hit at all, you can scale with a fraction of the horse-power you would have traditionally needed.

<img  class="fit-picture"  src="https://res.cloudinary.com/oeelsafe/image/upload/f_auto,q_auto/v1638866891/ssg-host-flow_sqezw0.png"  alt="Static Site Flow Diagram Build and Request" >

### Templates

Older / traditional blog serving SSG's have utilised [markdown](https://www.markdownguide.org/getting-started/) as their main templating language, though the ones I have used recently utilise `html`, shopify's [`liquid`](https://shopify.github.io/liquid/), combined with [markdown](https://www.markdownguide.org/getting-started/). The `html` and [`liquid`](https://shopify.github.io/liquid/) template pages being used as `partials` to `render` the main sections of the page, ( navbar, head, footer, etc).

So in this way you build the skeleton of the site in the same way that you would build your traditional dynamic site, and as far as the `developer` experience goes it feels very much similar to how you would normally develop. The secret sauce is in the build time script that bundles your site into the `output` folder.

### but will it do headless.. serverless..

There was a war.. and `javascript` won, we just don't talk about it. SSG's tap directly into [`Jamstack`](https://jamstack.org/what-is-jamstack/) movement ( their words not mine) and their dream of no servers anywhere, just a pure cloud of [CDN's](https://www.cloudflare.com/en-gb/) servicing everything on earth, which is great until you mess up your DNS settings one morning and you take half the web down with you, and lock yourself out. Give me a good old monolith any day, but I digress.

With the leading towards head-less content management systems ([CMS's](https://prismic.io/)) SSG's are a perfect fit for developers looking to deploy changing content from marketing teams, the marketing content makers can push out content without having to hit up the dev team for every change going onto the site. I've been playing around with this myself and it looks like an interesting rabbit hole to dive down. You can see where this may lead, large scale applications fanning out to multiple API's to populate what is essentially a website skeleton, all done by CDN's, all server-less. While not the Rails monolith way, this is happening out there in NodeJs land.

### Part Two

In part II I want to go into what I've been using SSG wise, and how you can set one up, and deploy quickly. Also looking into drawing the content from a headless CMS into a SSG.

If you can't wait till then, this site uses <a  href="https://edge.bridgetownrb.com/docs/">Bridgetown</a> which is a `ruby` based SSG

***references:***

-  [netlify knowledge base](https://www.netlify.com/blog/2020/04/14/what-is-a-static-site-generator-and-3-ways-to-find-the-best-one/)
-  [netlify ssg templates](https://templates.netlify.com/?utm_source=blog&utm_medium=about-ssgs-pnh&utm_campaign=devex)
-  [jamstack - wtf](https://jamstack.org/what-is-jamstack/)
-  [bridgetown ruby](https://edge.bridgetownrb.com/)


