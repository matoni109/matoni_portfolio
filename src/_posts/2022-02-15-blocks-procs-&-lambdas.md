---
layout: post
title: "Ruby: Blocks, Procs & Lambdas"
date: 2022-02-15 09:10:49 +1100
categories: jea
---

<sl-format-date  date="{{page.date}}"  month="long"  day="numeric"  year="numeric"></sl-format-date>

<div style="text-align: center; padding-top: 1rem">
<img  class="fit-picture"  src="https://res.cloudinary.com/oeelsafe/image/upload/v1644901160/zombie2_f8pemu.gif"  alt="Minecraft Zombie Running" ><span style="font-size: small">don't feel you need to run away from blocks</span></div>

When you start out in `ruby`, your experience might be similar to mine, everything was going swimmingly `strings`, `integers` and `booleans` were all ✅. Until I ran into the forest of **blocks** and **iterators**, `do` and `end` things that well let's face it, make up the majority of what the Ruby language is, and allows for the passing around of objects. Event 12 months on into my software engineering journey I struggle with the concepts of `yield` and blocky kinda of things..

So just like your first night on a Minecraft Hard-Core server you can either:
1. Dig a hole, jump in, wait & hope the monsters are gone in the morning
2. Be pro-active and chop down a tree, make a 🪓 and go hunting 🧟

## what's in a block for you ? 📦

`blocks` are handy bits of code that can be written and executed later, they require the `do` and `end` syntax like below.

```ruby
  [1,2,3].each do |n|
    puts "printing number #{n}"
  end
  # printing number 1
  # printing number 2
  # printing number 3
```

Now let's look into the [***Array#each***](https://ruby-doc.org/core-2.7.0/Array.html#method-i-each) under the hood to see just what is happening with the `block` that is getting passed to the method.

```ruby
def each
  i = 0
  while i < size
    yield at(i)
    i += 1
  end
end
```

Whooaa.. there is plenty going on inside `.each`:
1. we have a `while` loop stepping through the indexed objects in the Array ( in this case the numbers 1, 2, & 3 )
2. this is the part we are most interested in ***`yield`*** keyword

#### yield to me

So as the `.each` method steps through the Array it has to `yield` to the `block` at ***each*** number, and perform the action / code inside the `block` that proceed it. In the case of the above code samples it results of the printing of the numbers inside the array to the console.

```ruby
  # printing number 1
  # printing number 2
  # printing number 3
```

#### you can ignore your block

Just because you place a `block` after a method, doesn't mean that the method will do anything with it, ( well not always but we'll get to explicitly later). You can also explore [`block_given?`](#bits-that-didnt-fit).

```ruby
  (1..10).to_a.reverse do
   puts "print my block 10 times"
  end
  # reverse says no!
  #=> [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

#### your method might block you from ignoring your block

Using the `&block` syntax will force you to pass a block to the method otherwise 🧨 will happen ( well an `ArgumentError`).

```ruby
  def explicit_block(&block)
    block.call # same as yield
  end

  # no block
  explicit_block("don't block me")
  # 🧨 wrong number of arguments (given 1, expected 0)

  # with block
  explicit_block { puts "don't block me" }
  #=> "don't block me"
```
## Lambdas 🐑
I first ran into `lambda` syntax in scopes inside Rails models

```ruby
  # scopes
  scope :recipes, -> { where(favoritable_type: 'Recipe') }
```

Just like methods, `lambdas` won't run unless you make them, and you need to use the `.call` method for that. You can also store them in variables like below.

```ruby
  cats_on_a_mat = -> { puts "Many cats on a mat.." }
  cats_on_a_mat.call

  #=>  "Many cats on a mat.."
```
`lambdas` will also get upset if you pass them different number of arguments to what they are expecting.

```ruby
  upcase_my_2_cats = ->(cat_1, cat_2) { puts "#{cat_1.upcase} & #{cat_2.upcase}" }
  upcase_my_2_cats.call("flossie","sydney")
  #=>  "FLOSSIE & SYDNEY"

  upcase_my_2_cats.call("fido")
  # 🧨 wrong number of arguments (given 1, expected 0)
```
## Procs 📜
  Procs are the closest thing Ruby has to `first-class` functions, let's try and understand this, because I sure am trying to..

  - `procs` are not so sensitive about `args`

  ```ruby
  upcase_my_2_cats = Proc.new { | cat_1, cat_2 | puts "will this print in a Proc ?" }

  upcase_my_2_cats.call()
  #=> "will this print in a Proc ?"
```
  - `procs` `return` from the current context, a `lambda` will `return` from its `self` like a "normal method".. let's try and dig into that.

```ruby
  my_lambda = -> { return 1 }
  puts "Lambda result: #{my_lambda.call}"
  #=> Lambda result: 1

  my_proc = Proc.new { return 1 }
  puts "Proc result: #{my_proc.call}"
  #🧨 => unexpected return (LocalJumpError)
```

> The `proc` fails. The reason is that you can’t return from the top-level context. It can not `return` from its `.self`

What it can do..

```ruby
def call_proc
  puts "Before proc"
  my_proc = Proc.new { return "cat" }
  my_proc.call
  puts "After proc"
end

p call_proc
# => Before proc
# => cat

# Prints "Before proc" but not "After proc"
```
So what's happening here ? The `proc` is causing the method to `return` and no other lines are executed. You could look at above and start to get the feeling that `procs` have a little bit of different behaviour than `methods` and `lambdas`.

Let's unpack this with a light dig into the topic of `closure`

```ruby
def call_proc(my_proc)
  count = 500
  my_proc.call
end

# the context
count   = 1
my_proc = Proc.new { puts count }

# method call
p call_proc(my_proc)

# What does this print?
# 500 || 1 ?
```

In the end, it would seem the most logical conclusion is to print `500`, but due to the "closure" effect, it will print `1`.

 This happens because the `proc` uses the value of `count` from the location / context of where it was defined, which is outside the method definition.
### yes, that's a lot to take in..

Well, hopefully now your ready to jump in and face your `block` fears head on & have learned a bits about `procs` and `lambdas`.

<div style="text-align: center; padding-top: 1rem">
<img  class="fit-picture"  src="https://res.cloudinary.com/oeelsafe/image/upload/v1644901160/creaper1_zgbl4p.gif"  alt="Minecraft creeper vs diamond sword" ><span style="font-size: small">time to chase those block creatures down</span></div>

***references:***
- [app signal](https://blog.appsignal.com/2018/09/04/ruby-magic-closures-in-ruby-blocks-procs-and-lambdas.html)
- [app signal #2](https://blog.appsignal.com/2018/05/29/ruby-magic-enumerable-and-enumerator.html)
- [code quizzes](https://codequizzes.wordpress.com/2014/05/19/ruby-methods-arent-first-class-but-procs-are-first-class/) - intersting article on ruby closure
- [ruby guides](https://www.rubyguides.com/2016/02/ruby-procs-and-lambdas/)

#### bits that didn't fit

```ruby
def do_something_with_block
  return "No block given" unless block_given?
  yield
end

# This prevents the error if someone calls your method without a block.
```
<br>
