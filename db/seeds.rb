# encoding: UTF-8

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Emanuel', :city => cities.first)

# recurring subscriptions
Product.create(:name => 'Suscripción "Sorpréndeme" México', :public_id => '5136d304e4c9b80002004b6f', :order_type => 'subscription', :where_value => '1', :price => '179.0', :currency => 'MXN', :weight => '0.5')
Product.create(:name => 'Subscription "Surprise Me" North America', :public_id => '51acd09fbc64346d7a000001', :order_type => 'subscription', :where_value => '2', :price => '18.99', :currency => 'USD', :weight => '0.5')
Product.create(:name => 'Subscription "Surprise Me" Central and South America', :public_id => '51cb6112fad2f7525100005d', :order_type => 'subscription', :where_value => '3', :price => '29.99', :currency => 'USD', :weight => '0.5')
Product.create(:name => 'Subscription "Surprise Me" Europe', :public_id => '51acd39146f58d66e3000003', :order_type => 'subscription', :where_value => '4', :price => '23.99', :currency => 'EUR', :weight => '0.5')

# prepaid subscriptions
Product.create(:name => 'Regalo de 3 Meses - Mex', :public_id => '51c0cc883f7ff5b7bf000002', :order_type => 'prepaid', :where_value => '1', :price => '510.00', :currency => 'MXN', :weight => '0.5')
Product.create(:name => 'Regalo de 6 Meses - Mex', :public_id => '51c0cd0fafd1e81ec6000007', :order_type => 'prepaid', :where_value => '1', :price => '966.00', :currency => 'MXN', :weight => '0.5')
Product.create(:name => 'Regalo de 12 Meses - Mex', :public_id => '51c0cd860038fda410000005', :order_type => 'prepaid', :where_value => '1', :price => '1716.00', :currency => 'MXN', :weight => '0.5')
Product.create(:name => 'Regalo de 4 Meses - North America', :public_id => '51dcc037a21869c0bc000002', :order_type => 'prepaid', :where_value => '2', :price => '69.96', :currency => 'USD', :weight => '0.5')

# single orders
Product.create(:name => 'Un MyCoffeeBox Gratis', :public_id => '51f699e866430ea87b000005', :order_type => 'order', :where_value => '1', :price => '0.00', :currency => 'MXN', :weight => '0.5')
