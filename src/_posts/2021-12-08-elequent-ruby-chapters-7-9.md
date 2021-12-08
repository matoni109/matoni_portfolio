---
layout: post
title:  "Eloquent Ruby - Chapters (7..9)"
date:  2021-12-08 09:10:49 +1100
categories: book-club
# https://stackedit.io/app#
# https://www.hawkins.io/article/using-the-ruby-logger/
---
<sl-format-date  date="{{page.date}}"  month="long"  day="numeric"  year="numeric"></sl-format-date>

Interesting bits, and or questions from this weeks book club chapters.

## Chapter 7 ( pg. 101 )
*Treat Everything Like an Object—Because Everything Is*

```ruby
class Document
  # Most of the class on holiday...
  def about_me
    puts "I am #{self}"
    puts "My title is #{self.title}"
    puts "I have #{self.word_count} words"
  end
end
```
gives
```
  I am #<Document:0x8766ed4>
  My title is Ethics
  I have 4 words
```

` -3.abs           # Returns 3` there is no `abs(-3)`

```ruby
# Call some methods on a couple of familiar objects
true.class         # Returns Trueclass
false.nil?         # False is close, but not nil
```

this would have been handy a week ago =>
```ruby
class Document
  # Mostly omitted...
  def to_s
    "Document: #{title} by #{author}"
  end
end
```
`=> Document: Emma by Austin`

`doc = Document.new( 'Emma', 'Austin', 'Emma Woodhouse, ...' )`

`pp doc.instance_variables` => [:@title, :@author, :@content]

#### Public, Private, and Protected

```ruby
class Document
  # Most of the class omitted...
  def word_count
    return words.size
  end
  private :word_count
  # This method works because self is the right thing,
  # the document instance, when you call it.
  def print_word_count
    n = word_count
    puts "The number of words is #{word_count}"
  end
end
```

> Note that in Ruby, private methods are callable from subclasses. Think about it: You don’t need an explicit object reference to call a superclass method from a subclass.

```ruby
  # RomanceNovel is a subclass of Document,
  # which is a subclass of Object
class RomanceNovel < Document
  def number_of_steamy_words
    word_count / 4     # Works: self is a Document instance!
  end
end
```

## Chapter 8 ( pg. 113 )
*Embrace Dynamic Typing*

What is Dynamic Typing ?
> One of the oft-repeated advantages of dynamic typing is that it allows you to write more compact code. For example, our Document class would certainly be longer if we needed to state—and possibly repeat here and there—that @author, @title, and @content are all strings and that the words method returns an array

What is *Duck Typing* ?

I didn't understand ( pg.88 onwards, can we discuss ? )

## Chapter 9 ( pg. 113 )
*Write Specs!*

Here is the same set of Document tests expressed in RSpec:

```ruby
describe Document do
  it 'should hold on to the contents' do
    text = 'A bunch of words'
    doc = Document.new( 'test', 'nobody', text )
    doc.content.should == text
end
  it 'should return all of the words in the document' do
    text = 'A bunch of words'
    doc = Document.new( 'test', 'nobody', text )
    doc.words.include?( 'A' ).should == true
    doc.words.include?( 'bunch' ).should == true
    doc.words.include?( 'of' ).should == true
    doc.words.include?( 'words' ).should == true
end
  it 'should know how many words it contains' do
    text = 'A bunch of words'
    doc = Document.new( 'test', 'nobody', text )
    doc.word_count.should == 4
end end
```

> By convention, your RSpec code—generally just called a spec—goes in a file called <<class name>>_spec.rb, so the previous example would be best stored away in document_spec.rb. You can run the spec by using the spec command:

`spec document_spec.rb`


A stub is an object that implements the same interface as one of the supporting cast members, but returns canned answers when its methods are called

##### Could we discuss *stubs* and *mocks* ?

#### Stubs
RSpec example that makes use of stub_printer:
```ruby
describe PrintableDocument do
  before :each do
    @text = 'A bunch of words'
    @doc = PrintableDocument.new( 'test', 'nobody', @text )
  end
  it 'should know how to print itself' do
    stub_printer = stub :available? => true, :render => nil
    @doc.print( stub_printer ).should == 'Done'
  end

  it 'should return the proper string if printer is offline' do
    stub_printer = stub :available? => false, :render => nil

  @doc.print( stub_printer ).should == 'Printer unavailable'
  end
end
```

#### Mocks

 PrintableDocument spec, this time enhanced with a mock:

 ```ruby
  it 'should know how to print itself' do
    mock_printer = mock('Printer')
    mock_printer.should_receive(:available?).and_return(true)
    mock_printer.should_receive(:render).exactly(3).times
    @doc.print( mock_printer ).should == 'Done'
  end
 ```
