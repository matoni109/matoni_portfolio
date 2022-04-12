---
layout: post
title: "concurrency and the ractor"
date: 2022-04-12 09:10:49 +1100
categories: jea
---

<sl-format-date  date="{{page.date}}"  month="long"  day="numeric"  year="numeric"></sl-format-date>

- [How the GVL stole your lunch money](#how-the-gvl-stole-your-lunch-money)
- [concurrency and parallelism](#concurrency-and-parallelism)

### How the GVL stole your lunch money

Ruby's critics have long drawn the arrow at RuBy CaN'T sCale! While things have come along way since `ruby -v 1.9` sometimes it's good to step back and look at just what is running your `irb` session, the tooling, and just what exacting is doing the heavy lifting back there.

So for most of us using `Homebrew Ruby` we live in an environment of **CRuby**, this version of Ruby is saddled from its earliest days with the *Global Virtual Machine Lock* hence forth the **GVL**. Now this is not a time to be pointing fingers at **Ruby** and leaving off the morning tea basketball team, our dear dynamic language friends also have a **GVL** `JavaScript` has one, `CPython` also is on the team.

> The GVL only allows one thread or process to Ruby Virtual machine at a time, this **LOCKS** the system into processing individual threads in a synchronous manner, as such the Ruby Virtual Machine is Single Threaded.

<div style="text-align: center; padding-top: 1rem;">
<img  class="fit-picture"  src="https://res.cloudinary.com/oeelsafe/image/upload/v1649762961/vm_lock_bernie_fztsjf"  alt="feature envy" ><span style="font-size: small">feel the burn</span></div>

Now the word **Lock** in a programing context sounds bad, and yes there are global-lock-less languages, like Java’s JVM but a GVL is what we have, but Ruby's Virtual Machine is **NOT** thread safe, so a Global Lock is require for things to not go pear shaped.

### concurrency and parallelism

To bring it back to somewhere we can visualise well after the last couple of years, going to do the Food Shopping, and more importantly waiting in the que to get them put into bags.
  <div style="text-align: center; padding-top: 1rem; display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center ">
    <div style="display: flex; flex-direction: column;">
      <img  style="max-width: 400px; padding: 1rem; text-align: center;"  src="https://res.cloudinary.com/oeelsafe/image/upload/v1649764951/checkout_counter_ww4q5n.jpg"  alt="middle man" >
      <span style="font-size: small">parallelism at pedimonties</span>
    </div>
    <div style="display: flex; flex-direction: column;">
      <img  style="max-width: 400px;  padding: 1rem; text-align: center; "  src="https://res.cloudinary.com/oeelsafe/image/upload/v1649764967/concurrent_checkout_goc0pd.jpg"  alt="middle man">
      <span style="font-size: small">concurrency at coles</span>
    </div>
</div>
