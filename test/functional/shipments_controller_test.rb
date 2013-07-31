require 'test_helper'

class ShipmentsControllerTest < ActionController::TestCase
  setup do
    @shipment = shipments(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:shipments)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create shipment" do
    assert_difference('Shipment.count') do
      post :create, :shipment => { :notes => @shipment.notes, :received_date => @shipment.received_date, :shipment_cost => @shipment.shipment_cost, :shipment_status => @shipment.shipment_status, :shipped_date => @shipment.shipped_date, :shipping_provider => @shipment.shipping_provider }
    end

    assert_redirected_to shipment_path(assigns(:shipment))
  end

  test "should show shipment" do
    get :show, :id => @shipment
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @shipment
    assert_response :success
  end

  test "should update shipment" do
    put :update, :id => @shipment, :shipment => { :notes => @shipment.notes, :received_date => @shipment.received_date, :shipment_cost => @shipment.shipment_cost, :shipment_status => @shipment.shipment_status, :shipped_date => @shipment.shipped_date, :shipping_provider => @shipment.shipping_provider }
    assert_redirected_to shipment_path(assigns(:shipment))
  end

  test "should destroy shipment" do
    assert_difference('Shipment.count', -1) do
      delete :destroy, :id => @shipment
    end

    assert_redirected_to shipments_path
  end
end
