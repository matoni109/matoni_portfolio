---
layout: post
title: "Rails 7: the little big things"
date: 2022-01-26 09:10:49 +1100
categories: jea
---

<sl-format-date  date="{{page.date}}"  month="long"  day="numeric"  year="numeric"></sl-format-date>

The first ever version of Rails I ran into as a bootcamp newbie was `rails 6.0.3` so I had missed the `webpacker` `rails 5.x` fun times, or lack of them if you talk to older rails developers. Hours spent going down yaml config file wormholes, less than verbose error messages, or ones that just didn't make sense at all. The asset pipeline ***there be dragons 🐉***, it is yet another piece of the `Rails` magic that we take for granted / or just don't really want to go wondering into the woods for, everything is just fine here at the picnic table thanks 🍺 🧺.

## Big Things

#### webpacker benched, import maps subbed in at the start of the 3rd

The big news has [webpacker](https://github.com/rails/webpacker#webpacker-has-been-retired-) being officially retired, having played a central role for 5 + years in transpiling and bundling all things `js`. Technology improvements in http and more importantly [http/2](https://world.hey.com/dhh/rails-7-will-have-three-great-answers-to-javascript-in-2021-8d68191b) allowed for the advent of [esbuild](#) & [import maps](#). Don't take it from me take it from [D.H.H](https://youtu.be/PtxZvFnL2i0?t=119), the following is now `true`:

- Webpacker, Turbolinks, and UJS `out`
- [import maps](https://github.com/rails/importmap-rails), [Turbo](https://turbo.hotwired.dev/), and [Stimulus](https://stimulus.hotwired.dev/) from [Hotwire](https://hotwired.dev/) are `in`
- there is no need for Node.js for `hello world`
- C.D.N's can bring in the required Node modules (yes, just bring [react in from a skypack.dev C.D.N](https://youtu.be/PtxZvFnL2i0?t=1450) )

#### But I like to get my javascript bundling on, old skoolz.. ?

Rails is a large tent, and so are the ways to handle `js` inside different apps, currently [Rails](https://rubyonrails.org/2021/12/15/Rails-7-fulfilling-a-vision) is supporting the following front-end gems:

- [cssbundling-rails](https://github.com/rails/cssbundling-rails): choose your ~~adventure~~ css => tailwind / bootstrap / bulma / postcss / sass
- [jsbundling-rails](https://github.com/rails/jsbundling-rails): bringing ~~sexy~~ asset pipeline back => esbuild / rollup / webpack

You can also move away from these defaults for bundling and use either [Vite Ruby](https://vite-ruby.netlify.app/guide/introduction.html), or I have previously used [Parcel 2](https://parceljs.org/docs/) on a Rails 7 with React mock up, [my example repo here](https://github.com/matoni109/inertia-parcel). This bundles up both of below libraries via the asset pipeline:

- [Tailwind 3+](https://tailwindcss.com/)
- [Polaris from Shopify](https://polaris.shopify.com/)






