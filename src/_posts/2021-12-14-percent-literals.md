---
layout: post
title:  "Percent Literals in Ruby"
date:  2021-12-14 09:10:49 +1100
categories: jea
# https://stackedit.io/app#
# https://www.hawkins.io/article/using-the-ruby-logger/
---
<sl-format-date  date="{{page.date}}"  month="long"  day="numeric"  year="numeric"></sl-format-date>

Working with `strings` in Ruby is great, and in the beginning of boot-camp at around with your single quotes ``` 'harry' ``` and then you meet ``` "sally" ```.

So **harry** is great, but he has some limitations, looking at `single_quote` below things, everything is great until your run into an [apostrophe](https://en.wikipedia.org/wiki/Apostrophe) and then it all goes to custard. In order to get things back on the rails you need to start escaping `\` the characters that freak out the string formation.

Things that to look up a bit with **sally**, or do they ? everything is *cool beans* with the apostrophe's, but now the quotations marks `"` are the fly in the ointment.

```ruby
pet = "rabbit"

single_quote = '\"I really don\'t like quotes\", said Sally\'s cat from it\'s home!'
double_quote = "\"I really don't like quotes\", said Harry's cat from it's home!"

double_quote_interpolation = "\"I really don't like quotes\", said the lonely #{pet} from it's home"
# => "\"I really don't like quotes\", said the rabbit from it's home"
```

Well both **harry** and **sally** will rest easier tonight as percent literals are the way to `escape` (I liked that one) your `string` building woes.

We can solve `single_quote` & `double_quote` using below:
 ```ruby
  %q("I really don't like quotes", said Sally's cat from it's home!)
  # => "\"I really don't like quotes\", said Sally's cat from it's home!"
```

In order to bring interpellation into the mix we need to capitalise the `Q` like below:
 ```ruby
  %Q("I really don't like quotes", said the lonely #{pet} from it's home)
  # => "\"I really don't like quotes\", said the lonely rabbit from it's home\"
```

So here are two ways to tidy up your string interpellation, and get rid the need for those pesky escape characters along the way.

Another interesting example using percent literals and strings in arrays is below, though it is open for discussion if it is in fact more readable.

```ruby
require "rubygems"
require "hpricot"
require "rails"
```
can be turned into

```ruby
%w{rubygems hpricot rails}.each { |lib| require lib }
```

<br />

### Examples

```ruby
language = 'Ruby'

%q('Simple' "non-interpolated" String.) # => "'Simple' \"non-interpolated\" String."

%Q(Interpolated "#{language}" String.) # => "Interpolated \"Ruby\" String."

%(Interpolated "#{language}" String (default).) # => "Interpolated \"Ruby\" String (default)."

# Simple non-interpolated String Array:
%w[Ruby Javascript Coffeescript] # => ["Ruby", "Javascript", "Coffeescript"]

# Interpolated String Array:
%W[#{language} Javascript Coffeescript] # => ["Ruby", "Javascript", "Coffeescript"]

#  Simple non-interpolated Symbol Array:
%i[ruby javascript coffeescript] # => [:ruby, :javascript, :coffeescript]

# Interpolated Symbol Array:
%I[#{language.downcase} javascript coffeescript] # => [:ruby, :javascript, :coffeescript]

%x(echo #{language} interpolated shell scripting command)
# => "Ruby interpolated shell scripting command\n"

%r{/#{language} regexp/i} # => /\/Ruby regexp\/i/
```

<br>

|Literal         |Description                           |Bracket type                 |
|:-----------:|------------------------------------|:---------------------------:|
| %q             |	  Simple non-interpolated String    |	()                          |
| %Q             |	Interpolated String                 |	          ()                |
| %	             | Interpolated String (default)        |	()                          |
| %w             |	Simple non-interpolated String Array|	[]                          |
| %W             |	Interpolated String Array           |	[]                          |
| %i             |	Simple non-inteprolated Symbol Array|	[]                          |
| %I             |	Interpolated Symbol Array           |	[]                          |
| %x             |	Interpolated shell command          |	()                          |
| %r             |	Interpolated regular expression     |	{}                          |

<br>

### References
- [Mikey Hogarth](https://mikeyhogarth.wordpress.com/2011/11/24/notation-for-ruby-literals/)
- [Relish Style Guide](https://relishapp.com/womply/ruby-style-guide/docs/percent-literals)
- [Christian Rolle](http://www.chrisrolle.com/en/blog/ruby-percentage-notations)
