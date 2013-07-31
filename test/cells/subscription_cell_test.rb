require 'test_helper'

class SubscriptionCellTest < Cell::TestCase
  test "display" do
    invoke :display
    assert_select "p"
  end

end
