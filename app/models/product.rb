class Product < ActiveRecord::Base
  attr_accessible :conekta_id, :order_type, :currency, :description, :image_url, :name, :price, :weight
end
