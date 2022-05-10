---
layout: post
title: "factory method pattern in ruby"
date: 2022-04-19 09:10:49 +1100
categories: jea
---

<sl-format-date  date="{{page.date}}"  month="long"  day="numeric"  year="numeric"></sl-format-date>

- [what's in a pattern?](#whats-in-a-pattern)
- [but for a factory the kingdom was lost](#but-for-a-factory-the-kingdom-was-lost)
  - [figure_1](#figure_1)
  - [figure_2](#figure_2)

### what's in a pattern?

Conventional programatic design patterns come in 3 flavors 🍦:

- creational
  - these guys create objects dynamically and re-use code
- structural
  - explains how to assemble objects while keeping flexibility
- behavioural
  - converned with algorithms and objects responsibilities

But today we are going to pick on **the factory pattern**, which our dear friends at [wikipedia](https://en.wikipedia.org/wiki/Factory_method_pattern) describe as below.

> the factory method pattern is a creational pattern that uses factory methods to deal with the problem of creating objects without having to specify the exact class of the object that will be created.

### but for a factory the kingdom was lost

Now to dive into what a ***factory pattern*** can do for your codebase, the `<label>` describes it as being able to "create" Classes or Objects in a scalable & dynamic way. All the while allowing your code to be flexible, malleable, and ductile to futures changes or added features. So at a high level fly by, code written with a factory pattern in mind will be able to instantiate objects of the Classes of the problem domain it traverses.

  <div style="text-align: center; padding-top: 1rem; display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center ">
    <div style="display: flex; flex-direction: column;">
      <img  style="max-width: 400px; padding: 1rem; text-align: center;"  src="https://res.cloudinary.com/oeelsafe/image/upload/v1650359901/problem1-en_pirxg1"  alt="bad spaghetti code" >
      <span style="font-size: small">figure_1: your spaghetti mess code won't scale</span>
    </div>
    <div style="display: flex; flex-direction: column;">
      <img  style="max-width: 400px;  padding: 1rem; text-align: center; "  src="https://res.cloudinary.com/oeelsafe/image/upload/v1650359938/solution3-en_xoeaie.png"  alt="concurrency at coles">
      <span style="font-size: small">figure_2: creating a common interface with `Transport`</span>
    </div>
</div>

#### figure_1

so below will work just fine for `figure_1` but will get pretty cray cray real quick if you want to start and add extra freight types. You could try and hide your sins inside a `case` statement, but they'll still be there 🧟.

```ruby
order_data = { line001: '2 cats', line002: '3 bunnies', line003: '3 ferrets' }

class OrderGenerator
  def self.generate(order, type)
    if type == 'road'
      order.each_pair { |key, value| puts "#{key} of #{value}" }
      puts 'Delivered by 🚚'
    elsif type == 'sea'
      order.each_pair { |key, value| puts "#{key} of #{value}" }
      puts 'Delivered by 🛥️'
    else
      raise 'Unsupported type of transport'
    end
  end
end

OrderGenerator.generate(order_data, 'sea')
#...
line001 of 2 cats
line002 of 3 bunnies
line003 of 3 ferrets
Delivered by 🛥️
```

#### figure_2

Here we are using the ***factory pattern*** buy instantiating the Transport Factory Class form within the existing `OrderGenerator` class. Now we can see that we are able to greatly extend the types of transport available to fullfil the client orders. We are also not hiding our transport types within a massive `if/else` or `case` statement.
```ruby
  order_data = { line001: '2 cats', line002: '3 bunnies', line003: '3 ferrets' }

class RoadLogistics
  def deliver(order)
    return '' if order.empty?

    order.each_pair { |key, value| puts "#{key} of #{value}" }
    puts 'Delivered by 🚚'
  end
end

class SeaLogistics
  def deliver(order)
    return '' if order.empty?

    order.each_pair { |key, value| puts "#{key} of #{value}" }
    puts 'Delivered by 🛥️'
  end
end

class Transport
  def self.for(type)
    case type
    when 'sea'
      SeaLogistics.new
    when 'road'
      RoadLogistics.new
    else
      raise 'Unsupported type of transport'
    end
  end
end

class OrderGenerator
  def self.generate(order, type)
    Transport.for(type).deliver(order)
  end
end

OrderGenerator.generate(order_data, 'road')
#...
line001 of 2 cats
line002 of 3 bunnies
line003 of 3 ferrets
Delivered by 🚚
```

We can also see that `figure_2` code reflects and **Open/Closed** principle of the SOLID object-oriented design. So the Factory design pattern ticks a lot of boxes for just a minimal amount if initial front loaded effort.

***references:***
- [refactoring guru](https://refactoring.guru/design-patterns/factory-method)
- [sergii makagon](http://rubyblog.pro/2016/10/factory-method-pattern-in-ruby#disqus_thread)
- [tutorials point](https://www.tutorialspoint.com/design_pattern/factory_pattern.htm)
