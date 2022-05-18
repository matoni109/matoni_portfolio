---
layout: post
title: "state machines vs enums"
date: 2022-05-18 09:10:49 +1100
categories: jea
---

<sl-format-date  date="{{page.date}}"  month="long"  day="numeric"  year="numeric"></sl-format-date>

- [land sighted 🏝](#land-sighted-)
- [the main course: the state machines vs. enums](#the-main-course-the-state-machines-vs-enums)
  - [the state 🤖](#the-state-)
  - [active record enums 🔢](#active-record-enums-)

### land sighted 🏝
Well we have come to the end dear readers, the [Junior Engineer Academy](https://www.discolabs.com/careers/junior-engineer-academy/) is coming to an end for my cohort and I this Friday. We graduate and turn into less junior juniors, and throw our collective 🎓  into the air ( I'm assuming that there are 🎓 .. well there should be ). It has been quite a ride, ups and down and sideways at times, coming from my previous Sales roles software engineering is a far more cerebral pursuit where you migrate from feeling like a genius to the depths of despair in a relatively short period of time. I guess my advice to any junior / career changers out there, it might not all snap into place when you want it to, but it will happen over time, give it the time to come to you.

Find little niches that interests you, do the exercises, and read the books. If you're anything like me you need to see that patterns a few times before they will start to take hold.

Also don't forget that you are the sum of your previous non coding life / work experiences, these have value don't hide or run away from them. Use them to your advantage they are your super power in software land, very few will have what you have.

### the main course: the state machines vs. enums

#### the state 🤖

I'm going to pick on state machines first, and in particular the `gem` [state machines](https://github.com/state-machines/state_machines) as it is the most popular on [ruby toolbox](https://www.ruby-toolbox.com/categories/state_machines), if you're looking for [rails](https://rubyonrails.org/) support then head over and checkout out [state machines active-record](https://github.com/state-machines/state_machines-activerecord). Now I'm not saying that you should always just pick the first cab off the rank, but its expedient for this exercise al least. So what does it do exactly ?
> State Machines adds support for creating state machines for attributes on any Ruby class.

So lets check our the [readme](https://github.com/state-machines/state_machines-activerecord) from state machines active-record.

```ruby
class Vehicle < ActiveRecord::Base
  state_machine :initial => :parked do
    before_transition :parked => any - :parked, :do => :put_on_seatbelt
    after_transition any => :parked do |vehicle, transition|
      vehicle.seatbelt = 'off'
    end
    around_transition :benchmark

    event :ignite do
      transition :parked => :idling
    end

    state :first_gear, :second_gear do
      validates_presence_of :seatbelt_on
    end
  end

  def put_on_seatbelt
    ...
  end

  def benchmark
    ...
    yield
    ...
  end
end

# scopes
Vehicle.with_state(:parked)                         # also plural #with_states
Vehicle.without_states(:first_gear, :second_gear)   # also singular #without_state

# validations
  state_machine do
    state :first_gear, :second_gear do
      validate :speed_is_legal
    end
  end

```

#### active record enums 🔢

A different tack to handling state is the use of enums, these get give you different states on a active record value, say a `User` could be an "Admin", "Student" or "Banned", this was first introduced int to [rails 4.1](https://api.rubyonrails.org/v4.1.0/classes/ActiveRecord/Enum.html) .

How to get this up and running.

```bash
  bin/rails g model phone number:string phone_number_type:integer
```

Which we can now give us :
```ruby
# app/models/phone.rb

class Phone < ActiveRecord::Base
  enum phone_number_type: [:home, :office, :mobile, :fax]
  # or you can be explicit ( would recommend !!! )
  enum phone_number_type: [:home 0, :office 1, :mobile 2, :fax 3]
end
```
Now we can get attributes in a new way.

```bash
 # this
Phone.first.phone_number_type
  3
 # is now enum magic
Phone.first.phone_number_type
  "fax"
```

We can also change them using the values `Strings` or `Integer`

```bash
phone.phone_number_type = 1
phone.phone_number_type => "office"

phone.phone_number_type = "mobile"
phone.phone_number_type => "mobile"
```

you can now use a `bang!` to define a `enum`

```bash
phone.office!
true
phone.phone_number_type
"office"
# and also
phone.office?
true
```

you can also get all of the types.

```bash
Phone.phone_number_types
{"home"=>0, "office"=>1, "mobile"=>2, "fax"=>3}
```

This makes life quite easy putting a select into a form like below.

```html
<!--- app/views/phones/_form.html.erb  --->
<div class="field">
  <%= f.label :phone_number_type %><br>
  <%= f.select :phone_number_type, Phone.phone_number_types.keys %>
</div>
```

That's it for state machines vs enums, I look forward to seeing you on the other side of junior 👨🏻‍🎓

***references:***
- [state machines git](https://github.com/state-machines/state_machines#usage)
- [justin weiss](https://www.justinweiss.com/articles/creating-easy-readable-attributes-with-activerecord-enums/)
- [ruby on rails docs](https://api.rubyonrails.org/v4.1.0/classes/ActiveRecord/Enum.html)
