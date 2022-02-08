---
layout: post
title: "Rails Zeitwerk: auto-load your twerk"
date: 2022-02-08 09:10:49 +1100
categories: jea
---

<sl-format-date  date="{{page.date}}"  month="long"  day="numeric"  year="numeric"></sl-format-date>

The Rails magic pudding, just how do all those `Classes`, `Modules`, and `helpers` come to life ? To be honest when I was at [lewagon](https://www.lewagon.com) bootcamp I was just happy that they were there at all, just a `rails g scaffold Post name:string title:string content:text` and you have the beginnings of your [blog in 15 minutes](https://twitter.com/dhh/status/492706473936314369).

Well the magic pudding relies on to start with:
* the [rails file naming conventions](https://medium.com/@carly_l/ruby-on-rails-naming-convention-cheatsheet-6fa64bf9be19)
* the code auto-loader / eager-loader, that pre `rails 6` was _classic_ and is now [zeitwerk](https://github.com/fxn/zeitwerk) (more on the differences later).

#### how to bake me a `Class` initialized constant ?

[zeitwerk]() starts by playing initalized constants hide and seek. So if we are wanting in instantiate the following `model` classes inside the `rails console`:

```ruby
Namespaced::Authentication
Namespaced::User
```
Inside a `rails app` we would want our folder structure to be below:
```
app/models/namespaced/user.rb
app/models/namespaced/authentication.rb
```

an example of the `authentication.rb` file below:

```ruby
module Namespaced
  class Authentication < ApplicationRecord

    belongs_to :user, foreign_key: 'namespaced_user_id', inverse_of: :authentications

  end
end
```

Your `module` and `Classnames` need to be reflected in the the folder structure in order for the `auto-loader` to play an effective game of *hide & seek* with your `Classnames` and vice versa.

Also when you're in `rails console` and you have made changes to `Classes` or `Classnames` in your editor to `refresh` you can:

```bash
Loading development environment (Rails 6.0.3)
[1] pry(main)> reload!
Reloading...
=> true
```
#### the _classic_ pudding vs. *zeitwerk* hazelnut slice

The _classic_ pudding uses:
1. `autoload_paths` _then_
2. [`const_missing`](https://ruby-doc.org/core-2.6.3/Module.html#method-i-const_missing)

Ruby fires a `const_missing` callback every time it finds an unknown constant reference during code execution. Ruby's `const_missing` callback is overridden by Rails, which normally raises a `NameError`. In its place, it attempts to load the file associated with the constant being searched for.

The `autoload_paths` come into play at this point. Rails searches the `autoload_paths` list looking for the *"SnakeCase"* version of the referenced constant and loads/requires the file if it exists.

#### This is great `until` it's not..

You can dig into that example [here at rails guides](https://guides.rubyonrails.org/v5.2/autoloading_and_reloading_constants.html#when-constants-aren-t-missed)

The *zeitwerk* hazelnut slice gets around this by:
1. `autoload_paths` is still leveraged
2. then the use of the Ruby native method [`Modeule#autoload`](https://ruby-doc.org/core-2.6.3/Module.html#method-i-autoload) for operation constants _hide and seek_

In the case of our `Namespaced` `authentication.rb` and `user.rb` `app/models` from above, Zeitwerk executes the below code in the butlers pantry:

```ruby
autoload :Authentication, Rails.root.join('app/models/namespaced/authentication.rb')
autoload :User, Rails.root.join('app/models/namespaced/user.rb')
```

The end result is `const_missing` from _classic_ is deprecated, & the build in `autoload` is leveraged.

> All this 'magic' is still reliant on the file naming conventions withing the rails framework. Don't do what I do and pluralize your `model` names and then wonder for 5 minutes why nothing is working..

***references:***
-  [medium - marcelo casiraghi](https://medium.com/cedarcode/understanding-zeitwerk-in-rails-6-f168a9f09a1f)
-  [rails guide](https://guides.rubyonrails.org/v5.2/autoloading_and_reloading_constants.html#when-constants-aren-t-missed)
-  [zeitwerk github](https://github.com/fxn/zeitwerk)
-  [rewind](https://rewind.com/blog/zeitwerk-autoloader-rails-app/)
