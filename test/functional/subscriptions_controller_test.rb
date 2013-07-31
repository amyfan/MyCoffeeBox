require 'test_helper'

class SubscriptionsControllerTest < ActionController::TestCase
  setup do
    @subscription = subscriptions(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:subscriptions)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create subscription" do
    assert_difference('Subscription.count') do
      post :create, :subscription => { :billing_period => @subscription.billing_period, :coffee_type => @subscription.coffee_type, :payment_status => @subscription.payment_status, :promo_code => @subscription.promo_code, :referral_email => @subscription.referral_email, :shipping_period => @subscription.shipping_period, :utm_campaign => @subscription.utm_campaign, :utm_content => @subscription.utm_content, :utm_medium => @subscription.utm_medium, :utm_source => @subscription.utm_source, :utm_term => @subscription.utm_term }
    end

    assert_redirected_to subscription_path(assigns(:subscription))
  end

  test "should show subscription" do
    get :show, :id => @subscription
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @subscription
    assert_response :success
  end

  test "should update subscription" do
    put :update, :id => @subscription, :subscription => { :billing_period => @subscription.billing_period, :coffee_type => @subscription.coffee_type, :payment_status => @subscription.payment_status, :promo_code => @subscription.promo_code, :referral_email => @subscription.referral_email, :shipping_period => @subscription.shipping_period, :utm_campaign => @subscription.utm_campaign, :utm_content => @subscription.utm_content, :utm_medium => @subscription.utm_medium, :utm_source => @subscription.utm_source, :utm_term => @subscription.utm_term }
    assert_redirected_to subscription_path(assigns(:subscription))
  end

  test "should destroy subscription" do
    assert_difference('Subscription.count', -1) do
      delete :destroy, :id => @subscription
    end

    assert_redirected_to subscriptions_path
  end
end
