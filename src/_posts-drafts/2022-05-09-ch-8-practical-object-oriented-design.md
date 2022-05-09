---
layout: post
title:  "Practical Object Oriented Design: Chapter 9 - Creating Flexible Interfaces"
date:  2022-05-11 09:10:49 +1100
categories: book-club
# https://stackedit.io/app#
# https://www.hawkins.io/article/using-the-ruby-logger/
---
<sl-format-date  date="{{page.date}}"  month="long"  day="numeric"  year="numeric"></sl-format-date>

- [8.1 Composing a Bicycle of Parts](#81-composing-a-bicycle-of-parts)
  - [8.1.1 Updating the Bicycle Class](#811-updating-the-bicycle-class)
  - [8.1.2 Creating a Parts Hierarchy](#812-creating-a-parts-hierarchy)
- [8.2 Composing the Parts Object](#82-composing-the-parts-object)
  - [8.2.1 Creating a Part](#821-creating-a-part)
  - [8.2.2 Making the Parts Object More Like an Array](#822-making-the-parts-object-more-like-an-array)
- [8.3 Manufacturing Parts](#83-manufacturing-parts)
  - [8.3.1 Creating the PartsFactory](#831-creating-the-partsfactory)
  - [8.3.2 Leveraging the PartsFactory](#832-leveraging-the-partsfactory)
- [8.4 The Composed Bicycle](#84-the-composed-bicycle)
- [8.5 Deciding between Inheritance and Composition](#85-deciding-between-inheritance-and-composition)
  - [8.5.1 Accepting the Consequences of Inheritance](#851-accepting-the-consequences-of-inheritance)
    - [8.5.1.0 Benefits of Inheritance](#8510-benefits-of-inheritance)
    - [8.5.1.1 Costs of Inheritance](#8511-costs-of-inheritance)
  - [8.5.2 Accepting the Consequences of Composition](#852-accepting-the-consequences-of-composition)
    - [8.5.2.1 Benefits of Composition](#8521-benefits-of-composition)
    - [8.5.2.2 Costs of Composition](#8522-costs-of-composition)
  - [8.5.3 Choosing Relationships](#853-choosing-relationships)
    - [8.5.3.1 Use Inheritance for is-a Relationships](#8531-use-inheritance-for-is-a-relationships)
    - [8.5.3.2 Use Duck Types for behaves-like-a Relationships](#8532-use-duck-types-for-behaves-like-a-relationships)
    - [8.5.3.3 Use Composition for has-a Relationships](#8533-use-composition-for-has-a-relationships)

### 8.1 Composing a Bicycle of Parts

This section begins where the Bicycle example in Chapter 6, “Acquiring Behavior
through Inheritance,” ended.

#### 8.1.1 Updating the Bicycle Class
 - The Bicycle class is currently an abstract superclass
 - Bicycle class is responsible for responding to the spares message.
 -


```ruby
1 class Bicycle
2   attr_reader :size, :parts
3
4   def initialize(size:, parts:)
5     @size = size
6     @parts = parts
7   end
8
9   def spares
10    parts.spares
11  end
12 end

```
- Bicycle is now responsible for three things: knowing its size, holding onto its
Parts, and answering its spares.

#### 8.1.2 Creating a Parts Hierarchy

```ruby
1 class Parts
2   attr_reader :chain, :tire_size
3
4   def initialize(**opts)
5     @chain = opts[:chain] || default_chain
6     @tire_size = opts[:tire_size] || default_tire_size
7     post_initialize(opts)
8   end
9
10  def spares
11    { chain: chain,
12    tire_size: tire_size }.merge(local_spares)
13  end
14
15  def default_tire_size
16    raise NotImplementedError
17  end
18
19 # subclasses may override
20  def post_initialize(opts)
21    nil
22  end
23
24  def local_spares
25   {}
26  end
27
28  def default_chain
29    "11-speed"
30  end
31 end
32
33 class RoadBikeParts < Parts
34  attr_reader :tape_color
35
36  def post_initialize(**opts)
37    @tape_color = opts[:tape_color]
38  end
39
40  def local_spares
41    { tape_color: tape_color }
42  end
43
44  def default_tire_size
45    "23"
46  end
47 end
48
49 class MountainBikeParts < Parts
50    attr_reader :front_shock, :rear_shock
51
52  def post_initialize(**opts)
53    @front_shock = opts[:front_shock]
54    @rear_shock = opts[:rear_shock]
55  end
56
57  def local_spares
58    { front_shock: front_shock }
59  end
60
61  def default_tire_size
62    "2.1"
63  end
64 end
```

- There is now an
abstract Parts class. Bicycle is composed of Parts. Parts has two subclasses,
RoadBikeParts and MountainBikeParts.

> Parts hierarchy now cries out for another refactoring.

### 8.2 Composing the Parts Object
- introducing a Part class when you already have a Parts class makes conversation a challenge.

>However, the previous phrase illustrates a technique that sidesteps the communication prob-lem; when discussing Part and Parts, you can follow the class name with the word object and pluralize object as necessary.

#### 8.2.1 Creating a Part

```ruby
1 class Bicycle
2   attr_reader :size, :parts
3
4   def initialize(size:, parts:)
5     @size = size
6     @parts = parts
7   end
8
9   def spares
10    parts.spares
11  end
12 end
13
14 class Parts
15  attr_reader :parts
16
17  def initialize(parts)
18    @parts = parts
19  end
20
21  def spares
22    parts.select {|part| part.needs_spare}
23  end
24 end
25
26 class Part
27  attr_reader :name, :description, :needs_spare
28
29  def initialize(name:, description:, needs_spare: true)
30    @name = name
31    @description = description
32    @needs_spare = needs_spare
33  end
34 end
```
- Now that these three classes exist, you can create individual Part objects.
- We can now do below

```ruby
1 road_bike =
2   Bicycle.new(
3     size: "L",
4     parts: Parts.new([chain,
5                       road_tire,
6                       tape]))
7
8 puts road_bike.size
9 # => L
10
11 puts road_bike.spares.inspect
12 # => [#<Part:0x007fbd04a174d0
13 # @name="chain",
14 # @description="11-speed",
15 # @needs_spare=true>,
16 # #<Part:0x007fbd04a17390
17 # @name="tire_size",
18 # @description="23",
19 # @needs_spare=true>,
20 # #<Part:0x007fbd04a171b0
21 # @name="tape_color",
22 # @description="red",
23 # @needs_spare=true>]
```
- Bicycle’s old spares method returned a hash, but this new spares method returns an array
of Part objects.

> They don’t have to be a kind-of the Part class, they just have to act like one; that is, they must respond to name, description, and needs_spare.

#### 8.2.2 Making the Parts Object More Like an Array

- Parts is not an Array ( don't make it one )
- Somewhere in the middle ground between complexity and usability lies the fol-
lowing solution.
- The Parts class below delegates size and each to its @parts array

and includes Enumerable to get common traversal and searching methods.

Discuss below:

```ruby
1 require 'forwardable'
2 class Parts
3   extend Forwardable
4   def_delegators :@parts, :size, :each
5   include Enumerable
6
7   def initialize(parts)
8    @parts = parts
9   end
10
11  def spares
12    select {|part| part.needs_spare}
13  end
14 end
# ...
16 puts mountain_bike.spares.size # => 3
17 puts mountain_bike.parts.size # => 4
18
19 puts mountain_bike.parts + road_bike.parts
20 # => undefined method '+' for #<Parts:0x007fc1d59fe040>
```

### 8.3 Manufacturing Parts
**Why?**
```ruby
1 road_config =
2   [['chain', '11-speed'],
3     ['tire_size', '23'],
4 ['tape_color', 'red']]
5
6 mountain_config =
7   [['chain', '11-speed'],
8   ['tire_size', '2.1'],
9   ['front_shock', 'Manitou'],
10  ['rear_shock', 'Fox', false]]
```

#### 8.3.1 Creating the PartsFactory

```ruby
1 module PartsFactory
2   def self.build(config:,
3                  part_class: Part,
4                  parts_class: Parts)
5
6     parts_class.new(
7       config.collect {|part_config|
8         part_class.new(
9           name: part_config[0],
10          description: part_config[1],
11          needs_spare: part_config.fetch(2, true))})
12  end
13 end
```
- PartsFactory, combined with the new configuration arrays, isolates all
the knowledge needed to create a valid Parts.

#### 8.3.2 Leveraging the PartsFactory

```ruby
1 require 'ostruct'
2 module PartsFactory
3   def self.build(config:, parts_class: Parts)
4     parts_class.new(
5     config.collect {|part_config|
6     create_part(part_config)})
7 end
8
9   def self.create_part(part_config)
10    OpenStruct.new(
11      name: part_config[0],
12      description: part_config[1],
13      needs_spare: part_config.fetch(2, true))
14  end
15 end
# ...
1 mountain_bike =
1   Bicycle.new(
3     size: 'L',
4     parts: PartsFactory.build(config: mountain_config))
5
6 puts mountain_bike.spares.class
7 # => Array
8
9 puts mountain_bike.spares
10 # => #<OpenStruct
11 # => name="chain",
12 # => description="11-speed",
13 # => needs_spare=true>
14 # => #<OpenStruct
15 # => name="tire_size",
16 # => description="2.1",
17 # => needs_spare=true>
18 # => #<OpenStruct
19 # => name="front_shock",
20 # => description="Manitou",
21 # => needs_spare=true>
```

### 8.4 The Composed Bicycle

- Big slab of code to discuss on pg.(181)
- Aggregation: A Special Kind of Composition

### 8.5 Deciding between Inheritance and Composition
>Composition contains far fewer built-in dependencies than inheritance; it is very often the best choice.
**vs**
>Inheritance is a better solution when its use provides high rewards for low risk.

#### 8.5.1 Accepting the Consequences of Inheritance
- Making wise choices about using inheritance requires a clear understanding of its
costs and benefits.

##### 8.5.1.0 Benefits of Inheritance
 - Methods defined near the top of inheritance hierarchies have widespread influ-
ence because the height of the hierarchy acts as a lever that multiplies their effects.
- Correctly modeled
hierarchies are thus extremely reasonable; big changes in behavior can be achieved
via small changes in code.
- Use of inheritance results in code that can be described as open–closed;
- Correctly written hierarchies are easy to extend.

##### 8.5.1.1 Costs of Inheritance
- you might be fooled into choosing inheritance to solve the wrong kind of prob-
lem. If you make this mistake, a day will come when you need to add behavior but find there’s no easy way do so.
- even when inheritance makes sense for the problem, you might be writ-
ing code that will be used by others for purposes you did not anticipate.
- The opposing side of the usable coin is the impossibility of adding behavior when
new subclasses represent a mixture of types.
- ... is the chaos that ensues when novice pro-grammers attempt to extend incorrectly modeled hierarchies.

> Inheritance, therefore, is a place where the question “What will happen when I’m wrong?” assumes special importance.

#### 8.5.2 Accepting the Consequences of Composition
> Composed objects do not depend on the structure of the class hierarchy, and they delegate their own messages.

##### 8.5.2.1 Benefits of Composition
- the natural tendency is to create many small objects that
contain straightforward responsibilities that are accessible through clearly defined
interfaces.
- These small objects have a single responsibility and specify their own behavior.
- adding a new kind of part is a simple matter of plugging in a new object
> At its best, composition results in applications built of simple, pluggable objects

##### 8.5.2.2 Costs of Composition
- Composition’s strengths, as with most things in life, contribute to its weaknesses.
- While every individual part may indeed be transparent, the whole may not be.

#### 8.5.3 Choosing Relationships
- list of books to read
- The trick to lowering your application costs is to apply each technique to the right problem.

##### 8.5.3.1 Use Inheritance for is-a Relationships
> When you select inheritance over composition, you are placing a bet that the benefits thereby accrued will outweigh the costs.

##### 8.5.3.2 Use Duck Types for behaves-like-a Relationships
> Some problems require many different objects to play a common role. In addition to their core responsibilities, objects might play roles like schedulable, preparable, printable, or persistable.
- There are two key ways to recognize the existence of a role.
  -  First, although an object plays it, the role is not the object’s main responsibility.
  - Second, the need is widespread; many otherwise unrelated objects share a desire to play the same role.
- Your design task is to recognize that a role exists, define the interface of its
duck type and provide an implementation of that interface for every possible player.

##### 8.5.3.3 Use Composition for has-a Relationships
- Many objects contain numerous parts but are more than the sums of those parts.
- Bicycles have-a Parts, but the bike itself is something more.
> the most cost-effective way to model the Bicycle object is via composition.
- This is-a versus has-a distinction is at the core of deciding between inheritance
and composition.
- The more parts an object has, the more likely it is that it should be
modeled with composition.
> For every problem, assess the costs and benefits of alternative design techniques
