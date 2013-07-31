require 'test_helper'

class PaymentCellTest < Cell::TestCase
  test "display" do
    invoke :display
    assert_select "p"
  end
  

end
