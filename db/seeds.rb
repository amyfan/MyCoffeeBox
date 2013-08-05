# encoding: UTF-8

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Emanuel', :city => cities.first)

Product.create(:name => 'Suscripción "Sorpréndeme" México', :conekta_id => '5136d304e4c9b80002004b6f', :order_type => 'subscription', :where_value => '1', :price => '179.0', :currency => 'MXN', :weight => '0.5')
Product.create(:name => 'Subscription "Surprise Me" North America', :conekta_id => '51acd09fbc64346d7a000001', :order_type => 'subscription', :where_value => '2', :price => '18.99', :currency => 'USD', :weight => '0.5')
Product.create(:name => 'Subscription "Surprise Me" Central and South America', :conekta_id => '51cb6112fad2f7525100005d', :order_type => 'subscription', :where_value => '3', :price => '29.99', :currency => 'USD', :weight => '0.5')
Product.create(:name => 'Subscription "Surprise Me" Europe', :conekta_id => '51acd39146f58d66e3000003', :order_type => 'subscription', :where_value => '4', :price => '23.99', :currency => 'EUR', :weight => '0.5')
