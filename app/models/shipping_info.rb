class ShippingInfo < ActiveRecord::Base
  attr_accessible :user_id, :additional_info, :address_one, :address_two, :city, :country, :name, :phone, :postal_code, :state
  belongs_to :user, :inverse_of => :shipping_infos
end
