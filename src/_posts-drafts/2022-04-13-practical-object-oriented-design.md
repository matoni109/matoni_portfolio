---
layout: post
title:  "Practical Object Oriented Design: Chapter 4 - Creating Flexible Interfaces"
date:  2022-04-13 09:10:49 +1100
categories: book-club
# https://stackedit.io/app#
# https://www.hawkins.io/article/using-the-ruby-logger/
---
<sl-format-date  date="{{page.date}}"  month="long"  day="numeric"  year="numeric"></sl-format-date>

- [4.1 Understanding Interfaces](#41-understanding-interfaces)
- [4.2 Defining Interfaces](#42-defining-interfaces)
  - [4.2.1 Public Interfaces](#421-public-interfaces)
  - [4.2.2 Private Interfaces](#422-private-interfaces)
  - [4.2.3 Responsibilities, Dependencies, and Interfaces](#423-responsibilities-dependencies-and-interfaces)
- [4.3 Finding the Public Interface](#43-finding-the-public-interface)
  - [4.3.4 Asking for “What” Instead of Telling “How”](#434-asking-for-what-instead-of-telling-how)
  - [4.3.5 Seeking Context Independence](#435-seeking-context-independence)
  - [4.3.7 Using Messages to Discover Objects](#437-using-messages-to-discover-objects)
- [4.4 Writing Code That Puts Its Best (Inter)Face Forward](#44-writing-code-that-puts-its-best-interface-forward)
  - [4.4.1 Create Explicit Interfaces](#441-create-explicit-interfaces)
  - [4.4.2 Honor the Public Interfaces of Others](#442-honor-the-public-interfaces-of-others)
- [4.5 The Law of Demeter](#45-the-law-of-demeter)
  - [4.5.1 Defining Demeter](#451-defining-demeter)
  - [4.5.2 Consequences of Violations](#452-consequences-of-violations)
  - [4.5.3 Avoiding Violations](#453-avoiding-violations)
  - [4.5.4 Listening to Demeter](#454-listening-to-demeter)
- [4.6 Summary](#46-summary)

## 4.1 Understanding Interfaces
  - First Application
    - Crazy methods confetti everywhere
  - Second Application
    - Sensible Sally

We can surmise that the author is a proponent of a more sensible, constrained, structured and modular / plug and play approach to interface architecture or ***public interface***.

## 4.2 Defining Interfaces
- Restaurant menus is a common ***public interface***. ( Had not thought about that )
  - Waiters orders going into the kitchen or bar are `private` messages.. nice
  - Separation of `public` and `private` is an effective process
  - `Classes` are like a **Kitchen** and contain many `methods` / dishes

### 4.2.1 Public Interfaces
  - Reveal its primary responsibility.
  - Are expected to be invoked by others.
  - Will not change on a whim.
  - Are safe for others to depend on.
  - Are thoroughly documented in the tests.

### 4.2.2 Private Interfaces
  - Handle implementation details.
  - Are not expected to be sent by other objects.
  - Can change for any reason whatsoever.
  - Are unsafe for others to depend on.
  - May not even be referenced in the tests.

### 4.2.3 Responsibilities, Dependencies, and Interfaces
  > The public interface is a contract that articulates the responsibilities of your class.

***Public*** == Stable
***Private*** == Less Stable / Unstable ?

## 4.3 Finding the Public Interface
> The design goal, as always, is to retain maximum future flexibility while writing only enough code to meet today’s requirements. Good public interfaces reduce the cost of unanticipated change; bad public interfaces raise it.

- Customer, Trip, Route, Bike, and Mechanic classes.. What else ? ( discuss )

>Domain objects are easy to find, but they are not at the design center of your application. Instead, they are a trap for the unwary. If you fixate on domain objects, you will tend to coerce behavior into them.

- UML Design ( the lewagon one ?)
- Lots of lines & dashes.. but important ones

> You don’t send messages because you have objects, you have objects because you send messages.
>
### 4.3.4 Asking for “What” Instead of Telling “How”

- keep your public interfaces small and general, **NOT** descriptive

### 4.3.5 Seeking Context Independence

> The best possible situation is for an object to be completely independent of its context. An object that could collaborate with others without knowing who they are or what they do could be reused in novel and unanticipated ways.

- `Go through Figure 4.7 please`
- The public interface for Trip includes bicycles.
- The public interface for Mechanic includes prepare_trip and perhaps
prepare_bicycle.
- Trip expects to be holding onto an object that can respond to prepare_trip.
- Mechanic expects the argument passed along with prepare_trip to respond
to bicycles.

> This blind trust is a keystone of object-oriented design. It allows objects to col- laborate without binding themselves to context and is necessary in any application that expects to grow and change.

### 4.3.7 Using Messages to Discover Objects

> The realization that you need an as-yet undefined object is one that you can arrive at via many routes. The advantage of discovering this missing object via sequence diagrams is that the cost of being wrong is very low and the impediments to changing your mind are extremely few.

## 4.4 Writing Code That Puts Its Best (Inter)Face Forward
 - Think about interfaces. Create them intentionally.

### 4.4.1 Create Explicit Interfaces

Public interfaces should:
- Be explicitly identified as such.
- Be more about what than how.
- Have names that, insofar as you can anticipate, will not change.
- Prefer keyword arguments.

> Conveying information that a method is stable or unstable is one thing; attempting to control how others use it is quite another.

### 4.4.2 Honor the Public Interfaces of Others
> Do your best to interact with other classes using only their public interfaces.

## 4.5 The Law of Demeter

> The Law of Demeter is a set of coding rules that results in loosely coupled objects. Loose coupling is nearly always a virtue but is just one component of design and must be balanced against competing needs.

or

`“only talk to your immediate neighbors” `
### 4.5.1 Defining Demeter
```ruby
  customer.bicycle.wheel.tire
  customer.bicycle.wheel.rotate
  hash.keys.sort.join(',')
```

### 4.5.2 Consequences of Violations
 > Trip cannot be reused unless it has access to a customer with a bicycle that has a wheel and a tire. It requires a lot of context and is not easily usable.

### 4.5.3 Avoiding Violations
> Using delegation to hide tight coupling is not the same as decoupling the code.

### 4.5.4 Listening to Demeter
> The train wrecks of Demeter violations are clues that there are objects whose public interfaces are lacking. Listening to Demeter means paying attention to your point of view.

## 4.6 Summary
> Focusing on messages reveals objects that might otherwise be overlooked.
