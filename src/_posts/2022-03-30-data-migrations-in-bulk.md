---
layout: post
title: "dealing with big data sets in rails"
date: 2022-03-30 09:10:49 +1100
categories: jea
---

<sl-format-date  date="{{page.date}}"  month="long"  day="numeric"  year="numeric"></sl-format-date>

### Petit Edition ⚡

Handing `rails` methods to get you out of jail when using large amounts of data, or instances of data ( lets say `Users` in a database)

#### [find_in_batches](https://edgeapi.rubyonrails.org/classes/ActiveRecord/Batches.html#method-i-find_in_batches)

Yields each batch of records that was found by the find options as an array.

```ruby
Person.where("age > 21").find_in_batches do |group|
  sleep(50) # Make sure it doesn't get too crowded in there!
  group.each { |person| person.party_all_night! }
end
```

If you do not provide a block to find_in_batches, it will return an Enumerator for chaining with other methods:

```ruby
Person.find_in_batches.with_index do |group, batch|
  puts "Processing group ##{batch}"
  group.each(&:recover_from_last_night!)
end
```

or

```ruby
Customer.find_in_batches(batch_size: 2500) do |customers|
  export.add_customers(customers)
end

```

this also comes with some cool options to play with:
- `:batch_size` - Specifies the size of the batch. Defaults to 1000.
- `:start` - Specifies the primary key value to start from, inclusive of the value.
- `:finish` - Specifies the primary key value to end at, inclusive of the value.
- `:error_on_ignore` - Overrides the application config to specify if an error should be raised when an order is present in the relation.
- `:order` - Specifies the primary key order (can be `:asc` or `:desc`). Defaults to `:asc`.

#### [find_each](https://edgeapi.rubyonrails.org/classes/ActiveRecord/Batches.html#method-i-find_each)

  Let's say we had 20_000 Wheehouse users, doing below would not be idea, all instances would load.

```ruby
  Wheelhouse::User.all
```
So we can use `find_each` to load those users in batches.

 ```ruby
  Person.find_each do |person|
    person.do_awesome_stuff
  end

  Person.where("age > 21").find_each do |person|
    person.party_all_night!
  end
 ```

<br>

### now let's go through [Elles article](https://thoughtbot.com/blog/data-migrations-in-rails) from thoughtbot
```ruby
# BAD
# lib/tasks/temporary/users.rake
namespace :users do
  task :set_newsletter => :environment do
    User.all.each do |user|
      if user.confirmed?
        user.receive_newsletter = true
        user.save
      end
    end
  end
end
```
<br>

```ruby
# GOOD
# lib/tasks/temporary/users.rake
namespace :users do
  desc "Update confirmed users to receive newsletter"
  task set_newsletter: :environment do
    users = User.confirmed
    puts "Going to update #{users.count} users"

    ActiveRecord::Base.transaction do
      users.each do |user|
        user.mark_newsletter_received!
        print "."
      end
    end

    puts " All done now!"
  end
end
```
