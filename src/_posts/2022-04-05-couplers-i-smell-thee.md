---
layout: post
title: "Couplers I Smell Thee"
date: 2022-04-05 09:10:49 +1100
categories: jea
---

<sl-format-date  date="{{page.date}}"  month="long"  day="numeric"  year="numeric"></sl-format-date>
- [Couplers: who cut the 🧀 ?](#couplers-who-cut-the--)
- [Feature Envy](#feature-envy)
- [Inappropriate Intimacy](#inappropriate-intimacy)
- [Message Chains](#message-chains)
- [Middle Man](#middle-man)
- [Conclusion](#conclusion)

Think you have a code smell? Well today we are going to go though a list of `smells` that are grouped into the context of **Couplers**. We will go through each of them, and how they each contribute to the making of the
**Worse Code Smell Ever**

What makes this particular code smell so destructive to your code base is that the ghosts of your past bad design practices start to lay waste to your code as soon as you start to make any changes. This leads into a reductive feedback loop that leads to developer paralysis when trying to implement any "new" features.

## Couplers: who cut the 🧀 ?
Couplers represent a tight coupling between classes or methods.

> Couplers make our code fragile and cause a cascade of changes.

## Feature Envy
<div style="text-align: center; padding-top: 1rem">
<img  class="fit-picture"  src="https://res.cloudinary.com/oeelsafe/image/upload/v1649213758/feature-envy-01_x850vo"  alt="feature envy" ><span style="font-size: small">A method accesses the data of another object more than its own data</span></div>

First off the block, this code smell can look like below. ```Class A``` and ```Class B``` are just hanging out, only ```Class A``` seems ```super``` fixated by the methods that are inside of ```Class B```. Similar to being on a date, but you're far more interested in the conversation going on at the table next to you, maybe you're sitting at the wrong table.

<div style="text-align: center; padding-top: 1rem">
<img  class="fit-picture"  src="https://res.cloudinary.com/oeelsafe/image/upload/v1649224781/feature-envy_ngrm2v"  alt="feature envy" ><span style="font-size: small">Feature envy means that a method of one class uses too much functionality of another class</span></div>

The solution ?
 - ~~Move Table~~ Move the Methods
 - ~~Extract yourself from the date~~ Extract the Methods
## Inappropriate Intimacy
<div style="text-align: center; padding-top: 1rem">
<img  class="fit-picture"  src="https://res.cloudinary.com/oeelsafe/image/upload/v1649213758/inappropriate-intimacy-01_i9yocg"  alt="Inappropriate Intimacy" ><span style="font-size: small">One class uses the internal fields and methods of another class</span></div>

Now apart from really messing up your blog sites key words for S.E.O, **Inappropriate Intimacy** can lead to `super` tight coupling between Classes and lead to you always having to make multiple changes in each of the `coupled` classes for every change.

This smell is evident when two or more classes become little too intimate and spend too much time accessing each other's private methods and behavior.

<div style="text-align: center; padding-top: 1rem">
<img  class="fit-picture"  src="https://res.cloudinary.com/oeelsafe/image/upload/v1649226388/multiple-links_gzmlvq"  alt="Inappropriate Intimacy" ><span style="font-size: small"></span></div>

> best to keep your hands off your neigbours `private` methods

The solution ?
 - ~~move in with your neighbour~~ Move the Method
 - ~~move to a new neighbourhood~~ Make a new Class that better encapsulates the `private` methods
## Message Chains
<div style="text-align: center; padding-top: 1rem">
<img  class="fit-picture"  src="https://res.cloudinary.com/oeelsafe/image/upload/v1649213758/message-chains-01_uhrdsg"  alt="message chains" ><span style="font-size: small"></span></div>

Similar to being in a crowded bar with friends and your "Pint of Apple Cider" gets turned into a "Bourbon Shot Rider", passing Objects loads of chained messages in a noisy and distracting environment can lead to unwanted ~~beverage~~ code consequences.

Take for example:

```ruby
customer.getAddress.getCountry.toString;
```

<div style="text-align: center; padding-top: 1rem">
<img  class="fit-picture"  src="https://res.cloudinary.com/oeelsafe/image/upload/v1649227538/complex-message-chain_c7qdfc"  alt="message chains" ><span style="font-size: small"></span></div>

Now this has a couple of problems:
1. the messages || methods have to chained together in a certain way
2. if we are replicating this in numerous areas in the app, each of these message calls have to be updated at hte same thing otherwise Kaboom!

The solution ?
 - ~~delegate your order to a waiter~~ Use [Delegate](https://refactoring.guru/hide-delegate) to get closer to the call
 - ~~move to a quieter bar~~ Move or Extact the call into a new method with the login inside

## Middle Man
<div style="text-align: center; padding-top: 1rem">
<img  class="fit-picture"  src="https://res.cloudinary.com/oeelsafe/image/upload/v1649213758/middle-man-01_lqhwmu"  alt="middle man" ><span style="font-size: small">If a class performs only one action, delegating work to another class, why does it exist at all?</span></div>

Somehow in the process of ordering all of your drinks all night, and paying tips to them you relise that all of this `delegation` is getting very expensive. The use of a waiter object has cut you off from the source, so why not just engage the barman directly ? You could also do like below, and allow yourself to get drinks from both the `waiter` or the `barman` directly.

<div style="text-align: center; padding-top: 1rem; display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center ">
<img  style="max-width: 180px; padding: 1.5rem; text-align: center;"  src="https://res.cloudinary.com/oeelsafe/image/upload/v1649230621/Remove_20Middle_20Man_20-_20Before_okmsii"  alt="middle man" ><img  style="max-width: 480px; text-align: center; "  src="https://res.cloudinary.com/oeelsafe/image/upload/v1649230823/Remove_20Middle_20Man_20-_20After_zp0trn"  alt="middle man" ></div>

The solution ?
 - ~~order straight from the bar~~ Remove the Delegator and interface directly with object.
 - ~~just drink at home for a simpler experience~~ Maybe you have refactored too much ? back it up cowboy.

## Conclusion

As you can see from the above examples, `Couplers` can really mess with our coding **chi**. A main take away is that by tightly coupling our couple we make it brittle, fragile not agile, and hard to change or maintain. By allowing your Objects to talk easily, or be injected to or from other Objects you allow your codebase to be scalable and maintainable in parts, with everyone not having to be an expert on the whole codebase just to change a small part of it.

***references:***
- [refactoring guru](https://refactoring.guru/smells/)
- [manh phan](https://ducmanhphan.github.io/2020-01-10-Refactoring-couplers/)
- [code smells](https://codesmells.org/)
- [sandy metz - SOLID in Ruby](https://www.youtube.com/watch?v=8STtzjyDTTQ)
