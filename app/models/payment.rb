class Payment < ActiveRecord::Base
  attr_accessible :subscription_id, :amount, :currency
  belongs_to :subscription, :inverse_of => :payments
  belongs_to :payment_method, :inverse_of => :payments
  has_many :shipments, :inverse_of => :payment, :order => 'created_at DESC'
end
