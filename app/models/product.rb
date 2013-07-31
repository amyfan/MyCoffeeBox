class Product < ActiveRecord::Base
  attr_accessible :currency, :description, :image_url, :name, :price, :weight
end
