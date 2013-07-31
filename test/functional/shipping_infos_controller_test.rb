require 'test_helper'

class ShippingInfosControllerTest < ActionController::TestCase
  setup do
    @shipping_info = shipping_infos(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:shipping_infos)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create shipping_info" do
    assert_difference('ShippingInfo.count') do
      post :create, :shipping_info => { :additional_info => @shipping_info.additional_info, :address_one => @shipping_info.address_one, :address_two => @shipping_info.address_two, :city => @shipping_info.city, :country => @shipping_info.country, :name => @shipping_info.name, :phone => @shipping_info.phone, :postal_code => @shipping_info.postal_code, :state => @shipping_info.state }
    end

    assert_redirected_to shipping_info_path(assigns(:shipping_info))
  end

  test "should show shipping_info" do
    get :show, :id => @shipping_info
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @shipping_info
    assert_response :success
  end

  test "should update shipping_info" do
    put :update, :id => @shipping_info, :shipping_info => { :additional_info => @shipping_info.additional_info, :address_one => @shipping_info.address_one, :address_two => @shipping_info.address_two, :city => @shipping_info.city, :country => @shipping_info.country, :name => @shipping_info.name, :phone => @shipping_info.phone, :postal_code => @shipping_info.postal_code, :state => @shipping_info.state }
    assert_redirected_to shipping_info_path(assigns(:shipping_info))
  end

  test "should destroy shipping_info" do
    assert_difference('ShippingInfo.count', -1) do
      delete :destroy, :id => @shipping_info
    end

    assert_redirected_to shipping_infos_path
  end
end
