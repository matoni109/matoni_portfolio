---
layout: post
title: "Ruby's Lazy Enumerator"
date: 2022-03-02 09:10:49 +1100
categories: jea
---

<sl-format-date  date="{{page.date}}"  month="long"  day="numeric"  year="numeric"></sl-format-date>

<div style="text-align: center; padding-top: 1rem">
<img  class="fit-picture"  src="https://res.cloudinary.com/oeelsafe/image/upload/v1646202580/0_godsA27LBP3Kbvtd_gst76x.jpg"  alt="Picture of a sloth in a rain forrest" ><span style="font-size: small">easily lounge around large collections with the lazy enumerator</span></div>

[`Enumerator::Lazy,`](https://ruby-doc.org/core-2.7.0/Enumerable.html#method-i-lazy) came to us with the release of Ruby 2.0 on December 25th, 2019, this allowed for the ability to process `large` or `massive` collections / files without 🧱'ing your console into `ctrl c ` land. This allows for the processing chains of operations on an object without having them all execute simultaneously.

Let's test this out:
pre Ruby 2.0 behaviour:
```ruby

  list = (1..Float::INFINITY).select { |i| i%3 == 0 }.reject(&:even?)
  # wait..
  # 🧱'ed your console you'll ned to Ctrl+c 😿
```

Now `travel_to` post Ruby 2.0 time:

```ruby
  # we add `lazy` into the mix and we get actual
  # lazy Object back.
  lazy_list = (1..Float::INFINITY).lazy.select { |i| i%3 == 0 }.reject(&:even?)
  => #<Enumerator::Lazy: ...>

  lazy_list.first(5)
  => [3, 9, 15, 21, 27]

```
#### well that was interesting.. but wait there's more 🔪

Things are going quite well in `lazy` land, but you need to remember that the lovely `Enumerator` object that you called `#lazy` on is not in Kanas Anymore. If you go and call a `usual` array method on that object you're going to get more 🧱's. You need to call `force` or `to_a` on the object in question.

```ruby
  list = (1..30).lazy.select { |i| i%3 == 0 }.reject(&:even?)

  # pass your list off to #map
  result = list.map { |x| x if x <= 15 }
  result.sample
  # 🧱🧱
  # undefined method `sample' for #<Enumerator::Lazy: #<Enumerator::Lazy: #<Enumerator::Lazy: #<Enumerator::Lazy: 1..30>:select>:reject>:map>

  # what you need to do..
  result.force.sample
  => 9

  result.to_a.length
  => 3
```

But never fear, if above is not what you would like on you cornflakes read on.

#### no need to be over #eager

Using the [`Enumerable#eager`](https://ruby-doc.org/core-2.7.0/Enumerator/Lazy.html#method-i-eager) method, a lazy enumerator can be converted to a normal enumerator object, so it can be passed to any method that takes a normal enumerator as parameter.
Likewise, other array methods can be called on the collection to get desired results.

```ruby
 eager_list = (1..30).lazy.select { |i| i%3 == 0 }.reject(&:even?).eager
 => #<Enumerator: #<Enumerator::Lazy: ... 1..30>:select>:reject>:each>

 result = eager_list.select { |x| x if x <= 15 }
 result.sample
 => 9

 result.length
 => 3
```

Similarly, lazy enumerators can also be passed as arguments to any method that expects a normal enumerator.

```ruby
list = (1..10).lazy.select { |i| i%3 == 0 }.reject(&:even?)
 def display(enum)
   enum.map { |x| p x }
 end

 display(list)
 => #<Enumerator::Lazy: #<Enumerator::Lazy: ... 1..30>:select>:reject>:map>

 eager_list = (1..10).lazy.select { |i| i%3 == 0 }.reject(&:even?).eager
 display(eager_list)
 => 3
 => 9
```

***references:***
- [big binary](https://www.bigbinary.com/blog/ruby-2-7-adds-enumerator-lazy-eager)
- [Ruby Docs lazy](https://ruby-doc.org/core-2.7.0/Enumerator/Lazy.html)
- [honey badger - working with large files in ruby](https://www.honeybadger.io/blog/using-lazy-enumerators-to-work-with-large-files-in-ruby/)
- [lazy #force](https://ruby-doc.org/core-2.7.0/Enumerator/Lazy.html#method-i-force)

