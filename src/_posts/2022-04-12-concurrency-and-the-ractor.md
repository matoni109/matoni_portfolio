---
layout: post
title: "concurrency, parallelism and the ractor"
date: 2022-04-12 09:10:49 +1100
categories: jea
---

<sl-format-date  date="{{page.date}}"  month="long"  day="numeric"  year="numeric"></sl-format-date>

- [How the GVL stole your lunch money](#how-the-gvl-stole-your-lunch-money)
- [concurrency and parallelism](#concurrency-and-parallelism)
- [ruby 3 brings ractors](#ruby-3-brings-ractors)

### How the GVL stole your lunch money

Ruby's critics have long drawn the arrow at RuBy CaN'T sCale! While things have come along way since `ruby -v 1.9` sometimes it's good to step back and look at just what is running your `irb` session, the tooling, and just what exacting is doing the heavy lifting back there.

So for most of us using `Homebrew Ruby` we live in an environment of **CRuby**, this version of Ruby is saddled from its earliest days with the *Global Virtual Machine Lock* hence forth the **GVL**. Now this is not a time to be pointing fingers at **Ruby** and leaving off the morning tea basketball team, our dear dynamic language friends also have a **GVL** `JavaScript` has one, `CPython` also is on the team.

> The GVL only allows one thread or process to Ruby Virtual machine at a time, this **LOCKS** the system into processing individual threads in a synchronous manner, as such the Ruby Virtual Machine is Single Threaded.

<div style="text-align: center; padding-top: 1rem;">
<img  class="fit-picture"  src="https://res.cloudinary.com/oeelsafe/image/upload/v1649762961/vm_lock_bernie_fztsjf"  alt="feature envy" ><span style="font-size: small">feel the burn</span></div>

Now the word **Lock** in a programing context sounds bad, and yes there are global-lock-less languages, like Java’s JVM but a GVL is what we have, but Ruby's Virtual Machine is **NOT** thread safe, so a Global Lock is require for things to not go pear shaped.

### concurrency and parallelism

To bring it back to somewhere we can visualise well after the last couple of years, going to do the Food Shopping, and more importantly waiting in the que to get them put into bags.

Now everyone getting into **parallelism at pedimonties** is getting a better deal, you pick a counter, and the que is dispersed between the checkout personnel. **concurrency at coles** is leading to some quite unhappy campers.

  <div style="text-align: center; padding-top: 1rem; display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center ">
    <div style="display: flex; flex-direction: column;">
      <img  style="max-width: 400px; padding: 1rem; text-align: center;"  src="https://res.cloudinary.com/oeelsafe/image/upload/v1649764951/checkout_counter_ww4q5n.jpg"  alt="parallelism at pedimonties" >
      <span style="font-size: small">parallelism at pedimonties</span>
    </div>
    <div style="display: flex; flex-direction: column;">
      <img  style="max-width: 400px;  padding: 1rem; text-align: center; "  src="https://res.cloudinary.com/oeelsafe/image/upload/v1649764967/concurrent_checkout_goc0pd.jpg"  alt="concurrency at coles">
      <span style="font-size: small">concurrency at coles</span>
    </div>
</div>

The reason for this ?
- **parallelism** allows for multiple checkout workers to ***work*** through the que of customers independently, none of the workers need to communicate with any others to get the job done.
- **concurrency** leads to all three customers bags being checkout out at once, put through the scanner, and bagged, in doing this there is **overlap** between the times that `each` customer is at the checkout.

 <div style="text-align: center; padding-top: 1rem; display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center ">
    <div style="display: flex; flex-direction: column;">
      <img  style="max-width: 400px; padding: 1rem; text-align: center;"  src="https://res.cloudinary.com/oeelsafe/image/upload/v1649764978/parallel_jvtg9x"  alt="middle man" >
      <span style="font-size: small">parallelism process flow</span>
    </div>
    <div style="display: flex; flex-direction: column;">
      <img  style="max-width: 400px;  padding: 1rem; text-align: center; "  src="https://res.cloudinary.com/oeelsafe/image/upload/v1649764991/concurrency_ec4rsl"  alt="middle man">
      <span style="font-size: small">concurrency process wait times</span>
    </div>
</div>

> In short: **concurrency is interesting, but parallelism is what speeds up systems and allows them to handle increased load.** [@nateberkopec](https://twitter.com/nateberkopec)

### ruby 3 brings [ractors](https://github.com/ruby/ruby/blob/master/doc/ractor.md)

This is where our story takes a slight turn, with Ruby 3 came an actor concurrency model, and well since it is for Ruby it became a [**Ractor**](https://github.com/ruby/ruby/blob/master/doc/ractor.md) object. These Ractor's can have lots of objects put into them, but each Ractor can only touch its **OWN** objects. Ractors can though talk / send messages to other objects ( ie I've finished doing something ).

```
                  Ractor r
                 +-------------------------------------------+
                 | incoming                         outgoing |
                 | port                                 port |
   r.send(obj) ->*->[incoming queue]     Ractor.yield(obj) ->*-> r.take
                 |                |                          |
                 |                v                          |
                 |           Ractor.receive                  |
                 +-------------------------------------------+
```
So you can't reference variables outside of your ractor block, unless they are `constants` otherwise you'll get an *args error.

```ruby
# Ractor.new with a block creates new Ractor
r = Ractor.new do
  # This block will be run in parallel with other ractors
end

# You can name a Ractor with `name:` argument.
r = Ractor.new name: 'test-name' do
end

# and Ractor#name returns its name.
r.name #=> 'test-name'
```
lets give our `Ractor.new` something fun to do.

```ruby
# This example computes if the given numbers is a prime number or not, using 10 parallel workers.

# to make `num.prime?` possible.
require 'prime'

# this ractor will keep listening to the sent messages, and yield them to whomever want to take the value.
pipe = Ractor.new do
  loop do
    Ractor.yield Ractor.receive
  end
end

# Let's check the prime numbers from 1 upto 1000
N = 1000
# we'll use 10 workers to do this work.
RN = 10
# worker ractors initialization.
# each worker ractor takes pipe as its sharable object (Ractor has some synchronization mechanism according to [this doc](https://github.com/ruby/ruby/blob/master/doc/ractor.md#shareable-objects))
# then, each worker Ractor reads the input through the pipe (multiplexing) to utilize 10 workers
workers = (1..RN).map.with_index do |i|
  Ractor.new pipe, i do |pipe, i|
    # Ractor#take is a blocking call, and waits till pipe yields something
    while n = pipe.take
      # Worker, then in turn, computes something (expensive :) and yields to whomever willing to listen to this ractor
      Ractor.yield ["worker ##{i}}", n, n.prime?]
    end
  end
end

# sending 1000 numbers to the pipe, worker ractors are ready to consume by now.
(1..N).each{|i|
  pipe << i
}

# main process (main process itself is a running Ractor) calls
# Ractor#select, which can listen to a list of ractors
# because it's called (1..N) times, it'll hit all of the computed values by the time pp prints them.
pp (1..N).map{
  _r, (wid, n, b) = Ractor.select(*workers)
  [wid, n, b]
}.sort_by{|(wid, n, b)| n}
```
Will give you below, see how different workers pick up the threads and computer the logic..
Magic Ractors..

```ruby
=>
[["worker #3}", 1, false],
 ["worker #2}", 2, true],
 ["worker #1}", 3, true],
 ["worker #4}", 4, false],
 ["worker #5}", 5, true],
 ["worker #6}", 6, false],
 ["worker #7}", 7, true],
 ["worker #9}", 8, false],
 ["worker #10}", 9, false],
 ["worker #8}", 10, false],
 ["worker #1}", 11, true],
 ["worker #2}", 12, false],
 ["worker #3}", 13, true],
 ["worker #4}", 14, false],
 ["worker #5}", 15, false],
 ["worker #6}", 16, false],
 ["worker #1}", 17, true],
 ["worker #7}", 18, false],
 ["worker #9}", 19, true],
 ["worker #10}", 20, false],
 ["worker #8}", 21, false],
 ["worker #1}", 22, false]]
```
***references:***
- [speedshop - GVL ](https://www.speedshop.co/2020/05/11/the-ruby-gvl-and-scaling.html)
- [ruby ractors docs](https://github.com/ruby/ruby/blob/master/doc/ractor.md)
- [ractors & workers pools](https://dev.to/kenzan100/let-s-read-worker-pool-implementation-using-ruby-3-ractor-feature-103g)
- [ruby ractor class docs](https://ruby-doc.org/core-3.0.0/Ractor.html)
