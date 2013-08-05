# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130724215456) do

  create_table "payment_methods", :force => true do |t|
    t.string   "payment_type"
    t.integer  "last4"
    t.string   "address_one"
    t.string   "address_two"
    t.string   "city"
    t.string   "state"
    t.string   "postal_code"
    t.string   "country"
    t.string   "phone"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
    t.integer  "user_id"
  end

  create_table "payments", :force => true do |t|
    t.decimal  "amount"
    t.string   "currency"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
    t.integer  "subscription_id"
    t.integer  "payment_method_id"
  end

  create_table "product_items", :force => true do |t|
    t.integer  "quantity"
    t.string   "custom_options"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
    t.integer  "product_id"
  end

  create_table "products", :force => true do |t|
    t.string   "name"
    t.string   "description"
<<<<<<< HEAD
    t.string   "conekta_id"
=======
>>>>>>> 0e98ad2b23d969d5fc0e659075fb655a013323bf
    t.decimal  "price"
    t.string   "currency"
    t.decimal  "weight"
    t.string   "image_url"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "shipments", :force => true do |t|
    t.datetime "shipped_date"
    t.datetime "received_date"
    t.string   "shipment_status"
    t.decimal  "shipment_cost"
    t.string   "shipping_provider"
    t.string   "notes"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
    t.integer  "payment_id"
  end

  create_table "shipping_infos", :force => true do |t|
    t.string   "name"
    t.string   "address_one"
    t.string   "address_two"
    t.string   "city"
    t.string   "state"
    t.string   "postal_code"
    t.string   "country"
    t.string   "phone"
    t.string   "additional_info"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.integer  "user_id"
  end

  create_table "subscriptions", :force => true do |t|
<<<<<<< HEAD
    t.string   "conekta_id"
=======
>>>>>>> 0e98ad2b23d969d5fc0e659075fb655a013323bf
    t.integer  "shipping_period"
    t.integer  "billing_period"
    t.string   "coffee_type"
    t.string   "referral_email"
    t.string   "promo_code"
    t.string   "payment_status"
    t.string   "utm_source"
    t.string   "utm_medium"
    t.string   "utm_term"
    t.string   "utm_content"
    t.string   "utm_campaign"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
    t.integer  "user_id"
    t.integer  "product_item_id"
    t.integer  "shipping_info_id"
  end

  create_table "users", :force => true do |t|
    t.string   "name",                   :default => "", :null => false
    t.string   "email",                  :default => "", :null => false
    t.string   "phone"
    t.string   "user_role"
    t.datetime "last_used"
    t.integer  "status"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end
