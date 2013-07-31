class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  attr_accessible :email, :name, :password, :phone, :status, :user_role, :subscriptions, :password_confirmation, :remember_me
  has_many :subscriptions, :inverse_of => :user
  has_many :payment_methods, :inverse_of => :user
  has_many :shipping_infos, :inverse_of => :user
end
