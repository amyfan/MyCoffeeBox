class Product < ActiveRecord::Base
  attr_accessible :public_id, :order_type, :where_value, :currency, :description, :image_url, :name, :price, :weight
end
