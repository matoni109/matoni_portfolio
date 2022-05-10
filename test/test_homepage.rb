require_relative './helper'

class TestHomepage < Minitest::Test
  context 'homepage' do
    setup do
      page = site.collections.pages.resources.find { |doc| doc.relative_url == '/' }
      document_root page
    end

    should 'exist' do
      assert_select 'body'
    end
  end
end

class TestBlog < Minitest::Test
  context 'blog page' do
    setup do
      page = site.generated_pages.find { |page| page.data.slug == 'posts' }
      pp document_root page
    end

    should 'show posts list' do
      assert_select 'ul' do |elements|
        elements.each do |element|
          assert_select element, 'li', 3
        end
      end
    end
  end
end
