---
layout: post
title: "Couplers I Smell Thee"
date: 2022-04-05 09:10:49 +1100
categories: jea
---

<sl-format-date  date="{{page.date}}"  month="long"  day="numeric"  year="numeric"></sl-format-date>
- [Couples: who cut the 🧀 ?](#couples-who-cut-the--)
- [Feature Envy](#feature-envy)
- [Inappropriate Intimacy](#inappropriate-intimacy)
- [Message Chains](#message-chains)
- [Middle Man](#middle-man)

Think you have a code smell? Well today we are going to go though a list of `smells` that are grouped into the context of **Couplers**. We will go through each of them, and how they each contribute to.
**Worse Smell Ever**

#### Couples: who cut the 🧀 ?
Couplers represent a tight coupling between classes or methods.

> Couplers make our code fragile and cause a cascade of changes.

#### Feature Envy
<div style="text-align: center; padding-top: 1rem">
<img  class="fit-picture"  src="https://res.cloudinary.com/oeelsafe/image/upload/v1649213758/feature-envy-01_x850vo"  alt="feature envy" ><span style="font-size: small">A method accesses the data of another object more than its own data</span></div>

#### Inappropriate Intimacy
<div style="text-align: center; padding-top: 1rem">
<img  class="fit-picture"  src="https://res.cloudinary.com/oeelsafe/image/upload/v1649213758/inappropriate-intimacy-01_i9yocg"  alt="feature envy" ><span style="font-size: small">One class uses the internal fields and methods of another class</span></div>

#### Message Chains
<div style="text-align: center; padding-top: 1rem">
<img  class="fit-picture"  src="https://res.cloudinary.com/oeelsafe/image/upload/v1649213758/message-chains-01_uhrdsg"  alt="feature envy" ><span style="font-size: small">In code you see a series of calls resembling <code>$a->b()->c()->d()</code></span></div>

#### Middle Man
<div style="text-align: center; padding-top: 1rem">
<img  class="fit-picture"  src="https://res.cloudinary.com/oeelsafe/image/upload/v1649213758/middle-man-01_lqhwmu"  alt="feature envy" ><span style="font-size: small">If a class performs only one action, delegating work to another class, why does it exist at all?</span></div>


***references:***
- [refactoring guru](https://refactoring.guru/smells/)
- [manh phan](https://ducmanhphan.github.io/2020-01-10-Refactoring-couplers/)
- [code smells](https://codesmells.org/)
- [sandy metz - SOLID in Ruby](https://www.youtube.com/watch?v=8STtzjyDTTQ)
