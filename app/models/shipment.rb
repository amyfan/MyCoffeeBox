class Shipment < ActiveRecord::Base
  attr_accessible :payment_id, :notes, :received_date, :shipment_cost, :shipment_status, :shipped_date, :shipping_provider
  belongs_to :payment, :inverse_of => :shipments
  has_many :product_items, :order => 'created_at DESC'
end
