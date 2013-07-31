class ProductItem < ActiveRecord::Base
  attr_accessible :custom_options, :quantity
  belongs_to :product
end
