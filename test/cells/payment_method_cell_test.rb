require 'test_helper'

class PaymentMethodCellTest < Cell::TestCase
  test "display" do
    invoke :display
    assert_select "p"
  end
  

end
