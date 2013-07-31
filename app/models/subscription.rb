class Subscription < ActiveRecord::Base
  attr_accessible :user, :billing_period, :coffee_type, :payment_status, :promo_code, :referral_email, :shipping_period, :utm_campaign, :utm_content, :utm_medium, :utm_source, :utm_term
  belongs_to :user, :inverse_of => :subscriptions
  belongs_to :product_item
  belongs_to :shipping_info
  has_many :payments, :inverse_of => :subscription
end
