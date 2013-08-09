class PaymentMethod < ActiveRecord::Base
  attr_accessible :address_one, :address_two, :city, :country, :last4, :payment_type, :phone, :postal_code, :state
  belongs_to :user, :inverse_of => :payment_methods
  has_many :payments, :inverse_of => :payment_method, :order => 'created_at DESC'
end
