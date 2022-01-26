---
layout: post
title: "Rails 7: the little big things"
date: 2022-01-26 09:10:49 +1100
categories: jea
---

<sl-format-date  date="{{page.date}}"  month="long"  day="numeric"  year="numeric"></sl-format-date>

The first ever version of Rails I ran into as a bootcamp newbie was `rails 6.0.3` so I had missed the `webpacker` `rails 5.x` fun times, or lack of them if you talk to older rails developers. Hours spent going down yaml config file wormholes, less than verbose error messages, or ones that just didn't make sense at all. The asset pipeline ***there be dragons 🐉***, it is yet another piece of the `Rails` magic that we take for granted / or just don't really want to go wondering into the woods for, everything is just fine here at the picnic table thanks 🍺 🧺.

## Big Things 🐘

#### webpacker benched, import maps subbed in at the start of the 3rd

The big news has [webpacker](https://github.com/rails/webpacker#webpacker-has-been-retired-) being officially retired, having played a central role for 5 + years in transpiling and bundling all things `js`. Technology improvements in http and more importantly [http/2](https://world.hey.com/dhh/rails-7-will-have-three-great-answers-to-javascript-in-2021-8d68191b) allowed for the advent of [esbuild](https://github.com/evanw/esbuild) & [import maps](https://github.com/rails/importmap-rails). Don't take it from me, take it from [D.H.H](https://youtu.be/PtxZvFnL2i0?t=119), the following is now `true`:

- Webpacker, Turbolinks, and UJS `out`
- [import maps](https://github.com/rails/importmap-rails), [Turbo](https://turbo.hotwired.dev/), and [Stimulus](https://stimulus.hotwired.dev/) from [Hotwire](https://hotwired.dev/) are `in`
- there is no need for Node.js for `hello world`
- C.D.N's can bring in the required Node modules (yes, just bring [react in from a skypack.dev C.D.N](https://youtu.be/PtxZvFnL2i0?t=1450) )

#### But I like to get my javascript bundling on, old skoolz.. ?

Rails is a large tent, and so are the ways to handle `js` inside different apps, currently [Rails](https://rubyonrails.org/2021/12/15/Rails-7-fulfilling-a-vision) is supporting the following front-end gems:

- [cssbundling-rails](https://github.com/rails/cssbundling-rails): choose your own ~~adventure~~ css => tailwind / bootstrap / bulma / postcss / sass
- [jsbundling-rails](https://github.com/rails/jsbundling-rails): bringing ~~sexy~~ asset pipeline back => esbuild / rollup / webpack

You can also move away from these defaults for bundling and use either [Vite Ruby](https://vite-ruby.netlify.app/guide/introduction.html), or I have previously used [Parcel 2](https://parceljs.org/docs/) on a Rails 7 with React mock up, [my example repo here](https://github.com/matoni109/inertia-parcel). This bundles up both of below libraries via the asset pipeline:

- [Tailwind 3+](https://tailwindcss.com/)
- [Polaris from Shopify](https://polaris.shopify.com/)

As you can see from above, the Rails framework gives an amazing base to work up your project from, no matter what tooling you want / need for your front-end requirements.

## Littler Things 🐈

#### Encrypted Database Layer

You do need to be running [Rails credentials](https://edgeguides.rubyonrails.org/security.html#custom-credentials) from Rails 6.x, but once you have that up and running it gets [pretty easy from there](https://edgeguides.rubyonrails.org/active_record_encryption.html#setup) and you can just add below to your `model.rb`:

```ruby
class Article < ApplicationRecord
  encrypts :title
end
```
#### Asynchronous Querying

When you query data, you can now use the `load_async` method to retrieve results in the background. This is particularly useful if you need to load several unrelated queries from a controller action.

```ruby
def PostsController
  def index
    @posts = Post.load_async
    @categories = Category.load_async
  end
end
```
If both queries are fired simultaneously, the total time spent fetching the data will be ~200ms instead of 400ms if they're executed sequentially.

## Tiny Things 🐭

#### Lazy Load Images

That's right [default lazy images](https://github.com/rails/rails/pull/38452) out of the box, just put the flag into the `img_tag`

```erb
 <%= img_tag( @user.avatar, loading="lazy" ) %>
```
#### Redirect Back or To

No fallback now [required](https://github.com/rails/rails/pull/40671):

```ruby
  # redirect_back fallback_location: @post

  redirect_back_or_to @post
```

#### Tag Attributes From Hash

[Transform hash](https://github.com/rails/rails/pull/40657) of attributes into ERB tag attributes.

```erb
  <div <%= tag.attributes({ id: 'percent-loaded', role: 'progressbar', aria: { valuenow: '75' }}) %>>
```

Will give the magic pudding of:

```html
  <div id="percent-loaded" role="progressbar" aria-valuenow="75">
```

#### Invert a where Clause

Useful way to [obtain the inverse](https://github.com/rails/rails/pull/40249) of a `where` call

```ruby
  good_cats = Cat.where(fun_score: 80..100)
# SELECT \"cats\".* FROM \"cats\" WHERE \"cats\".\"fun_score\" BETWEEN 80 AND 100

  bad_cats = good_cats.invert_where
# SELECT \"cats\".* FROM \"cats\" WHERE NOT (\"cats\".\"fun_score\" BETWEEN 80 AND 100)
```

I hope that gives you a high level fly by of what's there to be unpacked from Rails 7.x, there are plenty more hidden `gems` to find, try the articles below for more.

***references:***
-  [solutelabs](https://www.solutelabs.com/blog/ruby-on-rails-7)
-  [rails guide](https://edgeguides.rubyonrails.org/7_0_release_notes.html)
-  [app signal](https://blog.appsignal.com/2021/12/15/whats-new-in-rails7.html)
-  [hint io](https://hint.io/blog/Whats-Cooking-in-Rails-7)
