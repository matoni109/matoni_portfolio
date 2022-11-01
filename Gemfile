source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }
ruby '~> 3.0'
# Hello! This is where you manage which Bridgetown version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Bridgetown with `bundle exec`, like so:
#
#   bundle exec bridgetown serve
#
# This will help ensure the proper Bridgetown version is running.
#
# To install a plugin, simply run bundle add and specify the group
# "bridgetown_plugins". For example:
#
#   bundle add some-new-plugin -g bridgetown_plugins
#
# Happy Bridgetowning!
# bin/bridgetown start
# bridgetown webpack update
# bundle update bridgetown
# https://github.com/bridgetownrb/bridgetown-prismic

# gem "bridgetown", "~> 0.21.4"
gem 'bridgetown', '~> 1.1'
gem 'puma', '~> 5.6.4'

# group :development do
#   gem "debug", "~> 1.4"
#   gem "standard", "~> 1.6.0"
#   gem "solargraph", "~> 0.44.2"
# end

# group :bridgetown_plugins do
#   gem "bridgetown-view-component", "~> 0.7.0"
#   gem "bridgetown-svg-inliner", "~> 1.0"
#   gem "bridgetown-cloudinary", "~> 1.2"
#   gem "bridgetown-plausible", "~> 1.0.2"
#   gem "view_component", "< 2.48"
# end

gem 'bridgetown-quick-search', '~> 2.0', group: :bridgetown_plugins
gem 'bridgetown-seo-tag', '~> 5.0', group: :bridgetown_plugins

group :test, optional: true do
  gem 'minitest'
  gem 'minitest-profile'
  gem 'minitest-reporters'
  gem 'nokogiri'
  gem 'rails-dom-testing'
  gem 'shoulda'
end
