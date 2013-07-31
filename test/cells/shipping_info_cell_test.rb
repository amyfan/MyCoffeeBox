require 'test_helper'

class ShippingInfoCellTest < Cell::TestCase
  test "display" do
    invoke :display
    assert_select "p"
  end
  

end
