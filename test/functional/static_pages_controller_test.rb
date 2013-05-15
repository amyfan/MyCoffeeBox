require 'test_helper'

class StaticPagesControllerTest < ActionController::TestCase
  test "should get home" do
    get :home
    assert_response :success
  end

  test "should get products" do
    get :products
    assert_response :success
  end

  test "should get faq" do
    get :faq
    assert_response :success
  end

  test "should get usa" do
    get :usa
    assert_response :success
  end

  test "should get euro" do
    get :euro
    assert_response :success
  end

  test "should get how" do
    get :how
    assert_response :success
  end

end
