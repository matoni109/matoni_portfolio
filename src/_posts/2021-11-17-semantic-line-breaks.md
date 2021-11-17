---
layout: post
title:  "Semantic Line Breaks"
date:     2021-11-17 10:10:49 +1100
categories: jea
# https://stackedit.io/app#
---

This is the first lightning talk topic given out in my Junior Education Academy ( J.E.A ) journey at [DiscoLabs](http://discolabs.com). I thought it might be a good idea to document these:

- "A" for myself looking back
-  "B" that they might prove somewhat useful and maybe the Google search algorithm might find them, and collate them from the backwaters of the internet
-  "C" people might look back in 15 years time and think its a bit weird that real people actually used to do programming at all..
<br>
<br>


### Semantic Line Breaks






> Semantic Line Breaks describe a set of conventions for using insensitive vertical white space to structure prose along semantic boundaries.


*Semantic Line What Now ..?* After reaching for Doctor Google Semantic Line Breaks ( S.L.B)'s can be summarised as giving form and feeling to an otherwise **SLAB** of text 'breaking' up the otherwise endless stream of words into topical thoughts and a structure, in the instance where white space allows a natural resting point for the text to be absorbed by the reader. The overall message conveyed by the text can not be changed through the allocation of a S.L.B though in the process at it's essence.

So in reference to above we could re-present the above **SLAB** in the below style.


> *Semantic Line What Now ..?*
>
> After reaching for Doctor Google Semantic Line Breaks ( S.L.B)'s can be summarised as giving form and feeling to an otherwise **SLAB** of text 'breaking' up the otherwise endless stream of words into topical thoughts and a structure, <br> in the instance where white space allows a natural resting point for the text to be absorbed by the reader. <br><br>The overall message conveyed by the text can not be changed through the allocation of a S.L.B though in the process at it's essence.

Great, that's way more readable for me, but how's S.L.B's going to help me live my best programmer lyfe..

We S.LB's are incorporated into most markup languages, this post is written [Markdown](https://daringfireball.net/projects/markdown/) and similar to [HTML](https://www.w3.org/blog/international/) in that Line Breaks are designated through the use of `<br>`, example below

```html
> *Semantic Line What Now ..?*<br>
> After reaching for Doctor Google Semantic Line Breaks ( S.L.B)'s can be summarised as giving form and feeling to an
> otherwise **SLAB** of text 'breaking' up the otherwise endless stream of words into topical
```
The `<br>` instantiates the S.L.B onto the page giving an empty space on the rendered page, markup languages have always needed a way regulate how readers present text onto the page.

This is a Ruby blog right.. where is the ```Ruby``` bit..? Well yes we are getting to that.

### Semantic Line Breaks & Ruby
If you come out of a Ruby boot-camp like I did ( shout-out [lewagon](http://lewagon.com) batch #466 ), then sooner or later your rubbish fledgling code runs head first into the brick wall that is [Rubocop](https://rubocop.org/)

 Rubocop serves to protect the rest of the Ruby world from your `code` and enforce the [Ruby Style Guide](https://rubystyle.guide/) at all costs. You'll soon find yourself in a world were you can pass any exercises unless you do the Rubocop's ( or [linters](https://www.perforce.com/blog/qac/what-lint-code-and-why-linting-important) ) bidding and tidy up your code from `bad => good`.

As you can see below S.L.B's matter in programming they make your code:
- more readable for you, and others grouped with you
- easier to maintain going forward
- chances are the code will make more sense to YOU went you stubble across it again in a few months, or need to debug the code

Looking at the [example](https://rubystyle.guide/#empty-lines-between-methods) below

```ruby
# Empty Lines between Methods
# bad
def some_method
  data = initialize(options)
  data.manipulate!
  data.result
end
def some_other_method
  result
end

# good
def some_method
  data = initialize(options)

  data.manipulate!

  data.result
end

def some_other_method
  result
end
```
