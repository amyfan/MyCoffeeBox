require 'test_helper'

class ProductCellTest < Cell::TestCase
  test "display" do
    invoke :display
    assert_select "p"
  end
  

end
